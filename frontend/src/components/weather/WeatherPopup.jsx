import { useState } from "react";
import {
  MapPin,
  Loader2,
  MapPinned,
} from "lucide-react";
import toast from "react-hot-toast";

import { useWeather } from "../../context/WeatherContext";

import {
  getDashboardWeather,
  getWeatherByCoordinates,
} from "../../services/weatherService";

export default function WeatherPopup({ onClose }) {

  const {
    setWeather,
    setLocationAllowed,
    setLoadingWeather,
  } = useWeather();

  const [loading, setLoading] = useState(false);

  //----------------------------------------------------
  // Allow GPS
  //----------------------------------------------------

  const handleAllow = () => {

    if (!navigator.geolocation) {

      toast.error(
        "Geolocation is not supported by your browser."
      );

      return;
    }

    setLoading(true);
    setLoadingWeather(true);

    navigator.geolocation.getCurrentPosition(

      async (position) => {

        try {

          const latitude =
            position.coords.latitude;

          const longitude =
            position.coords.longitude;

          const weather =
            await getWeatherByCoordinates(
              latitude,
              longitude
            );

          if (!weather) {
            throw new Error(
              "Weather data not received."
            );
          }

          setWeather({
            temperature: weather.temperature,
            humidity: weather.humidity,
          });

          setLocationAllowed(true);

          toast.success(
            "Live weather fetched successfully."
          );

          onClose();

        }

        catch (err) {

          console.error(
            "GPS weather error:",
            err
          );

          toast.error(
            "Unable to fetch live weather."
          );

        }

        finally {

          setLoading(false);
          setLoadingWeather(false);

        }

      },

      async (error) => {

        console.error(
          "Location permission error:",
          error
        );

        try {

          toast(
            "Location permission denied. Using profile location."
          );

          const weather =
            await getDashboardWeather();

          if (!weather) {
            throw new Error(
              "Profile weather data not received."
            );
          }

          setWeather({
            temperature: weather.temperature,
            humidity: weather.humidity,
          });

          setLocationAllowed(false);

          onClose();

        }

        catch (err) {

          console.error(
            "Profile weather error:",
            err
          );

          toast.error(
            "Unable to fetch weather."
          );

        }

        finally {

          setLoading(false);
          setLoadingWeather(false);

        }

      }

    );

  };

  //----------------------------------------------------
  // Continue Using Profile Location
  //----------------------------------------------------

  const handleSkip = async () => {

    try {

      setLoading(true);
      setLoadingWeather(true);

      const weather =
        await getDashboardWeather();

      if (!weather) {
        throw new Error(
          "Profile weather data not received."
        );
      }

      setWeather({
        temperature: weather.temperature,
        humidity: weather.humidity,
      });

      setLocationAllowed(false);

      toast.success(
        "Using profile location."
      );

      onClose();

    }

    catch (err) {

      console.error(
        "Profile location weather error:",
        err
      );

      toast.error(
        "Unable to fetch weather."
      );

    }

    finally {

      setLoading(false);
      setLoadingWeather(false);

    }

  };

  //----------------------------------------------------
  // UI
  //----------------------------------------------------

  return (

    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

      <div className="bg-white rounded-3xl shadow-2xl w-[470px] p-8">

        {/* Icon */}

        <div className="flex justify-center">

          <div className="bg-green-100 rounded-full p-5">

            <MapPinned
              className="text-green-700"
              size={45}
            />

          </div>

        </div>

        {/* Heading */}

        <h2 className="text-3xl font-bold text-center mt-6">

          Allow Location Access

        </h2>

        {/* Description */}

        <p className="text-center text-gray-500 mt-4">

          AgriAssist uses your current location
          to fetch live weather data for more
          accurate crop recommendations and
          yield prediction.

        </p>

        {/* Buttons */}

        <div className="mt-10 space-y-4">

          {/* GPS Button */}

          <button
            onClick={handleAllow}
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-3 disabled:opacity-60"
          >

            {loading ? (

              <Loader2
                className="animate-spin"
                size={20}
              />

            ) : (

              <>

                <MapPin size={20} />

                Allow Current Location

              </>

            )}

          </button>

          {/* Profile Location */}

          <button
            onClick={handleSkip}
            disabled={loading}
            className="w-full border py-4 rounded-xl hover:bg-gray-100 font-medium disabled:opacity-60"
          >

            Continue using Profile Location

          </button>

        </div>

      </div>

    </div>

  );

}