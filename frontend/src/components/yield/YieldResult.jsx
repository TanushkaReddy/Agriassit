import {
  BarChart3,
  TrendingUp,
  RotateCcw,
  CheckCircle2,
} from "lucide-react";

export default function YieldResult({
  result,
  onReset,
}) {
  if (!result) return null;

  const productivity =
    result >= 5
      ? "Excellent"
      : result >= 3
      ? "Good"
      : "Average";

  return (
    <div className="bg-white rounded-3xl shadow-xl p-8">

      {/* Success Icon */}

      <div className="flex justify-center">

        <CheckCircle2
          size={75}
          className="text-green-600"
        />

      </div>

      {/* Heading */}

      <h2 className="text-center text-3xl font-bold mt-5 text-green-700">

        Predicted Crop Yield

      </h2>

      {/* Yield Card */}

      <div className="mt-8 bg-gradient-to-r from-green-100 to-green-50 rounded-3xl p-8">

        <div className="flex justify-center">

          <BarChart3
            size={50}
            className="text-green-700"
          />

        </div>

        <h1 className="text-center text-5xl font-bold mt-5 text-green-800">

          {result} T/Ha

        </h1>

        <p className="text-center mt-3 text-gray-600">

          Estimated Yield

        </p>

      </div>

      {/* Productivity */}

      <div className="mt-8 bg-blue-50 rounded-2xl p-6">

        <div className="flex justify-between items-center">

          <div>

            <h3 className="font-bold text-xl">

              Productivity Level

            </h3>

            <p className="text-gray-600 mt-2">

              {productivity}

            </p>

          </div>

          <TrendingUp
            size={45}
            className="text-blue-600"
          />

        </div>

      </div>

      {/* AI Insights */}

      <div className="mt-8 space-y-4">

        <div className="bg-green-50 rounded-xl p-4">

          🌾 Estimated yield based on your cultivation inputs.

        </div>

        <div className="bg-blue-50 rounded-xl p-4">

          📊 Production may vary depending on rainfall and field conditions.

        </div>

        <div className="bg-yellow-50 rounded-xl p-4">

          🤖 AI prediction generated using historical agricultural data.

        </div>

      </div>

      {/* Predict Again */}

      <button
        onClick={onReset}
        className="mt-8 w-full bg-green-600 hover:bg-green-700 transition text-white rounded-xl py-4 font-semibold flex justify-center items-center gap-3"
      >

        <RotateCcw size={20} />

        Predict Again

      </button>

    </div>
  );
}