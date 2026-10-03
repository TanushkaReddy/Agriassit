import joblib
from pathlib import Path

from sklearn.ensemble import ExtraTreesRegressor
from sklearn.model_selection import GridSearchCV
from sklearn.metrics import r2_score, mean_absolute_error
import numpy as np

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
# Model
# ----------------------------------------------------

model = ExtraTreesRegressor(random_state=42)

# ----------------------------------------------------
# Parameters
# ----------------------------------------------------

param_grid = {
    "n_estimators": [100, 200],
    "max_depth": [None, 20],
    "min_samples_split": [2, 5],
    "min_samples_leaf": [1, 2]
}

# ----------------------------------------------------
# Grid Search
# ----------------------------------------------------

grid = GridSearchCV(
    estimator=model,
    param_grid=param_grid,
    cv=5,
    scoring="r2",
    n_jobs=-1,
    verbose=2
)

print("Training Started...\n")

grid.fit(X_train, y_train)

print("\nTraining Completed.")

# ----------------------------------------------------
# Best Model
# ----------------------------------------------------

best_model = grid.best_estimator_

predictions = best_model.predict(X_test)

r2 = r2_score(y_test, predictions)
mae = mean_absolute_error(y_test, predictions)
rmse = np.sqrt(((predictions - y_test) ** 2).mean())

print("\n")
print("=" * 70)
print("BEST PARAMETERS")
print("=" * 70)

print(grid.best_params_)

print("\n")
print("=" * 70)
print("FINAL RESULTS")
print("=" * 70)

print(f"R2 Score : {r2:.4f}")
print(f"MAE      : {mae:.4f}")
print(f"RMSE     : {rmse:.4f}")

# ----------------------------------------------------
# Save Model
# ----------------------------------------------------

joblib.dump(
    best_model,
    MODEL_DIR / "yield_model.pkl"
)

print("\nYield Model Saved Successfully.")