
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/components/ui/use-toast';
import PlanFeatureItem from './PlanFeatureItem';

interface PriceCardProps {
  title: string;
  price: string;
  period: string;
  features: { label: string; included: boolean }[];
  subtext?: string;
  buttonText: string;
  buttonVariant?: "default" | "outline";
  isMostPopular?: boolean;
  borderColor?: string;
  savingsText?: string;
  planType: 'free' | 'monthly' | 'yearly';
}

const PriceCard = ({
  title,
  price,
  period,
  features,
  subtext,
  buttonText,
  buttonVariant = "outline",
  isMostPopular = false,
  borderColor = "border-gray-200",
  savingsText,
  planType
}: PriceCardProps) => {
  const navigate = useNavigate();
  
  const handlePurchase = () => {
    if (planType === 'free') return;
    
    navigate(`/membership-checkout?plan=${planType}`);
    toast({
      title: "Plan selected",
      description: `You've selected the ${title} plan. Complete your purchase to activate.`,
    });
  };
  
  // Format the title to highlight the + symbol if it contains "RACE+"
  const formattedTitle = title === "RACE+" ? (
    <span>
      RACE<span className="text-race-red">+</span>
    </span>
  ) : title;

  return (
    <div className={`relative flex flex-col h-full rounded-lg border-2 ${borderColor} bg-white shadow-sm transition-all ${isMostPopular ? 'scale-105 z-10 shadow-md' : 'scale-100'}`}>
      {isMostPopular && (
        <Badge className="absolute -top-3 right-5 bg-race-red px-3 py-1 text-white">
          Best Value
        </Badge>
      )}
      <div className="p-6 pb-0">
        <h3 className="text-xl font-bold">{formattedTitle}</h3>
        <div className="mt-4 flex items-baseline">
          <span className="text-4xl font-bold tracking-tight">{price}</span>
          <span className="ml-1 text-lg text-gray-500">{period}</span>
        </div>
        {savingsText && (
          <p className="mt-1 text-sm text-black font-medium">{savingsText}</p>
        )}
      </div>
      <div className="p-6 flex-grow">
        {features.map((feature, i) => (
          <PlanFeatureItem key={i} included={feature.included} label={feature.label} />
        ))}
        {subtext && (
          <p className="mt-4 text-sm text-gray-600">{subtext}</p>
        )}
      </div>
      <div className="p-6 pt-0 mt-auto">
        <Button 
          variant={buttonVariant} 
          className="w-full py-5 bg-race-red hover:bg-race-red/90 text-white"
          onClick={handlePurchase}
        >
          {buttonText}
        </Button>
      </div>
    </div>
  );
};

export default PriceCard;
