import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  getYieldOptions,
  predictYield,
} from "../../services/yieldService";

import YieldForm from "../../components/yield/YieldForm";
import YieldResult from "../../components/yield/YieldResult";

export default function YieldPrediction() {
  const [options, setOptions] = useState({
    crops: [],
    seasons: [],
    states: [],
  });

  const [loadingOptions, setLoadingOptions] = useState(true);

  const [loading, setLoading] = useState(false);

  const [result, setResult] = useState(null);

  //----------------------------------------------------
  // Load Dropdown Options
  //----------------------------------------------------

  useEffect(() => {
    loadOptions();
  }, []);

  const loadOptions = async () => {
    try {
      const data = await getYieldOptions();

      setOptions(data);
    } catch (err) {
      console.log(err);

      toast.error("Unable to load options.");
    } finally {
      setLoadingOptions(false);
    }
  };

  //----------------------------------------------------
  // Prediction
  //----------------------------------------------------

  const handlePrediction = async (formData) => {
    try {
      setLoading(true);

      const response = await predictYield(formData);

      setResult(response.predicted_yield);

      toast.success("Yield predicted successfully.");
    } catch (err) {
      console.log(err);

      toast.error("Prediction failed.");
    } finally {
      setLoading(false);
    }
  };

  //----------------------------------------------------
  // Reset
  //----------------------------------------------------

  const handleReset = () => {
    setResult(null);
  };

  //----------------------------------------------------

  if (loadingOptions) {
    return (
      <div className="flex justify-center items-center h-screen text-xl font-semibold">
        Loading...
      </div>
    );
  }

  //----------------------------------------------------

  return (
    <div className="min-h-screen bg-slate-100 p-8">

      <div className="max-w-6xl mx-auto">

        <div className="mb-8">

          <h1 className="text-5xl font-bold text-green-700">
            📈 Yield Prediction
          </h1>

          <p className="text-gray-500 mt-3 text-lg">
            Predict expected crop yield using crop, season, state and cultivation details.
          </p>

        </div>

        {!result ? (
          <YieldForm
            options={options}
            loading={loading}
            onSubmit={handlePrediction}
          />
        ) : (
          <YieldResult
            result={result}
            onReset={handleReset}
          />
        )}

      </div>

    </div>
  );
}