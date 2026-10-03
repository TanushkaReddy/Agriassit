from fastapi import APIRouter
from schemas.soil_schema import SoilHealthRequest, SoilHealthResponse
from services.soil_service import analyze_soil_health


router = APIRouter(
    prefix="/soil",
    tags=["Soil Health"]
)


@router.post(
    "/analyze",
    response_model=SoilHealthResponse
)
def analyze_soil(request: SoilHealthRequest):

    result = analyze_soil_health(
        nitrogen=request.nitrogen,
        phosphorus=request.phosphorus,
        potassium=request.potassium
    )

    return result