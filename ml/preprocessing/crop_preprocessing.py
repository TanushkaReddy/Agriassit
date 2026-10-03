import pandas as pd
from pathlib import Path
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
import joblib

# -----------------------------
# Project Paths
# -----------------------------
BASE_DIR = Path(__file__).resolve().parents[2]

DATASET_PATH = BASE_DIR / "backend" / "datasets" / "crop" / "Crop_recommendation.csv"
MODEL_DIR = BASE_DIR / "backend" / "trained_models"

MODEL_DIR.mkdir(parents=True, exist_ok=True)

# -----------------------------
# Load Dataset
# -----------------------------
df = pd.read_csv(DATASET_PATH)

print("Dataset Loaded Successfully")
print(df.head())

# -----------------------------
# Features & Target
# -----------------------------
X = df.drop("label", axis=1)
y = df["label"]

# -----------------------------
# Encode Target Labels
# -----------------------------
label_encoder = LabelEncoder()
y_encoded = label_encoder.fit_transform(y)

# Save Label Encoder
joblib.dump(label_encoder, MODEL_DIR / "crop_label_encoder.pkl")

print("\nLabel Encoder Saved.")

# -----------------------------
# Train-Test Split
# -----------------------------
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y_encoded,
    test_size=0.2,
    random_state=42,
    stratify=y_encoded
)

print("\nTraining Samples :", len(X_train))
print("Testing Samples  :", len(X_test))

print("\nPreprocessing Completed Successfully!")

# Optional: Save processed data for training
joblib.dump((X_train, X_test, y_train, y_test), MODEL_DIR / "crop_processed_data.pkl")

print("Processed Dataset Saved.")