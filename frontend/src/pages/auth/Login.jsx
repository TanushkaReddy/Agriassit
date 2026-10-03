import LoginForm from "../../components/forms/LoginForm";

function Login() {
  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-slate-50">

      {/* Left Side */}
      <div
        className="hidden lg:flex relative items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage:
            "url('/src/assets/images/auth/auth-bg.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-green-900/60"></div>

        <div className="relative z-10 text-white text-center px-10">

          <h1 className="text-6xl font-bold mb-6">
            AGRIASSIST
          </h1>

          <p className="text-2xl font-light">
            Supporting Farmers,
          </p>

          <p className="text-2xl font-light mb-6">
            Growing the Future 🌾
          </p>

          <p className="text-lg opacity-90">
            Smart Agriculture Decision Support System
          </p>

        </div>
      </div>

      {/* Right Side */}

      <div className="flex items-center justify-center p-10">

        <LoginForm />

      </div>

    </div>
  );
}

export default Login;