import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ForecastProjectionProps {
  currentRegistrations: number;
  goal: number;
  daysLeft: number;
}

export default function ForecastProjection({ 
  currentRegistrations, 
  goal, 
  daysLeft 
}: ForecastProjectionProps) {
  // Generate historical data (mock for now)
  const generateHistoricalData = () => {
    const data = [];
    const totalDays = 90; // 3 months of data
    const daysElapsed = totalDays - daysLeft;
    
    for (let i = 0; i <= daysElapsed; i++) {
      const progress = i / daysElapsed;
      // Simulate realistic registration growth with some randomness
      const baseValue = currentRegistrations * progress;
      const randomFactor = 0.1; // 10% randomness
      const actualValue = Math.round(baseValue * (1 + (Math.random() - 0.5) * randomFactor));
      
      data.push({
        day: i,
        actual: Math.max(0, actualValue),
        type: 'actual'
      });
    }
    
    return data;
  };

  // Generate forecast data
  const generateForecastData = () => {
    const data = [];
    const totalDays = 90;
    const daysElapsed = totalDays - daysLeft;
    
    // Calculate current pace
    const currentPace = currentRegistrations / daysElapsed;
    
    // Three scenarios: conservative, realistic, optimistic
    const scenarios = {
      conservative: currentPace * 0.8, // 20% slower pace
      realistic: currentPace, // Same pace
      optimistic: currentPace * 1.2 // 20% faster pace
    };

    for (let i = daysElapsed + 1; i <= totalDays; i++) {
      const daysRemaining = i - daysElapsed;
      
      data.push({
        day: i,
        conservative: Math.round(currentRegistrations + (scenarios.conservative * daysRemaining)),
        realistic: Math.round(currentRegistrations + (scenarios.realistic * daysRemaining)),
        optimistic: Math.round(currentRegistrations + (scenarios.optimistic * daysRemaining)),
        type: 'forecast'
      });
    }
    
    return data;
  };

  const historicalData = generateHistoricalData();
  const forecastData = generateForecastData();
  const combinedData = [...historicalData, ...forecastData];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const isHistorical = label <= (90 - daysLeft);
      
      return (
        <div className="bg-white p-3 border rounded-lg shadow-lg">
          <p className="font-medium">Day {label}</p>
          {isHistorical ? (
            <p className="text-race-red">
              Actual: {payload[0]?.value} registrations
            </p>
          ) : (
            <div className="space-y-1">
              {payload.map((entry: any, index: number) => (
                <p key={index} style={{ color: entry.color }}>
                  {entry.dataKey}: {entry.value} registrations
                </p>
              ))}
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  const goalLine = Math.round((goal / currentRegistrations) * 100);
  const isOnTrack = forecastData[forecastData.length - 1]?.realistic >= goal;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Registration Forecast</CardTitle>
          <div className="text-sm text-muted-foreground">
            {daysLeft} days left
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={combinedData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="day" 
                domain={['dataMin', 'dataMax']}
              />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              
              {/* Goal reference line */}
              <ReferenceLine 
                y={goal} 
                stroke="#FF4230" 
                strokeDasharray="5 5" 
                label={{ value: "Goal", position: "top" }}
              />
              
              {/* Historical actual line */}
              <Line
                type="monotone"
                dataKey="actual"
                stroke="#FF4230"
                strokeWidth={3}
                dot={false}
                connectNulls={false}
                data={historicalData}
              />
              
              {/* Forecast lines */}
              <Line
                type="monotone"
                dataKey="conservative"
                stroke="#EF4444"
                strokeWidth={2}
                strokeDasharray="8 8"
                dot={false}
                connectNulls={false}
                data={forecastData}
              />
              
              <Line
                type="monotone"
                dataKey="realistic"
                stroke="#10B981"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={false}
                connectNulls={false}
                data={forecastData}
              />
              
              <Line
                type="monotone"
                dataKey="optimistic"
                stroke="#3B82F6"
                strokeWidth={2}
                strokeDasharray="3 3"
                dot={false}
                connectNulls={false}
                data={forecastData}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Forecast Summary */}
        <div className="mt-4 grid grid-cols-3 gap-4 text-center">
          <div className="space-y-1">
            <p className="text-sm text-red-600 font-medium">Conservative</p>
            <p className="text-lg font-bold">
              {forecastData[forecastData.length - 1]?.conservative || 0}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-green-600 font-medium">Realistic</p>
            <p className="text-lg font-bold">
              {forecastData[forecastData.length - 1]?.realistic || 0}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-blue-600 font-medium">Optimistic</p>
            <p className="text-lg font-bold">
              {forecastData[forecastData.length - 1]?.optimistic || 0}
            </p>
          </div>
        </div>

        {/* Forecast Status */}
        <div className="mt-4 p-3 rounded-lg bg-muted">
          <p className="text-sm">
            <span className="font-medium">
              {isOnTrack ? '✅ On track to meet goal' : '⚠️ May need additional marketing push'}
            </span>
            {isOnTrack ? 
              ' — Continue current momentum' : 
              ' — Consider boosting promotion efforts'
            }
          </p>
        </div>
      </CardContent>
    </Card>
  );
}