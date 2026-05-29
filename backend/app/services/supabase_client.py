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
    """Return cached Supabase client.

    Uses service_role key when available (full access, bypasses RLS).
    Falls back to anon key (limited by RLS — read-only for public data).
    Returns None if Supabase is not configured.
    """
    if not _SUPABASE_AVAILABLE:
        return None

    from app.config import settings

    url = settings.supabase_url or os.getenv("SUPABASE_URL", "")
    # Prefer service_role (bypasses RLS) → fall back to anon
    key = (
        settings.supabase_service_key
        or os.getenv("SUPABASE_SERVICE_KEY", "")
        or settings.supabase_anon_key
        or os.getenv("SUPABASE_ANON_KEY", "")
    )

    if not url or not key:
        logger.info("Supabase not configured — client disabled")
        return None

    key_type = "service_role" if (
        settings.supabase_service_key or os.getenv("SUPABASE_SERVICE_KEY", "")
    ) else "anon"

    try:
        client = create_client(url, key)
        logger.info("Supabase client ready (%s key) for %s", key_type, url)
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
