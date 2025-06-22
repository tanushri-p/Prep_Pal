
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft, Download, Share } from 'lucide-react';
import { GroceryData } from '@/pages/Index';

interface GroceryListProps {
  groceryData: GroceryData;
  onBack: () => void;
}

const GroceryList: React.FC<GroceryListProps> = ({ groceryData, onBack }) => {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());

  const toggleItem = (item: string) => {
    const newChecked = new Set(checkedItems);
    if (newChecked.has(item)) {
      newChecked.delete(item);
    } else {
      newChecked.add(item);
    }
    setCheckedItems(newChecked);
  };

  const categories = [
    { name: 'Produce', items: groceryData.produce, icon: '🥬', color: 'bg-green-100' },
    { name: 'Protein', items: groceryData.protein, icon: '🥩', color: 'bg-red-100' },
    { name: 'Pantry', items: groceryData.pantry, icon: '🏺', color: 'bg-yellow-100' },
    { name: 'Dairy', items: groceryData.dairy, icon: '🥛', color: 'bg-blue-100' }
  ];

  const totalItems = Object.values(groceryData).flat().length;
  const checkedCount = checkedItems.size;
  const progress = (checkedCount / totalItems) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-orange-50 to-yellow-50 px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button 
            onClick={onBack}
            variant="outline"
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Meal Plan
          </Button>
          
          <div className="flex gap-2">
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export PDF
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Share className="h-4 w-4" />
              Send to Phone
            </Button>
          </div>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Smart Grocery List</h2>
          <p className="text-lg text-gray-600 mb-6">
            Organized by store sections for efficient shopping
          </p>
          
          {/* Progress Bar */}
          <div className="max-w-md mx-auto">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Progress</span>
              <span>{checkedCount} of {totalItems} items</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Grocery Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((category, categoryIndex) => (
            <Card key={categoryIndex} className="p-6 bg-white/80 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-12 h-12 ${category.color} rounded-full flex items-center justify-center text-2xl`}>
                  {category.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">{category.name}</h3>
                  <p className="text-sm text-gray-600">{category.items.length} items</p>
                </div>
              </div>

              <div className="space-y-3">
                {category.items.map((item, itemIndex) => {
                  const itemId = `${category.name}-${itemIndex}`;
                  const isChecked = checkedItems.has(itemId);
                  
                  return (
                    <div 
                      key={itemIndex}
                      className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
                        isChecked ? 'bg-gray-50 opacity-60' : 'hover:bg-gray-50'
                      }`}
                    >
                      <Checkbox
                        id={itemId}
                        checked={isChecked}
                        onCheckedChange={() => toggleItem(itemId)}
                      />
                      <label 
                        htmlFor={itemId}
                        className={`flex-1 cursor-pointer ${
                          isChecked ? 'line-through text-gray-500' : 'text-gray-800'
                        }`}
                      >
                        {item}
                      </label>
                    </div>
                  );
                })}
              </div>
            </Card>
          ))}
        </div>

        {/* Shopping Tips */}
        <Card className="mt-8 p-6 bg-gradient-to-r from-blue-100 to-purple-100">
          <h3 className="text-xl font-bold text-gray-800 mb-4">💡 Shopping Tips</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
            <div>
              <p className="font-medium mb-1">Smart Shopping Order:</p>
              <p>Start with non-perishables (pantry), then dairy, protein, and finish with produce for freshness.</p>
            </div>
            <div>
              <p className="font-medium mb-1">Ingredient Crossover:</p>
              <p>Notice how ingredients like herbs and yogurt appear in multiple meals throughout the week!</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default GroceryList;
