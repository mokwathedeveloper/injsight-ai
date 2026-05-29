"""Saved wallet endpoints."""
from datetime import datetime, timezone

from fastapi import APIRouter, Depends
from pydantic import BaseModel, Field
from sqlalchemy.orm import Session

from app.analysis.service import run_analysis, serialize_analysis
from app.auth.dependencies import current_user
from app.common.responses import APIError, ok
from app.db import get_db
from app.models import User, Wallet

router = APIRouter(prefix="/api/wallets", tags=["wallets"])


class SaveWalletRequest(BaseModel):
    walletAddress: str = Field(min_length=4, max_length=128)
    label: str | None = Field(default=None, max_length=120)
    chain: str = "injective"


class UpdateWalletRequest(BaseModel):
    label: str = Field(max_length=120)


def serialize_wallet(w: Wallet) -> dict:
    return {
        "id": str(w.id),
        "address": w.address,
        "chain": w.chain,
        "label": w.label,
        "isDemo": w.is_demo,
        "lastAnalyzedAt": w.last_analyzed_at,
        "createdAt": w.created_at,
    }


@router.get("")
def list_wallets(db: Session = Depends(get_db), user: User = Depends(current_user)):
    wallets = db.query(Wallet).filter(Wallet.user_id == str(user.id)).order_by(Wallet.created_at.desc()).all()
    return ok([serialize_wallet(w) for w in wallets])


@router.post("")
def save_wallet(body: SaveWalletRequest, db: Session = Depends(get_db), user: User = Depends(current_user)):
    wallet = Wallet(user_id=str(user.id), address=body.walletAddress, label=body.label, chain=body.chain)
    db.add(wallet)
    db.commit()
    db.refresh(wallet)
    return ok(serialize_wallet(wallet), "Wallet saved.")


def _owned(db: Session, wallet_id: str, user: User) -> Wallet:
    wallet = db.get(Wallet, wallet_id)
    if not wallet or str(wallet.user_id) != str(user.id):
        raise APIError("NOT_FOUND", "Wallet not found.", 404)
    return wallet


@router.get("/{wallet_id}")
def get_wallet(wallet_id: str, db: Session = Depends(get_db), user: User = Depends(current_user)):
    return ok(serialize_wallet(_owned(db, wallet_id, user)))


@router.put("/{wallet_id}")
def update_wallet(wallet_id: str, body: UpdateWalletRequest, db: Session = Depends(get_db), user: User = Depends(current_user)):
    wallet = _owned(db, wallet_id, user)
    wallet.label = body.label
    db.commit()
    db.refresh(wallet)
    return ok(serialize_wallet(wallet), "Wallet updated.")


@router.delete("/{wallet_id}")
def delete_wallet(wallet_id: str, db: Session = Depends(get_db), user: User = Depends(current_user)):
    wallet = _owned(db, wallet_id, user)
    db.delete(wallet)
    db.commit()
    return ok(None, "Wallet deleted.")


@router.post("/{wallet_id}/analyze")
def analyze_wallet(wallet_id: str, db: Session = Depends(get_db), user: User = Depends(current_user)):
    wallet = _owned(db, wallet_id, user)
    run = run_analysis(db, wallet.address, user_id=str(user.id), wallet_id=str(wallet.id), persist=True)
    wallet.last_analyzed_at = datetime.now(timezone.utc)
    db.commit()
    return ok(serialize_analysis(run), "Wallet analysis complete.")
