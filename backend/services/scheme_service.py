import json
from pathlib import Path

from schemas.scheme_schema import Scheme


BASE_DIR = Path(__file__).resolve().parents[1]
DATA_FILE = BASE_DIR / "datasets" / "schemes" / "government_schemes.json"


def load_schemes() -> list[dict]:
    with open(DATA_FILE, "r", encoding="utf-8") as file:
        data = json.load(file)

    return data["schemes"]


def get_schemes(
    state: str | None = None,
    category: str | None = None
) -> list[Scheme]:

    schemes = load_schemes()

    # Always include Central schemes
    filtered_schemes = [
        scheme for scheme in schemes
        if scheme["level"] == "Central"
    ]

    # Add schemes specific to the farmer's state/UT
    if state:
        state_normalized = state.strip().lower()

        state_schemes = [
            scheme for scheme in schemes
            if scheme["level"] in ["State", "UT"]
            and scheme["state"].strip().lower() == state_normalized
        ]

        filtered_schemes.extend(state_schemes)

    # Optional category filter
    if category:
        category_normalized = category.strip().lower()

        filtered_schemes = [
            scheme for scheme in filtered_schemes
            if scheme["category"].strip().lower() == category_normalized
        ]

    for scheme in filtered_schemes:
        scheme.setdefault("last_verified", "Not specified")

    return [Scheme(**scheme) for scheme in filtered_schemes]


def get_scheme_by_id(scheme_id: str) -> Scheme | None:

    schemes = load_schemes()

    for scheme in schemes:
        if scheme["id"].lower() == scheme_id.lower():
            return Scheme(**scheme)

    return None