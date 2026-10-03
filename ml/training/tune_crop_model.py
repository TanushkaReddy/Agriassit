import joblib
from pathlib import Path

from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import GridSearchCV
from sklearn.metrics import accuracy_score

# ----------------------------------------------------
# Paths
# ----------------------------------------------------

BASE_DIR = Path(__file__).resolve().parents[2]
MODEL_DIR = BASE_DIR / "backend" / "trained_models"

# ----------------------------------------------------
# Load Data
# ----------------------------------------------------

X_train, X_test, y_train, y_test = joblib.load(
    MODEL_DIR / "crop_processed_data.pkl"
)

print("Dataset Loaded Successfully.\n")

# ----------------------------------------------------
# Base Model
# ----------------------------------------------------

rf = RandomForestClassifier(random_state=42)

# ----------------------------------------------------
# Parameter Grid
# ----------------------------------------------------

param_grid = {
    "n_estimators": [100, 200, 300],
    "max_depth": [10, 20, None],
    "min_samples_split": [2, 5],
    "min_samples_leaf": [1, 2]
}

print("Starting Grid Search...\n")

grid = GridSearchCV(
    estimator=rf,
    param_grid=param_grid,
    cv=5,
    scoring="accuracy",
    n_jobs=-1,
    verbose=2
)

grid.fit(X_train, y_train)

print("\nGrid Search Completed.")

print("\nBest Parameters:")
print(grid.best_params_)

print("\nBest Cross Validation Accuracy:")
print(grid.best_score_)

# ----------------------------------------------------
# Evaluate on Test Set
# ----------------------------------------------------

best_model = grid.best_estimator_

predictions = best_model.predict(X_test)

accuracy = accuracy_score(y_test, predictions)

print("\nTest Accuracy:")
print(round(accuracy * 100, 2), "%")

# ----------------------------------------------------
# Save Tuned Model
# ----------------------------------------------------

joblib.dump(best_model, MODEL_DIR / "crop_model.pkl")

print("\nFinal Model Saved Successfully!")