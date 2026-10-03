import json
from pathlib import Path

from schemas.expense_schema import (
    Expense,
    FinancialSummary
)


BASE_DIR = Path(__file__).resolve().parents[1]

DATA_FILE = (
    BASE_DIR
    / "datasets"
    / "expenses"
    / "expenses.json"
)


def load_expenses() -> list[dict]:
    if not DATA_FILE.exists():
        return []

    with open(DATA_FILE, "r", encoding="utf-8") as file:
        data = json.load(file)

    return data.get("expenses", [])


def save_expenses(expenses: list[dict]):
    DATA_FILE.parent.mkdir(parents=True, exist_ok=True)

    with open(DATA_FILE, "w", encoding="utf-8") as file:
        json.dump(
            {"expenses": expenses},
            file,
            indent=2
        )


def get_expenses(farmer_id: int) -> list[Expense]:
    expenses = load_expenses()

    farmer_expenses = [
        expense
        for expense in expenses
        if expense["farmer_id"] == farmer_id
    ]

    return [
        Expense(**expense)
        for expense in farmer_expenses
    ]


def add_expense(
    farmer_id: int,
    category: str,
    amount: float,
    date: str,
    description: str | None = None
) -> Expense:

    expenses = load_expenses()

    new_id = (
        max(
            [expense["id"] for expense in expenses],
            default=0
        ) + 1
    )

    new_expense = {
        "id": new_id,
        "farmer_id": farmer_id,
        "category": category,
        "amount": amount,
        "date": date,
        "description": description
    }

    expenses.append(new_expense)

    save_expenses(expenses)

    return Expense(**new_expense)


def update_expense(
    farmer_id: int,
    expense_id: int,
    category: str | None = None,
    amount: float | None = None,
    date: str | None = None,
    description: str | None = None
) -> Expense | None:

    expenses = load_expenses()

    for expense in expenses:

        if (
            expense["id"] == expense_id
            and expense["farmer_id"] == farmer_id
        ):

            if category is not None:
                expense["category"] = category

            if amount is not None:
                expense["amount"] = amount

            if date is not None:
                expense["date"] = date

            if description is not None:
                expense["description"] = description

            save_expenses(expenses)

            return Expense(**expense)

    return None


def delete_expense(
    farmer_id: int,
    expense_id: int
) -> bool:

    expenses = load_expenses()

    updated_expenses = [
        expense
        for expense in expenses
        if not (
            expense["id"] == expense_id
            and expense["farmer_id"] == farmer_id
        )
    ]

    if len(updated_expenses) == len(expenses):
        return False

    save_expenses(updated_expenses)

    return True


def get_financial_summary(
    farmer_id: int,
    expected_revenue: float = 0
) -> FinancialSummary:

    expenses = get_expenses(farmer_id)

    total_expense = sum(
        expense.amount
        for expense in expenses
    )

    estimated_profit_loss = (
        expected_revenue - total_expense
    )

    return FinancialSummary(
        total_expense=total_expense,
        expected_revenue=expected_revenue,
        estimated_profit_loss=estimated_profit_loss
    )