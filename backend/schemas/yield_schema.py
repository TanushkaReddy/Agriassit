from pydantic import BaseModel


class YieldRequest(BaseModel):
    crop: str
    year: int
    season: str
    state: str
    area: float
    production: float
    fertilizer: float
    pesticide: float


class YieldResponse(BaseModel):
    predicted_yield: float