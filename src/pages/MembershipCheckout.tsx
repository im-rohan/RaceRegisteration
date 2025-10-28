
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/components/ui/use-toast';
import { Check, CreditCard, Shield } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const MembershipCheckout = () => {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  const searchParams = new URLSearchParams(location.search);
  const plan = searchParams.get('plan') || 'monthly';
  
  const planDetails = {
    monthly: {
      name: 'RACE+ Monthly',
      price: '$9.99',
      period: 'per month',
      description: 'Flexible monthly membership'
    },
    yearly: {
      name: 'RACE+ Annual',
      price: '$99',
      period: 'per year',
      description: 'Save $21 vs. monthly billing'
    }
  }[plan] || {
    name: 'RACE+ Monthly',
    price: '$9.99',
    period: 'per month',
    description: 'Flexible monthly membership'
  };
  
  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Pre-fill form if user is logged in
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Membership activated!",
        description: `Your ${planDetails.name} membership has been successfully activated.`,
      });
      
      // Navigate to success page after successful payment
      navigate('/membership-success');
    } catch (error) {
      toast({
        title: "Payment failed",
        description: "There was a problem processing your payment. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const formatCardNumber = (value: string) => {
    // Remove all non-digit characters
    const digits = value.replace(/\D/g, '');
    // Format in groups of 4
    const groups = [];
    for (let i = 0; i < digits.length; i += 4) {
      groups.push(digits.slice(i, i + 4));
    }
    return groups.join(' ').substring(0, 19); // Limit to 16 digits + 3 spaces
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatCardNumber(e.target.value);
    setCardNumber(formattedValue);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid md:grid-cols-3 gap-8">
        {/* Checkout Form */}
        <div className="md:col-span-2">
          <h1 className="text-3xl font-bold mb-6">Complete Your Purchase</h1>
          
          <Card>
            <CardHeader>
              <CardTitle>Payment Information</CardTitle>
              <CardDescription>
                Enter your card details to complete your {planDetails.name} purchase
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name on Card</Label>
                      <Input 
                        id="name" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        placeholder="Jane Smith" 
                        required 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="jane@example.com" 
                        required 
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <div className="relative">
                      <Input 
                        id="cardNumber" 
                        value={cardNumber}
                        onChange={handleCardNumberChange}
                        placeholder="1234 5678 9012 3456" 
                        required 
                      />
                      <CreditCard className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="expiry">Expiry Date</Label>
                      <Input 
                        id="expiry" 
                        value={expiry}
                        onChange={(e) => setExpiry(e.target.value)}
                        placeholder="MM/YY" 
                        required 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvc">CVC</Label>
                      <Input 
                        id="cvc" 
                        value={cvc}
                        onChange={(e) => setCvc(e.target.value)}
                        placeholder="123" 
                        required 
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Shield className="h-5 w-5 text-race-red mr-2" />
                    <span className="text-sm text-gray-500">Your payment information is secured with SSL encryption</span>
                  </div>
                </div>
                
                <div className="mt-6">
                  <Button type="submit" className="w-full bg-race-red hover:bg-race-red/90 py-6" disabled={loading}>
                    {loading ? 'Processing...' : `Complete Purchase (${planDetails.price})`}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
        
        {/* Order Summary */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="font-medium">{planDetails.name}</span>
                  <span>{planDetails.price}</span>
                </div>
                <div className="text-sm text-gray-500">
                  {planDetails.description}
                </div>
                
                <Separator className="my-4" />
                
                <div className="space-y-3">
                  <p className="font-medium">RACE+ Benefits:</p>
                  <div className="flex items-start space-x-2">
                    <Check className="h-5 w-5 text-green-600 mt-0.5" />
                    <span>Race insurance and partial refunds</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Check className="h-5 w-5 text-green-600 mt-0.5" />
                    <span>Exclusive discounts on races and gear</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Check className="h-5 w-5 text-green-600 mt-0.5" />
                    <span>Smart calendar integration</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Check className="h-5 w-5 text-green-600 mt-0.5" />
                    <span>Friends & leaderboard features</span>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>{planDetails.price}</span>
                </div>
                
                <div className="text-sm text-gray-500">
                  Billed {plan === 'yearly' ? 'annually' : 'monthly'}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center">
              <p className="text-sm text-center text-gray-500">
                You can cancel your subscription at any time from your account settings
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MembershipCheckout;
