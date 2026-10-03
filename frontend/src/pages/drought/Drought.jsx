import { useState } from "react";
import toast from "react-hot-toast";
import {
  CloudSun,
  Thermometer,
  Droplets,
  CloudRain,
  Sprout,
  AlertTriangle,
  CheckCircle,
  RotateCcw,
} from "lucide-react";

import api from "../../services/api";

export default function Drought() {
  const [formData, setFormData] = useState({
    temperature: "",
    humidity: "",
    rainfall: "",
    soil_moisture: "",
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      formData.temperature === "" ||
      formData.humidity === "" ||
      formData.rainfall === "" ||
      formData.soil_moisture === ""
    ) {
      toast.error("Please enter all values");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const response = await api.post("/drought/assess", {
        temperature: Number(formData.temperature),
        humidity: Number(formData.humidity),
        rainfall: Number(formData.rainfall),
        soil_moisture: Number(formData.soil_moisture),
      });

      setResult(response.data);

      toast.success("Drought risk assessment completed");
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.detail ||
          "Failed to assess drought risk"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      temperature: "",
      humidity: "",
      rainfall: "",
      soil_moisture: "",
    });

    setResult(null);
  };

  const getRiskStyle = (risk) => {
    if (risk === "High") {
      return "bg-red-100 text-red-700 border-red-200";
    }

    if (risk === "Medium") {
      return "bg-yellow-100 text-yellow-700 border-yellow-200";
    }

    return "bg-green-100 text-green-700 border-green-200";
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-3 bg-blue-100 rounded-xl">
          <CloudSun
            size={26}
            className="text-blue-600"
          />
        </div>

        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Drought Risk Assessment
          </h1>

          <p className="text-slate-500 mt-1">
            Assess drought risk using weather and soil moisture conditions
          </p>
        </div>
      </div>

      {/* Input Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">

        <h2 className="text-lg font-semibold text-slate-800 mb-5">
          Environmental Conditions
        </h2>

        <form onSubmit={handleSubmit}>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            {/* Temperature */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2">
                <Thermometer size={17} />
                Temperature (°C)
              </label>

              <input
                type="number"
                name="temperature"
                value={formData.temperature}
                onChange={handleChange}
                step="any"
                placeholder="Enter temperature"
                className="w-full px-4 py-3 border border-slate-300 rounded-xl
                           focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Humidity */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2">
                <Droplets size={17} />
                Humidity (%)
              </label>

              <input
                type="number"
                name="humidity"
                value={formData.humidity}
                onChange={handleChange}
                min="0"
                max="100"
                step="any"
                placeholder="Enter humidity"
                className="w-full px-4 py-3 border border-slate-300 rounded-xl
                           focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Rainfall */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2">
                <CloudRain size={17} />
                Rainfall (mm)
              </label>

              <input
                type="number"
                name="rainfall"
                value={formData.rainfall}
                onChange={handleChange}
                min="0"
                step="any"
                placeholder="Enter rainfall"
                className="w-full px-4 py-3 border border-slate-300 rounded-xl
                           focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Soil Moisture */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2">
                <Sprout size={17} />
                Soil Moisture (%)
              </label>

              <input
                type="number"
                name="soil_moisture"
                value={formData.soil_moisture}
                onChange={handleChange}
                min="0"
                max="100"
                step="any"
                placeholder="Enter soil moisture"
                className="w-full px-4 py-3 border border-slate-300 rounded-xl
                           focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

          </div>

          {/* Buttons */}
          <div className="flex gap-3 mt-6">

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-blue-600 text-white rounded-xl
                         font-medium hover:bg-blue-700
                         disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Assessing..." : "Assess Drought Risk"}
            </button>

            <button
              type="button"
              onClick={handleReset}
              className="px-6 py-3 border border-slate-300
                         text-slate-700 rounded-xl font-medium
                         hover:bg-slate-50 flex items-center gap-2"
            >
              <RotateCcw size={17} />
              Reset
            </button>

          </div>

        </form>
      </div>

      {/* Result */}
      {result && (
        <div className="space-y-5">

          {/* Risk Summary */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">

            <div className="flex items-center justify-between flex-wrap gap-4">

              <div className="flex items-center gap-3">

                {result.risk_level === "Low" ? (
                  <CheckCircle
                    size={30}
                    className="text-green-600"
                  />
                ) : (
                  <AlertTriangle
                    size={30}
                    className="text-yellow-500"
                  />
                )}

                <div>
                  <p className="text-sm text-slate-500">
                    Drought Risk Level
                  </p>

                  <h2 className="text-2xl font-bold text-slate-800">
                    {result.risk_level}
                  </h2>
                </div>

              </div>

              <span
                className={`px-4 py-2 rounded-full border font-semibold
                  ${getRiskStyle(result.risk_level)}`}
              >
                Risk Score: {result.risk_score}
              </span>

            </div>

            <p className="text-slate-600 mt-5">
              {result.message}
            </p>

          </div>

          {/* Recommendations */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">

            <h2 className="text-lg font-semibold text-slate-800 mb-4">
              Recommended Actions
            </h2>

            <div className="space-y-3">

              {result.recommendations.map(
                (recommendation, index) => (
                  <div
                    key={index}
                    className="flex gap-3 p-4 bg-blue-50
                               border border-blue-100 rounded-xl"
                  >
                    <CheckCircle
                      size={18}
                      className="text-blue-600 flex-shrink-0 mt-0.5"
                    />

                    <p className="text-sm text-slate-700">
                      {recommendation}
                    </p>
                  </div>
                )
              )}

            </div>

          </div>

        </div>
      )}

    </div>
  );
}