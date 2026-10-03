import { useEffect, useState } from "react";
import { useWeather } from "../../context/WeatherContext";

import {
  CloudSun,
  Sprout,
  BarChart3,
  FlaskConical,
  History,
  Bot,
  TrendingUp,
  Droplets,
  Loader2,
} from "lucide-react";

import api from "../../services/api";

export default function Dashboard() {
  const { weather } = useWeather();

  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch dynamic dashboard data
  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await api.get("/dashboard");
        setDashboardData(response.data);
      } catch (error) {
        console.error("Dashboard error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  // Get fertilizer name from stored JSON result
  const getFertilizerName = () => {
    if (!dashboardData?.fertilizer) {
      return null;
    }

    try {
      const fertilizerData = JSON.parse(dashboardData.fertilizer);

      return (
        fertilizerData?.recommended_fertilizer?.name ||
        "Recommendation available"
      );
    } catch {
      return dashboardData.fertilizer;
    }
  };

  const fertilizerName = getFertilizerName();

  const cards = [
    {
      title: "Today's Weather",
      value: weather ? `${weather.temperature}°C` : "--",
      subtitle: weather
        ? `Humidity ${weather.humidity}%`
        : "Weather not available",
      icon: <CloudSun className="text-yellow-500" size={34} />,
      color: "from-yellow-100 to-orange-100",
    },
    {
      title: "Recommended Crop",
      value: dashboardData?.recommended_crop || "No prediction yet",
      subtitle: dashboardData?.recommended_crop
        ? "Latest crop recommendation"
        : "Make a crop recommendation",
      icon: <Sprout className="text-green-600" size={34} />,
      color: "from-green-100 to-green-50",
    },
    {
      title: "Predicted Yield",
      value: dashboardData?.predicted_yield
        ? `${Number(dashboardData.predicted_yield).toFixed(2)} T/Ha`
        : "No prediction yet",
      subtitle: dashboardData?.predicted_yield
        ? "Latest estimated yield"
        : "Make a yield prediction",
      icon: <BarChart3 className="text-blue-600" size={34} />,
      color: "from-blue-100 to-cyan-100",
    },
    {
      title: "Fertilizer",
      value: fertilizerName || "No prediction yet",
      subtitle: fertilizerName
        ? "Latest fertilizer recommendation"
        : "Get a fertilizer recommendation",
      icon: <FlaskConical className="text-purple-600" size={34} />,
      color: "from-purple-100 to-pink-100",
    },
  ];

  return (
    <div className="bg-slate-100 min-h-screen">

      {/* Heading */}

      <div className="mb-8">

        <h1 className="text-5xl font-bold text-slate-800">
          Welcome to AgriAssist 🌾
        </h1>

        <p className="text-slate-500 mt-2 text-lg">
          Smart Agriculture Decision Support Dashboard
        </p>

      </div>

      {/* Summary Cards */}

      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6">

        {cards.map((card, index) => (

          <div
            key={index}
            className={`rounded-3xl p-6 shadow-lg bg-gradient-to-br ${card.color} hover:scale-105 duration-300`}
          >

            <div className="flex justify-between">

              <div>

                <p className="text-gray-500">
                  {card.title}
                </p>

                <h2 className="text-3xl font-bold mt-2 break-words">
                  {card.value}
                </h2>

                <p className="mt-3 text-gray-600">
                  {card.subtitle}
                </p>

              </div>

              {card.icon}

            </div>

          </div>

        ))}

      </div>

      {/* Bottom Grid */}

      <div className="grid lg:grid-cols-3 gap-6 mt-8">

        {/* AI Advisor */}

        <div className="bg-white rounded-3xl shadow-lg p-6">

          <div className="flex items-center gap-3 mb-5">

            <Bot className="text-green-700" size={28} />

            <h2 className="text-2xl font-bold">
              AI Advisor
            </h2>

          </div>

          <div className="space-y-4">

            {dashboardData?.recommended_crop ? (
              <div className="bg-green-50 rounded-xl p-4">
                🌱 Latest recommended crop:{" "}
                <strong>{dashboardData.recommended_crop}</strong>
              </div>
            ) : (
              <div className="bg-green-50 rounded-xl p-4">
                🌱 Make a crop recommendation to receive farming insights.
              </div>
            )}

            {dashboardData?.predicted_yield ? (
              <div className="bg-blue-50 rounded-xl p-4">
                📈 Latest predicted yield:{" "}
                <strong>
                  {Number(dashboardData.predicted_yield).toFixed(2)} T/Ha
                </strong>
              </div>
            ) : (
              <div className="bg-blue-50 rounded-xl p-4">
                📈 Make a yield prediction to view yield insights.
              </div>
            )}

            {fertilizerName ? (
              <div className="bg-yellow-50 rounded-xl p-4">
                🧪 Latest fertilizer recommendation:{" "}
                <strong>{fertilizerName}</strong>
              </div>
            ) : (
              <div className="bg-yellow-50 rounded-xl p-4">
                🧪 Make a fertilizer recommendation to receive fertilizer
                guidance.
              </div>
            )}

          </div>

        </div>

        {/* Recent Predictions */}

        <div className="bg-white rounded-3xl shadow-lg p-6">

          <div className="flex items-center gap-3 mb-5">

            <History className="text-blue-600" size={28} />

            <h2 className="text-2xl font-bold">
              Recent Predictions
            </h2>

          </div>

          {loading ? (
            <div className="flex justify-center py-8">
              <Loader2
                className="animate-spin text-blue-600"
                size={30}
              />
            </div>
          ) : dashboardData?.recent_predictions?.length > 0 ? (

            <div className="space-y-4">

              {dashboardData.recent_predictions.map((prediction) => {

                let result = prediction.result;

                if (
                  prediction.prediction_type ===
                  "Fertilizer Recommendation"
                ) {
                  try {
                    const fertilizerData = JSON.parse(prediction.result);

                    result =
                      fertilizerData?.recommended_fertilizer?.name ||
                      "Recommendation";
                  } catch {
                    result = prediction.result;
                  }
                }

                if (
                  prediction.prediction_type ===
                  "Yield Prediction"
                ) {
                  result = `${Number(result).toFixed(2)} T/Ha`;
                }

                return (
                  <div
                    key={prediction.id}
                    className="border rounded-xl p-4"
                  >
                    {prediction.prediction_type ===
                      "Crop Recommendation" && "🌾"}

                    {prediction.prediction_type ===
                      "Yield Prediction" && "📈"}

                    {prediction.prediction_type ===
                      "Fertilizer Recommendation" && "🧪"}

                    {" "}
                    {prediction.prediction_type} -{" "}
                    <strong>{result}</strong>
                  </div>
                );
              })}

            </div>

          ) : (

            <div className="text-center py-8 text-gray-500">
              <History
                className="mx-auto mb-3 text-gray-300"
                size={40}
              />

              <p>No predictions yet.</p>

              <p className="text-sm mt-1">
                Your predictions will appear here.
              </p>
            </div>

          )}

        </div>

        {/* Farm Insights */}

        <div className="bg-white rounded-3xl shadow-lg p-6">

          <div className="flex items-center gap-3 mb-5">

            <TrendingUp
              className="text-green-700"
              size={28}
            />

            <h2 className="text-2xl font-bold">
              Farm Insights
            </h2>

          </div>

          <div className="space-y-5">

            <div className="bg-green-50 rounded-xl p-4">
              <p className="font-semibold text-green-800">
                Crop Recommendation
              </p>

              <p className="text-gray-600 mt-1">
                {dashboardData?.recommended_crop
                  ? `Latest recommendation: ${dashboardData.recommended_crop}`
                  : "No crop prediction available yet."}
              </p>
            </div>

            <div className="bg-blue-50 rounded-xl p-4">
              <p className="font-semibold text-blue-800">
                Yield Prediction
              </p>

              <p className="text-gray-600 mt-1">
                {dashboardData?.predicted_yield
                  ? `Estimated yield: ${Number(
                      dashboardData.predicted_yield
                    ).toFixed(2)} T/Ha`
                  : "No yield prediction available yet."}
              </p>
            </div>

            <div className="bg-purple-50 rounded-xl p-4">
              <p className="font-semibold text-purple-800">
                Fertilizer Recommendation
              </p>

              <p className="text-gray-600 mt-1">
                {fertilizerName
                  ? `Recommended: ${fertilizerName}`
                  : "No fertilizer recommendation available yet."}
              </p>
            </div>

          </div>

        </div>

      </div>

      {/* Bottom Banner */}

      <div className="mt-8 bg-gradient-to-r from-green-700 to-green-500 rounded-3xl p-8 text-white flex justify-between items-center">

        <div>

          <h2 className="text-3xl font-bold">
            Smart Farming Assistant
          </h2>

          <p className="mt-2">
            AI-powered recommendations for healthier crops and higher yields.
          </p>

        </div>

        <Droplets size={70} />

      </div>

    </div>
  );
}