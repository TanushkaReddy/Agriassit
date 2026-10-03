from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.sql import func
from database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)

    full_name = Column(String(100), nullable=False)

    email = Column(String(120), unique=True, nullable=False)

    phone = Column(String(15), unique=True, nullable=False)

    password = Column(String(255), nullable=False)

    state = Column(String(100), nullable=False)

    district = Column(String(100), nullable=False)

    preferred_language = Column(String(50), default="English")

    role = Column(String(20), default="Farmer")

    created_at = Column(DateTime(timezone=True), server_default=func.now())
