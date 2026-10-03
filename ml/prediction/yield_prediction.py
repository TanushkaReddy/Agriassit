import joblib
import pandas as pd

from pathlib import Path

# ----------------------------------------------------
# Paths
# ----------------------------------------------------

BASE_DIR = Path(__file__).resolve().parents[2]

MODEL_DIR = BASE_DIR / "backend" / "trained_models"

# ----------------------------------------------------
# Load Model
# ----------------------------------------------------

model = joblib.load(MODEL_DIR / "yield_model.pkl")

encoders = joblib.load(
    MODEL_DIR / "yield_label_encoders.pkl"
)

# ----------------------------------------------------
# Prediction Function
# ----------------------------------------------------

def predict_yield(
    crop,
    year,
    season,
    state,
    area,
    production,
    fertilizer,
    pesticide,
):

    # Clean User Input
    crop = crop.strip().title()
    season = season.strip().title()
    state = state.strip().title()

    # Encode
    crop = encoders["crop"].transform([crop])[0]
    season = encoders["season"].transform([season])[0]
    state = encoders["state"].transform([state])[0]

    # Create DataFrame
    sample = pd.DataFrame(
        [[
            crop,
            year,
            season,
            state,
            area,
            production,
            fertilizer,
            pesticide
        ]],
        columns=[
            "crop",
            "year",
            "season",
            "state",
            "area",
            "production",
            "fertilizer",
            "pesticide"
        ]
    )

    prediction = model.predict(sample)

    return round(float(prediction[0]), 2)