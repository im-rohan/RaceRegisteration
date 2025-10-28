
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Check, ChevronRight } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent } from '@/components/ui/card';

const MembershipSuccess = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Show success toast on component mount
    toast({
      title: "Membership Activated!",
      description: "Your RACE+ membership has been successfully activated.",
      variant: "default",
    });
    
    // Scroll to top
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="text-center mb-12">
        <div className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
          <Check className="h-10 w-10 text-green-600" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-3">Welcome to RACE+!</h1>
        <p className="text-xl text-gray-600">
          Your membership has been successfully activated and is now ready to use.
        </p>
      </div>
      
      <Card className="mb-8 overflow-hidden">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-4">Your RACE+ Benefits</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start">
              <div className="bg-race-red/10 rounded-full p-2 mr-3">
                <Check className="h-5 w-5 text-race-red" />
              </div>
              <div>
                <h3 className="font-medium">Race Insurance</h3>
                <p className="text-gray-600 text-sm">Coverage for unforeseen circumstances</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-race-red/10 rounded-full p-2 mr-3">
                <Check className="h-5 w-5 text-race-red" />
              </div>
              <div>
                <h3 className="font-medium">Exclusive Discounts</h3>
                <p className="text-gray-600 text-sm">Save on races and gear</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-race-red/10 rounded-full p-2 mr-3">
                <Check className="h-5 w-5 text-race-red" />
              </div>
              <div>
                <h3 className="font-medium">Smart Calendar</h3>
                <p className="text-gray-600 text-sm">Integration with your digital calendars</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-race-red/10 rounded-full p-2 mr-3">
                <Check className="h-5 w-5 text-race-red" />
              </div>
              <div>
                <h3 className="font-medium">Leaderboards</h3>
                <p className="text-gray-600 text-sm">Track your performance against friends</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-6 bg-gray-50 rounded-lg">
          <h3 className="font-medium mb-2">What's Next?</h3>
          <ul className="space-y-3">
            <li className="flex items-start">
              <ChevronRight className="h-5 w-5 text-race-red mr-1 flex-shrink-0 mt-0.5" />
              <span>Check your email for your membership confirmation</span>
            </li>
            <li className="flex items-start">
              <ChevronRight className="h-5 w-5 text-race-red mr-1 flex-shrink-0 mt-0.5" />
              <span>Browse races with your new RACE+ badge</span>
            </li>
            <li className="flex items-start">
              <ChevronRight className="h-5 w-5 text-race-red mr-1 flex-shrink-0 mt-0.5" />
              <span>Enjoy discounts on your next race registration</span>
            </li>
          </ul>
        </div>
        
        <div className="flex flex-col gap-3">
          <Button onClick={() => navigate('/profile')} className="bg-race-red hover:bg-race-red/90">
            Visit Your Profile
          </Button>
          <Button variant="outline" onClick={() => navigate('/')}>
            Return to Homepage
          </Button>
          <Button variant="outline" onClick={() => navigate('/events')}>
            Browse Events
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MembershipSuccess;
