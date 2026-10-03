import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { ClipLoader } from "react-spinners";
import toast from "react-hot-toast";

import { loginUser } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";

function LoginForm() {

    const navigate = useNavigate();
    const { login } = useAuth();

    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const onSubmit = async (data) => {

    try {

        setLoading(true);

        const response = await loginUser(data);

        // Save JWT
        localStorage.setItem(
            "token",
            response.access_token
        );

        // Save user
        localStorage.setItem(
            "user",
            JSON.stringify(response.user)
        );

        // Update Auth Context
        login(
            response.access_token,
            response.user
        );

        toast.success("Login Successful");

        navigate("/dashboard");

    } catch (error) {

        toast.error(
            error.response?.data?.detail ||
            "Invalid Email or Password"
        );

    } finally {

        setLoading(false);

    }

};

    return (

        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-10">

            <div className="text-center mb-8">

                <h2 className="text-4xl font-bold text-green-700">
                    Welcome Back
                </h2>

                <p className="text-gray-500 mt-2">
                    Login to continue using AgriAssist
                </p>

            </div>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-5"
            >

                {/* Email */}

                <div>

                    <label className="font-medium text-gray-700">
                        Email
                    </label>

                    <div className="mt-2 flex items-center border rounded-xl px-4">

                        <Mail className="text-green-600" size={20} />

                        <input

                            type="email"

                            placeholder="Enter your email"

                            className="w-full p-4 outline-none"

                            {...register("email", {

                                required: "Email is required",

                                pattern: {

                                    value: /^\S+@\S+$/i,

                                    message: "Invalid Email"

                                }

                            })}

                        />

                    </div>

                    <p className="text-red-500 text-sm mt-1">
                        {errors.email?.message}
                    </p>

                </div>

                {/* Password */}

                <div>

                    <label className="font-medium text-gray-700">
                        Password
                    </label>

                    <div className="mt-2 flex items-center border rounded-xl px-4">

                        <Lock
                            className="text-green-600"
                            size={20}
                        />

                        <input

                            type={showPassword ? "text" : "password"}

                            placeholder="Enter Password"

                            className="w-full p-4 outline-none"

                            {...register("password", {

                                required: "Password is required"

                            })}

                        />

                        <button

                            type="button"

                            onClick={() => setShowPassword(!showPassword)}

                        >

                            {

                                showPassword

                                    ?

                                    <EyeOff size={20} />

                                    :

                                    <Eye size={20} />

                            }

                        </button>

                    </div>

                    <p className="text-red-500 text-sm mt-1">
                        {errors.password?.message}
                    </p>

                </div>

                {/* Remember */}

                <div className="flex justify-between items-center">

                    <label className="flex gap-2 items-center">

                        <input type="checkbox" />

                        Remember Me

                    </label>

                    <button

                        type="button"

                        className="text-green-600"

                    >

                        Forgot Password?

                    </button>

                </div>

                {/* Login */}

                <button

                    disabled={loading}

                    className="w-full bg-green-600 hover:bg-green-700 transition text-white py-4 rounded-xl font-semibold"

                >

                    {

                        loading

                            ?

                            <ClipLoader
                                color="#fff"
                                size={20}
                            />

                            :

                            "LOGIN"

                    }

                </button>

            </form>

            <div className="text-center mt-6">

                Don't have an account?

                <Link

                    to="/register"

                    className="text-green-600 ml-2 font-semibold"

                >

                    Register

                </Link>

            </div>

        </div>

    );

}

export default LoginForm;