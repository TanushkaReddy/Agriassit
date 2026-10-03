from pydantic import BaseModel, Field
from typing import List, Optional


class ExpenseCreate(BaseModel):
    category: str = Field(..., min_length=2)
    amount: float = Field(..., gt=0)
    date: str
    description: Optional[str] = None


class ExpenseUpdate(BaseModel):
    category: Optional[str] = None
    amount: Optional[float] = Field(default=None, gt=0)
    date: Optional[str] = None
    description: Optional[str] = None


class Expense(BaseModel):
    id: int
    farmer_id: int
    category: str
    amount: float
    date: str
    description: Optional[str] = None


class ExpenseResponse(BaseModel):
    total_expense: float
    expenses: List[Expense]


class FinancialSummary(BaseModel):
    total_expense: float
    expected_revenue: float
    estimated_profit_loss: float