from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import get_db
from models.user_model import User
from services.auth_service import get_current_user
from services.prediction_service import get_prediction_history


router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)


@router.get("")
def get_dashboard(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    predictions = get_prediction_history(
        db=db,
        farmer_id=current_user.id
    )

    crop_prediction = next(
        (
            p for p in predictions
            if p.prediction_type == "Crop Recommendation"
        ),
        None
    )

    yield_prediction = next(
        (
            p for p in predictions
            if p.prediction_type == "Yield Prediction"
        ),
        None
    )

    fertilizer_prediction = next(
        (
            p for p in predictions
            if p.prediction_type == "Fertilizer Recommendation"
        ),
        None
    )

    return {
        "recommended_crop": (
            crop_prediction.result
            if crop_prediction
            else None
        ),

        "predicted_yield": (
            yield_prediction.result
            if yield_prediction
            else None
        ),

        "fertilizer": (
            fertilizer_prediction.result
            if fertilizer_prediction
            else None
        ),

        "recent_predictions": [
            {
                "id": prediction.id,
                "prediction_type": prediction.prediction_type,
                "result": prediction.result,
                "created_at": prediction.created_at
            }
            for prediction in predictions[:5]
        ]
    }