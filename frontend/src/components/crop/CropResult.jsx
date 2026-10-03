import {
  CheckCircle2,
  RotateCcw,
  Sprout,
  CloudSun,
  FlaskConical,
  TrendingUp,
} from "lucide-react";

export default function CropResult({
  result,
  onReset,
}) {

  if (!result) return null;

  return (

    <div className="bg-white rounded-3xl shadow-xl p-10">

      {/* Success Icon */}

      <div className="flex justify-center">

        <div className="bg-green-100 rounded-full p-5">

          <CheckCircle2
            className="text-green-700"
            size={70}
          />

        </div>

      </div>

      {/* Heading */}

      <h2 className="text-center text-4xl font-bold mt-6 text-green-700">

        Crop Recommendation Result

      </h2>

      <p className="text-center text-gray-500 mt-3">

        Based on the soil nutrients and weather conditions.

      </p>

      {/* Crop Name */}

      <div className="mt-10 bg-gradient-to-r from-green-100 to-green-50 rounded-3xl p-10 text-center shadow">

        <Sprout
          className="mx-auto text-green-700"
          size={55}
        />

        <h1 className="mt-5 text-5xl font-bold text-green-800">

          {result}

        </h1>

        <p className="mt-3 text-gray-600">

          This crop is the most suitable recommendation
          according to the trained Machine Learning model.

        </p>

      </div>

      {/* Insights */}

      <div className="grid md:grid-cols-3 gap-5 mt-10">

        <div className="bg-green-50 rounded-2xl p-5">

          <CloudSun
            className="text-green-700 mb-3"
            size={28}
          />

          <h3 className="font-bold">

            Weather

          </h3>

          <p className="text-sm text-gray-600 mt-2">

            Current weather conditions are suitable for cultivation.

          </p>

        </div>

        <div className="bg-blue-50 rounded-2xl p-5">

          <TrendingUp
            className="text-blue-700 mb-3"
            size={28}
          />

          <h3 className="font-bold">

            Soil Health

          </h3>

          <p className="text-sm text-gray-600 mt-2">

            Soil nutrients support healthy crop growth.

          </p>

        </div>

        <div className="bg-yellow-50 rounded-2xl p-5">

          <FlaskConical
            className="text-yellow-700 mb-3"
            size={28}
          />

          <h3 className="font-bold">

            Fertilizer

          </h3>

          <p className="text-sm text-gray-600 mt-2">

            Fertilizer recommendation will be available in Phase 4.

          </p>

        </div>

      </div>

      {/* Coming Soon */}

      <div className="mt-10 bg-slate-100 rounded-2xl p-6">

        <h3 className="font-bold text-lg">

          Upcoming Smart Recommendations

        </h3>

        <ul className="mt-4 space-y-3 text-gray-700">

          <li>✅ Hybrid Fertilizer Recommendation</li>

          <li>✅ Crop Yield Prediction</li>

          <li>✅ AI Farming Advisor</li>

          <li>✅ Drought Risk Analysis</li>

          <li>✅ Government Scheme Suggestions</li>

        </ul>

      </div>

      {/* Button */}

      <button

        onClick={onReset}

        className="mt-10 w-full bg-green-600 hover:bg-green-700 text-white rounded-xl py-4 font-semibold flex justify-center items-center gap-3 transition"

      >

        <RotateCcw size={20} />

        Predict Another Crop

      </button>

    </div>

  );

}