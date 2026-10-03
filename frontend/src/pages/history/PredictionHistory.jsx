import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  Sprout,
  BarChart3,
  FlaskConical,
  Trash2,
  History,
  Loader2,
} from "lucide-react";

import api from "../../services/api";


export default function PredictionHistory() {

  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(true);


  const fetchHistory = async () => {

    try {

      setLoading(true);

      const response = await api.get("/predictions");

      setPredictions(response.data.predictions || []);

    } catch (error) {

      console.log(error);

      toast.error("Unable to load prediction history.");

    } finally {

      setLoading(false);

    }
  };


  useEffect(() => {
    fetchHistory();
  }, []);


  const deletePrediction = async (id) => {

    try {

      await api.delete(`/predictions/${id}`);

      setPredictions((prev) =>
        prev.filter((prediction) => prediction.id !== id)
      );

      toast.success("Prediction deleted successfully.");

    } catch (error) {

      console.log(error);

      toast.error("Unable to delete prediction.");

    }
  };


  const getIcon = (type) => {

    if (type === "Crop Recommendation") {
      return <Sprout className="text-green-600" size={28} />;
    }

    if (type === "Yield Prediction") {
      return <BarChart3 className="text-blue-600" size={28} />;
    }

    if (type === "Fertilizer Recommendation") {
      return <FlaskConical className="text-purple-600" size={28} />;
    }

    return <History className="text-gray-600" size={28} />;
  };


  const getResult = (prediction) => {

    if (prediction.prediction_type === "Fertilizer Recommendation") {

      try {

        const data = JSON.parse(prediction.result);

        return data?.recommended_fertilizer?.name || "Recommendation";

      } catch {

        return prediction.result;

      }
    }

    if (prediction.prediction_type === "Yield Prediction") {
      return `${Number(prediction.result).toFixed(2)} T/Ha`;
    }

    return prediction.result;
  };


  const formatDate = (date) => {

    if (!date) return "Date unavailable";

    return new Date(date).toLocaleString();
  };


  return (
    <div className="min-h-screen bg-slate-100 p-8">

      <div className="max-w-6xl mx-auto">

        {/* Header */}

        <div className="mb-8">

          <div className="flex items-center gap-3">

            <div className="bg-green-100 p-3 rounded-xl">
              <History
                className="text-green-700"
                size={32}
              />
            </div>

            <div>

              <h1 className="text-4xl font-bold text-green-700">
                Prediction History
              </h1>

              <p className="text-gray-500 mt-1">
                View your previous crop, yield and fertilizer predictions.
              </p>

            </div>

          </div>

        </div>


        {/* Loading */}

        {loading && (

          <div className="flex justify-center items-center py-20">

            <Loader2
              className="animate-spin text-green-600"
              size={40}
            />

          </div>

        )}


        {/* Empty State */}

        {!loading && predictions.length === 0 && (

          <div className="bg-white rounded-2xl shadow-sm p-12 text-center">

            <History
              className="mx-auto text-gray-400"
              size={50}
            />

            <h2 className="text-xl font-semibold mt-4">
              No predictions yet
            </h2>

            <p className="text-gray-500 mt-2">
              Your crop, yield and fertilizer predictions will appear here.
            </p>

          </div>

        )}


        {/* Prediction Cards */}

        {!loading && predictions.length > 0 && (

          <div className="space-y-4">

            {predictions.map((prediction) => (

              <div
                key={prediction.id}
                className="bg-white rounded-2xl shadow-sm p-6 flex items-center justify-between"
              >

                <div className="flex items-center gap-4">

                  <div className="bg-slate-100 p-3 rounded-xl">
                    {getIcon(prediction.prediction_type)}
                  </div>


                  <div>

                    <h2 className="text-lg font-semibold text-gray-800">
                      {prediction.prediction_type}
                    </h2>

                    <p className="text-gray-500 text-sm mt-1">
                      Result:
                      <span className="font-semibold text-gray-700 ml-1">
                        {getResult(prediction)}
                      </span>
                    </p>

                    <p className="text-gray-400 text-sm mt-1">
                      {formatDate(prediction.created_at)}
                    </p>

                  </div>

                </div>


                <button
                  onClick={() => deletePrediction(prediction.id)}
                  className="p-3 rounded-xl text-red-500 hover:bg-red-50"
                  title="Delete prediction"
                >
                  <Trash2 size={20} />
                </button>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}