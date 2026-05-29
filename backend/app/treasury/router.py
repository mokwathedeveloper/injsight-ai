"""Treasury monitoring endpoints – derives data from the user's saved wallets."""
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.auth.dependencies import current_user
from app.common.responses import ok
from app.db import get_db
from app.integrations.injective.service import fetch_wallet_data
from app.ai.service import compute_risk
from app.models import User, Wallet

router = APIRouter(prefix="/api/treasury", tags=["treasury"])

_EXPOSURE_COLORS = {
    "Native": "#0066FF",
    "Stablecoin": "#22C55E",
    "Ecosystem": "#00C2FF",
    "Unknown": "#F5C542",
}


@router.get("/summary")
def treasury_summary(db: Session = Depends(get_db), user: User = Depends(current_user)):
    wallets = db.query(Wallet).filter(Wallet.user_id == str(user.id)).all()
    if not wallets:
        return ok({
            "totalValueUsd": 0,
            "walletCount": 0,
            "weeklyChangePct": 0.0,
            "largestOutflowUsd": 0,
            "movements": [],
            "exposure": [],
        })

    # Compose aggregated data from each wallet's deterministic portfolio.
    total_value = 0.0
    category_map: dict[str, float] = {}
    movements = []

    for w in wallets:
        data = fetch_wallet_data(w.address)
        total_value += data["total_value_usd"]
        for h in data["holdings"]:
            cat = h["category"]
            category_map[cat] = category_map.get(cat, 0.0) + h["value_usd"]

    # Derive exposure breakdown
    exposure = []
    for cat, val in sorted(category_map.items(), key=lambda x: -x[1]):
        exposure.append({
            "category": cat,
            "valueUsd": round(val, 2),
            "percent": round(val / total_value * 100, 1) if total_value else 0,
            "color": _EXPOSURE_COLORS.get(cat, "#8B949E"),
        })

    # Stub movements (deterministic – no real on-chain history in MVP)
    if wallets:
        movements = [
            {"id": f"t-{i}", "date": f"May {28 - i}, 2026", "type": "outflow" if i % 2 == 0 else "inflow",
             "token": ["USDT", "INJ", "USDC"][i % 3],
             "amountUsd": round(10000 + (hash(wallets[0].address + str(i)) % 100000), 2),
             "counterparty": f"inj1{wallets[0].address[-6:]}…"}
            for i in range(min(5, len(wallets) * 2))
        ]

    return ok({
        "totalValueUsd": round(total_value, 2),
        "walletCount": len(wallets),
        "weeklyChangePct": -2.4,
        "largestOutflowUsd": max((m["amountUsd"] for m in movements if m["type"] == "outflow"), default=0),
        "movements": movements,
        "exposure": exposure,
    })
