"""Alert endpoints."""
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.auth.dependencies import current_user
from app.common.responses import APIError, ok
from app.db import get_db
from app.models import Alert, User

router = APIRouter(prefix="/api/alerts", tags=["alerts"])


def serialize_alert(a: Alert) -> dict:
    return {
        "id": str(a.id),
        "walletAddress": a.wallet_address,
        "type": a.type,
        "severity": a.severity,
        "title": a.title,
        "message": a.message,
        "isRead": a.is_read,
        "createdAt": a.created_at,
    }


@router.get("")
def list_alerts(db: Session = Depends(get_db), user: User = Depends(current_user)):
    alerts = db.query(Alert).filter(Alert.user_id == str(user.id)).order_by(Alert.created_at.desc()).all()
    return ok([serialize_alert(a) for a in alerts])


@router.put("/read-all")
def mark_all_read(db: Session = Depends(get_db), user: User = Depends(current_user)):
    db.query(Alert).filter(Alert.user_id == str(user.id), Alert.is_read.is_(False)).update({"is_read": True})
    db.commit()
    return ok(None, "All alerts marked as read.")


def _owned(db: Session, alert_id: str, user: User) -> Alert:
    alert = db.get(Alert, alert_id)
    if not alert or str(alert.user_id) != str(user.id):
        raise APIError("NOT_FOUND", "Alert not found.", 404)
    return alert


@router.put("/{alert_id}/read")
def mark_read(alert_id: str, db: Session = Depends(get_db), user: User = Depends(current_user)):
    alert = _owned(db, alert_id, user)
    alert.is_read = True
    db.commit()
    return ok(serialize_alert(alert), "Alert marked as read.")


@router.delete("/{alert_id}")
def delete_alert(alert_id: str, db: Session = Depends(get_db), user: User = Depends(current_user)):
    alert = _owned(db, alert_id, user)
    db.delete(alert)
    db.commit()
    return ok(None, "Alert deleted.")
