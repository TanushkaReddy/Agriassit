import { useState } from "react";
import { Loader2 } from "lucide-react";

export default function YieldForm({
  options,
  onSubmit,
  loading,
}) {
  const [formData, setFormData] = useState({
    crop: "",
    season: "",
    state: "",
    year: new Date().getFullYear(),
    area: "",
    production: "",
    fertilizer: "",
    pesticide: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      ...formData,
      year: Number(formData.year),
      area: Number(formData.area),
      production: Number(formData.production),
      fertilizer: Number(formData.fertilizer),
      pesticide: Number(formData.pesticide),
    });
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl p-8">

      <h2 className="text-3xl font-bold text-green-700 mb-8">
        Yield Prediction
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid md:grid-cols-2 gap-6"
      >

        {/* Crop */}

        <div>
          <label className="font-semibold">
            Crop
          </label>

          <select
            name="crop"
            value={formData.crop}
            onChange={handleChange}
            className="w-full mt-2 border rounded-xl p-3"
            required
          >
            <option value="">
              Select Crop
            </option>

            {options.crops.map((crop) => (
              <option
                key={crop}
                value={crop}
              >
                {crop}
              </option>
            ))}
          </select>
        </div>

        {/* Season */}

        <div>
          <label className="font-semibold">
            Season
          </label>

          <select
            name="season"
            value={formData.season}
            onChange={handleChange}
            className="w-full mt-2 border rounded-xl p-3"
            required
          >
            <option value="">
              Select Season
            </option>

            {options.seasons.map((season) => (
              <option
                key={season}
                value={season}
              >
                {season}
              </option>
            ))}
          </select>
        </div>

        {/* State */}

        <div>
          <label className="font-semibold">
            State
          </label>

          <select
            name="state"
            value={formData.state}
            onChange={handleChange}
            className="w-full mt-2 border rounded-xl p-3"
            required
          >
            <option value="">
              Select State
            </option>

            {options.states.map((state) => (
              <option
                key={state}
                value={state}
              >
                {state}
              </option>
            ))}
          </select>
        </div>

        {/* Year */}

        <div>
          <label className="font-semibold">
            Year
          </label>

          <input
            type="number"
            name="year"
            value={formData.year}
            onChange={handleChange}
            className="w-full mt-2 border rounded-xl p-3"
            required
          />
        </div>

        {/* Area */}

        <div>
          <label className="font-semibold">
            Area (ha)
          </label>

          <input
            type="number"
            step="0.01"
            name="area"
            value={formData.area}
            onChange={handleChange}
            className="w-full mt-2 border rounded-xl p-3"
            required
          />
        </div>

        {/* Production */}

        <div>
          <label className="font-semibold">
            Production (kg)
          </label>

          <input
            type="number"
            step="0.01"
            name="production"
            value={formData.production}
            onChange={handleChange}
            className="w-full mt-2 border rounded-xl p-3"
            required
          />
        </div>

        {/* Fertilizer */}

        <div>
          <label className="font-semibold">
            Fertilizer (kg)
          </label>

          <input
            type="number"
            step="0.01"
            name="fertilizer"
            value={formData.fertilizer}
            onChange={handleChange}
            className="w-full mt-2 border rounded-xl p-3"
            required
          />
        </div>

        {/* Pesticide */}

        <div>
          <label className="font-semibold">
            Pesticide (kg)
          </label>

          <input
            type="number"
            step="0.01"
            name="pesticide"
            value={formData.pesticide}
            onChange={handleChange}
            className="w-full mt-2 border rounded-xl p-3"
            required
          />
        </div>

        <div className="md:col-span-2 mt-4">

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 transition text-white rounded-xl py-4 font-semibold flex justify-center items-center gap-3"
          >
            {loading ? (
              <>
                <Loader2
                  size={20}
                  className="animate-spin"
                />
                Predicting...
              </>
            ) : (
              "Predict Yield"
            )}
          </button>

        </div>

      </form>

    </div>
  );
}