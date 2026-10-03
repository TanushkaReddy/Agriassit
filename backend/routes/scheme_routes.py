from fastapi import APIRouter, Query

from schemas.scheme_schema import SchemeResponse
from services.scheme_service import get_schemes


router = APIRouter(
    prefix="/schemes",
    tags=["Government Schemes"]
)


@router.get("", response_model=SchemeResponse)
def get_government_schemes(
    state: str | None = Query(default=None),
    category: str | None = Query(default=None)
):
    schemes = get_schemes(
        state=state,
        category=category
    )

    return {
        "total": len(schemes),
        "schemes": schemes
    }