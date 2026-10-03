import joblib
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parents[2]

MODEL_DIR = BASE_DIR / "backend" / "trained_models"

model = joblib.load(MODEL_DIR / "crop_model.pkl")
label_encoder = joblib.load(MODEL_DIR / "crop_label_encoder.pkl")


def predict_crop(N, P, K, temperature, humidity, ph, rainfall):

    prediction = model.predict([[
        N,
        P,
        K,
        temperature,
        humidity,
        ph,
        rainfall
    ]])

    crop = label_encoder.inverse_transform(prediction)[0]

    return crop