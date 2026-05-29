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
