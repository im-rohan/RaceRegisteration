
import React from 'react';
import { Check } from 'lucide-react';

interface PlanFeatureItemProps {
  included?: boolean;
  label: string;
}

const PlanFeatureItem = ({ included = false, label }: PlanFeatureItemProps) => (
  <div className="flex items-center py-2">
    {included ? 
      <Check className="h-5 w-5 text-green-600 mr-3 flex-shrink-0" /> : 
      <span className="text-red-400 mr-3 flex-shrink-0 w-5 h-5 flex items-center justify-center text-lg">✕</span>
    }
    <span className={`${included ? 'text-gray-800' : 'text-gray-500'}`}>{label}</span>
  </div>
);

export default PlanFeatureItem;
