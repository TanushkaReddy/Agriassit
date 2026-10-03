from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
import json

from database import get_db

from schemas.fertilizer_schema import (
    FertilizerRequest,
    FertilizerResponse,
)

from schemas.prediction_schema import PredictionCreate
from services.prediction_service import create_prediction
from services.fertilizer_service import (
    recommend_fertilizer,
)

from services.auth_service import get_current_user


router = APIRouter(
    prefix="/fertilizer",
    tags=["Fertilizer Recommendation"],
)


@router.post(
    "/recommend",
    response_model=FertilizerResponse,
)
def fertilizer_recommendation(
    request: FertilizerRequest,
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db),
):

    # 1. Get fertilizer recommendation
    result = recommend_fertilizer(request)

    # 2. Automatically save it in predictions table
    prediction_data = PredictionCreate(
        prediction_type="Fertilizer Recommendation",

        input_data=json.dumps({
            "crop": request.crop,
            "nitrogen": request.nitrogen,
            "phosphorus": request.phosphorus,
            "potassium": request.potassium,
        }),

        # Store the complete recommendation
        result=json.dumps(result),
    )

    create_prediction(
        db=db,
        farmer_id=current_user.id,
        prediction_data=prediction_data,
    )

    # 3. Return the same result to frontend
    return FertilizerResponse(**result)