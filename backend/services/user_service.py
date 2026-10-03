from sqlalchemy.orm import Session
from models.user_model import User
from schemas.user_schema import UserRegister
from passlib.context import CryptContext
from services.auth_service import verify_password, create_access_token

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


# -------------------------
# Register User
# -------------------------
def register_user(db: Session, user: UserRegister):

    # Check if email already exists
    existing_email = db.query(User).filter(User.email == user.email).first()
    if existing_email:
        return None

    # Check if phone already exists
    existing_phone = db.query(User).filter(User.phone == user.phone).first()
    if existing_phone:
        return None

    # Hash Password
    hashed_password = pwd_context.hash(user.password)

    # Create User
    new_user = User(
        full_name=user.full_name,
        email=user.email,
        phone=user.phone,
        password=hashed_password,
        state=user.state,
        district=user.district,
        preferred_language=user.preferred_language,
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user


# -------------------------
# Login User
# -------------------------
def login_user(db: Session, email: str, password: str):

    user = db.query(User).filter(User.email == email).first()

    if not user:
        return None

    if not verify_password(password, user.password):
        return None

    access_token = create_access_token(
        data={
            "sub": user.email,
            "user_id": user.id
        }
    )

    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": {
            "id": user.id,
            "full_name": user.full_name,
            "email": user.email,
            "phone": user.phone,
            "state": user.state,
            "district": user.district,
            "preferred_language": user.preferred_language
        }
    }