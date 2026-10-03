from fastapi import APIRouter, Query

from schemas.insurance_schema import InsuranceResponse
from services.insurance_service import get_insurance_schemes


router = APIRouter(
    prefix="/insurance",
    tags=["Crop Insurance"]
)


@router.get("", response_model=InsuranceResponse)
def get_crop_insurance(
    state: str | None = Query(default=None),
    crop: str | None = Query(default=None)
):
    schemes = get_insurance_schemes(
        state=state,
        crop=crop
    )

    return {
        "total": len(schemes),
        "schemes": schemes
    }