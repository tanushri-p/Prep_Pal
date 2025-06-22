
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, ChevronDown, ChevronUp, ShoppingCart, RotateCcw } from 'lucide-react';
import { MealPlan, Meal } from '@/pages/Index';

interface MealPlanDisplayProps {
  mealPlan: MealPlan;
  onViewGroceryList: () => void;
  onStartOver: () => void;
}

const MealPlanDisplay: React.FC<MealPlanDisplayProps> = ({ 
  mealPlan, 
  onViewGroceryList, 
  onStartOver 
}) => {
  const [expandedMeals, setExpandedMeals] = useState<Set<string>>(new Set());
  const [viewMode, setViewMode] = useState<'weekly' | 'daily'>('weekly');

  const toggleMealExpansion = (mealId: string) => {
    const newExpanded = new Set(expandedMeals);
    if (newExpanded.has(mealId)) {
      newExpanded.delete(mealId);
    } else {
      newExpanded.add(mealId);
    }
    setExpandedMeals(newExpanded);
  };

  const MealCard: React.FC<{ meal: Meal; mealId: string; mealType: string; day: string }> = ({ 
    meal, 
    mealId, 
    mealType, 
    day 
  }) => {
    const isExpanded = expandedMeals.has(mealId);
    
    return (
      <Card className="p-4 hover:shadow-md transition-all duration-200">
        <div className="space-y-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h4 className="font-semibold text-gray-800 mb-1">{meal.name}</h4>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock className="h-4 w-4" />
                <span>{meal.prepTime}</span>
                <Badge variant="outline" className="text-xs">
                  {meal.difficulty}
                </Badge>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => toggleMealExpansion(mealId)}
              className="ml-2"
            >
              {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </div>

          {isExpanded && (
            <div className="space-y-4 border-t pt-3 animate-fade-in">
              <div>
                <h5 className="font-medium text-gray-800 mb-2">How to make this meal: </h5>
                <p className="text-sm text-gray-600">{meal.explanation}</p>
              </div>

              <div>
                <h5 className="font-medium text-gray-800 mb-2">Nutritional Highlights</h5>
                <div className="flex flex-wrap gap-1">
                  {meal.nutrition.map((nutrient, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {nutrient}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h5 className="font-medium text-gray-800 mb-2">Key Ingredients</h5>
                <div className="flex flex-wrap gap-1">
                  {meal.ingredients.map((ingredient, index) => (
                    <span key={index} className="text-xs bg-gray-100 px-2 py-1 rounded">
                      {ingredient}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-orange-50 to-yellow-50 px-4 py-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Your Weekly Meal Plan</h2>
          {/* <p className="text-lg text-gray-600 mb-6">
            Personalized for {mealPlan.prepStyle.replace('_', ' ')} style cooking
          </p> */}
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <Button 
              onClick={onViewGroceryList}
              className="bg-green-500 hover:bg-green-600 text-white font-semibold flex items-center gap-2"
            >
              <ShoppingCart className="h-4 w-4" />
              View Grocery List
            </Button>
            <Button 
              onClick={onStartOver}
              variant="outline"
              className="flex items-center gap-2"
            >
              <RotateCcw className="h-4 w-4" />
              Start Over
            </Button>
          </div>
        </div>

        {/* Meal Plan Grid */}
        <div className="space-y-8">
          {mealPlan.meals.map((dayMeals, dayIndex) => (
            <Card key={dayIndex} className="p-6 bg-white/80 backdrop-blur-sm">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">{dayMeals.day}</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h4 className="text-lg font-semibold text-gray-700 mb-3">Breakfast</h4>
                  <MealCard 
                    meal={dayMeals.breakfast}
                    mealId={`${dayMeals.day}-breakfast`}
                    mealType="breakfast"
                    day={dayMeals.day}
                  />
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-gray-700 mb-3">Lunch</h4>
                  <MealCard 
                    meal={dayMeals.lunch}
                    mealId={`${dayMeals.day}-lunch`}
                    mealType="lunch"
                    day={dayMeals.day}
                  />
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-gray-700 mb-3">Dinner</h4>
                  <MealCard 
                    meal={dayMeals.dinner}
                    mealId={`${dayMeals.day}-dinner`}
                    mealType="dinner"
                    day={dayMeals.day}
                  />
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Weekly Summary */}
        <Card className="mt-12 p-6 bg-gradient-to-r from-green-100 to-orange-100">
          <div className="text-center">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Weekly Plan Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <p className="text-2xl font-bold text-green-600">{mealPlan.meals.length * 3}</p>
                <p className="text-sm text-gray-600">Total Meals Planned</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-orange-600">Smart</p>
                <p className="text-sm text-gray-600">Ingredient Reuse</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-600">Balanced</p>
                <p className="text-sm text-gray-600">Nutrition Profile</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default MealPlanDisplay;
