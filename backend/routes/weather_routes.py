from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database import get_db
from models.user_model import User

from schemas.weather_schema import (
    LocationRequest,
    WeatherResponse
)

from services.auth_service import get_current_user

from services.weather_service import (
    fetch_live_weather,
    fetch_weather_by_coordinates
)

from services.weather_cache import (
    get_cached_weather,
    save_weather
)

router = APIRouter(
    prefix="/weather",
    tags=["Weather"]
)


# =====================================================
# Dashboard Weather (Fallback using Profile Location)
# =====================================================
@router.get(
    "/dashboard",
    response_model=WeatherResponse
)
def dashboard_weather(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    weather = get_cached_weather(current_user.id)

    if weather:
        return weather

    weather = fetch_live_weather(
        current_user.district,
        current_user.state
    )

    if weather is None:
        raise HTTPException(
            status_code=404,
            detail="Unable to fetch weather."
        )

    save_weather(
        current_user.id,
        weather
    )

    return weather


# =====================================================
# Live Weather using GPS Coordinates
# =====================================================
@router.post(
    "/location",
    response_model=WeatherResponse
)
def location_weather(
    request: LocationRequest
):

    weather = fetch_weather_by_coordinates(
        request.latitude,
        request.longitude
    )

    if weather is None:
        raise HTTPException(
            status_code=404,
            detail="Unable to fetch weather."
        )

    return weather