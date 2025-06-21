
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UserPreferences } from '@/pages/Index';

interface ConversationInterfaceProps {
  onComplete: () => void;
  preferences: UserPreferences;
  setPreferences: (preferences: UserPreferences) => void;
}

const ConversationInterface: React.FC<ConversationInterfaceProps> = ({
  onComplete,
  preferences,
  setPreferences
}) => {
  const [messages, setMessages] = useState([
    { role: 'ai', content: 'Great! I heard you need help with meal planning. Let me ask a few questions to create the perfect plan for you.' }
  ]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full">
        <div className="space-y-4 mb-8">
          {messages.map((message, index) => (
            <Card key={index} className={`p-4 ${message.role === 'ai' ? 'bg-green-50' : 'bg-blue-50 ml-12'}`}>
              <p className="text-gray-800">{message.content}</p>
            </Card>
          ))}
        </div>
        
        <div className="text-center">
          <div className="animate-pulse space-y-2 mb-6">
            <div className="h-2 bg-green-300 rounded w-1/4 mx-auto"></div>
            <div className="h-2 bg-green-200 rounded w-1/2 mx-auto"></div>
            <div className="h-2 bg-green-100 rounded w-1/3 mx-auto"></div>
          </div>
          <p className="text-gray-600 mb-6">AI is thinking about your perfect meal plan...</p>
          <Button onClick={onComplete} className="bg-green-500 hover:bg-green-600">
            Continue to Prep Style Selection
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConversationInterface;
