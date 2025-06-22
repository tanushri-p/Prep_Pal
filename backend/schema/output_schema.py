from pydantic import BaseModel, Field
from typing import List, Dict, Optional

class Meals(BaseModel):
    breakfast: str = Field(description="Description of breakfast meal")
    lunch: str = Field(description="Description of lunch meal")
    dinner: str = Field(description="Description of dinner meal")

class DayPlan(BaseModel):
    dayName: str = Field(description="A day of the week (ex: Monday)")
    meals: Meals


class MealPlan(BaseModel):
    weekly_plan: List[DayPlan] = Field(description="A list of daily meal plans for the week")

class GroceryItem(BaseModel):
    item: str = Field(description="Name of the grocery item (e.g., 'Chicken Breast')")
    quantity: str = Field(description="Quantity needed (e.g., '500g', '2 units')")
    estimated_price: float = Field(description="Estimated price of the item in USD")
    category: Optional[str] = Field(None, description="Category of the item (e.g., 'Meat', 'Vegetables')")

class GroceryList(BaseModel):
    items: List[GroceryItem] = Field(description="A list of grocery items with quantities and estimated prices")

class MealPlanAndGroceryResponse(BaseModel):
    meal_plan: MealPlan
    grocery_list: GroceryList