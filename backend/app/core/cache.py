"""Simple in-memory TTL cache for InjSight AI.

Caches:
- CoinGecko prices          → 5-minute TTL
- Injective LCD balances     → 2-minute TTL
- Full wallet analysis       → 3-minute TTL (portfolio + risk + AI report)

No external dependencies — pure Python dict + timestamp.
Replace with Redis for multi-process deployments.
"""
from __future__ import annotations

import time
import threading
from typing import Any

_store: dict[str, tuple[float, Any]] = {}
_lock  = threading.Lock()


def get(key: str) -> Any | None:
    with _lock:
        entry = _store.get(key)
        if entry is None:
            return None
        expires_at, value = entry
        if time.monotonic() > expires_at:
            del _store[key]
            return None
        return value


def set(key: str, value: Any, ttl: int) -> None:
    with _lock:
        _store[key] = (time.monotonic() + ttl, value)


def delete(key: str) -> None:
    with _lock:
        _store.pop(key, None)


def clear() -> None:
    with _lock:
        _store.clear()


# ── Convenience TTLs (seconds) ────────────────────────────────────────────────
PRICE_TTL    = 300   # 5 min  — CoinGecko prices
BALANCE_TTL  = 120   # 2 min  — Injective LCD balances
ANALYSIS_TTL = 180   # 3 min  — full analysis (portfolio + risk + AI report)
STAKING_TTL  = 300   # 5 min  — staking delegations
