"""
Supabase client for InjSight AI.

Provides a singleton Supabase client for:
- Realtime subscriptions (alerts, portfolio updates)
- REST API operations when SQLAlchemy isn't ideal
- Presence/broadcast channels for multi-user features

Backend routes ALWAYS go through our FastAPI layer — the Supabase client here
is used for supplementary cloud features. SQLAlchemy remains the primary ORM.
"""
from __future__ import annotations

import logging
import os
from functools import lru_cache
from typing import Any

logger = logging.getLogger(__name__)

try:
    from supabase import create_client, Client
    _SUPABASE_AVAILABLE = True
except ImportError:
    _SUPABASE_AVAILABLE = False
    logger.warning("supabase-py not installed — Supabase features disabled")


@lru_cache(maxsize=1)
def get_supabase() -> "Client | None":
    """Return cached Supabase client. Returns None if not configured."""
    if not _SUPABASE_AVAILABLE:
        return None

    url  = os.getenv("SUPABASE_URL", "")
    key  = os.getenv("SUPABASE_ANON_KEY", "")

    if not url or not key:
        logger.info("SUPABASE_URL or SUPABASE_ANON_KEY not set — Supabase client disabled")
        return None

    try:
        client = create_client(url, key)
        logger.info("Supabase client initialised for %s", url)
        return client
    except Exception as exc:
        logger.error("Failed to create Supabase client: %s", exc)
        return None


# ── Realtime helpers ──────────────────────────────────────────────────────────

def broadcast_alert(user_id: str, alert: dict[str, Any]) -> bool:
    """Broadcast an alert to a user's Realtime channel. Non-blocking."""
    sb = get_supabase()
    if sb is None:
        return False
    try:
        channel = sb.channel(f"user:{user_id}:alerts")
        channel.send_broadcast("alert", alert)
        return True
    except Exception as exc:
        logger.warning("Supabase broadcast_alert failed: %s", exc)
        return False


def broadcast_analysis_complete(user_id: str, analysis_id: str, risk_level: str) -> bool:
    """Notify frontend that an analysis job completed."""
    sb = get_supabase()
    if sb is None:
        return False
    try:
        channel = sb.channel(f"user:{user_id}:analyses")
        channel.send_broadcast("analysis_complete", {
            "analysis_id": analysis_id,
            "risk_level":  risk_level,
        })
        return True
    except Exception as exc:
        logger.warning("Supabase broadcast_analysis_complete failed: %s", exc)
        return False
