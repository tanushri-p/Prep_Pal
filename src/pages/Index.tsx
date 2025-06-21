
import React, { useState } from 'react';
import HeroSection from '@/components/HeroSection';
import ConversationInterface from '@/components/ConversationInterface';
import PrepStyleSelector from '@/components/PrepStyleSelector';
import MealPlanDisplay from '@/components/MealPlanDisplay';
import GroceryList from '@/components/GroceryList';

export type AppState = 'hero' | 'conversation' | 'prep-style' | 'meal-plan' | 'grocery-list';
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

  const handleInputSubmit = (input: string, isVoice: boolean = false) => {
    console.log('Input received:', input, 'Voice:', isVoice);
    setCurrentState('prep-style');
  };

  const handlePrepStyleSelect = (style: PrepStyle) => {
    setUserPreferences(prev => ({ ...prev, prepStyle: style }));
    
    // Generate mock meal plan
    const mockMealPlan: MealPlan = {
      week: '2024-01-15',
      prepStyle: style,
      meals: [
        {
          day: 'Monday',
          breakfast: {
            name: 'Overnight Oats with Berries',
            prepTime: '5 min',
            difficulty: 'Easy',
            explanation: 'High fiber start that uses berries you\'ll have all week. Perfect for busy mornings.',
            ingredients: ['oats', 'berries', 'yogurt', 'honey'],
            nutrition: ['High Fiber', 'Protein', 'Antioxidants']
          },
          lunch: {
            name: 'Mediterranean Quinoa Bowl',
            prepTime: '15 min',
            difficulty: 'Easy',
            explanation: 'Protein-packed quinoa with fresh vegetables. Can be prepped in bulk.',
            ingredients: ['quinoa', 'cucumber', 'tomatoes', 'feta', 'olive oil'],
            nutrition: ['Complete Protein', 'Healthy Fats', 'Vitamins']
          },
          dinner: {
            name: 'Herb-Crusted Salmon',
            prepTime: '25 min',
            difficulty: 'Medium',
            explanation: 'Omega-3 rich salmon with herbs you\'ll use throughout the week.',
            ingredients: ['salmon', 'herbs', 'lemon', 'asparagus'],
            nutrition: ['Omega-3', 'Protein', 'B Vitamins']
          }
        },
        {
          day: 'Tuesday',
          breakfast: {
            name: 'Greek Yogurt Parfait',
            prepTime: '3 min',
            difficulty: 'Easy',
            explanation: 'Quick protein boost using the same berries and yogurt from yesterday.',
            ingredients: ['yogurt', 'berries', 'granola', 'honey'],
            nutrition: ['Probiotics', 'Protein', 'Fiber']
          },
          lunch: {
            name: 'Leftover Quinoa Wrap',
            prepTime: '10 min',
            difficulty: 'Easy',
            explanation: 'Transform yesterday\'s quinoa bowl into a portable wrap.',
            ingredients: ['quinoa bowl', 'tortilla', 'hummus', 'spinach'],
            nutrition: ['Complete Protein', 'Fiber', 'Iron']
          },
          dinner: {
            name: 'One-Pot Chicken & Vegetables',
            prepTime: '30 min',
            difficulty: 'Easy',
            explanation: 'Minimal cleanup dinner that provides protein for tomorrow\'s lunch.',
            ingredients: ['chicken', 'mixed vegetables', 'herbs', 'broth'],
            nutrition: ['Lean Protein', 'Vitamins', 'Minerals']
          }
        }
      ]
    };

    const mockGroceryList: GroceryData = {
      produce: ['2 cups mixed berries', '3 bell peppers', '2 cucumbers', '1 lb asparagus', '2 lemons', 'fresh herbs bundle'],
      protein: ['2 lbs salmon fillets', '2 lbs chicken breast', '1 container Greek yogurt', '8oz feta cheese'],
      pantry: ['2 cups quinoa', '1 lb rolled oats', 'olive oil', 'honey', 'granola', 'chicken broth'],
      dairy: ['Greek yogurt', 'feta cheese']
    };

    setMealPlan(mockMealPlan);
    setGroceryList(mockGroceryList);
    setCurrentState('meal-plan');
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-orange-50 to-yellow-50">
      {currentState === 'hero' && (
        <HeroSection onInputSubmit={handleInputSubmit} />
      )}
      
      {currentState === 'conversation' && (
        <ConversationInterface 
          onComplete={() => setCurrentState('prep-style')}
          preferences={userPreferences}
          setPreferences={setUserPreferences}
        />
      )}
      
      {currentState === 'prep-style' && (
        <PrepStyleSelector onSelect={handlePrepStyleSelect} />
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
