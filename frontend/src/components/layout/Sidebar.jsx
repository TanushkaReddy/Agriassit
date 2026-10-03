import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  LayoutDashboard,
  Sprout,
  BarChart3,
  FlaskConical,
  FileText,
  CloudSun,
  TrendingUp,
  History,
  Landmark,
  ShieldCheck,
  Wallet,
  ChevronDown,
  ChevronRight,
  Settings,
  LogOut,
} from "lucide-react";

export default function Sidebar() {
  const [decisionOpen, setDecisionOpen] = useState(true);
  const [financeOpen, setFinanceOpen] = useState(true);
  const navigate = useNavigate();

const { logout } = useAuth();

const handleLogout = () => {

    logout();

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");

};

  const menuStyle = ({ isActive }) =>
    `flex items-center gap-4 px-5 py-3 rounded-xl transition-all duration-300 group ${
      isActive
        ? "bg-white text-green-700 font-semibold shadow-lg"
        : "text-white hover:bg-green-600 hover:translate-x-1"
    }`;

  return (
    <aside className="w-80 h-screen bg-gradient-to-b from-green-800 to-green-700 flex flex-col shadow-2xl">

      {/* Logo */}

      <div className="px-6 py-7 border-b border-green-600">

        <div className="flex items-center gap-3">

          {/* Replace with logo later */}

          <div className="text-4xl">
            🌾
          </div>

          <div>

            <h1 className="text-4xl font-bold text-white">
              AgriAssist
            </h1>

            <p className="text-green-100 text-sm mt-1">
              Smart Agriculture Platform
            </p>

          </div>

        </div>

      </div>

      {/* Menu */}

      <div className="flex-1 overflow-y-auto no-scrollbar px-5 py-5 space-y-2">

        <NavLink to="/dashboard" className={menuStyle}>
          <LayoutDashboard size={20} />
          <span className="whitespace-nowrap">Dashboard</span>
        </NavLink>

        <NavLink to="/crop" className={menuStyle}>
          <Sprout size={20} />
          <span className="whitespace-nowrap">
            Crop Recommendation
          </span>
        </NavLink>

        <NavLink to="/yield" className={menuStyle}>
          <BarChart3 size={20} />
          <span className="whitespace-nowrap">
            Yield Prediction
          </span>
        </NavLink>

        <NavLink to="/fertilizer" className={menuStyle}>
          <FlaskConical size={20} />
          <span className="whitespace-nowrap">
            Fertilizer Recommendation
          </span>
        </NavLink>

        <NavLink to="/soil-health" className={menuStyle}>
          <FileText size={20} />
          <span className="whitespace-nowrap">
            Soil Health
          </span>
        </NavLink>


        {/* Decision Support */}
        <NavLink to="/schemes" className={menuStyle}>
          <History size={20} />
          <span className="whitespace-nowrap">
            Government Schemes
          </span>
        </NavLink>

        <NavLink to="/insurance" className={menuStyle}>
          <History size={20} />
          <span className="whitespace-nowrap">
            Crop Insurance
          </span>
        </NavLink>

        

        {/* Finance */}
        <NavLink
          to="/expense"
          className={menuStyle}
        >
          <Settings size={20} />
          <span>Expense Tracker</span>
        </NavLink>

        <NavLink to="/history" className={menuStyle}>
          <History size={20} />
          <span className="whitespace-nowrap">
            Prediction History
          </span>
        </NavLink>



        <NavLink
          to="/settings"
          className={menuStyle}
        >
          <Settings size={20} />
          <span>Settings</span>
        </NavLink>

      </div>

      {/* Logout */}

      <div className="border-t border-green-600 p-5">

        <button

    onClick={handleLogout}

    className="w-full bg-red-500 hover:bg-red-600 transition rounded-xl py-3 flex justify-center items-center gap-3 text-white font-semibold"

>

    <LogOut size={20} />

    Logout

      </button>


      </div>

    </aside>
  );
}