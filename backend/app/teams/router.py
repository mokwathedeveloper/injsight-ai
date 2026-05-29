"""Team workspace endpoints (deterministic demo data keyed to user)."""
from fastapi import APIRouter, Depends
from pydantic import BaseModel, Field
from sqlalchemy.orm import Session

from app.auth.dependencies import current_user
from app.common.responses import APIError, ok
from app.db import get_db
from app.models import User

router = APIRouter(prefix="/api/teams", tags=["teams"])

# ---------------------------------------------------------------------------
# In-memory demo team state per authenticated user (reset on server restart).
# A real implementation would persist to `teams`, `memberships`, `team_wallets`
# tables – the API shape here is identical so the switch-over is a 1-line change.
# ---------------------------------------------------------------------------

_TEAMS: dict[str, dict] = {}     # user_id -> team record
_MEMBERS: dict[str, list] = {}   # user_id -> member list


def _default_team(user: User) -> dict:
    return {
        "id": f"ws-{user.id}",
        "name": f"{(user.name or user.email.split('@')[0]).title()} Workspace",
        "plan": "Team",
        "memberCount": 1,
    }


def _default_members(user: User) -> list:
    return [{
        "id": f"m-{user.id}",
        "name": user.name or user.email.split("@")[0],
        "email": user.email,
        "role": "owner",
        "status": "active",
        "initials": (user.name or user.email)[:2].upper(),
        "lastActive": "Online now",
    }]


@router.get("/workspaces")
def list_workspaces(user: User = Depends(current_user)):
    team = _TEAMS.get(str(user.id)) or _default_team(user)
    return ok([team, {"id": "ws-personal", "name": "Personal", "plan": "Team", "memberCount": 1}])


@router.get("/members")
def list_members(user: User = Depends(current_user)):
    return ok(_MEMBERS.get(str(user.id)) or _default_members(user))


class InviteRequest(BaseModel):
    email: str = Field(min_length=3)
    role: str = "viewer"


@router.post("/members")
def invite_member(body: InviteRequest, user: User = Depends(current_user)):
    members = _MEMBERS.setdefault(str(user.id), list(_default_members(user)))
    if any(m["email"] == body.email for m in members):
        raise APIError("DUPLICATE", "This email is already a team member.", 409)
    new_member = {
        "id": f"m-{len(members)}",
        "name": body.email.split("@")[0],
        "email": body.email,
        "role": body.role,
        "status": "invited",
        "initials": body.email[:2].upper(),
        "lastActive": "Invite sent",
    }
    members.append(new_member)
    if str(user.id) not in _TEAMS:
        _TEAMS[str(user.id)] = _default_team(user)
    _TEAMS[str(user.id)]["memberCount"] = len(members)
    return ok(new_member, "Invite sent.")


class RoleRequest(BaseModel):
    role: str


@router.put("/members/{member_id}/role")
def update_role(member_id: str, body: RoleRequest, user: User = Depends(current_user)):
    members = _MEMBERS.get(str(user.id)) or _default_members(user)
    for m in members:
        if m["id"] == member_id:
            if m["role"] == "owner":
                raise APIError("FORBIDDEN", "Cannot change owner role.", 403)
            m["role"] = body.role
            return ok(m, "Role updated.")
    raise APIError("NOT_FOUND", "Member not found.", 404)


@router.delete("/members/{member_id}")
def remove_member(member_id: str, user: User = Depends(current_user)):
    members = _MEMBERS.get(str(user.id)) or []
    m = next((m for m in members if m["id"] == member_id), None)
    if m is None:
        raise APIError("NOT_FOUND", "Member not found.", 404)
    if m["role"] == "owner":
        raise APIError("FORBIDDEN", "Cannot remove the workspace owner.", 403)
    _MEMBERS[str(user.id)] = [x for x in members if x["id"] != member_id]
    if str(user.id) in _TEAMS:
        _TEAMS[str(user.id)]["memberCount"] = len(_MEMBERS[str(user.id)])
    return ok(None, "Member removed.")
