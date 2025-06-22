from pydantic import BaseModel
from typing import List, Literal
from enum import Enum

class Difficulty(str, Enum):
    EASY = "Easy"
    MEDIUM = "Medium"
    HARD = "Hard"

class PrepStyle(str, Enum):
    BULK_PREP = "bulk_prep"
    DAILY_LIGHT = "daily_light"
    MINIMAL_CLEANUP = "minimal_cleanup"

class Meal(BaseModel):
    name: str
    prepTime: str
    difficulty: Difficulty
    explanation: str
    ingredients: List[str]
    nutrition: List[str]

class DayMeals(BaseModel):
    day: str
    breakfast: Meal
    lunch: Meal
    dinner: Meal

class MealPlan(BaseModel):
    week: str
    prepStyle: PrepStyle
    meals: List[DayMeals]

class GroceryList(BaseModel):
    produce: List[str]
    protein: List[str]
    pantry: List[str]
    dairy: List[str]

class MealPlanAndGroceryResponse(BaseModel):
    meal_plan: MealPlan
    grocery_list: GroceryList