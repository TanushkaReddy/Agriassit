import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

import Dashboard from "../pages/dashboard/Dashboard";
import CropPrediction from "../pages/crop/CropPrediction";
import YieldPrediction from "../pages/yield/YieldPrediction";
import Fertilizer from "../pages/fertilizer/Fertilizer";
import SoilHealth from "../pages/soil/SoilHealth";
import GovernmentSchemes from "../pages/schemes/GovernmentSchemes";
import CropInsurance from "../pages/insurance/CropInsurance";
import DashboardLayout from "../layouts/DashboardLayout";
import ProtectedRoute from "./ProtectedRoute";
import ExpenseTracker from "../pages/expense/ExpenseTracker";
import PredictionHistory from "../pages/history/PredictionHistory";
import Settings from "../pages/settings/Settings";
export default function AppRoutes() {
  return (
    <Routes>

      {/* Public Routes */}
      <Route
        path="/"
        element={<Navigate to="/login" replace />}
      />

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      {/* Protected Routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route
          path="dashboard"
          element={<Dashboard />}
        />

        <Route
          path="crop"
          element={<CropPrediction />}
        />

        <Route
          path="yield"
          element={<YieldPrediction />}
        />

        <Route
          path="fertilizer"
          element={<Fertilizer />}
        />

        <Route
          path="soil-health"
          element={<SoilHealth />}
        />

        <Route
          path="schemes"
          element={<GovernmentSchemes />}
        />
        <Route
          path="insurance"
          element={<CropInsurance />}
        />
        <Route path="expense" element={<ExpenseTracker />} />
        <Route
          path="history"
          element={<PredictionHistory />}
        />
        <Route path="settings" element={<Settings />} />
      </Route>
      

    </Routes>
  );
}