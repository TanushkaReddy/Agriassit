from pydantic import BaseModel, EmailStr

class UserRegister(BaseModel):
    full_name: str
    email: EmailStr
    phone: str
    password: str
    state: str
    district: str
    preferred_language: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str