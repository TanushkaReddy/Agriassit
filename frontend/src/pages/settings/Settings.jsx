import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Languages,
  Edit3,
  Save,
  X,
  Loader2,
} from "lucide-react";

import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";

export default function Settings() {
  const { login } = useAuth();

  const [profile, setProfile] = useState(null);

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    state: "",
    district: "",
    preferred_language: "English",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(false);

  // Fetch farmer profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get("/profile");

        setProfile(response.data);

        setFormData({
          full_name: response.data.full_name || "",
          email: response.data.email || "",
          phone: response.data.phone || "",
          state: response.data.state || "",
          district: response.data.district || "",
          preferred_language:
            response.data.preferred_language || "English",
        });
      } catch (error) {
        console.error("Profile error:", error);
        toast.error("Unable to load profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Save profile
  const handleSave = async () => {
    try {
      setSaving(true);

      const response = await api.put("/profile", {
        full_name: formData.full_name,
        phone: formData.phone,
        state: formData.state,
        district: formData.district,
        preferred_language: formData.preferred_language,
      });

      setProfile(response.data);

      setFormData({
        full_name: response.data.full_name || "",
        email: response.data.email || "",
        phone: response.data.phone || "",
        state: response.data.state || "",
        district: response.data.district || "",
        preferred_language:
          response.data.preferred_language || "English",
      });

      // Update stored user data
      const token = localStorage.getItem("token");

      if (token) {
        login(token, response.data);
      }

      setEditing(false);

      toast.success("Profile updated successfully.");
    } catch (error) {
      console.error("Update profile error:", error);

      toast.error(
        error.response?.data?.detail ||
          "Unable to update profile."
      );
    } finally {
      setSaving(false);
    }
  };

  // Cancel editing
  const handleCancel = () => {
    if (!profile) return;

    setFormData({
      full_name: profile.full_name || "",
      email: profile.email || "",
      phone: profile.phone || "",
      state: profile.state || "",
      district: profile.district || "",
      preferred_language:
        profile.preferred_language || "English",
    });

    setEditing(false);
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <Loader2
          className="animate-spin text-green-600"
          size={40}
        />
      </div>
    );
  }

  return (
    <div className="bg-slate-100 min-h-screen w-full">

      {/* Heading */}

      <div className="mb-8 w-full">

        <h1 className="text-5xl font-bold text-slate-800">
          Settings
        </h1>

        <p className="text-slate-500 mt-2 text-lg">
          Manage your farmer profile and account details
        </p>

      </div>

      {/* Farmer Profile Card */}

      <div className="w-full">

        <div className="bg-white rounded-3xl shadow-lg overflow-hidden w-full">

          {/* Profile Header */}

          <div className="bg-gradient-to-r from-green-700 to-green-500 p-8 lg:p-10 text-white">

            <div className="flex items-center gap-5">

              <div className="bg-white/20 p-4 rounded-2xl">

                <User size={42} />

              </div>

              <div>

                <h2 className="text-3xl font-bold">
                  Farmer Profile
                </h2>

                <p className="text-green-100 mt-1">
                  Your personal and farming account information
                </p>

              </div>

            </div>

          </div>

          {/* Profile Content */}

          <div className="p-8 lg:p-10">

            <div className="grid md:grid-cols-2 gap-6 lg:gap-8">

              {/* Full Name */}

              <div>

                <label className="block text-sm font-semibold text-gray-600 mb-2">
                  Full Name
                </label>

                <div className="relative">

                  <User
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    size={20}
                  />

                  <input
                    type="text"
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleChange}
                    disabled={!editing}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl
                    focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500
                    disabled:bg-gray-100 disabled:text-gray-600"
                  />

                </div>

              </div>

              {/* Email */}

              <div>

                <label className="block text-sm font-semibold text-gray-600 mb-2">
                  Email
                </label>

                <div className="relative">

                  <Mail
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    size={20}
                  />

                  <input
                    type="email"
                    value={formData.email}
                    disabled
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl
                    bg-gray-100 text-gray-500 cursor-not-allowed"
                  />

                </div>

                <p className="text-xs text-gray-400 mt-1">
                  Email cannot be changed.
                </p>

              </div>

              {/* Phone Number */}

              <div>

                <label className="block text-sm font-semibold text-gray-600 mb-2">
                  Phone Number
                </label>

                <div className="relative">

                  <Phone
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    size={20}
                  />

                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={!editing}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl
                    focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500
                    disabled:bg-gray-100 disabled:text-gray-600"
                  />

                </div>

              </div>

              {/* State */}

              <div>

                <label className="block text-sm font-semibold text-gray-600 mb-2">
                  State
                </label>

                <div className="relative">

                  <MapPin
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    size={20}
                  />

                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    disabled={!editing}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl
                    focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500
                    disabled:bg-gray-100 disabled:text-gray-600"
                  />

                </div>

              </div>

              {/* District */}

              <div>

                <label className="block text-sm font-semibold text-gray-600 mb-2">
                  District
                </label>

                <div className="relative">

                  <MapPin
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    size={20}
                  />

                  <input
                    type="text"
                    name="district"
                    value={formData.district}
                    onChange={handleChange}
                    disabled={!editing}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl
                    focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500
                    disabled:bg-gray-100 disabled:text-gray-600"
                  />

                </div>

              </div>

              {/* Preferred Language */}

              <div>

                <label className="block text-sm font-semibold text-gray-600 mb-2">
                  Preferred Language
                </label>

                <div className="relative">

                  <Languages
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    size={20}
                  />

                  <select
                    name="preferred_language"
                    value={formData.preferred_language}
                    onChange={handleChange}
                    disabled={!editing}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl
                    focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500
                    disabled:bg-gray-100 disabled:text-gray-600"
                  >
                    <option value="English">
                      English
                    </option>

                    <option value="Telugu">
                      Telugu
                    </option>

                    <option value="Hindi">
                      Hindi
                    </option>
                  </select>

                </div>

              </div>

            </div>

            {/* Buttons */}

            <div className="flex justify-end gap-3 mt-10 pt-6 border-t border-gray-200">

              {!editing ? (

                <button
                  onClick={() => setEditing(true)}
                  className="flex items-center gap-2 bg-green-600
                  hover:bg-green-700 text-white px-6 py-3
                  rounded-xl font-semibold transition duration-200"
                >
                  <Edit3 size={20} />
                  Edit Profile
                </button>

              ) : (

                <>
                  <button
                    onClick={handleCancel}
                    disabled={saving}
                    className="flex items-center gap-2 px-6 py-3
                    rounded-xl border border-gray-300
                    text-gray-700 hover:bg-gray-100
                    font-semibold transition duration-200
                    disabled:opacity-50"
                  >
                    <X size={20} />
                    Cancel
                  </button>

                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center gap-2 bg-green-600
                    hover:bg-green-700 text-white px-6 py-3
                    rounded-xl font-semibold transition duration-200
                    disabled:opacity-60"
                  >

                    {saving ? (
                      <>
                        <Loader2
                          size={20}
                          className="animate-spin"
                        />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save size={20} />
                        Save Changes
                      </>
                    )}

                  </button>
                </>

              )}

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}