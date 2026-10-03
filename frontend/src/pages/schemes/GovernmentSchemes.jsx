import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";
import {
  Landmark,
  MapPin,
  Sparkles,
  ExternalLink,
  ChevronDown,
  ShieldCheck,
  IndianRupee,
  FileCheck,
} from "lucide-react";

export default function GovernmentSchemes() {
  const { user } = useAuth();

  const [selectedState, setSelectedState] = useState("");
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState("");

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
    "West Bengal",
    "Delhi",
    "Jammu and Kashmir",
    "Ladakh",
    "Puducherry",
    "Chandigarh",
    "Andaman and Nicobar Islands",
    "Dadra and Nagar Haveli and Daman and Diu",
    "Lakshadweep",
  ];

  useEffect(() => {
    if (user?.state) {
      setSelectedState(user.state);
    }
  }, [user]);

  const handleFindSchemes = async () => {
    if (!selectedState) {
      setError("Please select a state.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await api.get("/schemes", {
        params: {
          state: selectedState,
        },
      });

      setSchemes(response.data.schemes || []);
      setSearched(true);
    } catch (err) {
      console.error(err);
      setError("Unable to load schemes. Please try again.");
      setSchemes([]);
    } finally {
      setLoading(false);
    }
  };

  const centralSchemes = schemes.filter(
    (scheme) => scheme.level === "Central"
  );

  const stateSchemes = schemes.filter(
    (scheme) => scheme.level === "State" || scheme.level === "UT"
  );

  return (
    <div className="min-h-full space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Government Schemes
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Discover farmer and agriculture schemes available in your region.
          </p>
        </div>

        <div className="hidden items-center gap-2 rounded-lg bg-green-50 px-4 py-2 text-sm font-medium text-green-700 md:flex">
          <Landmark size={18} />
          Farmer Support
        </div>
      </div>

      {/* Recommendation / Search Panel */}
      <div className="overflow-hidden rounded-2xl border border-green-100 bg-white shadow-sm">

        <div className="flex flex-col gap-5 p-6 lg:flex-row lg:items-end lg:justify-between">

          <div className="flex-1">

            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-100 text-green-700">
                <Sparkles size={21} />
              </div>

              <div>
                <h2 className="font-semibold text-slate-800">
                  Find Relevant Schemes
                </h2>

                <p className="text-sm text-slate-500">
                  Select a state to see Central and State schemes.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-end">

              <div className="w-full sm:max-w-md">
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Farmer State
                </label>

                <div className="relative">
                  <MapPin
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <select
                    value={selectedState}
                    onChange={(e) => setSelectedState(e.target.value)}
                    className="w-full appearance-none rounded-xl border border-slate-200
                    bg-slate-50 py-3 pl-10 pr-4 text-sm text-slate-700
                    outline-none transition focus:border-green-500
                    focus:bg-white focus:ring-2 focus:ring-green-100"
                  >
                    <option value="">Select State</option>

                    {states.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                </div>

                {user?.state && selectedState === user.state && (
                  <div className="mt-2 flex items-center gap-1.5 text-xs font-medium text-green-600">
                    <Sparkles size={13} />
                    Recommended from your profile
                  </div>
                )}
              </div>

              <button
                onClick={handleFindSchemes}
                disabled={loading}
                className="flex items-center justify-center gap-2 rounded-xl
                bg-green-600 px-6 py-3 text-sm font-semibold text-white
                shadow-sm transition hover:bg-green-700
                disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Finding..." : "Find Schemes"}
              </button>

            </div>

          </div>

          {/* Small profile indicator */}
          {user?.state && (
            <div className="rounded-xl bg-slate-50 px-5 py-4 lg:min-w-[190px]">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Profile State
              </p>

              <p className="mt-1 font-semibold text-slate-700">
                {user.state}
              </p>
            </div>
          )}

        </div>

        {error && (
          <div className="border-t border-red-100 bg-red-50 px-6 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

      </div>

      {/* Results */}
      {searched && !loading && (
        <>
          {/* Summary */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

            <SummaryCard
              icon={<Landmark size={19} />}
              title="Total Schemes"
              value={schemes.length}
            />

            <SummaryCard
              icon={<IndianRupee size={19} />}
              title="Central Schemes"
              value={centralSchemes.length}
            />

            <SummaryCard
              icon={<MapPin size={19} />}
              title={`${selectedState} Schemes`}
              value={stateSchemes.length}
            />

          </div>

          {/* Central Schemes */}
          <SchemeSection
            title="Central Government Schemes"
            subtitle="Schemes provided by the Government of India"
            icon={<Landmark size={21} />}
            schemes={centralSchemes}
          />

          {/* State Schemes */}
          <SchemeSection
            title={`${selectedState} Government Schemes`}
            subtitle={`Agriculture and farmer schemes available in ${selectedState}`}
            icon={<MapPin size={21} />}
            schemes={stateSchemes}
          />

        
        </>
      )}

    </div>
  );
}


/* ---------------------------------------------
   Summary Card
--------------------------------------------- */

function SummaryCard({ icon, title, value }) {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50 text-green-600">
        {icon}
      </div>

      <div>
        <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
          {title}
        </p>

        <p className="mt-1 text-2xl font-bold text-slate-800">
          {value}
        </p>
      </div>

    </div>
  );
}


/* ---------------------------------------------
   Scheme Section
--------------------------------------------- */

function SchemeSection({
  title,
  subtitle,
  icon,
  schemes,
}) {
  return (
    <section>

      <div className="mb-4 flex items-center gap-3">

        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 text-green-700">
          {icon}
        </div>

        <div>
          <h2 className="text-xl font-bold text-slate-800">
            {title}
          </h2>

          <p className="text-sm text-slate-500">
            {subtitle}
          </p>
        </div>

      </div>

      {schemes.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center text-sm text-slate-500">
          No schemes found for this section.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
          {schemes.map((scheme) => (
            <SchemeCard
              key={scheme.id}
              scheme={scheme}
            />
          ))}
        </div>
      )}

    </section>
  );
}


/* ---------------------------------------------
   Scheme Card
--------------------------------------------- */

function SchemeCard({ scheme }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:border-green-200 hover:shadow-md">

      {/* Main Card */}
      <div className="p-5">

        <div className="flex items-start justify-between gap-4">

          <div className="flex gap-3">

            <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-green-50 text-green-600">
              <ShieldCheck size={20} />
            </div>

            <div>
              <h3 className="font-semibold leading-6 text-slate-800">
                {scheme.name}
              </h3>

              <span className="mt-2 inline-block rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700">
                {scheme.category}
              </span>
            </div>

          </div>

        </div>

        <p className="mt-4 text-sm leading-6 text-slate-600">
          {scheme.description}
        </p>

        {/* Actions */}
        <div className="mt-5 flex items-center justify-between gap-3">

          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-green-700"
          >
            {open ? "Hide Details" : "View Details"}

            <ChevronDown
              size={17}
              className={`transition-transform ${
                open ? "rotate-180" : ""
              }`}
            />
          </button>

          <a
            href={scheme.official_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2.5
            text-sm font-semibold text-white transition hover:bg-green-700"
          >
            Apply Now
            <ExternalLink size={15} />
          </a>

        </div>

      </div>

      {/* Expandable Details */}
      {open && (
        <div className="border-t border-slate-100 bg-slate-50 px-5 py-5">

          <Detail
            icon={<IndianRupee size={16} />}
            title="Benefits"
            value={scheme.benefits}
          />

          <Detail
            icon={<FileCheck size={16} />}
            title="Eligibility"
            value={scheme.eligibility}
          />

          <Detail
            icon={<Landmark size={16} />}
            title="Application Process"
            value={scheme.application_process}
          />

        </div>
      )}

    </div>
  );
}


/* ---------------------------------------------
   Detail
--------------------------------------------- */

function Detail({ icon, title, value }) {
  return (
    <div className="mb-4 last:mb-0">

      <div className="mb-1 flex items-center gap-2 text-sm font-semibold text-slate-700">
        <span className="text-green-600">
          {icon}
        </span>

        {title}
      </div>

      <p className="pl-6 text-sm leading-6 text-slate-600">
        {value}
      </p>

    </div>
  );
}