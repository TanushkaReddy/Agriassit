import json
from pathlib import Path

from fastapi import HTTPException


# ============================================================
# PATHS
# ============================================================

BASE_DIR = Path(__file__).resolve().parents[1]

DATA_DIR = BASE_DIR / "datasets" / "fertilizer"


# ============================================================
# LOAD JSON FILES
# ============================================================

with open(
    DATA_DIR / "fertilizer_db.json",
    "r",
    encoding="utf-8"
) as f:
    FERTILIZER_DB = json.load(f)


with open(
    DATA_DIR / "crop_requirements.json",
    "r",
    encoding="utf-8"
) as f:
    CROP_REQUIREMENTS = json.load(f)


with open(
    DATA_DIR / "soil_interpretation.json",
    "r",
    encoding="utf-8"
) as f:
    SOIL_RULES = json.load(f)


# ============================================================
# VALIDATE CROP
# ============================================================

def validate_crop(crop: str):

    if not crop or not isinstance(crop, str):

        raise HTTPException(
            status_code=400,
            detail="Crop name is required."
        )

    crop = crop.strip()

    crop_map = {
        name.lower(): name
        for name in CROP_REQUIREMENTS.keys()
    }

    if crop.lower() not in crop_map:

        raise HTTPException(
            status_code=400,
            detail=f"Crop '{crop}' is not supported."
        )

    return crop_map[crop.lower()]


# ============================================================
# GET CROP REQUIREMENT
# ============================================================

def get_crop_requirement(crop):

    crop = validate_crop(crop)

    return CROP_REQUIREMENTS[crop]


# ============================================================
# INTERPRET SOIL
# ============================================================

def interpret_soil(
    nitrogen,
    phosphorus,
    potassium
):

    values = {
        "N": ("Nitrogen", nitrogen),
        "P": ("Phosphorus", phosphorus),
        "K": ("Potassium", potassium)
    }

    result = {}

    for nutrient, (json_name, value) in values.items():

        rules = SOIL_RULES[json_name]

        if (
            rules["low"]["min"]
            <= value
            <= rules["low"]["max"]
        ):

            result[nutrient] = "Low"

        elif (
            rules["medium"]["min"]
            <= value
            <= rules["medium"]["max"]
        ):

            result[nutrient] = "Medium"

        else:

            result[nutrient] = "High"

    return result


# ============================================================
# CALCULATE NUTRIENT DEFICIENCY
# ============================================================

def calculate_deficiency(
    crop,
    nitrogen,
    phosphorus,
    potassium
):

    requirement = get_crop_requirement(crop)

    deficiency = {

        "N": round(
            max(
                requirement["N"] - nitrogen,
                0
            ),
            2
        ),

        "P": round(
            max(
                requirement["P"] - phosphorus,
                0
            ),
            2
        ),

        "K": round(
            max(
                requirement["K"] - potassium,
                0
            ),
            2
        )
    }

    return deficiency


# ============================================================
# CHECK WHETHER FERTILIZER IS REQUIRED
# ============================================================

def fertilizer_required(deficiency):

    return any(
        value > 0
        for value in deficiency.values()
    )


# ============================================================
# CALCULATE FERTILIZER SCORE
# ============================================================

def score_fertilizer(
    fertilizer,
    deficiency
):
    """
    Scores a fertilizer according to
    the nutrients that are deficient.

    Higher score = better match.
    """

    nutrients = fertilizer.get(
        "nutrients",
        {}
    )

    score = 0

    for nutrient in ["N", "P", "K"]:

        deficit = deficiency.get(
            nutrient,
            0
        )

        percentage = nutrients.get(
            nutrient,
            0
        )

        if deficit > 0 and percentage > 0:

            score += (
                deficit * percentage
            )

    return score


# ============================================================
# GET BEST FERTILIZER
# ============================================================

def get_best_fertilizer(deficiency):

    candidates = []

    for name, fertilizer in FERTILIZER_DB.items():

        score = score_fertilizer(
            fertilizer,
            deficiency
        )

        if score <= 0:
            continue

        priority = fertilizer.get(
            "priority",
            999
        )

        candidates.append(
            (
                score,
                priority,
                name,
                fertilizer
            )
        )

    if not candidates:

        return None

    # Highest score first.
    # If score is equal, use priority.

    candidates.sort(
        key=lambda item: (
            -item[0],
            item[1]
        )
    )

    return candidates[0]


# ============================================================
# CALCULATE DOSAGE
# ============================================================

def calculate_dosage(
    fertilizer,
    deficiency
):
    """
    Calculates an estimated dosage based on
    the strongest nutrient match.

    The dosage is calculated from the nutrient
    with the highest contribution to the
    fertilizer-selection score.
    """

    nutrients = fertilizer.get(
        "nutrients",
        {}
    )

    candidates = []

    for nutrient in ["N", "P", "K"]:

        deficit = deficiency.get(
            nutrient,
            0
        )

        percentage = nutrients.get(
            nutrient,
            0
        )

        if (
            deficit > 0
            and percentage > 0
        ):

            quantity = (
                deficit
                /
                (percentage / 100)
            )

            contribution = (
                deficit * percentage
            )

            candidates.append(
                (
                    contribution,
                    quantity
                )
            )

    if not candidates:

        return 0.0

    # Use the nutrient that contributed most
    # to fertilizer selection.

    candidates.sort(
        key=lambda item: item[0],
        reverse=True
    )

    return round(
        candidates[0][1],
        2
    )


# ============================================================
# APPLICATION TIMING
# ============================================================

