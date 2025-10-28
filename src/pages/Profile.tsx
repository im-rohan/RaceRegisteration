import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate, useLocation } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { CalendarDays, MapPin, Clock, CreditCard, Trophy, Calendar, Bookmark, Plus, Building, Globe, Mail } from 'lucide-react';
import RaceWizard, { EventDraft } from '@/components/wizard/RaceWizard';

const Profile = () => {
  const { user, logout, selectedRole } = useAuth();
  const [selectedEvent, setSelectedEvent] = useState<string>('');
  const [isAddEventDialogOpen, setIsAddEventDialogOpen] = useState(false);
  const [organizerEventsData, setOrganizerEventsData] = useState([
    {
      id: '1',
      name: 'Boston Half Marathon',
      date: 'March 15, 2024',
      location: 'Boston, MA',
      registrations: 328,
      capacity: 500,
      revenue: 26320
    },
    {
      id: '2',
      name: 'Trail Runner 10K',
      date: 'April 20, 2024',
      location: 'Boulder, CO',
      registrations: 156,
      capacity: 250,
      revenue: 9360
    }
  ]);
  const location = useLocation();

  useEffect(() => {
    document.title = selectedRole === 'organizer' ? 'Organizer Dashboard — RACE' : 'Profile — RACE';
    
    // Check if wizard should be opened from URL parameter
    const params = new URLSearchParams(location.search);
    if (params.get('openWizard') === 'true') {
      setIsAddEventDialogOpen(true);
      // Remove the parameter from URL without causing a re-render
      window.history.replaceState({}, '', '/profile');
    }
  }, [selectedRole, location.search]);

  const handleEventCreated = (newEvent: EventDraft) => {
    // Convert EventDraft to organizer event format and add to list
    const organizerEvent = {
      id: newEvent.id,
      name: newEvent.basics.race_name || 'Unnamed Event',
      date: newEvent.basics.date?.toLocaleDateString() || 'TBD',
      location: `${newEvent.basics.city}, ${newEvent.basics.state}`,
      registrations: 0,
      capacity: newEvent.pricing.capacity_total || 0,
      revenue: 0
    };
    
    setOrganizerEventsData(prev => [organizerEvent, ...prev]);
    setSelectedEvent(organizerEvent.id);
    setIsAddEventDialogOpen(false);
  };

  // If not authenticated, redirect to login
  if (!user) {
    return <Navigate to="/auth" />;
  }

  // Mock data - different for organizers vs athletes
  const organizerEvents = [
    {
      id: '1',
      name: 'Sunrise Half Marathon',
      date: 'March 15, 2024',
      location: 'Austin, TX',
      registrations: 0,
      capacity: 500,
      revenue: 0
    },
    {
      id: '2',
      name: 'Trail Run Championship',
      date: 'April 20, 2024',
      location: 'Boulder, CO',
      registrations: 0,
      capacity: 200,
      revenue: 0
    }
  ];

  // Mock organizer profile data
  const organizerProfile = {
    companyName: user?.name || 'Demo Company',
    email: user?.email || 'demo@company.com',
    city: 'San Francisco',
    state: 'CA',
    website: 'democompany.com'
  };

  // Mock data for registered events (athletes)
  const registeredEvents = [
    {
      id: '1',
      name: 'Boston Half Marathon',
      date: 'March 15, 2024',
      location: 'Boston, MA',
      distance: 'Half Marathon',
      status: 'confirmed',
      price: '$85.00',
      registrationDate: 'Jan 12, 2024'
    },
    {
      id: '2',
      name: 'Trail Runner 10K',
      date: 'April 20, 2024',
      location: 'Boulder, CO',
      distance: '10K',
      status: 'confirmed',
      price: '$55.00',
      registrationDate: 'Feb 3, 2024'
    }
  ];

  // Mock data for past events (athletes)
  const pastEvents = [
    {
      id: '1',
      name: 'NYC Marathon',
      date: 'November 5, 2023',
      location: 'New York, NY',
      distance: 'Marathon',
      finishTime: '3:45:22',
      placement: '2,847 of 15,000',
      personalRecord: true
    },
    {
      id: '2',
      name: 'Chicago Half Marathon',
      date: 'September 12, 2023',
      location: 'Chicago, IL',
      distance: 'Half Marathon',
      finishTime: '1:42:15',
      placement: '456 of 8,200',
      personalRecord: false
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      {selectedRole === 'organizer' ? (
        <div className="space-y-6">
          {/* Top Bar with Event Selection and Add Event Button */}
          <div className="flex justify-between items-center gap-4 mb-8">
            {/* Event Selection - Search Bar Style */}
            <div className="flex-1 max-w-md">
              <Select value={selectedEvent} onValueChange={setSelectedEvent}>
                <SelectTrigger className="w-full h-12 text-base">
                  <SelectValue placeholder="Select an event to view analytics..." />
                </SelectTrigger>
                <SelectContent>
                  {organizerEventsData.map((event) => (
                    <SelectItem key={event.id} value={event.id}>
                      {event.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Add Event Button */}
            <Dialog open={isAddEventDialogOpen} onOpenChange={setIsAddEventDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-race-red hover:bg-race-red/90 h-12 px-6">
                  <Plus className="w-4 h-4 mr-2" />
                  Add an Event
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto p-0">
                <RaceWizard 
                  onClose={() => setIsAddEventDialogOpen(false)}
                  onEventCreated={handleEventCreated}
                />
              </DialogContent>
            </Dialog>
          </div>

          {/* Analytics Content */}
          {selectedEvent ? (
            (() => {
              const event = organizerEventsData.find(e => e.id === selectedEvent);
              if (!event) return null;
              
              // Mock chart data for registrations over time
              const chartData = [
                { month: 'Jan', registrations: 0, cumulative: 0 },
                { month: 'Feb', registrations: 0, cumulative: 0 },
                { month: 'Mar', registrations: 0, cumulative: 0 },
                { month: 'Apr', registrations: 0, cumulative: 0 },
                { month: 'May', registrations: 0, cumulative: 0 },
                { month: 'Jun', registrations: 0, cumulative: 0 },
              ];
              
              return (
                <div className="space-y-8">
                  {/* Event Header */}
                  <div className="text-center">
                    <h1 className="text-4xl font-bold mb-3">{event.name}</h1>
                    <p className="text-xl text-muted-foreground">{event.date} • {event.location}</p>
                  </div>
                  
                  {/* Key Metrics Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <Card className="border-l-4 border-l-race-red">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                          <div className="w-8 h-8 bg-race-red/10 rounded-full flex items-center justify-center">
                            <span className="text-race-red font-bold text-xs">#</span>
                          </div>
                          Total Registrations
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold text-race-red">0</div>
                        <p className="text-xs text-muted-foreground mt-1">
                          of {event.capacity} capacity
                        </p>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                          <div 
                            className="bg-race-red h-2 rounded-full transition-all duration-300" 
                            style={{ width: "0%" }}
                          ></div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="border-l-4 border-l-race-red">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                          <div className="w-8 h-8 bg-race-red/10 rounded-full flex items-center justify-center">
                            <span className="text-race-red font-bold text-xs">$</span>
                          </div>
                          Total Revenue
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold text-race-red">$0</div>
                        <p className="text-xs text-muted-foreground mt-1">
                          No revenue yet
                        </p>
                      </CardContent>
                    </Card>
                    
                    <Card className="border-l-4 border-l-race-red">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                          <div className="w-8 h-8 bg-race-red/10 rounded-full flex items-center justify-center">
                            <Calendar className="w-4 h-4 text-race-red" />
                          </div>
                          Days Until Event
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold text-race-red">
                          {Math.max(0, Math.floor((new Date(event.date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)))}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          Event date: {event.date}
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="border-l-4 border-l-race-red">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                          <div className="w-8 h-8 bg-race-red/10 rounded-full flex items-center justify-center">
                            <span className="text-race-red font-bold text-xs">%</span>
                          </div>
                          Capacity Filled
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold text-race-red">0%</div>
                        <p className="text-xs text-muted-foreground mt-1">
                          {event.capacity} spots remaining
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Charts Section */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Registrations Over Time Chart */}
                    <Card className="lg:col-span-2">
                      <CardHeader>
                        <CardTitle>Registrations Over Time</CardTitle>
                        <CardDescription>Monthly registration trends for {event.name}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="h-80 w-full">
                          {/* Simple Line Chart Visualization */}
                          <div className="relative h-full w-full bg-gradient-to-t from-gray-50 to-white rounded-lg border p-6">
                            <div className="absolute inset-0 p-6">
                              {/* Y-axis labels */}
                              <div className="absolute left-2 top-6 bottom-6 flex flex-col justify-between text-xs text-gray-500">
                                <span>500</span>
                                <span>400</span>
                                <span>300</span>
                                <span>200</span>
                                <span>100</span>
                                <span>0</span>
                              </div>
                              
                              {/* Chart area */}
                              <div className="ml-8 mr-4 h-full relative">
                                {/* Grid lines */}
                                <div className="absolute inset-0">
                                  {[0, 1, 2, 3, 4, 5].map((i) => (
                                    <div key={i} className="absolute w-full border-t border-gray-200" style={{ top: `${i * 20}%` }}></div>
                                  ))}
                                </div>
                                
                                {/* Line chart path - flat line at bottom for 0 data */}
                                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                                  <polyline
                                    fill="none"
                                    stroke="#dc2626"
                                    strokeWidth="2"
                                    points="0,100 20,100 40,100 60,100 80,100 100,100"
                                  />
                                  {/* Data points */}
                                  {chartData.map((point, index) => (
                                    <circle
                                      key={index}
                                      cx={index * 20}
                                      cy={100}
                                      r="1.5"
                                      fill="#dc2626"
                                      className="drop-shadow-sm"
                                    />
                                  ))}
                                </svg>
                                
                                {/* X-axis labels */}
                                <div className="absolute -bottom-6 left-0 right-0 flex justify-between text-xs text-gray-500">
                                  {chartData.map((point, index) => (
                                    <span key={index}>{point.month}</span>
                                  ))}
                                </div>
                              </div>
                            </div>
                            
                            {/* Current value indicator */}
                            <div className="absolute top-4 right-4 bg-race-red text-white px-3 py-1 rounded-full text-sm font-bold">
                              0 total
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Quick Stats */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Quick Stats</CardTitle>
                        <CardDescription>Key performance indicators</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Registration Rate</span>
                          <span className="text-lg font-bold text-race-red">0%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Avg. Monthly Growth</span>
                          <span className="text-lg font-bold text-race-red">0</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Peak Month</span>
                          <span className="text-lg font-bold text-race-red">None</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Revenue per Day</span>
                          <span className="text-lg font-bold text-race-red">$0</span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              );
            })()
          ) : (
            <div className="space-y-8">
              {/* Placeholder Header */}
              <div className="text-center">
                <h1 className="text-4xl font-bold mb-3 text-gray-400">Select an Event</h1>
                <p className="text-xl text-muted-foreground">Choose an event from the dropdown above to view analytics</p>
              </div>
              
              {/* Placeholder Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <Card key={i} className="border-l-4 border-l-gray-300">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                          <span className="text-gray-400 font-bold text-xs">--</span>
                        </div>
                        No Data Available
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-gray-400">--</div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Select an event to view metrics
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Placeholder Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Registrations Over Time</CardTitle>
                  <CardDescription>Select an event to view registration trends</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80 w-full flex items-center justify-center border-2 border-dashed border-gray-200 rounded-lg">
                    <div className="text-center">
                      <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-xl font-medium text-gray-900 mb-2">No Event Selected</h3>
                      <p className="text-gray-500">Choose an event to view detailed analytics and charts</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-16">
          {/* User Profile Card */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-race-red rounded-full flex items-center justify-center text-white font-bold">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  {user.name}
                </CardTitle>
                <CardDescription>{user.email}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Member since</p>
                  <p className="font-medium">{user.memberSince}</p>
                </div>
                
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Events completed</p>
                  <p className="font-medium">{pastEvents.length}</p>
                </div>
                
                {user.isRacePlus && (
                  <Badge variant="secondary" className="bg-gradient-to-r from-race-red to-red-600 text-white">
                    RACE+ Member
                  </Badge>
                )}
                
                <Separator />
                
                <Button 
                  variant="outline" 
                  className="w-full" 
                  onClick={logout}
                >
                  Sign Out
                </Button>
              </CardContent>
            </Card>
            
            {/* Payment Methods Card */}
            <Card className="mt-4">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Payment Methods
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-5 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">
                      VISA
                    </div>
                    <span className="text-sm">•••• 4532</span>
                  </div>
                  <Badge variant="outline">Default</Badge>
                </div>
                <Button variant="ghost" size="sm" className="w-full mt-3 text-race-red">
                  <Plus className="w-4 h-4 mr-1" />
                  Add Payment Method
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Event Tabs */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="upcoming" className="space-y-4">
              <TabsList>
                <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
                <TabsTrigger value="past">Past Events</TabsTrigger>
                <TabsTrigger value="saved">Saved Events</TabsTrigger>
              </TabsList>
              
              <TabsContent value="upcoming" className="space-y-4">
                {registeredEvents.length > 0 ? (
                  registeredEvents.map((event) => (
                    <Card key={event.id}>
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="font-semibold text-lg">{event.name}</h3>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                              <div className="flex items-center gap-1">
                                <CalendarDays className="w-4 h-4" />
                                {event.date}
                              </div>
                              <div className="flex items-center gap-1">
                                <MapPin className="w-4 h-4" />
                                {event.location}
                              </div>
                            </div>
                          </div>
                          <Badge variant="outline">{event.status}</Badge>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-muted-foreground">
                            Distance: {event.distance} • Price: {event.price}
                          </div>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <CalendarDays className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">No upcoming events</h3>
                    <p className="text-muted-foreground mb-4">
                      You haven't registered for any events yet
                    </p>
                    <Button className="bg-race-red hover:bg-race-red/90" asChild>
                      <a href="/events">Find Events</a>
                    </Button>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="past" className="space-y-4">
                {pastEvents.map((event) => (
                  <Card key={event.id}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-semibold text-lg">{event.name}</h3>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                            <div className="flex items-center gap-1">
                              <CalendarDays className="w-4 h-4" />
                              {event.date}
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {event.location}
                            </div>
                          </div>
                        </div>
                        {event.personalRecord && (
                          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                            <Trophy className="w-3 h-3 mr-1" />
                            PR
                          </Badge>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm text-muted-foreground">Finish Time</p>
                            <p className="font-medium">{event.finishTime}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Trophy className="w-4 h-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm text-muted-foreground">Placement</p>
                            <p className="font-medium">{event.placement}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
              
              <TabsContent value="saved" className="space-y-4">
                <div className="text-center py-12">
                  <Bookmark className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No saved events</h3>
                  <p className="text-muted-foreground mb-4">
                    You haven't saved any events yet
                  </p>
                  <Button className="bg-race-red hover:bg-race-red/90" asChild>
                    <a href="/events">Browse Events</a>
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;