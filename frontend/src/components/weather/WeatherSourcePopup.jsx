import { CloudSun, Pencil } from "lucide-react";

export default function WeatherSourcePopup({
  onLive,
  onManual,
}) {

  return (

    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white rounded-3xl p-8 w-[470px] shadow-2xl">

        <h2 className="text-3xl font-bold text-center">

          Weather Information

        </h2>

        <p className="text-center text-gray-500 mt-3">

          Choose how you want to provide weather
          information for crop prediction.

        </p>

        <div className="space-y-4 mt-8">

          {/* Live Weather */}

          <button
            onClick={onLive}
            className="w-full bg-green-600 hover:bg-green-700 text-white rounded-xl py-4 flex items-center justify-center gap-3 font-semibold"
          >

            <CloudSun size={20} />

            Use Live Weather

          </button>

          {/* Manual Weather */}

          <button
            onClick={onManual}
            className="w-full border rounded-xl py-4 hover:bg-gray-100 flex items-center justify-center gap-3 font-semibold"
          >

            <Pencil size={20} />

            Enter Manually

          </button>

        </div>

      </div>

    </div>

  );

}