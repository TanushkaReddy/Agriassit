import api from "./api";

/*
---------------------------------------
Crop Recommendation API
---------------------------------------
*/

export const predictCrop = async (cropData) => {
  const response = await api.post("/crop/predict", cropData);
  return response.data;
};