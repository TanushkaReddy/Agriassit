from pathlib import Path
import json


# ============================================================
# Load Soil Interpretation Rules
# ============================================================

BASE_DIR = Path(__file__).resolve().parents[1]
DATA_DIR = BASE_DIR / "datasets" / "fertilizer"

with open(DATA_DIR / "soil_interpretation.json", "r") as file:
    SOIL_RULES = json.load(file)


# ============================================================
# Get Nutrient Status
# ============================================================

def get_nutrient_status(nutrient: str, value: float) -> str:

    nutrient_map = {
        "N": "Nitrogen",
        "P": "Phosphorus",
        "K": "Potassium"
    }

    json_name = nutrient_map[nutrient]

    rules = SOIL_RULES[json_name]

    if rules["low"]["min"] <= value <= rules["low"]["max"]:
        return "Low"

    elif rules["medium"]["min"] <= value <= rules["medium"]["max"]:
        return "Medium"

    else:
        return "High"


# ============================================================
# Get Nutrient Recommendation
# ============================================================

def get_recommendation(nutrient: str, status: str) -> str:

    recommendations = {
        "N": {
            "Low": "Improve nitrogen availability using suitable nitrogen sources or organic manure.",
            "Medium": "Maintain nitrogen at an adequate level.",
            "High": "Avoid excessive nitrogen fertilizer application."
        },

        "P": {
            "Low": "Improve phosphorus availability using suitable phosphorus fertilizer.",
            "Medium": "Maintain phosphorus at an adequate level.",
            "High": "Avoid excessive phosphorus fertilizer application."
        },

        "K": {
            "Low": "Improve potassium availability using suitable potassium fertilizer.",
            "Medium": "Maintain potassium at an adequate level.",
            "High": "Avoid excessive potassium fertilizer application."
        }
    }

    return recommendations[nutrient][status]


# ============================================================
# Analyze Soil Health
# ============================================================

def analyze_soil_health(
    nitrogen: float,
    phosphorus: float,
    potassium: float
):

    nutrient_values = {
        "N": nitrogen,
        "P": phosphorus,
        "K": potassium
    }

    nutrients = {}
    low_count = 0
    high_count = 0

    for nutrient, value in nutrient_values.items():

        status = get_nutrient_status(nutrient, value)

        recommendation = get_recommendation(
            nutrient,
            status
        )

        nutrients[nutrient] = {
            "value": value,
            "status": status,
            "recommendation": recommendation
        }

        if status == "Low":
            low_count += 1

        elif status == "High":
            high_count += 1


    # ========================================================
    # Determine Overall Soil Health
    # ========================================================

    if low_count >= 2:
        overall_status = "Poor"
        overall_message = (
            "The soil has multiple nutrient deficiencies "
            "and requires improvement."
        )

    elif low_count == 1:
        overall_status = "Needs Improvement"
        overall_message = (
            "The soil has a nutrient deficiency that "
            "requires attention."
        )

    elif high_count >= 2:
        overall_status = "Nutrient Rich"
        overall_message = (
            "The soil contains high levels of multiple nutrients. "
            "Avoid excessive fertilizer application."
        )

    else:
        overall_status = "Healthy"
        overall_message = (
            "The soil nutrient levels are generally adequate."
        )


    # ========================================================
    # Overall Recommendations
    # ========================================================

    recommendations = []

    for nutrient, data in nutrients.items():

        if data["status"] == "Low":
            recommendations.append(
                data["recommendation"]
            )

        elif data["status"] == "High":
            recommendations.append(
                data["recommendation"]
            )

    if not recommendations:
        recommendations.append(
            "Maintain current soil management practices "
            "and monitor nutrient levels regularly."
        )


    return {
        "overall_status": overall_status,
        "overall_message": overall_message,
        "nutrients": nutrients,
        "recommendations": recommendations
    }