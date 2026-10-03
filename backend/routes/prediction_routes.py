from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database import get_db
from models.user_model import User

from schemas.prediction_schema import (
    PredictionCreate,
    PredictionResponse,
    PredictionHistoryResponse,
)

from services.auth_service import get_current_user

from services.prediction_service import (
    create_prediction,
    get_prediction_history,
    delete_prediction,
)


router = APIRouter(
    prefix="/predictions",
    tags=["Prediction History"]
)


# -----------------------------------------------------
# Save Prediction
# -----------------------------------------------------

@router.post(
    "",
    response_model=PredictionResponse
)
def save_prediction(
    prediction_data: PredictionCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    return create_prediction(
        db=db,
        farmer_id=current_user.id,
        prediction_data=prediction_data
    )


# -----------------------------------------------------
# Get Logged-in Farmer's Prediction History
# -----------------------------------------------------

@router.get(
    "",
    response_model=PredictionHistoryResponse
)
def prediction_history(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    predictions = get_prediction_history(
        db=db,
        farmer_id=current_user.id
    )

    return {
        "total": len(predictions),
        "predictions": predictions
    }


# -----------------------------------------------------
# Delete Prediction History Record
# -----------------------------------------------------

@router.delete("/{prediction_id}")
def remove_prediction(
    prediction_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    deleted = delete_prediction(
        db=db,
        farmer_id=current_user.id,
        prediction_id=prediction_id
    )

    if not deleted:
        raise HTTPException(
            status_code=404,
            detail="Prediction not found"
        )

    return {
        "message": "Prediction deleted successfully"
    }