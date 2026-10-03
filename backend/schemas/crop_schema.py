from pydantic import BaseModel

class CropRequest(BaseModel):
    N: float
    P: float
    K: float
    temperature: float
    humidity: float
    ph: float
    rainfall: float


class CropResponse(BaseModel):
    recommended_crop: str