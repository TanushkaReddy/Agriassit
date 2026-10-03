from sqlalchemy.orm import Session

from models.user_model import User
from schemas.profile_schema import ProfileUpdate


def get_profile(db: Session, user_id: int):
    return (
        db.query(User)
        .filter(User.id == user_id)
        .first()
    )


def update_profile(
    db: Session,
    user_id: int,
    profile_data: ProfileUpdate
):
    user = (
        db.query(User)
        .filter(User.id == user_id)
        .first()
    )

    if user is None:
        return None

    user.full_name = profile_data.full_name
    user.phone = profile_data.phone
    user.state = profile_data.state
    user.district = profile_data.district
    user.preferred_language = profile_data.preferred_language

    db.commit()
    db.refresh(user)

    return user