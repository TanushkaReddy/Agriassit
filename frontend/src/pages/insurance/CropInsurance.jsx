import { useEffect, useState } from "react";
import { ShieldCheck, Search, ExternalLink, MapPin } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";

const states = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal"
];

const crops = [
  "Rice",
  "Maize",
  "Wheat",
  "Chickpea",
  "Pigeon Pea",
  "Groundnut",
  "Soybean",
  "Mustard",
  "Cotton",
  "Sugarcane",
  "Chilli",
  "Turmeric",
  "Sunflower",
  "Lentil",
  "Mango",
  "Banana",
  "Grapes",
  "Orange",
  "Papaya",
  "Pomegranate",
  "Coconut",
  "Tomato",
  "Potato",
  "Onion"
];

export default function CropInsurance() {
  const { user } = useAuth();

  const [selectedState, setSelectedState] = useState("");
  const [selectedCrop, setSelectedCrop] = useState("");
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user?.state) {
      setSelectedState(user.state);
    }
  }, [user]);

  const findInsurance = async () => {
    if (!selectedState || !selectedCrop) {
      setError("Please select both state and crop.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSearched(true);

      const response = await api.get("/insurance", {
        params: {
          state: selectedState,
          crop: selectedCrop
        }
      });

      setSchemes(response.data.schemes || []);
    } catch (err) {
      console.error(err);
      setError("Unable to fetch crop insurance information.");
      setSchemes([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto">

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <div className="bg-green-100 p-3 rounded-xl">
            <ShieldCheck className="text-green-700" size={30} />
          </div>

          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Crop Insurance
            </h1>

            <p className="text-gray-500 mt-1">
              Find crop insurance schemes relevant to your state and crop.
            </p>
          </div>
        </div>
      </div>

      {/* Search Panel */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">

        <h2 className="text-xl font-semibold text-gray-800 mb-5">
          Find Insurance
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

          {/* State */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              State
            </label>

            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Select State</option>

              {states.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>

            {user?.state && (
              <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
                <MapPin size={13} />
                Recommended from your profile: {user.state}
              </p>
            )}
          </div>

          {/* Crop */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Crop
            </label>

            <select
              value={selectedCrop}
              onChange={(e) => setSelectedCrop(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Select Crop</option>

              {crops.map((crop) => (
                <option key={crop} value={crop}>
                  {crop}
                </option>
              ))}
            </select>
          </div>

          {/* Button */}
          <div className="flex items-end">
            <button
              onClick={findInsurance}
              disabled={loading}
              className="w-full bg-green-700 hover:bg-green-800 text-white font-semibold rounded-xl px-5 py-3 flex items-center justify-center gap-2 transition"
            >
              <Search size={19} />

              {loading ? "Searching..." : "Find Insurance"}
            </button>
          </div>

        </div>

        {error && (
          <p className="text-red-600 text-sm mt-4">
            {error}
          </p>
        )}
      </div>

      {/* Results */}
      {searched && !loading && (
        <div>

          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                Insurance Schemes
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                {schemes.length} scheme{schemes.length !== 1 ? "s" : ""} found
                for {selectedCrop} in {selectedState}
              </p>
            </div>
          </div>

          {schemes.length === 0 ? (
            <div className="bg-white border border-gray-200 rounded-2xl p-10 text-center">
              <ShieldCheck
                size={45}
                className="mx-auto text-gray-400 mb-4"
              />

              <h3 className="text-lg font-semibold text-gray-700">
                No insurance scheme found
              </h3>

              <p className="text-gray-500 mt-2">
                No matching insurance information is available for the
                selected state and crop.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

              {schemes.map((scheme) => (
                <div
                  key={scheme.id}
                  className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden"
                >

                  {/* Card Header */}
                  <div className="bg-green-50 px-6 py-5 border-b border-green-100">
                    <div className="flex items-start gap-3">

                      <div className="bg-green-100 p-2 rounded-lg">
                        <ShieldCheck
                          size={23}
                          className="text-green-700"
                        />
                      </div>

                      <div>
                        <h3 className="text-lg font-bold text-gray-800">
                          {scheme.name}
                        </h3>

                        <p className="text-sm text-green-700 mt-1">
                          Crop: {scheme.crop}
                        </p>
                      </div>

                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 space-y-5">

                    <div>
                      <h4 className="font-semibold text-gray-700 mb-1">
                        Coverage
                      </h4>

                      <p className="text-sm text-gray-600 leading-6">
                        {scheme.coverage}
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-700 mb-1">
                        Premium
                      </h4>

                      <p className="text-sm text-gray-600 leading-6">
                        {scheme.premium}
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-700 mb-1">
                        Eligibility
                      </h4>

                      <p className="text-sm text-gray-600 leading-6">
                        {scheme.eligibility}
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-700 mb-2">
                        Benefits
                      </h4>

                      <ul className="list-disc list-inside space-y-1">
                        {scheme.benefits?.map((benefit, index) => (
                          <li
                            key={index}
                            className="text-sm text-gray-600"
                          >
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-700 mb-1">
                        Application Process
                      </h4>

                      <p className="text-sm text-gray-600 leading-6">
                        {scheme.application_process}
                      </p>
                    </div>

                    {/* Apply */}
                    <div className="pt-3 border-t border-gray-100">
                      <a
                        href={scheme.official_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-green-700 hover:bg-green-800 text-white rounded-xl py-3 flex items-center justify-center gap-2 font-semibold transition"
                      >
                        Apply / View Official Details
                        <ExternalLink size={17} />
                      </a>
                    </div>

                  </div>
                </div>
              ))}

            </div>
          )}

        </div>
      )}

    </div>
  );
}