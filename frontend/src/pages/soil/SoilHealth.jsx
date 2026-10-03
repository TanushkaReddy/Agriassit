import { useState } from "react";
import toast from "react-hot-toast";
import {
  Sprout,
  RotateCcw,
  CheckCircle,
  AlertTriangle,
  Leaf,
} from "lucide-react";

import api from "../../services/api";

export default function SoilHealth() {
  const [formData, setFormData] = useState({
    nitrogen: "",
    phosphorus: "",
    potassium: "",
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
      formData.nitrogen === "" ||
      formData.phosphorus === "" ||
      formData.potassium === ""
    ) {
      toast.error("Please enter all soil nutrient values");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const response = await api.post("/soil/analyze", {
        nitrogen: Number(formData.nitrogen),
        phosphorus: Number(formData.phosphorus),
        potassium: Number(formData.potassium),
      });

      setResult(response.data);
      toast.success("Soil health analysis completed");
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.detail ||
          "Failed to analyze soil health"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      nitrogen: "",
      phosphorus: "",
      potassium: "",
    });

    setResult(null);
  };

  const getStatusStyle = (status) => {
    if (status === "Low") {
      return "bg-red-100 text-red-700 border-red-200";
    }

    if (status === "High") {
      return "bg-orange-100 text-orange-700 border-orange-200";
    }

    return "bg-green-100 text-green-700 border-green-200";
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <div className="flex items-center gap-3">
          <div className="p-3 bg-green-100 rounded-xl">
            <Sprout className="text-green-600" size={24} />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-slate-800">
              Soil Health
            </h1>

            <p className="text-slate-500 mt-1">
              Analyze soil nutrients and get health recommendations
            </p>
          </div>
        </div>
      </div>

      {/* Input Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">

        <div className="flex items-center gap-2 mb-5">
          <Leaf className="text-green-600" size={20} />

          <h2 className="text-lg font-semibold text-slate-800">
            Soil Nutrient Analysis
          </h2>
        </div>

        <form onSubmit={handleSubmit}>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

            {/* Nitrogen */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Nitrogen (N)
              </label>

              <input
                type="number"
                name="nitrogen"
                value={formData.nitrogen}
                onChange={handleChange}
                min="0"
                step="any"
                placeholder="Enter N value"
                className="w-full px-4 py-3 border border-slate-300 rounded-xl
                           focus:outline-none focus:ring-2 focus:ring-green-500
                           focus:border-transparent"
              />

              <p className="text-xs text-slate-400 mt-1">
                Unit: kg/ha
              </p>
            </div>

            {/* Phosphorus */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Phosphorus (P)
              </label>

              <input
                type="number"
                name="phosphorus"
                value={formData.phosphorus}
                onChange={handleChange}
                min="0"
                step="any"
                placeholder="Enter P value"
                className="w-full px-4 py-3 border border-slate-300 rounded-xl
                           focus:outline-none focus:ring-2 focus:ring-green-500
                           focus:border-transparent"
              />

              <p className="text-xs text-slate-400 mt-1">
                Unit: kg/ha
              </p>
            </div>

            {/* Potassium */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Potassium (K)
              </label>

              <input
                type="number"
                name="potassium"
                value={formData.potassium}
                onChange={handleChange}
                min="0"
                step="any"
                placeholder="Enter K value"
                className="w-full px-4 py-3 border border-slate-300 rounded-xl
                           focus:outline-none focus:ring-2 focus:ring-green-500
                           focus:border-transparent"
              />

              <p className="text-xs text-slate-400 mt-1">
                Unit: kg/ha
              </p>
            </div>

          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-3 mt-6">

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-green-600 text-white rounded-xl
                         font-medium hover:bg-green-700
                         disabled:opacity-60 disabled:cursor-not-allowed
                         transition"
            >
              {loading ? "Analyzing..." : "Analyze Soil"}
            </button>

            <button
              type="button"
              onClick={handleReset}
              className="px-6 py-3 border border-slate-300
                         text-slate-700 rounded-xl font-medium
                         hover:bg-slate-50 transition
                         flex items-center gap-2"
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

          {/* Overall Status */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">

            <div className="flex items-center gap-3">

              {result.overall_status === "Healthy" ||
              result.overall_status === "Nutrient Rich" ? (
                <CheckCircle
                  className="text-green-600"
                  size={28}
                />
              ) : (
                <AlertTriangle
                  className="text-orange-500"
                  size={28}
                />
              )}

              <div>
                <p className="text-sm text-slate-500">
                  Overall Soil Status
                </p>

                <h2 className="text-xl font-bold text-slate-800">
                  {result.overall_status}
                </h2>
              </div>

            </div>

            <p className="text-slate-600 mt-4">
              {result.overall_message}
            </p>

          </div>

          {/* Nutrient Analysis */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">

            <h2 className="text-lg font-semibold text-slate-800 mb-5">
              Nutrient Analysis
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

              {["N", "P", "K"].map((nutrient) => {

                const data = result.nutrients[nutrient];

                const names = {
                  N: "Nitrogen",
                  P: "Phosphorus",
                  K: "Potassium",
                };

                return (
                  <div
                    key={nutrient}
                    className="border border-slate-200 rounded-xl p-5"
                  >
                    <div className="flex justify-between items-start">

                      <div>
                        <p className="text-sm text-slate-500">
                          {names[nutrient]}
                        </p>

                        <p className="text-2xl font-bold text-slate-800 mt-1">
                          {data.value}
                        </p>

                        <p className="text-xs text-slate-400">
                          kg/ha
                        </p>
                      </div>

                      <span
                        className={`px-3 py-1 rounded-full text-xs
                                    font-semibold border
                                    ${getStatusStyle(data.status)}`}
                      >
                        {data.status}
                      </span>

                    </div>

                    <p className="text-sm text-slate-600 mt-4">
                      {data.recommendation}
                    </p>
                  </div>
                );
              })}

            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">

            <h2 className="text-lg font-semibold text-slate-800 mb-4">
              Soil Recommendations
            </h2>

            <div className="space-y-3">

              {result.recommendations.map(
                (recommendation, index) => (
                  <div
                    key={index}
                    className="flex gap-3 p-4 bg-green-50
                               border border-green-100 rounded-xl"
                  >
                    <CheckCircle
                      className="text-green-600 flex-shrink-0 mt-0.5"
                      size={18}
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