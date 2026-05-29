"""Standard API response envelopes and error handling."""
from typing import Any

from fastapi import Request
from fastapi.responses import JSONResponse


def ok(data: Any = None, message: str = "Success") -> dict[str, Any]:
    """Wrap a successful payload in the standard envelope."""
    return {"data": data, "message": message}


class APIError(Exception):
    """Raised to return a structured error response."""

    def __init__(self, error: str, message: str, status_code: int = 400):
        self.error = error
        self.message = message
        self.status_code = status_code
        super().__init__(message)


def api_error_handler(_: Request, exc: APIError) -> JSONResponse:
    return JSONResponse(
        status_code=exc.status_code,
        content={"error": exc.error, "message": exc.message, "statusCode": exc.status_code},
    )
