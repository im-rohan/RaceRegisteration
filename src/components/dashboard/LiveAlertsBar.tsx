import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, ChevronLeft, ChevronRight, Send, Percent, TrendingUp, Clock } from 'lucide-react';

// Mock alerts data
const mockAlerts = [
  {
    id: 1,
    type: 'warning',
    message: '5 spots left in 10K — Send push now?',
    icon: '⚠️',
    actions: [
      { label: 'Send Push Email', icon: Send, variant: 'default' as const },
      { label: 'Create Promo Code', icon: Percent, variant: 'outline' as const }
    ]
  },
  {
    id: 2,
    type: 'info',
    message: 'Registration pace down 12% this week — Boost suggested',
    icon: '📉',
    actions: [
      { label: 'Boost Social', icon: TrendingUp, variant: 'default' as const },
      { label: 'Send Push Email', icon: Send, variant: 'outline' as const }
    ]
  },
  {
    id: 3,
    type: 'urgent',
    message: 'Early bird ends in 48h — 74 athletes haven\'t signed up yet',
    icon: '⏳',
    actions: [
      { label: 'Send Reminder', icon: Send, variant: 'default' as const },
      { label: 'Create Promo Code', icon: Percent, variant: 'outline' as const },
      { label: 'Boost Social', icon: TrendingUp, variant: 'outline' as const }
    ]
  }
];

export default function LiveAlertsBar() {
  const [currentAlertIndex, setCurrentAlertIndex] = useState(0);
  const [dismissedAlerts, setDismissedAlerts] = useState<number[]>([]);
  const [snoozeTimers, setSnoozeTimers] = useState<Map<number, number>>(new Map());

  const activeAlerts = mockAlerts.filter(alert => 
    !dismissedAlerts.includes(alert.id) && !snoozeTimers.has(alert.id)
  );

  const currentAlert = activeAlerts[currentAlertIndex];

  // Auto-cycle through alerts every 8 seconds
  useEffect(() => {
    if (activeAlerts.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentAlertIndex((prev) => (prev + 1) % activeAlerts.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [activeAlerts.length]);

  // Handle snooze timers
  useEffect(() => {
    const interval = setInterval(() => {
      setSnoozeTimers(prev => {
        const newMap = new Map(prev);
        for (const [alertId, timestamp] of newMap.entries()) {
          if (Date.now() > timestamp) {
            newMap.delete(alertId);
          }
        }
        return newMap;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleDismiss = (alertId: number) => {
    setDismissedAlerts(prev => [...prev, alertId]);
    if (currentAlertIndex >= activeAlerts.length - 1) {
      setCurrentAlertIndex(0);
    }
  };

  const handleSnooze = (alertId: number) => {
    const snoozeUntil = Date.now() + (15 * 60 * 1000); // 15 minutes
    setSnoozeTimers(prev => new Map(prev).set(alertId, snoozeUntil));
    if (currentAlertIndex >= activeAlerts.length - 1) {
      setCurrentAlertIndex(0);
    }
  };

  const handlePrevious = () => {
    setCurrentAlertIndex((prev) => 
      prev === 0 ? activeAlerts.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentAlertIndex((prev) => (prev + 1) % activeAlerts.length);
  };

  const handleAction = (actionLabel: string) => {
    console.log(`Executing action: ${actionLabel} for alert: ${currentAlert.message}`);
    // Here you would implement the actual action logic
  };

  if (activeAlerts.length === 0) return null;

  return (
    <Card className="mb-6 bg-gradient-to-r from-orange-50 to-red-50 border-l-4 border-l-race-red">
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 flex-1">
            {/* Navigation buttons */}
            {activeAlerts.length > 1 && (
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handlePrevious}
                  className="h-8 w-8 p-0"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleNext}
                  className="h-8 w-8 p-0"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}

            {/* Alert content */}
            <div className="flex items-center space-x-3 flex-1">
              <span className="text-xl">{currentAlert.icon}</span>
              <span className="font-medium text-gray-900">{currentAlert.message}</span>
            </div>

            {/* Action buttons */}
            <div className="flex items-center space-x-2">
              {currentAlert.actions.map((action, index) => (
                <Button
                  key={index}
                  variant={action.variant}
                  size="sm"
                  onClick={() => handleAction(action.label)}
                  className="text-xs"
                >
                  <action.icon className="h-3 w-3 mr-1" />
                  {action.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Alert controls */}
          <div className="flex items-center space-x-2 ml-4">
            {activeAlerts.length > 1 && (
              <Badge variant="secondary" className="text-xs">
                {currentAlertIndex + 1} of {activeAlerts.length}
              </Badge>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleSnooze(currentAlert.id)}
              className="text-xs text-gray-500 hover:text-gray-700"
            >
              <Clock className="h-3 w-3 mr-1" />
              Snooze 15m
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleDismiss(currentAlert.id)}
              className="h-8 w-8 p-0 text-gray-500 hover:text-gray-700"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}