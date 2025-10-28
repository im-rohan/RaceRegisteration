import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Trophy, TrendingUp, Medal, MapPin, Eye, EyeOff } from 'lucide-react';

interface RegionalEvent {
  id: string;
  name: string;
  organizer: string;
  registrations: number;
  pace: string;
  yearOverYear: number;
  distance: string;
  isCurrentEvent?: boolean;
}

interface RegionalLeaderboardProps {
  currentEventRegistrations: number;
  region?: string;
  distance?: string;
}

export default function RegionalLeaderboard({ 
  currentEventRegistrations, 
  region = "Northeast", 
  distance = "Half Marathon" 
}: RegionalLeaderboardProps) {
  const [showDetails, setShowDetails] = useState(false);

  // Mock regional data - in real app, this would come from private analytics API
  const regionalEvents: RegionalEvent[] = [
    {
      id: '1',
      name: 'Boston Harbor Half',
      organizer: 'Harbor Running Co.',
      registrations: 850,
      pace: '+15%',
      yearOverYear: 12,
      distance: 'Half Marathon'
    },
    {
      id: '2',
      name: 'Vermont Mountain Challenge',
      organizer: 'Mountain Trails Racing',
      registrations: 642,
      pace: '+8%',
      yearOverYear: 8,
      distance: 'Half Marathon'
    },
    {
      id: 'current',
      name: 'Spring Valley Half Marathon',
      organizer: 'You',
      registrations: currentEventRegistrations,
      pace: '+12%',
      yearOverYear: 15,
      distance: 'Half Marathon',
      isCurrentEvent: true
    },
    {
      id: '3',
      name: 'Coastal Maine Run',
      organizer: 'Coastal Athletics',
      registrations: 289,
      pace: '+5%',
      yearOverYear: 3,
      distance: 'Half Marathon'
    },
    {
      id: '4',
      name: 'Pioneer Valley Half',
      organizer: 'Valley Runners Club',
      registrations: 195,
      pace: '+2%',
      yearOverYear: -2,
      distance: 'Half Marathon'
    }
  ].sort((a, b) => b.registrations - a.registrations);

  const currentRank = regionalEvents.findIndex(event => event.isCurrentEvent) + 1;
  const totalEvents = regionalEvents.length;

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-4 w-4 text-yellow-500" />;
      case 2:
        return <Medal className="h-4 w-4 text-gray-400" />;
      case 3:
        return <Medal className="h-4 w-4 text-amber-600" />;
      default:
        return <span className="text-sm font-bold text-muted-foreground">#{rank}</span>;
    }
  };

  const getRankColor = (rank: number) => {
    if (rank === 1) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    if (rank <= 3) return 'text-blue-600 bg-blue-50 border-blue-200';
    return 'text-gray-600 bg-gray-50 border-gray-200';
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CardTitle className="text-lg">Regional Leaderboard</CardTitle>
            <Badge variant="outline" className="text-xs">
              <MapPin className="h-3 w-3 mr-1" />
              {region}
            </Badge>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowDetails(!showDetails)}
            className="h-8 px-2"
          >
            {showDetails ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Your Rank Summary */}
        <div className={`p-4 rounded-lg border-2 ${getRankColor(currentRank)}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {getRankIcon(currentRank)}
              <div>
                <p className="font-semibold">You're #{currentRank} in {region}</p>
                <p className="text-sm text-muted-foreground">
                  For {distance} events this season
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold">{currentEventRegistrations}</p>
              <p className="text-xs text-muted-foreground">registrations</p>
            </div>
          </div>
        </div>

        {/* Achievement Message */}
        <div className="text-center py-2">
          {currentRank === 1 && (
            <p className="text-sm font-medium text-yellow-700">
              🏆 You're leading the region! Amazing work!
            </p>
          )}
          {currentRank === 2 && (
            <p className="text-sm font-medium text-blue-700">
              🥈 So close to #1! Keep up the great momentum!
            </p>
          )}
          {currentRank === 3 && (
            <p className="text-sm font-medium text-amber-700">
              🥉 On the podium! You're in the top 3!
            </p>
          )}
          {currentRank > 3 && currentRank <= totalEvents / 2 && (
            <p className="text-sm font-medium text-green-700">
              📈 Above average performance in your region!
            </p>
          )}
          {currentRank > totalEvents / 2 && (
            <p className="text-sm font-medium text-gray-600">
              💪 Room to grow - check out what top events are doing!
            </p>
          )}
        </div>

        {/* Detailed Leaderboard */}
        {showDetails && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-muted-foreground">
              Top {distance} Events in {region}
            </h4>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {regionalEvents.slice(0, 8).map((event, index) => (
                <div
                  key={event.id}
                  className={`flex items-center justify-between p-2 rounded border ${
                    event.isCurrentEvent 
                      ? 'bg-race-red/5 border-race-red/20' 
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="flex-shrink-0">
                      {getRankIcon(index + 1)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className={`text-sm font-medium truncate ${
                        event.isCurrentEvent ? 'text-race-red' : ''
                      }`}>
                        {event.name}
                        {event.isCurrentEvent && ' (You)'}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {event.organizer}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 text-right">
                    <div>
                      <p className="text-sm font-semibold">{event.registrations}</p>
                      <div className="flex items-center gap-1">
                        <span className="text-xs text-muted-foreground">{event.pace}</span>
                        {event.yearOverYear > 0 ? (
                          <TrendingUp className="h-3 w-3 text-green-500" />
                        ) : (
                          <TrendingUp className="h-3 w-3 text-red-500 rotate-180" />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Insights */}
        <div className="p-3 bg-blue-50 rounded-lg">
          <p className="text-xs text-blue-800">
            <strong>💡 Insight:</strong> {
              currentRank <= 3 
                ? "You're among the top performers! Consider sharing your strategies with other organizers."
                : "The top events in your region average 20% higher early-bird participation. Consider adjusting your pricing strategy."
            }
          </p>
        </div>
      </CardContent>
    </Card>
  );
}