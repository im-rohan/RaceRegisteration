import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Lightbulb, ChevronRight, X, Sparkles, TrendingUp, Target } from 'lucide-react';

interface TipData {
  id: string;
  title: string;
  description: string;
  actionText: string;
  impact: 'high' | 'medium' | 'low';
  category: 'marketing' | 'pricing' | 'logistics' | 'engagement';
  dataSource: string;
}

interface AITipOfTheWeekProps {
  eventData?: {
    registrations: number;
    goal: number;
    topSource: string;
    recentGrowth: string;
    daysLeft: number;
  };
  onDismiss?: () => void;
  onTakeAction?: (tipId: string) => void;
}

export default function AITipOfTheWeek({ 
  eventData,
  onDismiss,
  onTakeAction 
}: AITipOfTheWeekProps) {
  const [isDismissed, setIsDismissed] = useState(false);

  // Generate personalized tip based on event data
  const generateTip = (): TipData => {
    if (!eventData) {
      return {
        id: 'default',
        title: 'Welcome to your AI assistant!',
        description: 'Start tracking your event to get personalized recommendations.',
        actionText: 'Learn more',
        impact: 'medium',
        category: 'engagement',
        dataSource: 'Getting started'
      };
    }

    const { registrations, goal, topSource, recentGrowth, daysLeft } = eventData;
    const completionRate = (registrations / goal) * 100;

    // High-impact tips based on different scenarios
    if (topSource === 'Instagram' && registrations < goal * 0.7) {
      return {
        id: 'instagram-boost',
        title: 'Double down on Instagram success',
        description: `${topSource} is your top source with ${recentGrowth} growth last week. Running 3 more story ads could boost conversions by 15-25%.`,
        actionText: 'Create Instagram campaign',
        impact: 'high',
        category: 'marketing',
        dataSource: `Based on your ${topSource} performance`
      };
    }

    if (completionRate >= 90 && daysLeft > 14) {
      return {
        id: 'capacity-expansion',
        title: 'Consider expanding capacity',
        description: `You're at ${Math.round(completionRate)}% capacity with ${daysLeft} days left. Adding 50-100 spots could capture additional demand.`,
        actionText: 'Review capacity options',
        impact: 'high',
        category: 'logistics',
        dataSource: `Based on ${registrations}/${goal} registrations`
      };
    }

    if (completionRate < 40 && daysLeft <= 30) {
      return {
        id: 'urgency-campaign',
        title: 'Create urgency with countdown',
        description: `With ${daysLeft} days left and ${Math.round(completionRate)}% capacity, a "limited time" email campaign could boost registrations by 20%.`,
        actionText: 'Send urgency email',
        impact: 'high',
        category: 'marketing',
        dataSource: `${Math.round(completionRate)}% filled with ${daysLeft} days left`
      };
    }

    if (topSource === 'Facebook' && recentGrowth.includes('+')) {
      return {
        id: 'facebook-retargeting',
        title: 'Leverage Facebook momentum',
        description: `Facebook brought ${recentGrowth} growth. Retargeting visitors who viewed your page but didn't register could yield 10-15 more signups.`,
        actionText: 'Set up retargeting',
        impact: 'medium',
        category: 'marketing',
        dataSource: `Based on ${topSource} performance`
      };
    }

    // Default tip for steady progress
    return {
      id: 'social-proof',
      title: 'Boost with social proof',
      description: `Share a "We're ${Math.round(completionRate)}% full!" post on social media. Events that share milestone updates see 12% higher conversion rates.`,
      actionText: 'Create milestone post',
      impact: 'medium',
      category: 'engagement',
      dataSource: `${registrations} current registrations`
    };
  };

  const tip = generateTip();

  const handleDismiss = () => {
    setIsDismissed(true);
    onDismiss?.();
  };

  const handleTakeAction = () => {
    onTakeAction?.(tip.id);
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'low': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'marketing': return <TrendingUp className="h-4 w-4" />;
      case 'pricing': return <Target className="h-4 w-4" />;
      case 'logistics': return <Target className="h-4 w-4" />;
      case 'engagement': return <Sparkles className="h-4 w-4" />;
      default: return <Lightbulb className="h-4 w-4" />;
    }
  };

  if (isDismissed) {
    return null;
  }

  return (
    <Card className="border-l-4 border-l-blue-500 bg-gradient-to-r from-blue-50/50 to-transparent">
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 flex-1">
            <div className="flex-shrink-0 mt-0.5">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                <Lightbulb className="h-4 w-4 text-blue-600" />
              </div>
            </div>
            
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-sm">AI Tip of the Week</h3>
                <Badge 
                  variant="outline" 
                  className={`text-xs px-2 py-0.5 ${getImpactColor(tip.impact)}`}
                >
                  {tip.impact} impact
                </Badge>
              </div>
              
              <div>
                <p className="font-medium text-sm mb-1">{tip.title}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {tip.description}
                </p>
              </div>
              
              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  {getCategoryIcon(tip.category)}
                  <span>{tip.dataSource}</span>
                </div>
                
                <Button 
                  size="sm" 
                  onClick={handleTakeAction}
                  className="h-7 px-3 text-xs"
                >
                  {tip.actionText}
                  <ChevronRight className="h-3 w-3 ml-1" />
                </Button>
              </div>
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDismiss}
            className="h-6 w-6 p-0 flex-shrink-0"
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}