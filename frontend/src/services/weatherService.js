import api from "./api";

export const getDashboardWeather = async () => {
  const response = await api.get("/weather/dashboard");
  return response.data;
};

export const getWeatherByCoordinates = async (latitude, longitude) => {
  const response = await api.post("/weather/location", {
    latitude,
    longitude,
  });

  return response.data;
};