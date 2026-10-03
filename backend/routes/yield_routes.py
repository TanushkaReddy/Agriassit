from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
import json

from database import get_db
from models.user_model import User

from schemas.yield_schema import (
    YieldRequest,
    YieldResponse
)

from schemas.prediction_schema import PredictionCreate

from ml.prediction.yield_prediction import (
    predict_yield,
    encoders
)

from services.auth_service import get_current_user
from services.prediction_service import create_prediction


router = APIRouter(
    prefix="/yield",
    tags=["Yield Prediction"]
)


@router.post(
    "/predict",
    response_model=YieldResponse
)
def predict(
    request: YieldRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    # 1. Run the existing ML model
    result = predict_yield(
        crop=request.crop,
        year=request.year,
        season=request.season,
        state=request.state,
        area=request.area,
        production=request.production,
        fertilizer=request.fertilizer,
        pesticide=request.pesticide
    )

    # 2. Automatically save prediction
    prediction_data = PredictionCreate(
        prediction_type="Yield Prediction",

        input_data=json.dumps({
            "crop": request.crop,
            "year": request.year,
            "season": request.season,
            "state": request.state,
            "area": request.area,
            "production": request.production,
            "fertilizer": request.fertilizer,
            "pesticide": request.pesticide
        }),

        result=str(result)
    )

    create_prediction(
        db=db,
        farmer_id=current_user.id,
        prediction_data=prediction_data
    )

    # 3. Return result to frontend
    return YieldResponse(
        predicted_yield=result
    )


@router.get("/options")
def get_yield_options():

    return {
        "crops": sorted(
            encoders["crop"].classes_.tolist()
        ),

        "seasons": sorted(
            [
                x.strip()
                for x in encoders["season"].classes_.tolist()
            ]
        ),

        "states": sorted(
            encoders["state"].classes_.tolist()
        )
    }