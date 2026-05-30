"""Application configuration loaded from environment variables."""
from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    # Database — PostgreSQL preferred; SQLite used as fallback if not set
    database_url: str = "sqlite:///./injsight.db"

    # Auth
    jwt_secret: str = "change-me-in-production"
    jwt_algorithm: str = "HS256"
    access_token_expire_minutes: int = 30
    refresh_token_expire_days: int = 7

    # CORS
    cors_origins: str = "http://localhost:3000"

    # Rate limiting (anonymous public analysis)
    public_analysis_limit: int = 10
    public_analysis_window_seconds: int = 3600

    service_name: str = "injsight-ai-api"

    # ── AI providers ──────────────────────────────────────────────────────────
    anthropic_api_key: str   = ""
    openrouter_api_key: str  = ""          # Primary AI — OpenRouter
    # OpenRouter model overrides
    openrouter_analysis_model: str = "meta-llama/llama-3.3-70b-instruct"
    openrouter_chat_model: str     = "meta-llama/llama-3.3-70b-instruct"

    # ── Supabase ───────────────────────────────────────────────────────────────
    supabase_url: str         = ""
    supabase_anon_key: str    = ""
    supabase_service_key: str = ""         # Needed for admin operations

    # ── Injective LCD REST API ─────────────────────────────────────────────────
    injective_lcd_url: str = "https://lcd.injective.network"

    # ── CoinGecko ──────────────────────────────────────────────────────────────
    coingecko_api_url: str = "https://api.coingecko.com/api/v3"

    @property
    def ai_provider(self) -> str:
        """Return which AI provider is active."""
        if self.openrouter_api_key:
            return "openrouter"
        if self.anthropic_api_key:
            return "anthropic"
        return "rule-based"

    @property
    def cors_origin_list(self) -> list[str]:
        return [o.strip() for o in self.cors_origins.split(",") if o.strip()]


@lru_cache
def get_settings() -> Settings:
    return Settings()


settings = get_settings()