def get_application_timing(
    fertilizer
):
    """
    Converts fertilizer application method
    into simple farmer-friendly timing guidance.
    """

    methods = fertilizer.get(
        "application_method",
        []
    )

    timing = []

    method_text = " ".join(
        methods
    ).lower()

    if "basal" in method_text:

        timing.append(
            "Basal application"
        )

        timing.append(
            "Before sowing or at planting"
        )

    elif "top dressing" in method_text:

        timing.append(
            "During crop growth"
        )

    elif "fertigation" in method_text:

        timing.append(
            "During irrigation"
        )

    elif "foliar" in method_text:

        timing.append(
            "During active crop growth"
        )

    else:

        timing.append(
            "Apply according to crop stage"
        )

    return timing


# ============================================================
# GENERATE REASON
# ============================================================

def generate_reason(
    crop,
    fertilizer_name,
    fertilizer,
    deficiency
):

    nutrients = fertilizer.get(
        "nutrients",
        {}
    )

    deficient_nutrients = []

    supplied_nutrients = []

    for nutrient in ["N", "P", "K"]:

        deficit = deficiency.get(
            nutrient,
            0
        )

        percentage = nutrients.get(
            nutrient,
            0
        )

        if deficit > 0:

            deficient_nutrients.append(
                nutrient
            )

            if percentage > 0:

                supplied_nutrients.append(
                    nutrient
                )

    nutrient_names = {
        "N": "Nitrogen",
        "P": "Phosphorus",
        "K": "Potassium"
    }

    deficiency_text = ", ".join(
        nutrient_names[n]
        for n in deficient_nutrients
    )

    supplied_text = ", ".join(
        nutrient_names[n]
        for n in supplied_nutrients
    )

    if supplied_nutrients:

        return (
            f"{crop} has a deficiency in "
            f"{deficiency_text}. "
            f"{fertilizer_name} supplies "
            f"{supplied_text} and is the most "
            f"suitable fertilizer among the "
            f"available options for the identified "
            f"deficiency."
        )

    return (
        f"{fertilizer_name} was selected based "
        f"on the nutrient requirements of {crop}."
    )


# ============================================================
# MAIN RECOMMENDATION FUNCTION
# ============================================================

def recommend_fertilizer(request):

    # --------------------------------------------------------
    # 1. Validate crop
    # --------------------------------------------------------

    crop = validate_crop(
        request.crop
    )

    # --------------------------------------------------------
    # 2. Read soil values
    # --------------------------------------------------------

    nitrogen = request.nitrogen
    phosphorus = request.phosphorus
    potassium = request.potassium

    # --------------------------------------------------------
    # 3. Interpret soil
    # --------------------------------------------------------

    soil_status = interpret_soil(
        nitrogen,
        phosphorus,
        potassium
    )

    # --------------------------------------------------------
    # 4. Calculate deficiency
    # --------------------------------------------------------

    deficiency = calculate_deficiency(
        crop,
        nitrogen,
        phosphorus,
        potassium
    )

    # --------------------------------------------------------
    # 5. Check if fertilizer is required
    # --------------------------------------------------------

    if not fertilizer_required(
        deficiency
    ):

        raise HTTPException(
            status_code=200,
            detail=(
                "The available soil nutrients "
                "already satisfy the selected "
                "crop requirement."
            )
        )

    # --------------------------------------------------------
    # 6. Select best fertilizer
    # --------------------------------------------------------

    selected = get_best_fertilizer(
        deficiency
    )

    if selected is None:

        raise HTTPException(
            status_code=404,
            detail=(
                "No suitable fertilizer was found "
                "for the identified nutrient deficiency."
            )
        )

    (
        score,
        priority,
        fertilizer_name,
        fertilizer
    ) = selected

    # --------------------------------------------------------
    # 7. Calculate dosage
    # --------------------------------------------------------

    dosage = calculate_dosage(
        fertilizer,
        deficiency
    )

    # --------------------------------------------------------
    # 8. Application timing
    # --------------------------------------------------------

    application_timing = (
        get_application_timing(
            fertilizer
        )
    )

    # --------------------------------------------------------
    # 9. Application method
    # --------------------------------------------------------

    application_method = fertilizer.get(
        "application_method",
        []
    )

    # --------------------------------------------------------
    # 10. Benefits
    # --------------------------------------------------------

    benefits = fertilizer.get(
        "benefits",
        []
    )

    # --------------------------------------------------------
    # 11. Precautions
    # --------------------------------------------------------

    precautions = fertilizer.get(
        "precautions",
        []
    )

    # --------------------------------------------------------
    # 12. Reason
    # --------------------------------------------------------

    reason = generate_reason(
        crop,
        fertilizer_name,
        fertilizer,
        deficiency
    )

    # --------------------------------------------------------
    # 13. Final response
    # --------------------------------------------------------

    return {

        "recommended_fertilizer": {

            "name": fertilizer_name,

            "type": fertilizer.get(
                "type",
                "Fertilizer"
            )
        },

        "reason": reason,

        "deficiency": deficiency,

        "dosage": (
            f"{dosage} kg/ha"
        ),

        "application_timing":
            application_timing,

        "application_method":
            application_method,

        "benefits":
            benefits,

        "precautions":
            precautions
    }


# ============================================================
# OPTIONAL HELPERS
# ============================================================

def get_supported_crops():

    return sorted(
        CROP_REQUIREMENTS.keys()
    )


def get_available_fertilizers():

    return sorted(
        FERTILIZER_DB.keys()
    )