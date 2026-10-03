import { useEffect, useState } from "react";
import { Loader2, CloudSun, Pencil } from "lucide-react";
import toast from "react-hot-toast";

export default function CropForm({
  weatherMode,
  weatherData,
  onSubmit,
  loading,
}) {

  const [formData, setFormData] = useState({
    N: "",
    P: "",
    K: "",
    temperature: "",
    humidity: "",
    ph: "",
    rainfall: "",
  });

  //-----------------------------------------------------
  // Load Live Weather
  //-----------------------------------------------------

  useEffect(() => {

    if (weatherMode === "live" && weatherData) {

      setFormData((prev) => ({
        ...prev,

        // Live values
        temperature: weatherData.temperature ?? "",
        humidity: weatherData.humidity ?? "",

        // Rainfall is ALWAYS entered manually
        rainfall: "",
      }));

    }

  }, [weatherMode, weatherData]);

  //-----------------------------------------------------
  // Handle Input Changes
  //-----------------------------------------------------

  const handleChange = (e) => {

    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

  };

  //-----------------------------------------------------
  // Submit
  //-----------------------------------------------------

  const handleSubmit = (e) => {

    e.preventDefault();

    for (const key in formData) {

      if (formData[key] === "") {

        toast.error("Please fill all fields.");

        return;

      }

    }

    onSubmit({
      ...formData,

      N: Number(formData.N),
      P: Number(formData.P),
      K: Number(formData.K),
      temperature: Number(formData.temperature),
      humidity: Number(formData.humidity),
      ph: Number(formData.ph),
      rainfall: Number(formData.rainfall),
    });

  };

  //-----------------------------------------------------
  // Input Style
  //-----------------------------------------------------

  const inputStyle = (live) =>
    `w-full mt-2 border rounded-xl p-3 outline-none ${
      live
        ? "bg-green-50 cursor-not-allowed"
        : "bg-white"
    }`;

  //-----------------------------------------------------
  // UI
  //-----------------------------------------------------

  return (

    <div className="bg-white rounded-3xl shadow-xl p-8">

      {/* Header */}

      <div className="flex justify-between items-center mb-8">

        <h2 className="text-3xl font-bold text-green-700">
          Crop Recommendation
        </h2>

        <div
          className={`px-4 py-2 rounded-full flex items-center gap-2 text-sm font-semibold ${
            weatherMode === "live"
              ? "bg-green-100 text-green-700"
              : "bg-blue-100 text-blue-700"
          }`}
        >

          {weatherMode === "live" ? (
            <CloudSun size={18} />
          ) : (
            <Pencil size={18} />
          )}

          {weatherMode === "live"
            ? "Live Weather"
            : "Manual Weather"}

        </div>

      </div>

      {/* Form */}

      <form
        onSubmit={handleSubmit}
        className="grid md:grid-cols-2 gap-6"
      >

        {/* Nitrogen */}

        <Input
          label="Nitrogen (N)"
          name="N"
          value={formData.N}
          onChange={handleChange}
        />

        {/* Phosphorus */}

        <Input
          label="Phosphorus (P)"
          name="P"
          value={formData.P}
          onChange={handleChange}
        />

        {/* Potassium */}

        <Input
          label="Potassium (K)"
          name="K"
          value={formData.K}
          onChange={handleChange}
        />

        {/* Soil pH */}

        <Input
          label="Soil pH"
          name="ph"
          step="0.1"
          value={formData.ph}
          onChange={handleChange}
        />

        {/* Temperature */}

        <div>

          <label className="font-semibold">
            Temperature (°C)
          </label>

          <input
            type="number"
            step="0.1"
            name="temperature"
            value={formData.temperature}
            onChange={handleChange}
            readOnly={weatherMode === "live"}
            className={inputStyle(
              weatherMode === "live"
            )}
          />

        </div>

        {/* Humidity */}

        <div>

          <label className="font-semibold">
            Humidity (%)
          </label>

          <input
            type="number"
            step="0.1"
            name="humidity"
            value={formData.humidity}
            onChange={handleChange}
            readOnly={weatherMode === "live"}
            className={inputStyle(
              weatherMode === "live"
            )}
          />

        </div>

        {/* Rainfall */}

        <div className="md:col-span-2">

          <label className="font-semibold">
            Rainfall (mm)
          </label>

          <input
            type="number"
            step="0.1"
            name="rainfall"
            value={formData.rainfall}
            onChange={handleChange}

            // IMPORTANT:
            // Rainfall is always manually editable.
            readOnly={false}

            className="w-full mt-2 border rounded-xl p-3 outline-none bg-white"

            required
          />

        </div>

        {/* Submit */}

        <div className="md:col-span-2 mt-4">

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 rounded-xl py-4 text-white font-semibold flex justify-center items-center gap-3 disabled:opacity-60"
          >

            {loading ? (
              <>
                <Loader2
                  className="animate-spin"
                  size={20}
                />

                Predicting...
              </>
            ) : (
              "Recommend Crop"
            )}

          </button>

        </div>

      </form>

    </div>

  );
}

//-----------------------------------------------------
// Normal Input Component
//-----------------------------------------------------

function Input({
  label,
  name,
  value,
  onChange,
  step,
}) {

  return (

    <div>

      <label className="font-semibold">
        {label}
      </label>

      <input
        type="number"
        step={step}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full mt-2 border rounded-xl p-3 outline-none bg-white"
        required
      />

    </div>

  );

}