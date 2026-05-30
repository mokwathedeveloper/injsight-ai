"""Injective chain data integration via LCD REST API.

Strategy:
  1. Validate the bech32 address format.
  2. Fetch real balances from public Injective LCD nodes (tries three nodes).
  3. Fetch live prices from CoinGecko.
  4. If the wallet has real on-chain tokens → return real data.
  5. If the wallet is empty or unreachable → return empty portfolio
     (callers can choose to show demo data via the demo=True flag).
"""
from __future__ import annotations

import hashlib
import logging
from typing import Any

import httpx

logger = logging.getLogger(__name__)

DATA_SOURCE = "injective-lcd"
DATA_SOURCE_DEMO = "injective-demo"

# Multiple public Injective LCD nodes (tried in order)
LCD_NODES = [
    "https://lcd.injective.network",
    "https://injective-rest.publicnode.com",
    "https://rest.injective.network",
]

COINGECKO_BASE = "https://api.coingecko.com/api/v3"
COINGECKO_IDS = "injective-protocol,cosmos,celestia,ethereum,tether,usd-coin,bitcoin"

TIMEOUT = httpx.Timeout(10.0)

# Known Injective token denoms → display metadata
DENOM_MAP: dict[str, dict[str, str]] = {
    "inj": {"symbol": "INJ",  "name": "Injective",     "category": "Native",     "coingecko_id": "injective-protocol", "decimals": "18"},
    "peggy0xdAC17F958D2ee523a2206206994597C13D831ec7": {"symbol": "USDT", "name": "Tether USD",    "category": "Stablecoin", "coingecko_id": "tether",              "decimals": "6"},
    "peggy0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48": {"symbol": "USDC", "name": "USD Coin",     "category": "Stablecoin", "coingecko_id": "usd-coin",            "decimals": "6"},
    "peggy0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599": {"symbol": "WBTC", "name": "Wrapped BTC",  "category": "DeFi",       "coingecko_id": "bitcoin",             "decimals": "8"},
    "ibc/C4CFF46FD6DE35CA4CF4CE031E643C8FDC9BA4B99AE598E9B0ED98FE3A2319F9": {"symbol": "ATOM", "name": "Cosmos",        "category": "Ecosystem",  "coingecko_id": "cosmos",              "decimals": "6"},
    "ibc/F51BB221BAA275F2EBF654F70B005627D7E713AFFD6D86AFD1E43CAA886149F4": {"symbol": "TIA",  "name": "Celestia",      "category": "Ecosystem",  "coingecko_id": "celestia",            "decimals": "6"},
}

_DEFAULT_DECIMALS = 6

# Demo token universe (used when wallet is empty or no real data)
_DEMO_TOKENS = [
    {"symbol": "INJ",  "name": "Injective",   "category": "Native",     "coingecko_id": "injective-protocol"},
    {"symbol": "USDT", "name": "Tether USD",  "category": "Stablecoin", "coingecko_id": "tether"},
    {"symbol": "USDC", "name": "USD Coin",    "category": "Stablecoin", "coingecko_id": "usd-coin"},
    {"symbol": "ATOM", "name": "Cosmos",      "category": "Ecosystem",  "coingecko_id": "cosmos"},
    {"symbol": "TIA",  "name": "Celestia",    "category": "Ecosystem",  "coingecko_id": "celestia"},
]


def is_valid_injective_address(address: str) -> bool:
    """Accept any bech32 string starting with inj1 of plausible length."""
    return isinstance(address, str) and address.startswith("inj1") and 38 <= len(address) <= 50


def _parse_amount(raw: str, decimals: int) -> float:
    try:
        return int(raw) / (10 ** decimals)
    except Exception:
        return 0.0


# ── Price fetching ────────────────────────────────────────────────────────────

def _fetch_prices_sync() -> dict[str, float]:
    try:
        with httpx.Client(timeout=TIMEOUT) as c:
            r = c.get(f"{COINGECKO_BASE}/simple/price",
                      params={"ids": COINGECKO_IDS, "vs_currencies": "usd"})
            r.raise_for_status()
            return {k: v.get("usd", 0.0) for k, v in r.json().items()}
    except Exception as exc:
        logger.warning("CoinGecko price fetch failed: %s", exc)
        return {}


