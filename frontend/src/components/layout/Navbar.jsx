import { Bell, UserCircle } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

function Navbar() {

  const { user } = useAuth();

  return (
    <header className="bg-white shadow-sm h-20 flex items-center justify-between px-8">

      <div>

        <h2 className="text-2xl font-bold text-slate-800">
          Dashboard
        </h2>

        <p className="text-gray-500">
          Welcome back, {user?.full_name || "Farmer"} 👋
        </p>

      </div>

      <div className="flex items-center gap-6">

        <Bell
          size={22}
          className="cursor-pointer"
        />

        <div className="flex items-center gap-3">

          <UserCircle
            size={40}
            className="text-green-600"
          />

          <div>

            <h4 className="font-semibold">

              {user?.full_name}

            </h4>

            <p className="text-sm text-gray-500">

              Farmer

            </p>

          </div>

        </div>

      </div>

    </header>
  );
}

export default Navbar;