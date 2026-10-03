import RegisterForm from "../../components/forms/RegisterForm";
import bg from "../../assets/images/auth/auth-bg.jpg";

function Register() {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">

      {/* Left */}
      <div
        className="hidden lg:flex items-center justify-center bg-cover bg-center relative"
        style={{
          backgroundImage: `url(${bg})`,
        }}
      >
        <div className="absolute inset-0 bg-green-900/70"></div>

        <div className="relative text-white text-center px-10">

          <h1 className="text-6xl font-bold mb-5">
            AGRIASSIST
          </h1>

          <p className="text-2xl">
            Supporting Farmers,
          </p>

          <p className="text-2xl mb-5">
            Growing the Future 🌾
          </p>

          <p>
            Join India's Smart Farming Platform
          </p>

        </div>

      </div>

      {/* Right */}

      <div className="flex items-center justify-center p-8 bg-slate-50">

        <RegisterForm />

      </div>

    </div>
  );
}

export default Register;