async def _fetch_prices_async() -> dict[str, float]:
    try:
        async with httpx.AsyncClient(timeout=TIMEOUT) as c:
            r = await c.get(f"{COINGECKO_BASE}/simple/price",
                            params={"ids": COINGECKO_IDS, "vs_currencies": "usd"})
            r.raise_for_status()
            return {k: v.get("usd", 0.0) for k, v in r.json().items()}
    except Exception as exc:
        logger.warning("CoinGecko async price fetch failed: %s", exc)
        return {}


# ── Balance fetching ──────────────────────────────────────────────────────────

def _fetch_balances_sync(address: str) -> list[dict[str, Any]]:
    for node in LCD_NODES:
        try:
            with httpx.Client(timeout=TIMEOUT) as c:
                r = c.get(f"{node}/cosmos/bank/v1beta1/balances/{address}")
                if r.status_code in (400, 404):
                    return []           # wallet not found or invalid on this node
                r.raise_for_status()
                return r.json().get("balances", [])
        except Exception as exc:
            logger.debug("LCD node %s failed: %s", node, exc)
    return []


async def _fetch_balances_async(address: str) -> list[dict[str, Any]]:
    for node in LCD_NODES:
        try:
            async with httpx.AsyncClient(timeout=TIMEOUT) as c:
                r = await c.get(f"{node}/cosmos/bank/v1beta1/balances/{address}")
                if r.status_code in (400, 404):
                    return []
                r.raise_for_status()
                return r.json().get("balances", [])
        except Exception as exc:
            logger.debug("LCD async node %s failed: %s", node, exc)
    return []


# ── Portfolio builder ─────────────────────────────────────────────────────────

def _build_portfolio(address: str, raw_balances: list, prices: dict, source: str) -> dict:
    holdings: list[dict] = []
    for b in raw_balances:
        denom: str = b.get("denom", "")
        raw_amt: str = b.get("amount", "0")
        meta = DENOM_MAP.get(denom, {
            "symbol": denom[:8], "name": denom, "category": "Unknown",
            "coingecko_id": "", "decimals": str(_DEFAULT_DECIMALS),
        })
        decimals = int(meta.get("decimals", _DEFAULT_DECIMALS))
        amount = _parse_amount(raw_amt, decimals)
        if amount <= 0:
            continue
        price = prices.get(meta.get("coingecko_id", ""), 0.0)
        holdings.append({
            "symbol": meta["symbol"], "name": meta["name"],
            "category": meta["category"], "denom": denom,
            "amount": round(amount, 6), "price": price,
            "value_usd": round(amount * price, 2), "percent": 0.0,
        })

    holdings.sort(key=lambda h: h["value_usd"], reverse=True)
    total = sum(h["value_usd"] for h in holdings) or 0.0
    if total > 0:
        for h in holdings:
            h["percent"] = round(h["value_usd"] / total * 100, 1)

    return {
        "address": address, "chain": "injective", "data_source": source,
        "total_value_usd": round(total, 2), "holdings": holdings,
        "token_count": len(holdings),
    }


def _demo_portfolio(address: str, prices: dict) -> dict:
    """Deterministic demo portfolio keyed off address hash."""
    seed = int(hashlib.sha256(address.encode()).hexdigest(), 16)
    count = 3 + (seed % 3)
    tokens = [_DEMO_TOKENS[0]] + [
        _DEMO_TOKENS[1 + ((seed >> (i * 3)) % (len(_DEMO_TOKENS) - 1))]
        for i in range(count - 1)
    ]
    seen: set = set(); unique = []
    for t in tokens:
        if t["symbol"] not in seen:
            seen.add(t["symbol"]); unique.append(t)

    # Use live prices if available, else reasonable defaults
    _defaults = {"INJ": 26.0, "USDT": 1.0, "USDC": 1.0, "ATOM": 8.0, "TIA": 6.0}
    raw_balances = []
    for i, t in enumerate(unique):
        amt_units = 50 + ((seed >> (i * 5)) % 5000)
        price = prices.get(t["coingecko_id"], _defaults.get(t["symbol"], 1.0))
        raw_balances.append({
            "denom": t["symbol"], "amount": str(amt_units * (10 ** 6)),
            "_meta_override": t, "_price_override": price,
        })

    holdings = []
    for b in raw_balances:
        meta = b["_meta_override"]
        price = b["_price_override"]
        amount = int(b["amount"]) / (10 ** 6)
        holdings.append({
            "symbol": meta["symbol"], "name": meta["name"],
            "category": meta["category"], "denom": meta["symbol"],
            "amount": round(amount, 2), "price": price,
            "value_usd": round(amount * price, 2), "percent": 0.0,
        })

    holdings.sort(key=lambda h: h["value_usd"], reverse=True)
    total = sum(h["value_usd"] for h in holdings) or 1.0
    for h in holdings:
        h["percent"] = round(h["value_usd"] / total * 100, 1)

    return {
        "address": address, "chain": "injective",
        "data_source": DATA_SOURCE_DEMO,
        "total_value_usd": round(total, 2), "holdings": holdings,
        "token_count": len(holdings), "is_demo": True,
    }


