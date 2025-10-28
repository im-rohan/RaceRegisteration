import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { HelpCircle, Send, Percent, Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import EventStoryVisualizations from './EventStoryVisualizations';
import DynamicDonutChart from './DynamicDonutChart';
import MilestoneBadges from './MilestoneBadges';
import ForecastProjection from './ForecastProjection';
import RegionalLeaderboard from './RegionalLeaderboard';


// Mock health data
const mockHealthData = {
  confirmed: 127,
  goal: 500,
  pace: "+12%",
  daysLeft: 45,
  status: "at-risk" as const,
  distanceGoals: [
    { distance: "5K", confirmed: 45, goal: 150 },
    { distance: "10K", confirmed: 62, goal: 200 },
    { distance: "Half Marathon", confirmed: 20, goal: 150 }
  ]
};

export default function HealthTab() {
  const { toast } = useToast();
  const [goalReached, setGoalReached] = useState(false);
  const healthPercent = Math.min((mockHealthData.confirmed / mockHealthData.goal) * 100, 100);
  
  const getStatusColor = (percent: number) => {
    if (percent >= 100) return "text-blue-600";
    if (percent >= 70) return "text-green-600";
    if (percent >= 40) return "text-amber-600";
    return "text-red-600";
  };

  const getStatusText = (percent: number) => {
    if (percent >= 100) return "Goal hit";
    if (percent >= 70) return "On track";
    if (percent >= 40) return "At risk";
    return "Needs attention";
  };

  const handleGoalReached = () => {
    if (!goalReached) {
      setGoalReached(true);
      toast({
        title: "🎉 Goal Met!",
        description: `${mockHealthData.confirmed} registrations achieved!`,
        duration: 5000,
      });
    }
  };


  return (
    <div className="space-y-6">

      {/* Enhanced Event Health Widget */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <CardTitle>Event Health Score</CardTitle>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <HelpCircle className="h-4 w-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">A live % showing progress to your goal. Colors indicate status. Hitting 100% triggers suggestions for waitlist or capacity expansion.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col lg:flex-row items-center gap-6">
            {/* Dynamic Donut Chart */}
            <div className="flex-shrink-0">
              <DynamicDonutChart
                value={healthPercent}
                size={140}
                onGoalReached={handleGoalReached}
                className="mx-auto"
              />
            </div>
            
            {/* Stats and Status */}
            <div className="flex-1 text-center lg:text-left space-y-3">
              <div>
                <p className="text-muted-foreground text-sm">
                  {mockHealthData.confirmed} of {mockHealthData.goal} registrations
                </p>
                <Badge variant="secondary" className="mt-2">
                  {getStatusText(healthPercent)}
                </Badge>
              </div>
              
              {goalReached && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-800 font-medium">
                    🎉 Congratulations! You've reached your registration goal!
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <p className="text-sm text-muted-foreground">Pace (7d)</p>
              <p className="font-medium">{mockHealthData.pace}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Days left</p>
              <p className="font-medium">{mockHealthData.daysLeft}</p>
            </div>
          </div>

          {/* Per-distance goals */}
          <div className="space-y-3">
            <p className="font-medium">Progress by Distance</p>
            {mockHealthData.distanceGoals.map((goal) => (
              <div key={goal.distance} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{goal.distance}</span>
                  <span>{goal.confirmed}/{goal.goal}</span>
                </div>
                <Progress value={(goal.confirmed / goal.goal) * 100} className="h-2" />
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-2">
            <Button size="sm">
              <Send className="h-4 w-4 mr-2" />
              Send Push Email
            </Button>
            <Button variant="outline" size="sm">
              <Percent className="h-4 w-4 mr-2" />
              Create Promo Code
            </Button>
            <Button variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Boost Social
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Forecast Projection */}
      <ForecastProjection
        currentRegistrations={mockHealthData.confirmed}
        goal={mockHealthData.goal}
        daysLeft={mockHealthData.daysLeft}
      />

      {/* Milestone Badges */}
      <MilestoneBadges
        confirmedRegistrations={mockHealthData.confirmed}
        isGoalMet={healthPercent >= 100}
        isRecordYear={mockHealthData.confirmed > 300} // Mock logic for record year
      />

      {/* Regional Leaderboard */}
      <RegionalLeaderboard
        currentEventRegistrations={mockHealthData.confirmed}
        region="Northeast"
        distance="Half Marathon"
      />

      {/* Event Story Visualizations */}
      <EventStoryVisualizations />
    </div>
  );
}