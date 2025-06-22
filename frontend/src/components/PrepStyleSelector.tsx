
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, Calendar, Utensils } from 'lucide-react';
import { PrepStyle } from '@/pages/Index';

interface PrepStyleSelectorProps {
  onSelect: (style: PrepStyle) => void;
}

const PrepStyleSelector: React.FC<PrepStyleSelectorProps> = ({ onSelect }) => {
  const prepStyles = [
    {
      id: 'bulk_prep' as PrepStyle,
      title: 'Bulk Prep',
      subtitle: 'Cook once, eat multiple times',
      description: 'Perfect for busy schedules. Spend 2-3 hours on weekends preparing meals for the entire week.',
      timeEstimate: '2-3 hours weekend prep',
      icon: Calendar,
      color: 'bg-amber-500',
      benefits: ['Save time during weekdays', 'Consistent portions', 'Cost-effective']
    },
    {
      id: 'daily_light' as PrepStyle,
      title: 'Daily Light Cooking',
      subtitle: 'Fresh meals daily',
      description: 'Enjoy fresh, quick-to-prepare meals every day with minimal advance preparation.',
      timeEstimate: '15-30 min per meal',
      icon: Clock,
      color: 'bg-orange-500',
      benefits: ['Always fresh', 'Flexible schedule', 'Less storage needed']
    },
    {
      id: 'minimal_cleanup' as PrepStyle,
      title: 'Minimal Cleanup',
      subtitle: 'One-pot wonders',
      description: 'Simple, delicious meals that require minimal dishes and cleanup time.',
      timeEstimate: '20-40 min total',
      icon: Utensils,
      color: 'bg-red-500',
      benefits: ['Easy cleanup', 'Less stress', 'Simple ingredients']
    }
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <div className="max-w-6xl w-full">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Choose Your Prep Style</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            How do you prefer to approach meal preparation? Choose the style that fits your schedule and lifestyle.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {prepStyles.map((style) => {
            const IconComponent = style.icon;
            return (
              <Card 
                key={style.id}
                className="p-8 cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105 bg-white border-2 hover:border-amber-300"
                onClick={() => onSelect(style.id)}
              >
                <div className="text-center space-y-6">
                  <div className={`w-16 h-16 ${style.color} rounded-full flex items-center justify-center mx-auto`}>
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">{style.title}</h3>
                    <p className="text-lg text-gray-600 font-medium mb-3">{style.subtitle}</p>
                    <p className="text-gray-700 mb-4">{style.description}</p>
                    <div className="bg-amber-50 rounded-lg p-3 mb-4 border border-amber-200">
                      <p className="text-sm font-semibold text-gray-800">Time Commitment</p>
                      <p className="text-sm text-gray-600">{style.timeEstimate}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-gray-800">Benefits:</p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {style.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-center">
                          <span className="w-2 h-2 bg-amber-400 rounded-full mr-2"></span>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button className={`w-full ${style.color} hover:opacity-90 text-white font-semibold py-3`}>
                    Choose {style.title}
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-500 text-sm">Don't worry - you can always adjust your approach later!</p>
        </div>
      </div>
    </div>
  );
};

export default PrepStyleSelector;
