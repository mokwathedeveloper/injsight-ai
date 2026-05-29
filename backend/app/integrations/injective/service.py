"""Injective chain data integration.

This MVP uses a deterministic mock data source keyed off the wallet address,
so the same address always yields the same portfolio. Swap `fetch_wallet_data`
for a real Injective indexer/SDK call without changing callers.
"""
import hashlib

DATA_SOURCE = "injective-indexer (mock)"

_TOKEN_UNIVERSE = [
    {"symbol": "INJ", "name": "Injective", "category": "Native", "price": 25.04},
    {"symbol": "USDT", "name": "Tether", "category": "Stablecoin", "price": 1.0},
    {"symbol": "USDC", "name": "USD Coin", "category": "Stablecoin", "price": 1.0},
    {"symbol": "WETH", "name": "Wrapped Ether", "category": "Ecosystem", "price": 3120.5},
    {"symbol": "TIA", "name": "Celestia", "category": "Ecosystem", "price": 6.74},
    {"symbol": "ATOM", "name": "Cosmos", "category": "Ecosystem", "price": 7.9},
]


def _seed(address: str) -> int:
    return int(hashlib.sha256(address.encode()).hexdigest(), 16)


def is_valid_injective_address(address: str) -> bool:
    return isinstance(address, str) and address.startswith("inj1") and 20 <= len(address) <= 128


def fetch_wallet_data(address: str) -> dict:
    """Return normalized balances + simple activity for an address (deterministic)."""
    seed = _seed(address)
    holdings = []
    # Choose 3-5 tokens deterministically, INJ always present.
    count = 3 + (seed % 3)
    chosen = [_TOKEN_UNIVERSE[0]] + [
        _TOKEN_UNIVERSE[1 + ((seed >> (i * 3)) % (len(_TOKEN_UNIVERSE) - 1))] for i in range(count - 1)
    ]
    # De-duplicate while preserving order.
    seen = set()
    unique = []
    for t in chosen:
        if t["symbol"] not in seen:
            seen.add(t["symbol"])
            unique.append(t)

    raw = []
    for i, token in enumerate(unique):
        amount = 50 + ((seed >> (i * 5)) % 5000)
        value = round(amount * token["price"], 2)
        raw.append({**token, "amount": amount, "value_usd": value})

    total = sum(t["value_usd"] for t in raw) or 1.0
    for t in raw:
        t["percent"] = round(t["value_usd"] / total * 100, 1)
    raw.sort(key=lambda t: t["value_usd"], reverse=True)

    return {
        "address": address,
        "chain": "injective",
        "data_source": DATA_SOURCE,
        "total_value_usd": round(total, 2),
        "holdings": raw,
        "token_count": len(raw),
    }
