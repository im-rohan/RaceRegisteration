import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, DollarSign, Users, Calendar } from 'lucide-react';

interface YearData {
  year: number;
  registrations: number;
  revenue: number;
  averageTicketPrice: number;
  daysToSellOut?: number;
}

interface YearOverYearComparisonProps {
  currentYear: YearData;
  previousYear?: YearData;
}

export default function YearOverYearComparison({ 
  currentYear, 
  previousYear 
}: YearOverYearComparisonProps) {
  // Mock previous year data if not provided
  const lastYear = previousYear || {
    year: currentYear.year - 1,
    registrations: 289,
    revenue: 23120,
    averageTicketPrice: 80,
    daysToSellOut: 67
  };

  const registrationGrowth = ((currentYear.registrations - lastYear.registrations) / lastYear.registrations) * 100;
  const revenueGrowth = ((currentYear.revenue - lastYear.revenue) / lastYear.revenue) * 100;
  const ticketPriceGrowth = ((currentYear.averageTicketPrice - lastYear.averageTicketPrice) / lastYear.averageTicketPrice) * 100;

  const formatGrowth = (growth: number) => {
    const sign = growth >= 0 ? '+' : '';
    return `${sign}${growth.toFixed(1)}%`;
  };

  const getGrowthColor = (growth: number) => {
    if (growth > 0) return 'text-green-600';
    if (growth < 0) return 'text-red-600';
    return 'text-gray-600';
  };

  const getGrowthIcon = (growth: number) => {
    if (growth > 0) return <TrendingUp className="h-4 w-4 text-green-600" />;
    if (growth < 0) return <TrendingDown className="h-4 w-4 text-red-600" />;
    return null;
  };

  const ComparisonMetric = ({ 
    label, 
    currentValue, 
    previousValue, 
    growth, 
    icon: Icon,
    formatter = (val: number) => val.toLocaleString()
  }: {
    label: string;
    currentValue: number;
    previousValue: number;
    growth: number;
    icon: React.ComponentType<{ className?: string }>;
    formatter?: (value: number) => string;
  }) => (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">{label}</span>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        {/* Previous Year */}
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">{lastYear.year}</p>
          <p className="text-lg font-semibold text-gray-600">
            {formatter(previousValue)}
          </p>
        </div>
        
        {/* Current Year */}
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">{currentYear.year}</p>
          <p className="text-lg font-semibold">
            {formatter(currentValue)}
          </p>
        </div>
      </div>
      
      {/* Growth Indicator */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          {getGrowthIcon(growth)}
          <span className={`text-sm font-medium ${getGrowthColor(growth)}`}>
            {formatGrowth(growth)}
          </span>
        </div>
        <Badge 
          variant={growth >= 0 ? "default" : "destructive"}
          className="text-xs"
        >
          {growth >= 0 ? 'Growth' : 'Decline'}
        </Badge>
      </div>
    </div>
  );

  if (!previousYear && !lastYear) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <Calendar className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">
            Year-over-year comparison will be available after your second year
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Year-over-Year Performance
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Overall Performance Summary */}
        <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Overall Performance</p>
              <p className="text-2xl font-bold">
                {registrationGrowth >= 0 && revenueGrowth >= 0 ? '📈' : ''}
                {registrationGrowth < 0 || revenueGrowth < 0 ? '📊' : ''}
                {registrationGrowth >= 20 ? ' Record Year!' : 
                 registrationGrowth >= 10 ? ' Strong Growth' : 
                 registrationGrowth >= 0 ? ' Steady Progress' : ' Room for Improvement'}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground">vs {lastYear.year}</p>
              <div className="flex gap-2">
                <Badge variant={registrationGrowth >= 0 ? "default" : "secondary"}>
                  {formatGrowth(registrationGrowth)} reg
                </Badge>
                <Badge variant={revenueGrowth >= 0 ? "default" : "secondary"}>
                  {formatGrowth(revenueGrowth)} rev
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ComparisonMetric
            label="Registrations"
            currentValue={currentYear.registrations}
            previousValue={lastYear.registrations}
            growth={registrationGrowth}
            icon={Users}
          />
          
          <ComparisonMetric
            label="Revenue"
            currentValue={currentYear.revenue}
            previousValue={lastYear.revenue}
            growth={revenueGrowth}
            icon={DollarSign}
            formatter={(val) => `$${val.toLocaleString()}`}
          />
          
          <ComparisonMetric
            label="Avg. Ticket Price"
            currentValue={currentYear.averageTicketPrice}
            previousValue={lastYear.averageTicketPrice}
            growth={ticketPriceGrowth}
            icon={DollarSign}
            formatter={(val) => `$${val}`}
          />
        </div>

        {/* Key Insights */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium">Key Insights</h4>
          <div className="space-y-2">
            {registrationGrowth >= 20 && (
              <div className="flex items-start gap-2 p-2 bg-green-50 rounded">
                <span className="text-green-600">🎉</span>
                <p className="text-sm text-green-800">
                  Exceptional growth! You've increased registrations by over 20% year-over-year.
                </p>
              </div>
            )}
            
            {revenueGrowth > registrationGrowth + 5 && (
              <div className="flex items-start gap-2 p-2 bg-blue-50 rounded">
                <span className="text-blue-600">💰</span>
                <p className="text-sm text-blue-800">
                  Revenue is growing faster than registrations - your pricing strategy is working!
                </p>
              </div>
            )}
            
            {registrationGrowth < -5 && (
              <div className="flex items-start gap-2 p-2 bg-amber-50 rounded">
                <span className="text-amber-600">⚠️</span>
                <p className="text-sm text-amber-800">
                  Registrations are down from last year. Consider reviewing marketing timing and channels.
                </p>
              </div>
            )}
            
            {Math.abs(ticketPriceGrowth) < 2 && registrationGrowth > 10 && (
              <div className="flex items-start gap-2 p-2 bg-purple-50 rounded">
                <span className="text-purple-600">💡</span>
                <p className="text-sm text-purple-800">
                  Strong demand with stable pricing. You might have room to increase ticket prices next year.
                </p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}