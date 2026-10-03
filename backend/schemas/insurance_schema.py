from pydantic import BaseModel
from typing import List


class InsuranceScheme(BaseModel):
    id: str
    name: str
    crop: str
    state: str
    coverage: str
    premium: str
    eligibility: str
    benefits: List[str]
    application_process: str
    official_url: str


class InsuranceResponse(BaseModel):
    total: int
    schemes: List[InsuranceScheme]