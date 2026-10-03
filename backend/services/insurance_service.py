import json
from pathlib import Path

from schemas.insurance_schema import InsuranceScheme


BASE_DIR = Path(__file__).resolve().parents[1]

DATA_FILE = (
    BASE_DIR
    / "datasets"
    / "insurance"
    / "crop_insurance.json"
)


def load_insurance_schemes() -> list[dict]:
    with open(DATA_FILE, "r", encoding="utf-8") as file:
        data = json.load(file)

    return data["schemes"]


def get_insurance_schemes(
    state: str | None = None,
    crop: str | None = None
) -> list[InsuranceScheme]:

    schemes = load_insurance_schemes()

    filtered_schemes = schemes

    # Filter by state
    if state:
        state_normalized = state.strip().lower()

        filtered_schemes = [
            scheme
            for scheme in filtered_schemes
            if scheme["state"].strip().lower() in [
                state_normalized,
                "all"
            ]
        ]

    # Filter by crop
    if crop:
        crop_normalized = crop.strip().lower()

        filtered_schemes = [
            scheme
            for scheme in filtered_schemes
            if scheme["crop"].strip().lower() in [
                crop_normalized,
                "all"
            ]
        ]

    return [
        InsuranceScheme(**scheme)
        for scheme in filtered_schemes
    ]


def get_insurance_by_id(
    insurance_id: str
) -> InsuranceScheme | None:

    schemes = load_insurance_schemes()

    for scheme in schemes:
        if scheme["id"].lower() == insurance_id.lower():
            return InsuranceScheme(**scheme)

    return None