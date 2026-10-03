from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database import get_db
from models.user_model import User
from schemas.profile_schema import ProfileResponse, ProfileUpdate
from services.auth_service import get_current_user
from services.profile_service import get_profile, update_profile


router = APIRouter(
    prefix="/profile",
    tags=["Farmer Profile"]
)


@router.get(
    "",
    response_model=ProfileResponse
)
def get_farmer_profile(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    profile = get_profile(
        db=db,
        user_id=current_user.id
    )

    if profile is None:
        raise HTTPException(
            status_code=404,
            detail="Profile not found"
        )

    return profile


@router.put(
    "",
    response_model=ProfileResponse
)
def update_farmer_profile(
    profile_data: ProfileUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    profile = update_profile(
        db=db,
        user_id=current_user.id,
        profile_data=profile_data
    )

    if profile is None:
        raise HTTPException(
            status_code=404,
            detail="Profile not found"
        )

    return profile