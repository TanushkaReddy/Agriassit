from sqlalchemy.orm import Session

from models.prediction_model import Prediction
from schemas.prediction_schema import PredictionCreate


def create_prediction(
    db: Session,
    farmer_id: int,
    prediction_data: PredictionCreate
):
    prediction = Prediction(
        farmer_id=farmer_id,
        prediction_type=prediction_data.prediction_type,
        input_data=prediction_data.input_data,
        result=prediction_data.result
    )

    db.add(prediction)
    db.commit()
    db.refresh(prediction)

    return prediction


def get_prediction_history(
    db: Session,
    farmer_id: int
):
    return (
        db.query(Prediction)
        .filter(Prediction.farmer_id == farmer_id)
        .order_by(Prediction.created_at.desc())
        .all()
    )


def delete_prediction(
    db: Session,
    farmer_id: int,
    prediction_id: int
):
    prediction = (
        db.query(Prediction)
        .filter(
            Prediction.id == prediction_id,
            Prediction.farmer_id == farmer_id
        )
        .first()
    )

    if prediction is None:
        return False

    db.delete(prediction)
    db.commit()

    return True