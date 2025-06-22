export interface Meals {
    breakfast: string;
    lunch: string;
    dinner: string;
  }
  
  export interface DayPlan {
    dayName: string;
    meals: Meals;
  }
  
  export interface MealPlan {
    weekly_plan: DayPlan[];
  }
  
  export interface GroceryItem {
    item: string;
    quantity: string;
    estimated_price: number;
    category?: string; // Optional property
  }
  
  export interface GroceryList {
    items: GroceryItem[];
  }
  
  export interface MealPlanAndGroceryResponse {
    meal_plan: MealPlan;
    grocery_list: GroceryList;
  }
  