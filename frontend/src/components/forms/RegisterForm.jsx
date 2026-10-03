import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  Eye,
  EyeOff,
  User,
  Mail,
  Phone,
  MapPin,
  Languages,
  Lock,
} from "lucide-react";
import toast from "react-hot-toast";
import { registerUser } from "../../services/authService";

function RegisterForm() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      await registerUser(data);

      toast.success("Registration Successful!");

      navigate("/login");
    } catch (error) {
      toast.error(
        error.response?.data?.detail ||
          "Registration Failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-xl bg-white rounded-3xl shadow-2xl p-8">

      <div className="text-center mb-8">

        <h2 className="text-4xl font-bold text-green-700">
          Create Account
        </h2>

        <p className="text-gray-500 mt-2">
          Join AgriAssist Today 🌾
        </p>

      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5"
      >

        {/* Full Name */}

        <div>

          <label className="font-medium">Full Name</label>

          <div className="flex items-center border rounded-xl px-3 mt-2">

            <User className="text-green-600" size={20} />

            <input
              className="w-full p-4 outline-none"
              placeholder="Enter Full Name"
              {...register("full_name", {
                required: "Full Name is required",
              })}
            />

          </div>

          <p className="text-red-500 text-sm">
            {errors.full_name?.message}
          </p>

        </div>

        {/* Email */}

        <div>

          <label className="font-medium">Email</label>

          <div className="flex items-center border rounded-xl px-3 mt-2">

            <Mail className="text-green-600" size={20} />

            <input
              type="email"
              className="w-full p-4 outline-none"
              placeholder="Enter Email"
              {...register("email", {
                required: "Email is required",
              })}
            />

          </div>

          <p className="text-red-500 text-sm">
            {errors.email?.message}
          </p>

        </div>

        {/* Phone */}

        <div>

          <label className="font-medium">Phone Number</label>

          <div className="flex items-center border rounded-xl px-3 mt-2">

            <Phone className="text-green-600" size={20} />

            <input
              className="w-full p-4 outline-none"
              placeholder="Enter Phone Number"
              {...register("phone", {
                required: "Phone Number is required",
              })}
            />

          </div>

          <p className="text-red-500 text-sm">
            {errors.phone?.message}
          </p>

        </div>

        {/* State */}

        <div>

          <label className="font-medium">State</label>

          <div className="flex items-center border rounded-xl px-3 mt-2">

            <MapPin className="text-green-600" size={20} />

            <input
              className="w-full p-4 outline-none"
              placeholder="Enter State"
              {...register("state", {
                required: "State is required",
              })}
            />

          </div>

          <p className="text-red-500 text-sm">
            {errors.state?.message}
          </p>

        </div>

        {/* District */}

        <div>

          <label className="font-medium">District</label>

          <div className="flex items-center border rounded-xl px-3 mt-2">

            <MapPin className="text-green-600" size={20} />

            <input
              className="w-full p-4 outline-none"
              placeholder="Enter District"
              {...register("district", {
                required: "District is required",
              })}
            />

          </div>

          <p className="text-red-500 text-sm">
            {errors.district?.message}
          </p>

        </div>

        {/* Preferred Language */}

        <div>

          <label className="font-medium">Preferred Language</label>

          <div className="flex items-center border rounded-xl px-3 mt-2">

            <Languages className="text-green-600" size={20} />

            <select
              className="w-full p-4 outline-none bg-transparent"
              {...register("preferred_language")}
            >
              <option value="English">English</option>
              <option value="Telugu">Telugu</option>
              <option value="Hindi">Hindi</option>
              <option value="Tamil">Tamil</option>
              <option value="Kannada">Kannada</option>
              <option value="Marathi">Marathi</option>
            </select>

          </div>

        </div>

        {/* Password */}

        <div>

          <label className="font-medium">Password</label>

          <div className="flex items-center border rounded-xl px-3 mt-2">

            <Lock className="text-green-600" size={20} />

            <input
              type={showPassword ? "text" : "password"}
              className="w-full p-4 outline-none"
              placeholder="Enter Password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Minimum 6 characters",
                },
              })}
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}
            </button>

          </div>

          <p className="text-red-500 text-sm">
            {errors.password?.message}
          </p>

        </div>

        {/* Register Button */}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-semibold transition"
        >
          {loading ? "Creating Account..." : "REGISTER"}
        </button>

      </form>

      <div className="text-center mt-6">

        Already have an account?

        <Link
          to="/login"
          className="text-green-600 font-semibold ml-2"
        >
          Login
        </Link>

      </div>

    </div>
  );
}

export default RegisterForm;