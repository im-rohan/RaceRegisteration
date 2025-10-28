import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { TrendingUp, Calendar, Users, Share2, Mail, DollarSign } from 'lucide-react';

// Mock data for registrations over time
const mockRegistrationData = [
  { date: '2024-03-01', registrations: 12, cumulative: 12, action: null },
  { date: '2024-03-02', registrations: 8, cumulative: 20, action: null },
  { date: '2024-03-03', registrations: 15, cumulative: 35, action: null },
  { date: '2024-03-04', registrations: 22, cumulative: 57, action: null },
  { date: '2024-03-05', registrations: 45, cumulative: 102, action: 'Email Campaign' },
  { date: '2024-03-06', registrations: 38, cumulative: 140, action: null },
  { date: '2024-03-07', registrations: 28, cumulative: 168, action: null },
  { date: '2024-03-08', registrations: 19, cumulative: 187, action: null },
  { date: '2024-03-09', registrations: 16, cumulative: 203, action: null },
  { date: '2024-03-10', registrations: 32, cumulative: 235, action: 'Social Boost' },
  { date: '2024-03-11', registrations: 29, cumulative: 264, action: null },
  { date: '2024-03-12', registrations: 25, cumulative: 289, action: null },
  { date: '2024-03-13', registrations: 18, cumulative: 307, action: null },
  { date: '2024-03-14', registrations: 22, cumulative: 329, action: null },
  { date: '2024-03-15', registrations: 41, cumulative: 370, action: 'Price Drop' }
];

// Mock data for referral sources
const mockReferralSources = {
  thisWeek: [
    { source: 'Facebook', count: 89, percentage: 42, icon: Share2, color: '#1877F2' },
    { source: 'Instagram', count: 59, percentage: 28, icon: Share2, color: '#E4405F' },
    { source: 'Direct', count: 38, percentage: 18, icon: Users, color: '#6B7280' },
    { source: 'Email', count: 15, percentage: 7, icon: Mail, color: '#10B981' },
    { source: 'Google Ads', count: 11, percentage: 5, icon: TrendingUp, color: '#F59E0B' }
  ],
  allTime: [
    { source: 'Facebook', count: 312, percentage: 38, icon: Share2, color: '#1877F2' },
    { source: 'Direct', count: 248, percentage: 30, icon: Users, color: '#6B7280' },
    { source: 'Instagram', count: 165, percentage: 20, icon: Share2, color: '#E4405F' },
    { source: 'Email', count: 67, percentage: 8, icon: Mail, color: '#10B981' },
    { source: 'Google Ads', count: 33, percentage: 4, icon: TrendingUp, color: '#F59E0B' }
  ]
};

export default function EventStoryVisualizations() {
  const [timeframe, setTimeframe] = useState<'thisWeek' | 'allTime'>('thisWeek');
  const [hoveredPoint, setHoveredPoint] = useState<any>(null);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border rounded-lg shadow-lg">
          <p className="font-medium">{label}</p>
          <p className="text-race-red">
            {payload[0].name}: {payload[0].value} new registrations
          </p>
          <p className="text-gray-600">
            Total: {data.cumulative} registrations
          </p>
          {data.action && (
            <p className="text-blue-600 font-medium">
              📧 {data.action}
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Registration Timeline */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Event Registration Story</CardTitle>
            <Tabs value={timeframe} onValueChange={(value) => setTimeframe(value as 'thisWeek' | 'allTime')}>
              <TabsList className="grid w-fit grid-cols-2">
                <TabsTrigger value="thisWeek">This Week</TabsTrigger>
                <TabsTrigger value="allTime">All Time</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockRegistrationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="date" 
                  tickFormatter={(date) => new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Line 
                  type="monotone" 
                  dataKey="registrations" 
                  stroke="#FF4230" 
                  strokeWidth={3}
                  dot={(props: any) => {
                    const { cx, cy, payload } = props;
                    if (payload.action) {
                      return (
                        <circle 
                          cx={cx} 
                          cy={cy} 
                          r={6} 
                          fill="#FF4230" 
                          stroke="#fff" 
                          strokeWidth={2}
                        />
                      );
                    }
                    return <circle cx={cx} cy={cy} r={3} fill="#FF4230" />;
                  }}
                  activeDot={{ r: 6, fill: "#FF4230" }}
                />
                {/* Add reference lines for actions */}
                {mockRegistrationData.map((point, index) => 
                  point.action ? (
                    <ReferenceLine 
                      key={index}
                      x={point.date} 
                      stroke="#10B981" 
                      strokeDasharray="5 5"
                      strokeWidth={2}
                    />
                  ) : null
                )}
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Action Legend */}
          <div className="mt-4 flex flex-wrap gap-2">
            <Badge variant="outline" className="border-green-500 text-green-700">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              Marketing Actions
            </Badge>
            <Badge variant="outline" className="border-race-red text-red-700">
              <div className="w-3 h-3 bg-race-red rounded-full mr-2"></div>
              Daily Registrations
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Top Sources Leaderboard */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Top Sources Leaderboard</CardTitle>
            <div className="flex gap-2">
              <Button 
                variant={timeframe === 'thisWeek' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setTimeframe('thisWeek')}
              >
                Last 7 days
              </Button>
              <Button 
                variant={timeframe === 'allTime' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setTimeframe('allTime')}
              >
                All time
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockReferralSources[timeframe].map((source, index) => (
              <div key={source.source} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100">
                    <span className="text-lg font-bold text-gray-600">#{index + 1}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-4 h-4 rounded-full" 
                      style={{ backgroundColor: source.color }}
                    ></div>
                    <source.icon className="h-4 w-4 text-gray-500" />
                    <span className="font-medium">{source.source}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="font-bold text-lg">{source.count}</p>
                    <p className="text-sm text-gray-500">registrations</p>
                  </div>
                  <Badge variant="secondary" className="bg-gray-100">
                    {source.percentage}%
                  </Badge>
                </div>
              </div>
            ))}
          </div>

          {/* Summary stats */}
          <div className="mt-6 pt-4 border-t">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-race-red">
                  {mockReferralSources[timeframe].reduce((sum, source) => sum + source.count, 0)}
                </p>
                <p className="text-sm text-gray-500">Total Registrations</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-green-600">
                  {mockReferralSources[timeframe][0].source}
                </p>
                <p className="text-sm text-gray-500">Top Source</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-600">
                  {mockReferralSources[timeframe].length}
                </p>
                <p className="text-sm text-gray-500">Active Channels</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}