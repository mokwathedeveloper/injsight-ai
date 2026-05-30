"""Injective blockchain deep-integration endpoints."""
from fastapi import APIRouter, Query

from app.common.responses import APIError, ok
from app.integrations.injective.service import (
    fetch_transaction_history,
    fetch_staking_data,
    fetch_ecosystem_exposure,
    fetch_market_context,
    fetch_wallet_data,
    is_valid_injective_address,
)

router = APIRouter(prefix="/api/injective", tags=["injective"])


def _validate(address: str) -> None:
    if not is_valid_injective_address(address):
        raise APIError("INVALID_ADDRESS", "Not a valid Injective wallet address (must start with inj1).", 422)


@router.get("/{address}/portfolio")
def get_portfolio(address: str):
    """Live token balances + CoinGecko prices."""
    _validate(address)
    return ok(fetch_wallet_data(address), "Portfolio fetched.")


@router.get("/{address}/transactions")
def get_transactions(
    address: str,
    limit: int = Query(default=20, ge=1, le=100),
):
    """Recent transaction history from Injective LCD."""
    _validate(address)
    return ok(fetch_transaction_history(address, limit=limit), "Transactions fetched.")


@router.get("/{address}/staking")
def get_staking(address: str):
    """INJ staking delegations and pending rewards."""
    _validate(address)
    return ok(fetch_staking_data(address), "Staking data fetched.")


@router.get("/{address}/ecosystem")
def get_ecosystem(address: str):
    """Full ecosystem exposure breakdown: portfolio + staking, categorised."""
    _validate(address)
    return ok(fetch_ecosystem_exposure(address), "Ecosystem exposure fetched.")


@router.get("/{address}/market")
def get_market_context(address: str):
    """Market context: live prices, 24h changes, dominant asset."""
    _validate(address)
    return ok(fetch_market_context(address), "Market context fetched.")
