import joblib
import time
import pandas as pd

from pathlib import Path

from sklearn.linear_model import LogisticRegression
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.neighbors import KNeighborsClassifier
from sklearn.svm import SVC
from sklearn.naive_bayes import GaussianNB

from sklearn.metrics import (
    accuracy_score,
    precision_score,
    recall_score,
    f1_score,
)

# ---------------------------------------------------
# Paths
# ---------------------------------------------------

BASE_DIR = Path(__file__).resolve().parents[2]

MODEL_DIR = BASE_DIR / "backend" / "trained_models"

# ---------------------------------------------------
# Load processed data
# ---------------------------------------------------

X_train, X_test, y_train, y_test = joblib.load(
    MODEL_DIR / "crop_processed_data.pkl"
)

print("\nDataset Loaded Successfully.\n")

# ---------------------------------------------------
# Models
# ---------------------------------------------------

models = {

    "Logistic Regression":
        LogisticRegression(max_iter=1000),

    "Decision Tree":
        DecisionTreeClassifier(random_state=42),

    "Random Forest":
        RandomForestClassifier(random_state=42),

    "KNN":
        KNeighborsClassifier(),

    "SVM":
        SVC(),

    "Naive Bayes":
        GaussianNB()
}

results = []

print("=" * 80)
print("MODEL COMPARISON")
print("=" * 80)

# ---------------------------------------------------
# Train Every Model
# ---------------------------------------------------

for name, model in models.items():

    print(f"\nTraining {name}...")

    start = time.time()

    model.fit(X_train, y_train)

    training_time = time.time() - start

    start = time.time()

    predictions = model.predict(X_test)

    prediction_time = time.time() - start

    accuracy = accuracy_score(y_test, predictions)

    precision = precision_score(
        y_test,
        predictions,
        average="weighted",
        zero_division=0
    )

    recall = recall_score(
        y_test,
        predictions,
        average="weighted",
        zero_division=0
    )

    f1 = f1_score(
        y_test,
        predictions,
        average="weighted",
        zero_division=0
    )

    results.append([
        name,
        accuracy,
        precision,
        recall,
        f1,
        training_time,
        prediction_time
    ])

# ---------------------------------------------------
# Comparison Table
# ---------------------------------------------------

results_df = pd.DataFrame(
    results,
    columns=[
        "Model",
        "Accuracy",
        "Precision",
        "Recall",
        "F1 Score",
        "Training Time",
        "Prediction Time"
    ]
)

results_df = results_df.sort_values(
    by="Accuracy",
    ascending=False
)

print("\n")
print(results_df)

# ---------------------------------------------------
# Save Results
# ---------------------------------------------------

results_path = MODEL_DIR / "crop_model_comparison.csv"

results_df.to_csv(results_path, index=False)

print("\nComparison Report Saved Successfully.")
print(results_path)

# ---------------------------------------------------
# Best Model
# ---------------------------------------------------

best_model = results_df.iloc[0]

print("\n")
print("=" * 80)
print("BEST MODEL")
print("=" * 80)

print(best_model)