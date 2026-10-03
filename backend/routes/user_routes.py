from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database import get_db

from schemas.user_schema import UserRegister
from schemas.user_schema import UserLogin

from services.user_service import register_user
from services.user_service import login_user

router = APIRouter(
    prefix="/users",
    tags=["Users"]
)


@router.post("/register")
def register(
    user: UserRegister,
    db: Session = Depends(get_db)
):

    new_user = register_user(db, user)

    if new_user is None:

        raise HTTPException(
            status_code=400,
            detail="Email already exists"
        )

    return {
        "message": "User Registered Successfully"
    }


@router.post("/login")
def login(
    user: UserLogin,
    db: Session = Depends(get_db)
):

    result = login_user(
        db,
        user.email,
        user.password
    )

    if result is None:

        raise HTTPException(
            status_code=401,
            detail="Invalid Email or Password"
        )

    return result