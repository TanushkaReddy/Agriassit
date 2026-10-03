import time
import joblib
import pandas as pd
from pathlib import Path
import numpy as np
from sklearn.linear_model import LinearRegression
from sklearn.tree import DecisionTreeRegressor
from sklearn.ensemble import RandomForestRegressor, GradientBoostingRegressor, ExtraTreesRegressor

from sklearn.metrics import (
    r2_score,
    mean_absolute_error,
    mean_squared_error
)

# ----------------------------------------------------
# Paths
# ----------------------------------------------------

BASE_DIR = Path(__file__).resolve().parents[2]
MODEL_DIR = BASE_DIR / "backend" / "trained_models"

# ----------------------------------------------------
# Load Data
# ----------------------------------------------------

X_train, X_test, y_train, y_test = joblib.load(
    MODEL_DIR / "yield_processed_data.pkl"
)

print("Dataset Loaded Successfully.\n")

# ----------------------------------------------------
# Models
# ----------------------------------------------------

models = {
    "Linear Regression": LinearRegression(),
    "Decision Tree": DecisionTreeRegressor(random_state=42),
    "Random Forest": RandomForestRegressor(random_state=42),
    "Gradient Boosting": GradientBoostingRegressor(random_state=42),
    "Extra Trees": ExtraTreesRegressor(random_state=42)
}

results = []

print("=" * 80)
print("YIELD MODEL COMPARISON")
print("=" * 80)

for name, model in models.items():

    print(f"\nTraining {name}...")

    start = time.time()

    model.fit(X_train, y_train)

    train_time = time.time() - start

    start = time.time()

    predictions = model.predict(X_test)

    predict_time = time.time() - start

    r2 = r2_score(y_test, predictions)

    mae = mean_absolute_error(y_test, predictions)

    rmse = np.sqrt(mean_squared_error(y_test, predictions))

    results.append({
        "Model": name,
        "R2 Score": round(r2, 4),
        "MAE": round(mae, 4),
        "RMSE": round(rmse, 4),
        "Training Time": round(train_time, 4),
        "Prediction Time": round(predict_time, 4)
    })

results_df = pd.DataFrame(results)

results_df = results_df.sort_values(
    by="R2 Score",
    ascending=False
)

print("\n")
print(results_df)

results_df.to_csv(
    MODEL_DIR / "yield_model_comparison.csv",
    index=False
)

print("\nComparison Report Saved Successfully.")

print("\n")
print("=" * 80)
print("BEST MODEL")
print("=" * 80)

print(results_df.iloc[0])