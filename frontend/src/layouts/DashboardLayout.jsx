import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";
import WeatherPopup from "../components/weather/WeatherPopup";

import { useWeather } from "../context/WeatherContext";

export default function DashboardLayout() {

  const { weather } = useWeather();

  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {

    // Every login, ask for location
    if (!weather) {
      setShowPopup(true);
    }

  }, []);

  return (

    <div className="flex h-screen bg-slate-100">

      <Sidebar />

      <div className="flex flex-col flex-1 overflow-hidden">

        <Navbar />

        <main className="flex-1 overflow-y-auto p-8">

          <Outlet />

        </main>

      </div>

      {showPopup && (

        <WeatherPopup
          onClose={() => setShowPopup(false)}
        />

      )}

    </div>

  );

}