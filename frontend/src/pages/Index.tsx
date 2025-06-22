
import React, { useState } from 'react';
import HeroSection from '@/components/HeroSection';
import ConversationInterface from '@/components/ConversationInterface';
import MealPlanDisplay from '@/components/MealPlanDisplay';
import GroceryList from '@/components/GroceryList';

export type AppState = 'hero' | 'conversation' | 'meal-plan' | 'grocery-list';
export type PrepStyle = 'bulk_prep' | 'daily_light' | 'minimal_cleanup';

export interface UserPreferences {
  dietary: string[];
  timeConstraints: string;
  familySize: number;
  prepStyle?: PrepStyle;
}

export interface MealPlan {
  week: string;
  prepStyle: PrepStyle;
  meals: DayMeals[];
}

export interface DayMeals {
  day: string;
  breakfast: Meal;
  lunch: Meal;
  dinner: Meal;
}

export interface Meal {
  name: string;
  prepTime: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  explanation: string;
  ingredients: string[];
  nutrition: string[];
}

export interface GroceryData {
  produce: string[];
  protein: string[];
  pantry: string[];
  dairy: string[];
}

const Index = () => {

  const [currentState, setCurrentState] = useState<AppState>('hero');
  const [userPreferences, setUserPreferences] = useState<UserPreferences>({
    dietary: [],
    timeConstraints: '',
    familySize: 1
  });
  const [mealPlan, setMealPlan] = useState<MealPlan | null>(null);
  const [groceryList, setGroceryList] = useState<GroceryData | null>(null);

  const handleInputSubmit = async (input: string, isVoice: boolean = false) => {
  console.log('Input received:', input, 'Voice:', isVoice);

  try {
  // Make POST request to your FastAPI backend
  const response = await fetch('http://localhost:8000/generate-meal-plan-simple', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      prompt: input
    })
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  console.log('API Response:', data.response.meal_plan);

  setMealPlan(data.response.meal_plan);
  console.log('THIS IS WORKING #1');
  setGroceryList(data.response.grocery_list);
  console.log('THIS IS WORKING #2');
  setCurrentState('meal-plan');
  console.log('THIS IS WORKING #3');

  } catch {
    // const mockMealPlan: MealPlan = {
    //   week: '2024-01-15',
    //   prepStyle: 'daily_light',
    //   meals: [
    //     {
    //       day: 'Monday',
    //       breakfast: {
    //         name: 'Overnight Oats with Berries',
    //         prepTime: '5 min',
    //         difficulty: 'Easy',
    //         explanation: 'High fiber start that uses berries you\'ll have all week. Perfect for busy mornings.',
    //         ingredients: ['oats', 'berries', 'yogurt', 'honey'],
    //         nutrition: ['High Fiber', 'Protein', 'Antioxidants']
    //       },
    //       lunch: {
    //         name: 'Mediterranean Quinoa Bowl',
    //         prepTime: '15 min',
    //         difficulty: 'Easy',
    //         explanation: 'Protein-packed quinoa with fresh vegetables. Can be prepped in bulk.',
    //         ingredients: ['quinoa', 'cucumber', 'tomatoes', 'feta', 'olive oil'],
    //         nutrition: ['Complete Protein', 'Healthy Fats', 'Vitamins']
    //       },
    //       dinner: {
    //         name: 'Herb-Crusted Salmon',
    //         prepTime: '25 min',
    //         difficulty: 'Medium',
    //         explanation: 'Omega-3 rich salmon with herbs you\'ll use throughout the week.',
    //         ingredients: ['salmon', 'herbs', 'lemon', 'asparagus'],
    //         nutrition: ['Omega-3', 'Protein', 'B Vitamins']
    //       }
    //     },
    //     {
    //       day: 'Tuesday',
    //       breakfast: {
    //         name: 'Greek Yogurt Parfait',
    //         prepTime: '3 min',
    //         difficulty: 'Easy',
    //         explanation: 'Quick protein boost using the same berries and yogurt from yesterday.',
    //         ingredients: ['yogurt', 'berries', 'granola', 'honey'],
    //         nutrition: ['Probiotics', 'Protein', 'Fiber']
    //       },
    //       lunch: {
    //         name: 'Leftover Quinoa Wrap',
    //         prepTime: '10 min',
    //         difficulty: 'Easy',
    //         explanation: 'Transform yesterday\'s quinoa bowl into a portable wrap.',
    //         ingredients: ['quinoa bowl', 'tortilla', 'hummus', 'spinach'],
    //         nutrition: ['Complete Protein', 'Fiber', 'Iron']
    //       },
    //       dinner: {
    //         name: 'One-Pot Chicken & Vegetables',
    //         prepTime: '30 min',
    //         difficulty: 'Easy',
    //         explanation: 'Minimal cleanup dinner that provides protein for tomorrow\'s lunch.',
    //         ingredients: ['chicken', 'mixed vegetables', 'herbs', 'broth'],
    //         nutrition: ['Lean Protein', 'Vitamins', 'Minerals']
    //       }
    //     },
    //     {
    //       day: 'Wednesday',
    //       breakfast: {
    //         name: 'Avocado Toast with Egg',
    //         prepTime: '8 min',
    //         difficulty: 'Easy',
    //         explanation: 'Healthy fats and protein to power through mid-week.',
    //         ingredients: ['avocado', 'bread', 'egg', 'tomato'],
    //         nutrition: ['Healthy Fats', 'Protein', 'Fiber']
    //       },
    //       lunch: {
    //         name: 'Chicken Salad from Yesterday',
    //         prepTime: '5 min',
    //         difficulty: 'Easy',
    //         explanation: 'Using leftover chicken in a fresh, crunchy salad.',
    //         ingredients: ['leftover chicken', 'lettuce', 'carrots', 'dressing'],
    //         nutrition: ['Lean Protein', 'Vitamins', 'Fiber']
    //       },
    //       dinner: {
    //         name: 'Vegetarian Stir-Fry',
    //         prepTime: '20 min',
    //         difficulty: 'Easy',
    //         explanation: 'Colorful vegetables with tofu for a plant-based protein boost.',
    //         ingredients: ['tofu', 'bell peppers', 'broccoli', 'soy sauce', 'rice'],
    //         nutrition: ['Plant Protein', 'Vitamins', 'Antioxidants']
    //       }
    //     },
    //     {
    //       day: 'Thursday',
    //       breakfast: {
    //         name: 'Smoothie Bowl',
    //         prepTime: '5 min',
    //         difficulty: 'Easy',
    //         explanation: 'Blend of fruits and protein powder for a nutritious start.',
    //         ingredients: ['banana', 'berries', 'protein powder', 'granola'],
    //         nutrition: ['Protein', 'Vitamins', 'Antioxidants']
    //       },
    //       lunch: {
    //         name: 'Quinoa Stuffed Bell Peppers',
    //         prepTime: '25 min',
    //         difficulty: 'Medium',
    //         explanation: 'Hearty lunch using quinoa and vegetables for balanced nutrition.',
    //         ingredients: ['bell peppers', 'quinoa', 'black beans', 'cheese'],
    //         nutrition: ['Complete Protein', 'Fiber', 'Vitamins']
    //       },
    //       dinner: {
    //         name: 'Baked Cod with Sweet Potato',
    //         prepTime: '30 min',
    //         difficulty: 'Easy',
    //         explanation: 'Light fish dinner with complex carbs from sweet potato.',
    //         ingredients: ['cod', 'sweet potato', 'green beans', 'lemon'],
    //         nutrition: ['Lean Protein', 'Complex Carbs', 'Vitamins']
    //       }
    //     },
    //     {
    //       day: 'Friday',
    //       breakfast: {
    //         name: 'Whole Grain Pancakes',
    //         prepTime: '15 min',
    //         difficulty: 'Medium',
    //         explanation: 'Weekend-worthy breakfast that\'s still nutritious and filling.',
    //         ingredients: ['whole grain flour', 'eggs', 'milk', 'berries'],
    //         nutrition: ['Fiber', 'Protein', 'Antioxidants']
    //       },
    //       lunch: {
    //         name: 'Asian Lettuce Wraps',
    //         prepTime: '15 min',
    //         difficulty: 'Easy',
    //         explanation: 'Light, fresh lunch with ground turkey for lean protein.',
    //         ingredients: ['ground turkey', 'lettuce', 'carrots', 'ginger', 'soy sauce'],
    //         nutrition: ['Lean Protein', 'Vitamins', 'Low Carb']
    //       },
    //       dinner: {
    //         name: 'Pasta Primavera',
    //         prepTime: '25 min',
    //         difficulty: 'Easy',
    //         explanation: 'Comforting pasta with seasonal vegetables for a satisfying end to the week.',
    //         ingredients: ['whole grain pasta', 'zucchini', 'cherry tomatoes', 'parmesan'],
    //         nutrition: ['Complex Carbs', 'Fiber', 'Vitamins']
    //       }
    //     },
    //     {
    //       day: 'Saturday',
    //       breakfast: {
    //         name: 'Weekend Breakfast Hash',
    //         prepTime: '20 min',
    //         difficulty: 'Medium',
    //         explanation: 'Hearty weekend breakfast with potatoes, eggs, and vegetables.',
    //         ingredients: ['potatoes', 'eggs', 'bell peppers', 'onions', 'cheese'],
    //         nutrition: ['Protein', 'Complex Carbs', 'Vitamins']
    //       },
    //       lunch: {
    //         name: 'Grilled Chicken Caesar Salad',
    //         prepTime: '20 min',
    //         difficulty: 'Easy',
    //         explanation: 'Classic salad with grilled chicken for a satisfying weekend lunch.',
    //         ingredients: ['chicken breast', 'romaine', 'parmesan', 'caesar dressing'],
    //         nutrition: ['Lean Protein', 'Calcium', 'Vitamins']
    //       },
    //       dinner: {
    //         name: 'Beef and Vegetable Kebabs',
    //         prepTime: '30 min',
    //         difficulty: 'Medium',
    //         explanation: 'Perfect for weekend grilling with colorful vegetables.',
    //         ingredients: ['beef', 'bell peppers', 'onions', 'zucchini', 'marinade'],
    //         nutrition: ['Protein', 'Iron', 'Vitamins']
    //       }
    //     },
    //     {
    //       day: 'Sunday',
    //       breakfast: {
    //         name: 'Sunday Brunch Frittata',
    //         prepTime: '25 min',
    //         difficulty: 'Medium',
    //         explanation: 'Elegant brunch dish that can feed the family and provide leftovers.',
    //         ingredients: ['eggs', 'spinach', 'mushrooms', 'cheese', 'herbs'],
    //         nutrition: ['Protein', 'Vitamins', 'Healthy Fats']
    //       },
    //       lunch: {
    //         name: 'Soup and Sandwich Combo',
    //         prepTime: '15 min',
    //         difficulty: 'Easy',
    //         explanation: 'Comforting Sunday lunch with homemade soup and grilled sandwich.',
    //         ingredients: ['bread', 'cheese', 'tomatoes', 'soup', 'herbs'],
    //         nutrition: ['Comfort Food', 'Balanced', 'Satisfying']
    //       },
    //       dinner: {
    //         name: 'Sunday Roast Chicken',
    //         prepTime: '45 min',
    //         difficulty: 'Medium',
    //         explanation: 'Traditional Sunday dinner that provides leftovers for the week ahead.',
    //         ingredients: ['whole chicken', 'root vegetables', 'herbs', 'potatoes'],
    //         nutrition: ['Protein', 'Vitamins', 'Comfort Food']
    //       }
    //     }
    //   ]
    // };

    // const mockGroceryList: GroceryData = {
    //   produce: [
    //     '2 cups mixed berries', '3 bell peppers', '2 cucumbers', '1 lb asparagus', 
    //     '3 lemons', 'fresh herbs bundle', '2 avocados', '1 lb carrots', 
    //     '2 heads broccoli', '1 lb green beans', '2 sweet potatoes', 
    //     '2 zucchini', '1 lb cherry tomatoes', '3 onions', '1 bunch spinach',
    //     '2 heads romaine lettuce'
    //   ],
    //   protein: [
    //     '2 lbs salmon fillets', '2 lbs chicken breast', '1 whole chicken',
    //     '1 lb ground turkey', '1 lb cod fillets', '1 lb beef for kebabs',
    //     '2 dozen eggs', '1 block tofu'
    //   ],
    //   pantry: [
    //     '2 cups quinoa', '1 lb rolled oats', 'olive oil', 'honey', 'granola',
    //     'chicken broth', 'whole grain flour', 'whole grain pasta', 'rice',
    //     'soy sauce', 'protein powder', 'black beans', 'marinade ingredients'
    //   ],
    //   dairy: [
    //     '2 containers Greek yogurt', '8oz feta cheese', '1 lb cheese (various)',
    //     '1 gallon milk', 'parmesan cheese', 'caesar dressing'
    //   ]
    // };

    // setMealPlan(mockMealPlan);
    // setGroceryList(mockGroceryList);
    // setCurrentState('meal-plan');
    console.log('ERROR');


  }
  
    


    
  };

  const handleViewGroceryList = () => {
    setCurrentState('grocery-list');
  };

  const handleBackToMealPlan = () => {
    setCurrentState('meal-plan');
  };

  const handleStartOver = () => {
    setCurrentState('hero');
    setUserPreferences({ dietary: [], timeConstraints: '', familySize: 1 });
    setMealPlan(null);
    setGroceryList(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      {currentState === 'hero' && (
        <HeroSection onInputSubmit={handleInputSubmit} />
      )}
      
      {currentState === 'conversation' && (
        <ConversationInterface 
          onComplete={() => setCurrentState('meal-plan')}
          preferences={userPreferences}
          setPreferences={setUserPreferences}
        />
      )}
      
      {currentState === 'meal-plan' && mealPlan && (
        <MealPlanDisplay 
          mealPlan={mealPlan}
          onViewGroceryList={handleViewGroceryList}
          onStartOver={handleStartOver}
        />
      )}
      
      {currentState === 'grocery-list' && groceryList && (
        <GroceryList 
          groceryData={groceryList}
          onBack={handleBackToMealPlan}
        />
      )}
    </div>
  );
};

export default Index;
