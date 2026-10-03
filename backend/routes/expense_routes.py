from fastapi import APIRouter, HTTPException, Query

from schemas.expense_schema import (
    Expense,
    ExpenseCreate,
    ExpenseUpdate,
    ExpenseResponse,
    FinancialSummary
)

from services.expense_service import (
    get_expenses,
    add_expense,
    update_expense,
    delete_expense,
    get_financial_summary
)


router = APIRouter(
    prefix="/expenses",
    tags=["Expense Tracker"]
)


@router.get("", response_model=ExpenseResponse)
def get_farmer_expenses(
    farmer_id: int = Query(...)
):
    expenses = get_expenses(farmer_id)

    total_expense = sum(
        expense.amount
        for expense in expenses
    )

    return {
        "total_expense": total_expense,
        "expenses": expenses
    }


@router.post("", response_model=Expense)
def create_expense(
    expense: ExpenseCreate,
    farmer_id: int = Query(...)
):
    return add_expense(
        farmer_id=farmer_id,
        category=expense.category,
        amount=expense.amount,
        date=expense.date,
        description=expense.description
    )


@router.put("/{expense_id}", response_model=Expense)
def edit_expense(
    expense_id: int,
    expense: ExpenseUpdate,
    farmer_id: int = Query(...)
):
    updated_expense = update_expense(
        farmer_id=farmer_id,
        expense_id=expense_id,
        category=expense.category,
        amount=expense.amount,
        date=expense.date,
        description=expense.description
    )

    if updated_expense is None:
        raise HTTPException(
            status_code=404,
            detail="Expense not found"
        )

    return updated_expense


@router.delete("/{expense_id}")
def remove_expense(
    expense_id: int,
    farmer_id: int = Query(...)
):
    deleted = delete_expense(
        farmer_id=farmer_id,
        expense_id=expense_id
    )

    if not deleted:
        raise HTTPException(
            status_code=404,
            detail="Expense not found"
        )

    return {
        "message": "Expense deleted successfully"
    }


@router.get(
    "/summary",
    response_model=FinancialSummary
)
def get_summary(
    farmer_id: int = Query(...),
    expected_revenue: float = Query(default=0, ge=0)
):
    return get_financial_summary(
        farmer_id=farmer_id,
        expected_revenue=expected_revenue
    )