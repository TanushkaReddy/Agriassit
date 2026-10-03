from datetime import datetime
from pydantic import BaseModel
from typing import List, Optional


class PredictionCreate(BaseModel):
    prediction_type: str
    input_data: Optional[str] = None
    result: str


class PredictionResponse(BaseModel):
    id: int
    farmer_id: int
    prediction_type: str
    input_data: Optional[str] = None
    result: str
    created_at: Optional[datetime] = None


class PredictionHistoryResponse(BaseModel):
    total: int
    predictions: List[PredictionResponse]