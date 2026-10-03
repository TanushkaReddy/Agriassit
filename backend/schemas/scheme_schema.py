from pydantic import BaseModel, Field
from typing import List


class Scheme(BaseModel):
    id: str
    name: str
    level: str
    state: str
    category: str
    description: str
    benefits: str
    eligibility: str
    application_process: str
    official_url: str
    last_verified: str


class SchemeResponse(BaseModel):
    total: int
    schemes: List[Scheme]


class SchemeSearchRequest(BaseModel):
    state: str = Field(..., min_length=2)
    category: str | None = None