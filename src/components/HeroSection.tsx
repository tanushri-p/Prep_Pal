
import React, { useState } from 'react';
import { Mic, MessageSquare, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';

interface HeroSectionProps {
  onInputSubmit: (input: string, isVoice?: boolean) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onInputSubmit }) => {
  const [isVoiceMode, setIsVoiceMode] = useState(true);
  const [textInput, setTextInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);

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

  const handleTextSubmit = () => {
    if (textInput.trim()) {
      onInputSubmit(textInput);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <div className="max-w-4xl w-full text-center space-y-8">
        {/* Hero Title */}
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="h-8 w-8 text-orange-500" />
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-green-600 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
              MealMind
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
            className="flex items-center gap-2"
          >
            <Mic className="h-4 w-4" />
            Voice
          </Button>
          <Button
            variant={!isVoiceMode ? "default" : "outline"}
            onClick={() => setIsVoiceMode(false)}
            className="flex items-center gap-2"
          >
            <MessageSquare className="h-4 w-4" />
            Text
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
                    : 'bg-gradient-to-r from-green-500 to-orange-500 hover:from-green-600 hover:to-orange-600'
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

        {/* Text Input */}
        {!isVoiceMode && (
          <div className="space-y-4 max-w-2xl mx-auto">
            <Textarea
              placeholder="Tell us about your meal planning needs..."
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              className="min-h-[120px] text-lg resize-none border-2 border-gray-200 focus:border-green-400"
            />
            <Button 
              onClick={handleTextSubmit}
              className="w-full bg-gradient-to-r from-green-500 to-orange-500 hover:from-green-600 hover:to-orange-600 text-white font-semibold py-3"
              disabled={!textInput.trim()}
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
                className="p-4 cursor-pointer hover:shadow-md transition-all duration-200 hover:scale-105 bg-white/80 backdrop-blur-sm border border-gray-200"
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
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <Sparkles className="h-6 w-6 text-green-600" />
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
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto">
              <MessageSquare className="h-6 w-6 text-yellow-600" />
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
