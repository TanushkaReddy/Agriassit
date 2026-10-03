import os
import requests
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("OPENWEATHER_API_KEY")


# ---------------------------------------------------
# Fetch Weather using State & District
# ---------------------------------------------------

def fetch_live_weather(city: str, state: str):

    url = (
        "https://api.openweathermap.org/data/2.5/weather"
        f"?q={city},{state},IN"
        f"&appid={API_KEY}"
        f"&units=metric"
    )

    response = requests.get(url)

    if response.status_code != 200:
        return None

    data = response.json()

    return {
        "temperature": round(
            data["main"]["temp"],
            1
        ),
        "humidity": data["main"]["humidity"],
    }


# ---------------------------------------------------
# Fetch Weather using GPS Coordinates
# ---------------------------------------------------

def fetch_weather_by_coordinates(
    latitude: float,
    longitude: float
):

    url = (
        "https://api.openweathermap.org/data/2.5/weather"
        f"?lat={latitude}"
        f"&lon={longitude}"
        f"&appid={API_KEY}"
        f"&units=metric"
    )

    response = requests.get(url)

    if response.status_code != 200:
        return None

    data = response.json()

    return {
        "temperature": round(
            data["main"]["temp"],
            1
        ),
        "humidity": data["main"]["humidity"],
    }