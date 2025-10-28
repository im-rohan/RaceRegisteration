
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Check, Calendar, MapPin, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { featuredEvents } from '@/data/eventData';

const PaymentSuccess = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const eventId = searchParams.get('eventId');
  
  const event = eventId ? featuredEvents.find(e => e.id === eventId) : null;
  
  useEffect(() => {
    // Show success toast on component mount
    toast({
      title: "Payment Successful!",
      description: event 
        ? `Your registration for ${event.title} is confirmed.` 
        : "Your payment has been successfully processed.",
      variant: "default",
    });
    
    // Scroll to top
    window.scrollTo(0, 0);
  }, []);

  const handleBackToHome = () => {
    navigate('/');
  };

  const handleViewProfile = () => {
    navigate('/profile');
  };
  
  // Generate a random confirmation number
  const confirmationNumber = `RACE${Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}`;
  
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="text-center mb-12">
        <div className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
          <Check className="h-10 w-10 text-green-600" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-3">Payment Successful!</h1>
        <p className="text-xl text-gray-600">
          {event 
            ? `Your registration for ${event.title} has been confirmed.` 
            : "Your payment has been successfully processed."}
        </p>
      </div>
      
      {event && (
        <Card className="mb-8 overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/3">
              <img 
                src={event.imageUrl} 
                alt={event.title} 
                className="h-full w-full object-cover"
              />
            </div>
            <CardContent className="p-6 md:w-2/3">
              <h2 className="text-2xl font-bold">{event.title}</h2>
              
              <div className="mt-4 space-y-2">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-gray-500" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-gray-500" />
                  <span>{event.location}</span>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-gray-50 rounded-md">
                <p className="text-sm text-gray-500 mb-1">Confirmation Number</p>
                <p className="font-mono font-medium text-lg">{confirmationNumber}</p>
              </div>
            </CardContent>
          </div>
        </Card>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-6 bg-gray-50 rounded-lg">
          <h3 className="font-medium mb-2">What's Next?</h3>
          <ul className="space-y-3">
            <li className="flex items-start">
              <ChevronRight className="h-5 w-5 text-race-red mr-1 flex-shrink-0 mt-0.5" />
              <span>Check your email for a confirmation receipt</span>
            </li>
            <li className="flex items-start">
              <ChevronRight className="h-5 w-5 text-race-red mr-1 flex-shrink-0 mt-0.5" />
              <span>View your race details and registration information in your profile</span>
            </li>
            <li className="flex items-start">
              <ChevronRight className="h-5 w-5 text-race-red mr-1 flex-shrink-0 mt-0.5" />
              <span>We'll send you a reminder one week before the race day</span>
            </li>
          </ul>
        </div>
        
        <div className="flex flex-col gap-3">
          <Button onClick={handleViewProfile} className="bg-race-red hover:bg-race-red/90">
            View in My Profile
          </Button>
          <Button variant="outline" onClick={handleBackToHome}>
            Return to Homepage
          </Button>
          <Button variant="outline" asChild>
            <a href="/events">Find More Races</a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
