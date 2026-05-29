"""Pydantic schemas for auth and users."""
from datetime import datetime

from pydantic import BaseModel, EmailStr, Field


class SignupRequest(BaseModel):
    name: str = Field(min_length=1, max_length=120)
    email: EmailStr
    password: str = Field(min_length=8, max_length=128)


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class RefreshRequest(BaseModel):
    refreshToken: str


class TokenPair(BaseModel):
    accessToken: str
    refreshToken: str
    tokenType: str = "bearer"


class UserOut(BaseModel):
    id: str
    email: EmailStr
    name: str | None
    plan: str
    emailVerified: bool
    createdAt: datetime


class AuthResult(BaseModel):
    user: UserOut
    tokens: TokenPair


class UpdateProfileRequest(BaseModel):
    name: str | None = Field(default=None, max_length=120)


class ChangePasswordRequest(BaseModel):
    currentPassword: str
    newPassword: str = Field(min_length=8, max_length=128)
