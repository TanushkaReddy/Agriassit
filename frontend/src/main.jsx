import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import App from "./App";

import { AuthProvider } from "./context/AuthContext";
import { WeatherProvider } from "./context/WeatherContext";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>

      <AuthProvider>

        <WeatherProvider>

          <Toaster
            position="top-right"
            reverseOrder={false}
          />

          <App />

        </WeatherProvider>

      </AuthProvider>

    </BrowserRouter>
  </React.StrictMode>
);