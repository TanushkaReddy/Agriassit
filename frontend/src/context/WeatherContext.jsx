import { createContext, useContext, useState } from "react";

const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const [weather, setWeather] = useState(null);

  const [locationAllowed, setLocationAllowed] = useState(false);

  const [loadingWeather, setLoadingWeather] = useState(false);

  return (
    <WeatherContext.Provider
      value={{
        weather,
        setWeather,
        locationAllowed,
        setLocationAllowed,
        loadingWeather,
        setLoadingWeather,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = () => useContext(WeatherContext);