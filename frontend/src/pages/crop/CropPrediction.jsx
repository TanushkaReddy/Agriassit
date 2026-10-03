import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { predictCrop } from "../../services/cropService";

import { useWeather } from "../../context/WeatherContext";

import WeatherSourcePopup from "../../components/weather/WeatherSourcePopup";
import CropForm from "../../components/crop/CropForm";
import CropResult from "../../components/crop/CropResult";

export default function CropPrediction() {

  const { weather } = useWeather();

  const [weatherMode, setWeatherMode] = useState(null);

  const [showPopup, setShowPopup] = useState(true);

  const [weatherData, setWeatherData] = useState(null);

  const [loading, setLoading] = useState(false);

  const [result, setResult] = useState("");

  //-----------------------------------------------------
  // Use Live Weather
  //-----------------------------------------------------

  useEffect(() => {

    if (
      weatherMode === "live" &&
      weather
    ) {

      // Only temperature and humidity
      // are taken from live weather.
      // Rainfall must be entered manually.

      setWeatherData({
        temperature: weather.temperature,
        humidity: weather.humidity,
        rainfall: "",
      });

      toast.success(
        "Live temperature and humidity loaded."
      );

    }

  }, [weatherMode, weather]);

  //-----------------------------------------------------
  // User Selected Live Weather
  //-----------------------------------------------------

  const handleLiveWeather = () => {

    setWeatherMode("live");

    setShowPopup(false);

  };

  //-----------------------------------------------------
  // User Selected Manual Weather
  //-----------------------------------------------------

  const handleManualWeather = () => {

    setWeatherMode("manual");

    setWeatherData(null);

    setShowPopup(false);

  };

  //-----------------------------------------------------
  // Prediction
  //-----------------------------------------------------

  const handlePrediction = async (data) => {

    try {

      setLoading(true);

      const response =
        await predictCrop(data);

      setResult(
        response.recommended_crop
      );

      toast.success(
        "Prediction Successful!"
      );

    }

    catch (err) {

      console.log(err);

      toast.error(
        "Prediction Failed."
      );

    }

    finally {

      setLoading(false);

    }

  };

  //-----------------------------------------------------
  // Reset
  //-----------------------------------------------------

  const handleReset = () => {

    setResult("");

    setWeatherMode(null);

    setWeatherData(null);

    setShowPopup(true);

  };

  return (

    <div className="min-h-screen bg-slate-100 p-8">

      {showPopup && (

        <WeatherSourcePopup
          onLive={handleLiveWeather}
          onManual={handleManualWeather}
        />

      )}

      <div className="max-w-6xl mx-auto">

        <div className="mb-8">

          <h1 className="text-5xl font-bold text-green-700">

            🌾 Crop Recommendation

          </h1>

          <p className="text-gray-500 mt-3 text-lg">

            Predict the most suitable crop
            based on soil nutrients and
            weather conditions.

          </p>

        </div>

        {!result ? (

          <CropForm
            weatherMode={weatherMode}
            weatherData={weatherData}
            onSubmit={handlePrediction}
            loading={loading}
          />

        ) : (

          <CropResult
            result={result}
            onReset={handleReset}
          />

        )}

      </div>

    </div>

  );

}