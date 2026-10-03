from pydantic import BaseModel, EmailStr
from typing import Optional


class ProfileResponse(BaseModel):
    id: int
    full_name: str
    email: EmailStr
    phone: str
    state: str
    district: str
    preferred_language: Optional[str] = "English"


class ProfileUpdate(BaseModel):
    full_name: str
    phone: str
    state: str
    district: str
    preferred_language: Optional[str] = "English"