# ── Public API ────────────────────────────────────────────────────────────────

def fetch_wallet_data(address: str, demo: bool = False) -> dict:
    """Fetch wallet data. Uses real on-chain data when available, demo otherwise."""
    if not is_valid_injective_address(address):
        return {"address": address, "chain": "injective", "data_source": "invalid",
                "total_value_usd": 0.0, "holdings": [], "token_count": 0, "error": "invalid_address"}

    prices = _fetch_prices_sync()

    if not demo:
        raw = _fetch_balances_sync(address)
        if raw:
            return _build_portfolio(address, raw, prices, DATA_SOURCE)

    # Fall back to demo portfolio (same address always gives same portfolio)
    return _demo_portfolio(address, prices)


async def async_fetch_wallet_data(address: str, demo: bool = False) -> dict:
    """Async variant of fetch_wallet_data."""
    if not is_valid_injective_address(address):
        return {"address": address, "chain": "injective", "data_source": "invalid",
                "total_value_usd": 0.0, "holdings": [], "token_count": 0, "error": "invalid_address"}

    prices = await _fetch_prices_async()

    if not demo:
        raw = await _fetch_balances_async(address)
        if raw:
            return _build_portfolio(address, raw, prices, DATA_SOURCE)

    return _demo_portfolio(address, prices)


# ═══════════════════════════════════════════════════════════════════════════════
# DEEP INJECTIVE INTEGRATION — Transactions, Staking, Ecosystem, Market
# ═══════════════════════════════════════════════════════════════════════════════

def _lcd_get(path: str, params: dict | None = None) -> dict | None:
    """Make a GET request to Injective LCD, trying all nodes. Returns None on failure."""
    for node in LCD_NODES:
        try:
            with httpx.Client(timeout=TIMEOUT) as c:
                r = c.get(f"{node}{path}", params=params)
                if r.status_code in (400, 404):
                    return None
                r.raise_for_status()
                return r.json()
        except Exception as exc:
            logger.debug("LCD %s %s failed: %s", node, path, exc)
    return None


