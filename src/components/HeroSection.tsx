
import React, { useState } from 'react';
import { Mic, MessageSquare, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

interface HeroSectionProps {
  onInputSubmit: (input: string, isVoice?: boolean) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onInputSubmit }) => {
  const [isVoiceMode, setIsVoiceMode] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  
  // Form state for text input
  const [dietaryPreferences, setDietaryPreferences] = useState('');
  const [budget, setBudget] = useState('');
  const [timePerMeal, setTimePerMeal] = useState('');
  const [existingIngredients, setExistingIngredients] = useState('');

  const examplePrompts = [
    "Plan me a vegetarian week with no tofu",
    "I need quick meals for a busy week",
    "Family of 4 with picky eaters",
    "Healthy meals under 30 minutes each"
  ];

  const handleVoiceRecord = () => {
    setIsRecording(!isRecording);
    
    if (!isRecording) {
      // Simulate voice recording
      setTimeout(() => {
        setIsRecording(false);
        onInputSubmit("I need a vegetarian meal plan for a family of 3", true);
      }, 3000);
    }
  };

  const handleFormSubmit = () => {
    const formData = {
      dietaryPreferences,
      budget,
      timePerMeal,
      existingIngredients
    };
    
    // Convert form data to a descriptive string
    let inputString = "I need a meal plan with the following preferences:";
    if (dietaryPreferences) inputString += ` Dietary preferences: ${dietaryPreferences}.`;
    if (budget) inputString += ` Budget: ${budget}.`;
    if (timePerMeal) inputString += ` Time per meal: ${timePerMeal}.`;
    if (existingIngredients) inputString += ` I have these ingredients to use: ${existingIngredients}.`;
    
    onInputSubmit(inputString);
  };

  const isFormValid = dietaryPreferences || budget || timePerMeal;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <div className="max-w-4xl w-full text-center space-y-8">
        {/* Hero Title with Logo */}
        <div className="space-y-6">
          <div className="flex items-center justify-center gap-4 mb-6">
            <img 
              src="/lovable-uploads/d5afa8c8-796e-40e9-849f-b4fdfc878c9a.png" 
              alt="PrepPal Logo" 
              className="w-20 h-20 md:w-24 md:h-24"
            />
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-amber-600 via-orange-500 to-red-500 bg-clip-text text-transparent">
              PrepPal
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
            Your AI-powered meal planning assistant. Tell us what you need, and we'll create a personalized weekly plan just for you.
          </p>
        </div>

        {/* Input Mode Toggle */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <Button
            variant={isVoiceMode ? "default" : "outline"}
            onClick={() => setIsVoiceMode(true)}
            className={`flex items-center gap-2 ${
              isVoiceMode 
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600' 
                : 'border-amber-300 text-amber-700 hover:bg-amber-50'
            }`}
          >
            <Mic className="h-4 w-4" />
            Voice
          </Button>
          <Button
            variant={!isVoiceMode ? "default" : "outline"}
            onClick={() => setIsVoiceMode(false)}
            className={`flex items-center gap-2 ${
              !isVoiceMode 
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600' 
                : 'border-amber-300 text-amber-700 hover:bg-amber-50'
            }`}
          >
            <MessageSquare className="h-4 w-4" />
            Form
          </Button>
        </div>

        {/* Voice Input */}
        {isVoiceMode && (
          <div className="space-y-6">
            <div className="relative">
              <Button
                onClick={handleVoiceRecord}
                className={`
                  w-32 h-32 rounded-full text-white font-semibold text-lg
                  transition-all duration-300 transform hover:scale-105
                  ${isRecording 
                    ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
                    : 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600'
                  }
                `}
              >
                <Mic className={`h-12 w-12 ${isRecording ? 'animate-bounce' : ''}`} />
              </Button>
              {isRecording && (
                <div className="absolute -inset-4 rounded-full border-4 border-red-300 animate-ping"></div>
              )}
            </div>
            <p className="text-gray-600">
              {isRecording ? "Listening... speak your meal planning needs" : "Tap to speak your meal planning needs"}
            </p>
          </div>
        )}

        {/* Form Input */}
        {!isVoiceMode && (
          <div className="space-y-6 max-w-2xl mx-auto">
            <Card className="p-6 text-left border-2 border-amber-200 bg-amber-50/30">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="dietary" className="text-sm font-medium text-gray-700">
                    Dietary Preferences/Restrictions
                  </Label>
                  <Textarea
                    id="dietary"
                    placeholder="e.g., vegetarian, gluten-free, no nuts, dairy-free..."
                    value={dietaryPreferences}
                    onChange={(e) => setDietaryPreferences(e.target.value)}
                    className="min-h-[80px] border-amber-200 focus:border-amber-400"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="budget" className="text-sm font-medium text-gray-700">
                      Budget
                    </Label>
                    <Select value={budget} onValueChange={setBudget}>
                      <SelectTrigger className="border-amber-200 focus:border-amber-400">
                        <SelectValue placeholder="Select budget" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low - Budget-friendly meals</SelectItem>
                        <SelectItem value="medium">Medium - Balanced cost</SelectItem>
                        <SelectItem value="high">High - Premium ingredients</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="time" className="text-sm font-medium text-gray-700">
                      Time per Meal
                    </Label>
                    <Select value={timePerMeal} onValueChange={setTimePerMeal}>
                      <SelectTrigger className="border-amber-200 focus:border-amber-400">
                        <SelectValue placeholder="Select time preference" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="quick">Quick - Under 15 minutes</SelectItem>
                        <SelectItem value="standard">Standard - 15-30 minutes</SelectItem>
                        <SelectItem value="prep-based">Prep-based - 30+ minutes or batch cooking</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ingredients" className="text-sm font-medium text-gray-700">
                    Existing Ingredients (Optional)
                  </Label>
                  <Input
                    id="ingredients"
                    placeholder="e.g., chicken breast, rice, broccoli, olive oil..."
                    value={existingIngredients}
                    onChange={(e) => setExistingIngredients(e.target.value)}
                    className="border-amber-200 focus:border-amber-400"
                  />
                </div>
              </div>
            </Card>

            <Button 
              onClick={handleFormSubmit}
              className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold py-3"
              disabled={!isFormValid}
            >
              Create My Meal Plan
            </Button>
          </div>
        )}

        {/* Example Prompts */}
        <div className="space-y-4">
          <p className="text-gray-600 font-medium">Try these examples:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-3xl mx-auto">
            {examplePrompts.map((prompt, index) => (
              <Card 
                key={index}
                className="p-4 cursor-pointer hover:shadow-md transition-all duration-200 hover:scale-105 bg-white/80 backdrop-blur-sm border border-amber-200 hover:border-amber-300"
                onClick={() => onInputSubmit(prompt)}
              >
                <p className="text-gray-700 text-sm">{prompt}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Features Preview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-4xl mx-auto">
          <div className="text-center space-y-3">
            <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto">
              <Sparkles className="h-6 w-6 text-amber-600" />
            </div>
            <h3 className="font-semibold text-gray-800">AI-Powered</h3>
            <p className="text-gray-600 text-sm">Smart meal suggestions based on your preferences and constraints</p>
          </div>
          <div className="text-center space-y-3">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto">
              <Mic className="h-6 w-6 text-orange-600" />
            </div>
            <h3 className="font-semibold text-gray-800">Voice-First</h3>
            <p className="text-gray-600 text-sm">Natural conversation - just speak your needs like talking to a friend</p>
          </div>
          <div className="text-center space-y-3">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto">
              <MessageSquare className="h-6 w-6 text-red-600" />
            </div>
            <h3 className="font-semibold text-gray-800">Personalized</h3>
            <p className="text-gray-600 text-sm">Tailored plans that fit your lifestyle, diet, and time constraints</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
