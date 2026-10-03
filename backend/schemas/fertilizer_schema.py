from typing import List, Dict
from pydantic import BaseModel, Field


# ============================================================
# Request Schema
# ============================================================

class FertilizerRequest(BaseModel):

    crop: str = Field(
        ...,
        example="Rice"
    )

    nitrogen: float = Field(
        ...,
        ge=0,
        example=80
    )

    phosphorus: float = Field(
        ...,
        ge=0,
        example=25
    )

    potassium: float = Field(
        ...,
        ge=0,
        example=40
    )


# ============================================================
# Recommended Fertilizer
# ============================================================

class RecommendedFertilizer(BaseModel):

    name: str

    type: str


# ============================================================
# Final Fertilizer Response
# ============================================================

class FertilizerResponse(BaseModel):

    recommended_fertilizer: RecommendedFertilizer

    reason: str

    deficiency: Dict[str, float]

    dosage: str

    application_timing: List[str]

    application_method: List[str]

    benefits: List[str]

    precautions: List[str]