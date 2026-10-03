import { useEffect, useState } from "react";
import {
  Wallet,
  Plus,
  Pencil,
  Trash2,
  IndianRupee,
  TrendingUp,
  TrendingDown,
  X,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";

const categories = [
  "Seeds",
  "Fertilizer",
  "Pesticides",
  "Labour",
  "Irrigation",
  "Machinery",
  "Transport",
  "Electricity",
  "Other",
];

export default function ExpenseTracker() {
  const { user } = useAuth();

  const farmerId = user?.id || user?.farmer_id;

  const [expenses, setExpenses] = useState([]);
  const [totalExpense, setTotalExpense] = useState(0);
  const [expectedRevenue, setExpectedRevenue] = useState("");

  const [formData, setFormData] = useState({
    category: "",
    amount: "",
    date: "",
    description: "",
  });

  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const estimatedProfitLoss =
    Number(expectedRevenue || 0) - Number(totalExpense || 0);

  // -----------------------------
  // Fetch Expenses
  // -----------------------------
  const fetchExpenses = async () => {
    if (!farmerId) return;

    try {
      setLoading(true);
      setError("");

      const response = await api.get("/expenses", {
        params: {
          farmer_id: farmerId,
        },
      });

      setExpenses(response.data.expenses || []);
      setTotalExpense(response.data.total_expense || 0);
    } catch (err) {
      console.error(err);
      setError("Unable to load expenses.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, [farmerId]);

  // -----------------------------
  // Form Change
  // -----------------------------
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // -----------------------------
  // Add / Update Expense
  // -----------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.category || !formData.amount || !formData.date) {
      setError("Please fill all required fields.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      if (editingId) {
        await api.put(`/expenses/${editingId}`, formData, {
          params: {
            farmer_id: farmerId,
          },
        });
      } else {
        await api.post("/expenses", formData, {
          params: {
            farmer_id: farmerId,
          },
        });
      }

      resetForm();
      await fetchExpenses();
    } catch (err) {
      console.error(err);
      setError("Unable to save expense.");
    } finally {
      setLoading(false);
    }
  };

  // -----------------------------
  // Edit
  // -----------------------------
  const handleEdit = (expense) => {
    setEditingId(expense.id);

    setFormData({
      category: expense.category,
      amount: expense.amount,
      date: expense.date,
      description: expense.description || "",
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // -----------------------------
  // Delete
  // -----------------------------
  const handleDelete = async (expenseId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this expense?"
    );

    if (!confirmed) return;

    try {
      setLoading(true);
      setError("");

      await api.delete(`/expenses/${expenseId}`, {
        params: {
          farmer_id: farmerId,
        },
      });

      await fetchExpenses();
    } catch (err) {
      console.error(err);
      setError("Unable to delete expense.");
    } finally {
      setLoading(false);
    }
  };

  // -----------------------------
  // Reset Form
  // -----------------------------
  const resetForm = () => {
    setEditingId(null);

    setFormData({
      category: "",
      amount: "",
      date: "",
      description: "",
    });
  };

  return (
    <div className="max-w-7xl mx-auto">

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <div className="bg-green-100 p-3 rounded-xl">
            <Wallet className="text-green-700" size={30} />
          </div>

          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Expense Tracker
            </h1>

            <p className="text-gray-500 mt-1">
              Track your farming expenses and manage your financial summary.
            </p>
          </div>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl px-4 py-3 mb-6">
          {error}
        </div>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">

        {/* Total Expense */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">
                Total Expense
              </p>

              <h2 className="text-2xl font-bold text-gray-800 mt-2">
                ₹{Number(totalExpense).toLocaleString("en-IN")}
              </h2>
            </div>

            <div className="bg-red-100 p-3 rounded-xl">
              <IndianRupee className="text-red-600" size={24} />
            </div>
          </div>
        </div>

        {/* Expected Revenue */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm text-gray-500">
                Expected Revenue
              </p>

              <div className="flex items-center mt-2">
                <span className="text-gray-700 mr-2">₹</span>

                <input
                  type="number"
                  min="0"
                  value={expectedRevenue}
                  onChange={(e) =>
                    setExpectedRevenue(e.target.value)
                  }
                  placeholder="Enter revenue"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>

            <div className="bg-blue-100 p-3 rounded-xl ml-4">
              <TrendingUp className="text-blue-600" size={24} />
            </div>
          </div>
        </div>

        {/* Profit / Loss */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-gray-500">
                Estimated Profit / Loss
              </p>

              <h2
                className={`text-2xl font-bold mt-2 ${
                  estimatedProfitLoss >= 0
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                ₹{Math.abs(estimatedProfitLoss).toLocaleString("en-IN")}
              </h2>

              <p
                className={`text-xs mt-1 ${
                  estimatedProfitLoss >= 0
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {estimatedProfitLoss >= 0
                  ? "Estimated Profit"
                  : "Estimated Loss"}
              </p>
            </div>

            <div
              className={`p-3 rounded-xl ${
                estimatedProfitLoss >= 0
                  ? "bg-green-100"
                  : "bg-red-100"
              }`}
            >
              {estimatedProfitLoss >= 0 ? (
                <TrendingUp
                  className="text-green-600"
                  size={24}
                />
              ) : (
                <TrendingDown
                  className="text-red-600"
                  size={24}
                />
              )}
            </div>

          </div>
        </div>
      </div>

      {/* Add / Edit Expense */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 mb-8">

        <div className="flex items-center justify-between mb-5">

          <h2 className="text-xl font-semibold text-gray-800">
            {editingId ? "Edit Expense" : "Add Expense"}
          </h2>

          {editingId && (
            <button
              onClick={resetForm}
              className="text-gray-500 hover:text-gray-700 flex items-center gap-1"
            >
              <X size={18} />
              Cancel
            </button>
          )}

        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5"
        >

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category *
            </label>

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">
                Select Category
              </option>

              {categories.map((category) => (
                <option
                  key={category}
                  value={category}
                >
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Amount */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Amount (₹) *
            </label>

            <input
              type="number"
              name="amount"
              min="1"
              step="0.01"
              value={formData.amount}
              onChange={handleChange}
              placeholder="Enter amount"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date *
            </label>

            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>

            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Optional description"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Button */}
          <div className="md:col-span-2 lg:col-span-4 flex justify-end">

            <button
              type="submit"
              disabled={loading}
              className="bg-green-700 hover:bg-green-800 text-white font-semibold rounded-xl px-6 py-3 flex items-center gap-2 transition disabled:opacity-50"
            >
              <Plus size={19} />

              {loading
                ? "Saving..."
                : editingId
                ? "Update Expense"
                : "Add Expense"}
            </button>

          </div>

        </form>
      </div>

      {/* Expense List */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">

        <div className="px-6 py-5 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">
            Expense History
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            {expenses.length} expense
            {expenses.length !== 1 ? "s" : ""} recorded
          </p>
        </div>

        {loading && expenses.length === 0 ? (
          <div className="p-10 text-center text-gray-500">
            Loading expenses...
          </div>
        ) : expenses.length === 0 ? (
          <div className="p-10 text-center">
            <Wallet
              size={45}
              className="mx-auto text-gray-400 mb-4"
            />

            <h3 className="text-lg font-semibold text-gray-700">
              No expenses recorded
            </h3>

            <p className="text-gray-500 mt-2">
              Add your first farming expense using the form above.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                    Category
                  </th>

                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                    Amount
                  </th>

                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                    Date
                  </th>

                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                    Description
                  </th>

                  <th className="text-center px-6 py-4 text-sm font-semibold text-gray-600">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">

                {expenses.map((expense) => (
                  <tr
                    key={expense.id}
                    className="hover:bg-gray-50"
                  >

                    <td className="px-6 py-4">
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                        {expense.category}
                      </span>
                    </td>

                    <td className="px-6 py-4 font-semibold text-gray-800">
                      ₹{Number(expense.amount).toLocaleString("en-IN")}
                    </td>

                    <td className="px-6 py-4 text-gray-600">
                      {expense.date}
                    </td>

                    <td className="px-6 py-4 text-gray-600">
                      {expense.description || "-"}
                    </td>

                    <td className="px-6 py-4">

                      <div className="flex justify-center gap-2">

                        <button
                          onClick={() => handleEdit(expense)}
                          className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100"
                          title="Edit"
                        >
                          <Pencil size={17} />
                        </button>

                        <button
                          onClick={() =>
                            handleDelete(expense.id)
                          }
                          className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100"
                          title="Delete"
                        >
                          <Trash2 size={17} />
                        </button>

                      </div>

                    </td>

                  </tr>
                ))}

              </tbody>

            </table>

          </div>
        )}

      </div>
    </div>
  );
}