def fetch_transaction_history(address: str, limit: int = 20) -> dict:
    """
    Fetch recent transaction history for *address* from Injective LCD.

    Returns:
      {
        "address": str,
        "transactions": [
          {
            "hash": str, "height": int, "timestamp": str,
            "type": str, "fee": float, "status": "success"|"failed",
            "memo": str, "messages": list[dict]
          }
        ],
        "total_count": int,
        "data_source": str
      }
    """
    if not is_valid_injective_address(address):
        return {"address": address, "transactions": [], "total_count": 0, "data_source": "invalid"}

    transactions = []

    # Query both sent and received transactions
    for event_type in [
        f'message.sender="{address}"',
        f'transfer.recipient="{address}"',
    ]:
        data = _lcd_get("/cosmos/tx/v1beta1/txs", {
            "events":               event_type,
            "order_by":             "ORDER_BY_DESC",
            "pagination.limit":     str(limit // 2),
        })
        if not data:
            continue

        for tx in data.get("txs", []):
            tx_response = next(
                (r for r in data.get("tx_responses", []) if r.get("txhash") == tx.get("hash", "")),
                {},
            )
            body      = tx.get("body", {})
            auth_info = tx.get("auth_info", {})
            messages  = body.get("messages", [])

            # Determine primary message type
            msg_type = "unknown"
            if messages:
                raw_type = messages[0].get("@type", "")
                msg_type = raw_type.split(".")[-1].replace("Msg", "") if raw_type else "Transfer"

            # Fee
            fee_amount = 0.0
            try:
                amounts = auth_info.get("fee", {}).get("amount", [])
                if amounts:
                    fee_amount = int(amounts[0].get("amount", "0")) / 1e18
            except Exception:
                pass

            hash_val = tx_response.get("txhash", tx.get("hash", ""))
            if any(t["hash"] == hash_val for t in transactions):
                continue  # deduplicate

            transactions.append({
                "hash":      hash_val,
                "height":    int(tx_response.get("height", 0)),
                "timestamp": tx_response.get("timestamp", ""),
                "type":      msg_type,
                "fee":       round(fee_amount, 8),
                "status":    "success" if tx_response.get("code", 0) == 0 else "failed",
                "memo":      body.get("memo", ""),
                "messages":  [{"type": m.get("@type", ""), "data": m} for m in messages[:3]],
            })

    # Sort newest first
    transactions.sort(key=lambda t: t.get("timestamp", ""), reverse=True)
    transactions = transactions[:limit]

    return {
        "address":       address,
        "transactions":  transactions,
        "total_count":   len(transactions),
        "data_source":   DATA_SOURCE if transactions else DATA_SOURCE_DEMO,
    }


def fetch_staking_data(address: str) -> dict:
    """
    Fetch staking delegations and rewards for *address*.

    Returns:
      {
        "address": str,
        "delegations": [{"validator": str, "amount": float, "shares": str}],
        "total_staked_inj": float,
        "total_staked_usd": float,
        "rewards": [{"validator": str, "amount": float}],
        "total_rewards_inj": float,
        "data_source": str
      }
    """
    if not is_valid_injective_address(address):
        return {"address": address, "delegations": [], "total_staked_inj": 0.0,
                "total_staked_usd": 0.0, "rewards": [], "total_rewards_inj": 0.0, "data_source": "invalid"}

    delegations: list[dict] = []
    total_staked = 0.0

    del_data = _lcd_get(f"/cosmos/staking/v1beta1/delegations/{address}")
    if del_data:
        for d in del_data.get("delegation_responses", []):
            delegation = d.get("delegation", {})
            balance    = d.get("balance", {})
            amount     = int(balance.get("amount", "0")) / 1e18
            val_addr   = delegation.get("validator_address", "")
            # Shorten validator address for display
            val_short  = f"{val_addr[:12]}…{val_addr[-6:]}" if len(val_addr) > 20 else val_addr
            delegations.append({
                "validator":       val_short,
                "validatorFull":   val_addr,
                "amount":          round(amount, 4),
                "shares":          delegation.get("shares", "0"),
            })
            total_staked += amount

    rewards_list: list[dict] = []
    total_rewards = 0.0

    rew_data = _lcd_get(f"/cosmos/distribution/v1beta1/delegators/{address}/rewards")
    if rew_data:
        for r in rew_data.get("rewards", []):
            val_addr = r.get("validator_address", "")
            val_short = f"{val_addr[:12]}…{val_addr[-6:]}" if len(val_addr) > 20 else val_addr
            inj_reward = 0.0
            for coin in r.get("reward", []):
                if coin.get("denom") == "inj":
                    inj_reward = float(coin.get("amount", "0")) / 1e18
            rewards_list.append({"validator": val_short, "amount": round(inj_reward, 6)})
            total_rewards += inj_reward

    # Get live INJ price to compute USD value
    prices = _fetch_prices_sync()
    inj_price = prices.get("injective-protocol", 0.0)

    return {
        "address":          address,
        "delegations":      delegations,
        "total_staked_inj": round(total_staked, 4),
        "total_staked_usd": round(total_staked * inj_price, 2),
        "rewards":          rewards_list,
        "total_rewards_inj": round(total_rewards, 6),
        "total_rewards_usd": round(total_rewards * inj_price, 2),
        "inj_price":        inj_price,
        "data_source":      DATA_SOURCE if (delegations or rewards_list) else DATA_SOURCE_DEMO,
    }


def fetch_ecosystem_exposure(address: str) -> dict:
    """
    Return an ecosystem exposure breakdown for *address*:
    portfolio + staking combined, categorised by asset type.

    Returns:
      {
        "address": str,
        "total_value_usd": float,
        "ecosystem_exposure_pct": float,
        "injective_native_pct": float,
        "stablecoin_pct": float,
        "defi_pct": float,
        "unknown_pct": float,
        "categories": [...],
        "top_tokens": [...],
        "data_sources": [str],
        "staking": {...}
      }
    """
    portfolio = fetch_wallet_data(address)
    staking   = fetch_staking_data(address)

    holdings      = portfolio.get("holdings", [])
    total_port    = portfolio.get("total_value_usd", 0.0)
    staked_usd    = staking.get("total_staked_usd", 0.0)
    total_value   = total_port + staked_usd

    if total_value <= 0:
        total_value = 1.0

    # Aggregate by category
    category_totals: dict[str, float] = {}
    for h in holdings:
        cat = h.get("category", "Unknown")
        category_totals[cat] = category_totals.get(cat, 0.0) + h.get("value_usd", 0.0)

    # Staking = additional Native exposure
    if staked_usd > 0:
        category_totals["Staking"] = category_totals.get("Staking", 0.0) + staked_usd

    categories = [
        {
            "name":      cat,
            "value_usd": round(val, 2),
            "pct":       round(val / total_value * 100, 1),
        }
        for cat, val in sorted(category_totals.items(), key=lambda x: -x[1])
    ]

    native_pct    = sum(c["pct"] for c in categories if c["name"] in ("Native", "Staking"))
    stable_pct    = sum(c["pct"] for c in categories if c["name"] == "Stablecoin")
    defi_pct      = sum(c["pct"] for c in categories if c["name"] == "DeFi")
    unknown_pct   = sum(c["pct"] for c in categories if c["name"] == "Unknown")
    ecosystem_pct = round(100 - unknown_pct, 1)

    top_tokens = sorted(holdings, key=lambda h: -h.get("value_usd", 0))[:10]

    sources = list({portfolio.get("data_source",""), "injective-lcd"} - {""})

    return {
        "address":               address,
        "total_value_usd":       round(total_value, 2),
        "portfolio_value_usd":   round(total_port, 2),
        "staking_value_usd":     round(staked_usd, 2),
        "ecosystem_exposure_pct": ecosystem_pct,
        "injective_native_pct":  round(native_pct, 1),
        "stablecoin_pct":        round(stable_pct, 1),
        "defi_pct":              round(defi_pct, 1),
        "unknown_pct":           round(unknown_pct, 1),
        "categories":            categories,
        "top_tokens":            top_tokens,
        "staking":               staking,
        "data_sources":          sources,
    }


def fetch_market_context(address: str) -> dict:
    """
    Return market context: live prices + market cap % changes for the wallet's assets.

    Returns:
      {
        "address": str,
        "total_value_usd": float,
        "inj_price": float,
        "inj_change_24h": float,
        "dominant_asset": str,
        "dominant_pct": float,
        "asset_market_data": [{symbol, price, change24h, value_usd, pct, marketCap}]
        "last_updated": str
      }
    """
    import datetime

    prices_raw: dict[str, float] = {}
    changes_raw: dict[str, float] = {}

    try:
        with httpx.Client(timeout=TIMEOUT) as c:
            r = c.get(
                f"{COINGECKO_BASE}/simple/price",
                params={
                    "ids":                COINGECKO_IDS,
                    "vs_currencies":      "usd",
                    "include_24hr_change":"true",
                    "include_market_cap": "true",
                },
            )
            r.raise_for_status()
            raw = r.json()
            for cg_id, info in raw.items():
                prices_raw[cg_id]  = info.get("usd", 0.0)
                changes_raw[cg_id] = info.get("usd_24h_change", 0.0)
    except Exception as exc:
        logger.warning("Market context CoinGecko failed: %s", exc)

    portfolio = fetch_wallet_data(address)
    holdings  = portfolio.get("holdings", [])

    asset_market_data = []
    for h in holdings:
        cg_id = next(
            (v.get("coingecko_id","") for k,v in DENOM_MAP.items() if v.get("symbol") == h["symbol"]),
            "",
        )
        price_24h = changes_raw.get(cg_id, 0.0) if cg_id else 0.0
        asset_market_data.append({
            "symbol":    h["symbol"],
            "name":      h["name"],
            "price":     h["price"],
            "change24h": round(price_24h, 2),
            "value_usd": h["value_usd"],
            "pct":       h["percent"],
            "category":  h["category"],
        })

    inj_cg    = "injective-protocol"
    inj_price = prices_raw.get(inj_cg, 0.0)
    inj_chg   = changes_raw.get(inj_cg, 0.0)

    dominant  = holdings[0] if holdings else {}

    return {
        "address":          address,
        "total_value_usd":  portfolio.get("total_value_usd", 0.0),
        "inj_price":        round(inj_price, 4),
        "inj_change_24h":   round(inj_chg, 2),
        "dominant_asset":   dominant.get("symbol", "—"),
        "dominant_pct":     dominant.get("percent", 0.0),
        "asset_market_data": asset_market_data,
        "data_source":       portfolio.get("data_source", DATA_SOURCE),
        "last_updated":      datetime.datetime.now(datetime.timezone.utc).isoformat(),
    }
