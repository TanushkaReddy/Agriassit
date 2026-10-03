from pydantic import BaseModel


class LocationRequest(BaseModel):
    latitude: float
    longitude: float


class WeatherResponse(BaseModel):
    temperature: float
    humidity: float