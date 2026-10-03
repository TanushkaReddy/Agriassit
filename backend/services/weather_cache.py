from datetime import datetime, timedelta

# In-memory weather cache
weather_cache = {}

# Cache weather for 30 minutes
CACHE_DURATION = timedelta(minutes=30)


# -----------------------------------------
# Save Weather
# -----------------------------------------
def save_weather(user_id, weather_data):

    weather_cache[user_id] = {
        "data": weather_data,
        "time": datetime.now()
    }


# -----------------------------------------
# Get Cached Weather
# -----------------------------------------
def get_cached_weather(user_id):

    cached = weather_cache.get(user_id)

    if cached is None:
        return None

    # Cache expired
    if datetime.now() - cached["time"] >= CACHE_DURATION:
        weather_cache.pop(user_id, None)
        return None

    return cached["data"]


# -----------------------------------------
# Clear Cache
# -----------------------------------------
def clear_weather_cache(user_id):

    weather_cache.pop(user_id, None)