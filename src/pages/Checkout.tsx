
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { getEventById } from '@/data/eventData';
import { Calendar, MapPin, ArrowLeft, CreditCard, Check } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  
  const [step, setStep] = useState(1);
  const eventId = new URLSearchParams(location.search).get('eventId');
  const event = eventId ? getEventById(eventId) : null;
  const { items } = useCart();
  const selectedEvents = event ? [event] : items;
  const itemCount = selectedEvents.length;
  
  // Form states
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [dob, setDob] = useState('');
  const [emergencyContact, setEmergencyContact] = useState('');
  const [emergencyPhone, setEmergencyPhone] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  
  // Payment states
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [billingZip, setBillingZip] = useState('');
  const [saveCard, setSaveCard] = useState(false);
  
  // Success state
  const [isSuccess, setIsSuccess] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Pricing
  const basePrice = 99.99;
  const serviceFee = 5.99;
  const registrationTotal = basePrice * itemCount;
  const serviceTotal = serviceFee * itemCount;
  const discountTotal = selectedEvents.reduce((sum, ev) => sum + (ev?.isRacePlus ? 5 : 0), 0);
  const totalPrice = registrationTotal + serviceTotal - discountTotal;


  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // If user is logged in, pre-fill form fields
    if (user) {
      const nameParts = user.name.split(' ');
      setFirstName(nameParts[0] || '');
      setLastName(nameParts.slice(1).join(' ') || '');
      setEmail(user.email);
    }
  }, [user]);

  const handlePersonalInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!termsAccepted) {
      toast({
        variant: "destructive",
        title: "Please accept the terms and conditions",
        description: "You must accept the terms to continue."
      });
      return;
    }
    setStep(2);
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Validate card number (basic check)
    const cardNumberDigits = cardNumber.replace(/\s/g, '');
    if (cardNumberDigits.length < 16) {
      toast({
        variant: "destructive",
        title: "Invalid card number",
        description: "Please enter a valid card number."
      });
      setIsProcessing(false);
      return;
    }
    
    // Validate expiry (basic check)
    if (!expiry.match(/^\d{2}\/\d{2}$/)) {
      toast({
        variant: "destructive",
        title: "Invalid expiry date",
        description: "Please enter a valid expiry date (MM/YY)."
      });
      setIsProcessing(false);
      return;
    }
    
    // Simulate payment processing
    setTimeout(() => {
      setIsSuccess(true);
      setStep(3);
      setIsProcessing(false);
      
      // After successful payment, redirect to success page
      if (event) {
        navigate(`/payment-success?eventId=${event.id}`);
      } else {
        navigate(`/payment-success`);
      }
    }, 1500);
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

  if (!event && itemCount === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-8">
          <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
          <p className="mb-6">Add races to your cart to continue to checkout.</p>
          <Button asChild>
            <a href="/events">Browse Events</a>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-race-gray pt-20 pb-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Checkout header */}
          <div className="mb-8">
            <a href="/events" className="flex items-center text-race-red hover:text-race-red/90 mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Events
            </a>
            <h1 className="text-3xl font-bold">Registration Checkout</h1>
          </div>

          {/* Checkout steps */}
          <div className="flex mb-8 border-b border-gray-200 pb-4">
            <div className={`flex-1 flex items-center justify-center ${step >= 1 ? 'text-race-red' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${step >= 1 ? 'bg-race-red text-white' : 'bg-gray-200'}`}>
                {step > 1 ? <Check className="h-5 w-5" /> : '1'}
              </div>
              <span className="font-medium">Personal Info</span>
            </div>
            <div className={`flex-1 flex items-center justify-center ${step >= 2 ? 'text-race-red' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${step >= 2 ? 'bg-race-red text-white' : 'bg-gray-200'}`}>
                {step > 2 ? <Check className="h-5 w-5" /> : '2'}
              </div>
              <span className="font-medium">Payment</span>
            </div>
            <div className={`flex-1 flex items-center justify-center ${step >= 3 ? 'text-race-red' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${step >= 3 ? 'bg-race-red text-white' : 'bg-gray-200'}`}>
                {step > 3 ? <Check className="h-5 w-5" /> : '3'}
              </div>
              <span className="font-medium">Confirmation</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form section */}
            <div className="lg:col-span-2">
              {step === 1 && (
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h2 className="text-xl font-bold mb-6">Personal Information</h2>
                  <form onSubmit={handlePersonalInfoSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          className="mt-1"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          className="mt-1"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="mt-1"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="mt-1"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="dob">Date of Birth</Label>
                      <Input
                        id="dob"
                        type="date"
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                        className="mt-1"
                        required
                      />
                    </div>

                    <div>
                      <h3 className="font-medium mb-3">Emergency Contact</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="emergencyContact">Name</Label>
                          <Input
                            id="emergencyContact"
                            value={emergencyContact}
                            onChange={(e) => setEmergencyContact(e.target.value)}
                            className="mt-1"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="emergencyPhone">Phone</Label>
                          <Input
                            id="emergencyPhone"
                            value={emergencyPhone}
                            onChange={(e) => setEmergencyPhone(e.target.value)}
                            className="mt-1"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="terms"
                        checked={termsAccepted}
                        onCheckedChange={(checked) => setTermsAccepted(checked as boolean)}
                      />
                      <label
                        htmlFor="terms"
                        className="text-sm text-gray-500 leading-tight"
                      >
                        I agree to the <a href="#" className="text-race-red hover:underline">Terms and Conditions</a> and confirm that I have read the <a href="#" className="text-race-red hover:underline">Waiver of Liability</a>.
                      </label>
                    </div>

                    <Button type="submit" className="w-full bg-race-red hover:bg-race-red/90">
                      Continue to Payment
                    </Button>
                  </form>
                </div>
              )}

              {step === 2 && (
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h2 className="text-xl font-bold mb-6">Payment Information</h2>
                  <form onSubmit={handlePaymentSubmit} className="space-y-6">
                    <div>
                      <Label htmlFor="cardName">Name on Card</Label>
                      <Input
                        id="cardName"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        className="mt-1"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <div className="relative">
                        <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        <Input
                          id="cardNumber"
                          value={cardNumber}
                          onChange={handleCardNumberChange}
                          className="pl-10 mt-1"
                          placeholder="1234 5678 9012 3456"
                          maxLength={19}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="col-span-1">
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input
                          id="expiry"
                          value={expiry}
                          onChange={(e) => setExpiry(e.target.value)}
                          placeholder="MM/YY"
                          className="mt-1"
                          required
                        />
                      </div>
                      <div className="col-span-1">
                        <Label htmlFor="cvc">CVC</Label>
                        <Input
                          id="cvc"
                          value={cvc}
                          onChange={(e) => setCvc(e.target.value)}
                          placeholder="123"
                          maxLength={3}
                          className="mt-1"
                          required
                        />
                      </div>
                      <div className="col-span-1">
                        <Label htmlFor="billingZip">Billing ZIP</Label>
                        <Input
                          id="billingZip"
                          value={billingZip}
                          onChange={(e) => setBillingZip(e.target.value)}
                          className="mt-1"
                          required
                        />
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="saveCard"
                        checked={saveCard}
                        onCheckedChange={(checked) => setSaveCard(checked as boolean)}
                      />
                      <label
                        htmlFor="saveCard"
                        className="text-sm text-gray-500"
                      >
                        Save card for future transactions
                      </label>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button
                        type="button"
                        variant="outline"
                        className="flex-1"
                        onClick={() => setStep(1)}
                        disabled={isProcessing}
                      >
                        Back
                      </Button>
                      <Button
                        type="submit"
                        className="flex-1 bg-race-red hover:bg-race-red/90"
                        disabled={isProcessing}
                      >
                        {isProcessing ? 'Processing...' : 'Complete Registration'}
                      </Button>
                    </div>
                  </form>
                </div>
              )}
            </div>

            {/* Order summary */}
            <div className="lg:col-span-1">
              <div className="bg-white p-6 rounded-lg shadow-sm sticky top-24">
                <h3 className="font-bold text-lg mb-4">Order Summary</h3>
                {itemCount === 1 && event ? (
                  <div className="flex items-center mb-4">
                    <img 
                      src={event.imageUrl} 
                      alt={event.title} 
                      className="w-16 h-16 object-cover rounded-md mr-4"
                    />
                    <div>
                      <h4 className="font-bold">{event.title}</h4>
                      <div className="text-sm text-race-darkgray flex items-center mt-1">
                        <Calendar className="h-4 w-4 mr-1" />
                        {event.date}
                      </div>
                      <div className="text-sm text-race-darkgray flex items-center mt-1">
                        <MapPin className="h-4 w-4 mr-1" />
                        {event.location}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="mb-4 max-h-64 overflow-y-auto space-y-3">
                    {selectedEvents.map((ev) => (
                      <div key={ev.id} className="flex items-center">
                        <img 
                          src={ev.imageUrl} 
                          alt={ev.title} 
                          className="w-12 h-12 object-cover rounded-md mr-3"
                          loading="lazy"
                        />
                        <div>
                          <h4 className="font-medium">{ev.title}</h4>
                          <div className="text-xs text-race-darkgray flex items-center mt-0.5">
                            <Calendar className="h-3 w-3 mr-1" />
                            {ev.date}
                          </div>
                          <div className="text-xs text-race-darkgray flex items-center">
                            <MapPin className="h-3 w-3 mr-1" />
                            {ev.location}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="border-t border-b border-gray-200 py-4 my-4">
                  <div className="flex justify-between mb-2">
                    <span>Registration Fee</span>
                    <span>${basePrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>Service Fee</span>
                    <span>${serviceFee.toFixed(2)}</span>
                  </div>
                  {user?.isRacePlus && (
                    <div className="flex justify-between text-race-red">
                      <span>RACE+ Discount</span>
                      <span>-$5.00</span>
                    </div>
                  )}
                </div>

                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>

                {user?.isRacePlus && (
                  <div className="mt-4 bg-race-gray rounded p-3">
                    <p className="text-sm flex items-start">
                      <Check className="h-4 w-4 text-race-red mr-2 mt-0.5 flex-shrink-0" />
                      <span>You're saving with your RACE+ membership!</span>
                    </p>
                  </div>
                )}
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
