import { useState } from "react";
import toast from "react-hot-toast";

import {
  FlaskConical,
  Sprout,
  Droplets,
  Clock,
  ListChecks,
  ShieldAlert,
  RotateCcw,
} from "lucide-react";

import api from "../../services/api";

export default function Fertilizer() {
  // ----------------------------------------------------
  // Form State
  // ----------------------------------------------------

  const [formData, setFormData] = useState({
    crop: "",
    nitrogen: "",
    phosphorus: "",
    potassium: "",
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  // ----------------------------------------------------
  // Handle Input Changes
  // ----------------------------------------------------

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ----------------------------------------------------
  // Submit Recommendation
  // ----------------------------------------------------

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.crop ||
      formData.nitrogen === "" ||
      formData.phosphorus === "" ||
      formData.potassium === ""
    ) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);
      setResult(null);

      const response = await api.post("/fertilizer/recommend", {
        crop: formData.crop,
        nitrogen: Number(formData.nitrogen),
        phosphorus: Number(formData.phosphorus),
        potassium: Number(formData.potassium),
      });

      setResult(response.data);

      toast.success("Fertilizer recommendation generated.");
    } catch (error) {
      console.error("Fertilizer recommendation error:", error);

      const message =
        error.response?.data?.detail ||
        "Unable to generate fertilizer recommendation.";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  // ----------------------------------------------------
  // Reset
  // ----------------------------------------------------

  const handleReset = () => {
    setFormData({
      crop: "",
      nitrogen: "",
      phosphorus: "",
      potassium: "",
    });

    setResult(null);
  };

  // ----------------------------------------------------
  // Render
  // ----------------------------------------------------

  return (
    <div className="min-h-screen bg-slate-100 p-8">

      <div className="max-w-7xl mx-auto">

        {/* ================================================= */}
        {/* HEADER */}
        {/* ================================================= */}

        <div className="mb-8">

          <div className="flex items-center gap-4">

            <div className="bg-green-100 p-4 rounded-2xl">
              <FlaskConical
                className="text-green-700"
                size={40}
              />
            </div>

            <div>

              <h1 className="text-5xl font-bold text-green-700">
                Fertilizer Recommendation
              </h1>

              <p className="text-gray-500 mt-2 text-lg">
                Get the most suitable fertilizer based on crop and
                soil nutrient requirements.
              </p>

            </div>

          </div>

        </div>

        {/* ================================================= */}
        {/* TOP SECTION */}
        {/* ================================================= */}

        <div className="grid lg:grid-cols-2 gap-8 items-start">

          {/* ================================================= */}
          {/* INPUT CARD */}
          {/* ================================================= */}

          <div className="bg-white rounded-3xl shadow-lg p-8">

            <div className="flex items-center gap-3 mb-6">

              <Sprout
                className="text-green-600"
                size={28}
              />

              <h2 className="text-2xl font-bold text-slate-800">
                Soil & Crop Information
              </h2>

            </div>

            <form onSubmit={handleSubmit}>

              {/* Crop */}

              <div className="mb-6">

                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Select Crop
                </label>

                <select
                  name="crop"
                  value={formData.crop}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
                >

                  <option value="">
                    Select a crop
                  </option>

                  <option value="Rice">Rice</option>
                  <option value="Maize">Maize</option>
                  <option value="Chickpea">Chickpea</option>
                  <option value="Kidney Beans">
                    Kidney Beans
                  </option>
                  <option value="Pigeon Peas">
                    Pigeon Peas
                  </option>
                  <option value="Moth Beans">
                    Moth Beans
                  </option>
                  <option value="Mung Bean">
                    Mung Bean
                  </option>
                  <option value="Blackgram">
                    Blackgram
                  </option>
                  <option value="Lentil">Lentil</option>
                  <option value="Pomegranate">
                    Pomegranate
                  </option>
                  <option value="Banana">Banana</option>
                  <option value="Mango">Mango</option>
                  <option value="Grapes">Grapes</option>
                  <option value="Watermelon">
                    Watermelon
                  </option>
                  <option value="Muskmelon">
                    Muskmelon
                  </option>
                  <option value="Apple">Apple</option>
                  <option value="Orange">Orange</option>
                  <option value="Papaya">Papaya</option>
                  <option value="Coconut">Coconut</option>
                  <option value="Cotton">Cotton</option>
                  <option value="Jute">Jute</option>
                  <option value="Coffee">Coffee</option>

                </select>

              </div>

              {/* Nitrogen */}

              <div className="mb-5">

                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nitrogen (N) — kg/ha
                </label>

                <input
                  type="number"
                  name="nitrogen"
                  value={formData.nitrogen}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  placeholder="Enter nitrogen value"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                />

              </div>

              {/* Phosphorus */}

              <div className="mb-5">

                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Phosphorus (P) — kg/ha
                </label>

                <input
                  type="number"
                  name="phosphorus"
                  value={formData.phosphorus}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  placeholder="Enter phosphorus value"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                />

              </div>

              {/* Potassium */}

              <div className="mb-7">

                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Potassium (K) — kg/ha
                </label>

                <input
                  type="number"
                  name="potassium"
                  value={formData.potassium}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  placeholder="Enter potassium value"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                />

              </div>

              {/* Buttons */}

              <div className="flex gap-4">

                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-semibold py-3 rounded-xl transition"
                >

                  {loading
                    ? "Analyzing..."
                    : "Get Recommendation"}

                </button>

                <button
                  type="button"
                  onClick={handleReset}
                  className="px-5 py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-100 transition flex items-center gap-2"
                >

                  <RotateCcw size={18} />

                  Reset

                </button>

              </div>

            </form>

          </div>

          {/* ================================================= */}
          {/* RIGHT TOP RESULT */}
          {/* ================================================= */}

          <div>

            {!result ? (

              <div className="bg-white rounded-3xl shadow-lg p-10 min-h-[500px] flex flex-col items-center justify-center text-center">

                <FlaskConical
                  size={70}
                  className="text-green-300 mb-6"
                />

                <h2 className="text-2xl font-bold text-slate-700 mb-3">
                  Fertilizer Recommendation
                </h2>

                <p className="text-gray-500 max-w-md">
                  Enter your crop and soil nutrient values to
                  receive a fertilizer recommendation.
                </p>

              </div>

            ) : (

              <div className="space-y-6">

                {/* Recommended Fertilizer */}

                <div className="bg-white rounded-3xl shadow-lg p-7 border-l-8 border-green-500">

                  <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                    Recommended Fertilizer
                  </p>

                  <h2 className="text-3xl font-bold text-green-700 mt-2">
                    {result.recommended_fertilizer?.name ||
                      "Not available"}
                  </h2>

                  <p className="text-gray-500 mt-1">
                    {result.recommended_fertilizer?.type || ""}
                  </p>

                </div>

                {/* Reason */}

                <div className="bg-white rounded-3xl shadow-lg p-7">

                  <h3 className="text-xl font-bold text-slate-800 mb-3">
                    Why this fertilizer?
                  </h3>

                  <p className="text-gray-600 leading-relaxed">
                    {result.reason}
                  </p>

                </div>

                {/* Deficiency */}

                <div className="bg-white rounded-3xl shadow-lg p-7">

                  <div className="flex items-center gap-3 mb-5">

                    <Droplets
                      className="text-blue-600"
                      size={26}
                    />

                    <h3 className="text-xl font-bold text-slate-800">
                      Nutrient Deficiency
                    </h3>

                  </div>

                  <div className="grid grid-cols-3 gap-4">

                    <div className="bg-blue-50 rounded-2xl p-4 text-center">

                      <p className="text-gray-500 text-sm">
                        Nitrogen
                      </p>

                      <p className="text-2xl font-bold text-blue-700 mt-1">
                        {result.deficiency?.N ?? 0}
                      </p>

                      <p className="text-xs text-gray-500">
                        kg/ha
                      </p>

                    </div>

                    <div className="bg-orange-50 rounded-2xl p-4 text-center">

                      <p className="text-gray-500 text-sm">
                        Phosphorus
                      </p>

                      <p className="text-2xl font-bold text-orange-600 mt-1">
                        {result.deficiency?.P ?? 0}
                      </p>

                      <p className="text-xs text-gray-500">
                        kg/ha
                      </p>

                    </div>

                    <div className="bg-purple-50 rounded-2xl p-4 text-center">

                      <p className="text-gray-500 text-sm">
                        Potassium
                      </p>

                      <p className="text-2xl font-bold text-purple-700 mt-1">
                        {result.deficiency?.K ?? 0}
                      </p>

                      <p className="text-xs text-gray-500">
                        kg/ha
                      </p>

                    </div>

                  </div>

                </div>

                {/* Dosage */}

                <div className="bg-green-50 rounded-3xl shadow-lg p-7">

                  <p className="text-sm font-semibold text-green-700">
                    Recommended Dosage
                  </p>

                  <p className="text-4xl font-bold text-green-800 mt-2">
                    {result.dosage || "Not available"}
                  </p>

                </div>

              </div>

            )}

          </div>

        </div>

        {/* ================================================= */}
        {/* BOTTOM APPLICATION DETAILS */}
        {/* ================================================= */}

        {result && (

          <div className="grid md:grid-cols-2 gap-6 mt-8">

            {/* Application Timing */}

            <div className="bg-white rounded-3xl shadow-lg p-7">

              <div className="flex items-center gap-3 mb-4">

                <Clock
                  className="text-orange-500"
                  size={26}
                />

                <h3 className="text-xl font-bold text-slate-800">
                  Application Timing
                </h3>

              </div>

              {result.application_timing?.length > 0 ? (

                <ul className="space-y-3">

                  {result.application_timing.map(
                    (item, index) => (

                      <li
                        key={index}
                        className="flex items-start gap-3 text-gray-600"
                      >

                        <span className="text-green-600 font-bold">
                          ✓
                        </span>

                        <span>
                          {item}
                        </span>

                      </li>

                    )
                  )}

                </ul>

              ) : (

                <p className="text-gray-500">
                  No timing information available.
                </p>

              )}

            </div>

            {/* Application Method */}

            <div className="bg-white rounded-3xl shadow-lg p-7">

              <div className="flex items-center gap-3 mb-4">

                <ListChecks
                  className="text-blue-600"
                  size={26}
                />

                <h3 className="text-xl font-bold text-slate-800">
                  Application Method
                </h3>

              </div>

              {result.application_method?.length > 0 ? (

                <ul className="space-y-3">

                  {result.application_method.map(
                    (item, index) => (

                      <li
                        key={index}
                        className="flex items-start gap-3 text-gray-600"
                      >

                        <span className="text-blue-600 font-bold">
                          •
                        </span>

                        <span>
                          {item}
                        </span>

                      </li>

                    )
                  )}

                </ul>

              ) : (

                <p className="text-gray-500">
                  No application method available.
                </p>

              )}

            </div>

            {/* Benefits */}

            <div className="bg-white rounded-3xl shadow-lg p-7">

              <h3 className="text-xl font-bold text-slate-800 mb-4">
                Benefits
              </h3>

              {result.benefits?.length > 0 ? (

                <ul className="space-y-3">

                  {result.benefits.map(
                    (item, index) => (

                      <li
                        key={index}
                        className="flex items-start gap-3 text-gray-600"
                      >

                        <span className="text-green-600 font-bold">
                          ✓
                        </span>

                        <span>
                          {item}
                        </span>

                      </li>

                    )
                  )}

                </ul>

              ) : (

                <p className="text-gray-500">
                  No benefits available.
                </p>

              )}

            </div>

            {/* Precautions */}

            <div className="bg-yellow-50 rounded-3xl shadow-lg p-7">

              <div className="flex items-center gap-3 mb-4">

                <ShieldAlert
                  className="text-yellow-600"
                  size={26}
                />

                <h3 className="text-xl font-bold text-slate-800">
                  Precautions
                </h3>

              </div>

              {result.precautions?.length > 0 ? (

                <ul className="space-y-3">

                  {result.precautions.map(
                    (item, index) => (

                      <li
                        key={index}
                        className="flex items-start gap-3 text-gray-700"
                      >

                        <span className="text-yellow-600 font-bold">
                          ⚠
                        </span>

                        <span>
                          {item}
                        </span>

                      </li>

                    )
                  )}

                </ul>

              ) : (

                <p className="text-gray-500">
                  No precautions available.
                </p>

              )}

            </div>

          </div>

        )}

      </div>

    </div>
  );
}