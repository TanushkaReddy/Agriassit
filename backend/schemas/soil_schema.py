from typing import Dict, List
from pydantic import BaseModel, Field


# ============================================================
# Soil Health Request
# ============================================================

class SoilHealthRequest(BaseModel):
    nitrogen: float = Field(
        ...,
        ge=0,
        description="Nitrogen content in kg/ha"
    )

    phosphorus: float = Field(
        ...,
        ge=0,
        description="Phosphorus content in kg/ha"
    )

    potassium: float = Field(
        ...,
        ge=0,
        description="Potassium content in kg/ha"
    )


# ============================================================
# Nutrient Analysis
# ============================================================

class NutrientAnalysis(BaseModel):
    value: float
    status: str
    recommendation: str


# ============================================================
# Soil Health Response
# ============================================================

class SoilHealthResponse(BaseModel):
    overall_status: str
    overall_message: str

    nutrients: Dict[str, NutrientAnalysis]

    recommendations: List[str]