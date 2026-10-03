from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
import json

from database import get_db
from models.user_model import User

from schemas.crop_schema import CropRequest, CropResponse
from schemas.prediction_schema import PredictionCreate

from ml.prediction.crop_prediction import predict_crop

from services.auth_service import get_current_user
from services.prediction_service import create_prediction


router = APIRouter(
    prefix="/crop",
    tags=["Crop Recommendation"]
)


@router.post("/predict", response_model=CropResponse)
def recommend_crop(
    data: CropRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    # Run crop prediction
    crop = predict_crop(
        data.N,
        data.P,
        data.K,
        data.temperature,
        data.humidity,
        data.ph,
        data.rainfall
    )

    # Automatically save prediction in database
    prediction_data = PredictionCreate(
        prediction_type="Crop Recommendation",
        input_data=json.dumps({
            "N": data.N,
            "P": data.P,
            "K": data.K,
            "temperature": data.temperature,
            "humidity": data.humidity,
            "ph": data.ph,
            "rainfall": data.rainfall
        }),
        result=crop
    )

    create_prediction(
        db=db,
        farmer_id=current_user.id,
        prediction_data=prediction_data
    )

    return CropResponse(
        recommended_crop=crop
    )