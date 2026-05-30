"""Database engine, session, and declarative base."""
from collections.abc import Generator
import logging

from sqlalchemy import create_engine
from sqlalchemy.orm import DeclarativeBase, sessionmaker, Session

from app.config import settings

logger = logging.getLogger(__name__)

_url = settings.database_url

if _url.startswith("postgresql"):
    # Production: PostgreSQL (Supabase or Render)
    engine = create_engine(
        _url,
        pool_pre_ping=True,
        pool_size=5,
        max_overflow=10,
    )
    logger.info("Using PostgreSQL database")
else:
    # Fallback: SQLite (Render free tier / local dev without Docker)
    import os
    _sqlite_path = os.path.join(os.path.dirname(__file__), "..", "..", "injsight.db")
    engine = create_engine(
        f"sqlite:///{_sqlite_path}",
        connect_args={"check_same_thread": False},
    )
    logger.warning("PostgreSQL not configured — using SQLite fallback at %s", _sqlite_path)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


class Base(DeclarativeBase):
    pass


def get_db() -> Generator[Session, None, None]:
    """FastAPI dependency that yields a database session."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
