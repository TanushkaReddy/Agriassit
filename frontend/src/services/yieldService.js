import api from "./api";

// Get dropdown options
export const getYieldOptions = async () => {
  const response = await api.get("/yield/options");
  return response.data;
};

// Predict yield
export const predictYield = async (data) => {
  const response = await api.post("/yield/predict", data);
  return response.data;
};