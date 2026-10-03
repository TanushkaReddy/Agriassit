import joblib
import pandas as pd

from pathlib import Path
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder

# ----------------------------------------------------
# Paths
# ----------------------------------------------------

BASE_DIR = Path(__file__).resolve().parents[2]

DATASET_PATH = BASE_DIR / "backend" / "datasets" / "yield" / "crop_yield.csv"

MODEL_DIR = BASE_DIR / "backend" / "trained_models"

# ----------------------------------------------------
# Load Dataset
# ----------------------------------------------------

df = pd.read_csv(DATASET_PATH)

print("Dataset Loaded Successfully.")
print(df.shape)

# ----------------------------------------------------
# Clean Text Columns
# ----------------------------------------------------

text_columns = ["crop", "season", "state"]

for col in text_columns:
    df[col] = (
        df[col]
        .astype(str)
        .str.strip()
        .str.title()
    )

print("\nText Cleaning Completed.")

# ----------------------------------------------------
# Encode Categorical Columns
# ----------------------------------------------------

encoders = {}

for col in text_columns:

    encoder = LabelEncoder()

    df[col] = encoder.fit_transform(df[col])

    encoders[col] = encoder

print("Categorical Encoding Completed.")

# ----------------------------------------------------
# Features & Target
# ----------------------------------------------------

X = df.drop(columns=["yield"])

y = df["yield"]

# ----------------------------------------------------
# Train Test Split
# ----------------------------------------------------

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)

# ----------------------------------------------------
# Save
# ----------------------------------------------------

MODEL_DIR.mkdir(exist_ok=True)

joblib.dump(
    (X_train, X_test, y_train, y_test),
    MODEL_DIR / "yield_processed_data.pkl"
)

joblib.dump(
    encoders,
    MODEL_DIR / "yield_label_encoders.pkl"
)

print("\nProcessed Dataset Saved Successfully.")
print("Preprocessing Completed.")