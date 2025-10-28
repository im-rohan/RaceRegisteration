import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import BasicsStep, { BasicsData } from '@/components/wizard/steps/BasicsStep';
import RaceDetailsStep, { RaceDetailsData } from '@/components/wizard/steps/RaceDetailsStep';
import PricingStep, { PricingData } from '@/components/wizard/steps/PricingStep';
import BrandingStep, { BrandingData } from '@/components/wizard/steps/BrandingStep';
import LogisticsStep, { LogisticsData } from '@/components/wizard/steps/LogisticsStep';
import AIAutomationStep, { AIAutomationData } from '@/components/wizard/steps/AIAutomationStep';
export type VerificationDraft = {
  basics: BasicsData;
  raceDetails: RaceDetailsData;
  pricing: PricingData;
  branding: BrandingData;
  logistics: LogisticsData;
  aiAutomation: AIAutomationData;
};
const stepTitles = ["Race Basics", "Race Details", "Pricing & Registration", "Branding & Marketing", "Logistics", "AI & Automation Setup"];
const stepDescriptions = ["Essential information about your race", "Distances, course, and description", "Registration pricing and capacity", "Logos, images, and social links", "Packet pickup and emergency contacts", "Goals and automated marketing"];
const createEmptyDraft = (userEmail?: string): VerificationDraft => ({
  basics: {
    race_name: '',
    date: null,
    city: '',
    state: '',
    race_type: 'Road',
    organizer_email: userEmail || ''
  },
  raceDetails: {
    race_type: 'Running',
    distances: ['5K'],
    start_times: {
      '5K': ''
    },
    start_address: '',
    course_map_file: null,
    gpx_file: null,
    description: '',
    custom_distance: ''
  },
  pricing: {
    reg_open: null,
    reg_close: null,
    pricing_tiers: [{
      id: 'tier_1',
      name: 'Early Bird',
      price: 25,
      start_date: null,
      end_date: null
    }],
    capacity_total: 500,
    capacity_by_distance: {
      '5K': 500
    }
  },
  branding: {
    logo: null,
    hero_image: null,
    instagram_url: '',
    tiktok_url: '',
    x_url: '',
    meta_url: ''
  },
  logistics: {
    packet_pickup_date: null,
    packet_pickup_start_time: '',
    packet_pickup_end_time: '',
    packet_pickup_address: '',
    packet_pickup_notes: '',
    parking_transport: '',
    volunteer_signup_url: ''
  },
  aiAutomation: {
    goal_total: 100,
    goal_by_distance: {
      '5K': 100
    },
    goal_deadline: null,
    comms_tone: '',
    abandoned_checkout_enabled: false,
    milestone_emails_enabled: false,
    last_minute_push_enabled: false,
    marketing_budget: 0
  }
});
const Verification = () => {
  const {
    user
  } = useAuth();
  const navigate = useNavigate();
  const {
    toast
  } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [verificationDraft, setVerificationDraft] = useState<VerificationDraft>(() => createEmptyDraft(user?.email));
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isCompleted, setIsCompleted] = useState(false);

  // Step header measurements to ensure connector line touches circle edges
  const containerRef = useRef<HTMLDivElement | null>(null);
  const circleRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [lineBounds, setLineBounds] = useState<{
    left: number;
    width: number;
  }>({
    left: 0,
    width: 0
  });
  useEffect(() => {
    const calc = () => {
      const container = containerRef.current;
      const circles = circleRefs.current.filter(Boolean) as HTMLDivElement[];
      if (!container || circles.length < 2) return;
      const containerRect = container.getBoundingClientRect();
      const firstRect = circles[0].getBoundingClientRect();
      const lastRect = circles[circles.length - 1].getBoundingClientRect();
      const left = firstRect.left - containerRect.left;
      const width = lastRect.right - firstRect.left;
      setLineBounds({
        left,
        width
      });
    };
    calc();
    window.addEventListener('resize', calc);
    return () => window.removeEventListener('resize', calc);
  }, []);

  // Redirect if not logged in or not an organizer
  useEffect(() => {
    if (!user) {
      navigate('/auth', {
        replace: true
      });
      return;
    }
  }, [user, navigate]);

  // SEO setup
  useEffect(() => {
    document.title = "Event Organizer Verification | RACE";
    const desc = "Complete your event organizer verification to gain access to RACE's comprehensive event management platform.";
    let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "description";
      document.head.appendChild(meta);
    }
    meta.content = desc;
  }, []);
  const updateBasics = (data: Partial<BasicsData>) => {
    setVerificationDraft(prev => ({
      ...prev,
      basics: {
        ...prev.basics,
        ...data
      }
    }));
  };
  const updateRaceDetails = (data: Partial<RaceDetailsData>) => {
    setVerificationDraft(prev => ({
      ...prev,
      raceDetails: {
        ...prev.raceDetails,
        ...data
      }
    }));
  };
  const updatePricing = (data: Partial<PricingData>) => {
    setVerificationDraft(prev => ({
      ...prev,
      pricing: {
        ...prev.pricing,
        ...data
      }
    }));
  };
  const updateBranding = (data: Partial<BrandingData>) => {
    setVerificationDraft(prev => ({
      ...prev,
      branding: {
        ...prev.branding,
        ...data
      }
    }));
  };
  const updateLogistics = (data: Partial<LogisticsData>) => {
    setVerificationDraft(prev => ({
      ...prev,
      logistics: {
        ...prev.logistics,
        ...data
      }
    }));
  };
  const updateAIAutomation = (data: Partial<AIAutomationData>) => {
    setVerificationDraft(prev => ({
      ...prev,
      aiAutomation: {
        ...prev.aiAutomation,
        ...data
      }
    }));
  };
  const validateCurrentStep = (): boolean => {
    switch (currentStep) {
      case 1:
        return !!(verificationDraft.basics.race_name && verificationDraft.basics.date && verificationDraft.basics.city && verificationDraft.basics.state);
      case 2:
        return !!(verificationDraft.raceDetails.distances.length > 0 && verificationDraft.raceDetails.start_address);
      case 3:
        return !!(verificationDraft.pricing.pricing_tiers.length > 0 && verificationDraft.pricing.capacity_total > 0);
      case 4:
        return true;
      // Branding is optional
      case 5:
        return true; // Logistics step is now optional since emergency contact was removed
      case 6:
        return true;
      // AI automation is optional
      default:
        return false;
    }
  };
  const handleNext = () => {
    if (validateCurrentStep()) {
      if (currentStep < 6) {
        setCurrentStep(prev => prev + 1);
      } else {
        handleSubmit();
      }
    } else {
      toast({
        title: "Please complete required fields",
        description: "All required fields must be filled before proceeding.",
        variant: "destructive"
      });
    }
  };
  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };
  const handleSubmit = () => {
    // Simulate verification submission
    setIsCompleted(true);

    // Trigger confetti
    confetti({
      particleCount: 200,
      spread: 70,
      origin: {
        y: 0.6
      },
      colors: ['#FF4230', '#FFD700', '#00FF00', '#FF69B4', '#87CEEB']
    });
    toast({
      title: "Verification Submitted!",
      description: "Your organizer verification has been submitted successfully."
    });
  };
  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return <BasicsStep data={verificationDraft.basics} onChange={updateBasics} errors={errors} />;
      case 2:
        return <RaceDetailsStep data={verificationDraft.raceDetails} onChange={updateRaceDetails} errors={errors} />;
      case 3:
        return <PricingStep data={verificationDraft.pricing} onChange={updatePricing} errors={errors} distances={verificationDraft.raceDetails.distances} />;
      case 4:
        return <BrandingStep data={verificationDraft.branding} onChange={updateBranding} errors={errors} />;
      case 5:
        return <LogisticsStep data={verificationDraft.logistics} onChange={updateLogistics} errors={errors} />;
      case 6:
        return <AIAutomationStep data={verificationDraft.aiAutomation} onChange={updateAIAutomation} errors={errors} distances={verificationDraft.raceDetails.distances} />;
      default:
        return null;
    }
  };
  const getStepStatus = (step: number) => {
    if (step < currentStep) return 'completed';
    if (step === currentStep) return 'current';
    return 'upcoming';
  };
  if (isCompleted) {
    return <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md mx-4">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2">
              Event Submitted!
            </h1>
            <p className="text-muted-foreground mb-6">
              Currently under verification. You will be notified within 24 hours via email.
            </p>
            <Button onClick={() => navigate('/')} className="w-full bg-race-red hover:bg-race-red/90">
              Return to Home
            </Button>
          </CardContent>
        </Card>
      </div>;
  }
  if (!user) {
    return null; // Will redirect via useEffect
  }
  const progressPercentage = currentStep / 6 * 100;
  return <main className="bg-background min-h-screen pt-20">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-2">
            Event Organizer Verification
          </h1>
          <p className="text-muted-foreground">Complete your verification to access the organizer dashboard.</p>
        </div>

        {/* Progress Bar with Steps */}
        <div className="mb-8">
          <div ref={containerRef} className="relative mb-4">
            {/* Single centered connector line limited to circle edges */}
            <div className="absolute top-5 h-0.5 bg-gray-300 z-0" style={{
            left: lineBounds.left,
            width: lineBounds.width
          }} />

            {/* Evenly spaced circles in one straight line */}
            <div className="grid grid-cols-6 gap-x-4">
              {stepTitles.map((title, index) => {
              const stepNum = index + 1;
              const status = getStepStatus(stepNum);
              return <div key={stepNum} className="flex flex-col items-center relative">
                    {/* Mask to prevent line from crossing inside the circle */}
                    <div className="absolute left-1/2 -translate-x-1/2 top-5 h-4 w-10 bg-background z-10" />

                    {/* Step Circle */}
                    <div ref={el => circleRefs.current[index] = el} className={`
                        z-20 w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all duration-300
                        ${status === 'completed' ? 'bg-race-red border-race-red text-white' : status === 'current' ? 'bg-race-red/20 border-race-red text-race-red' : 'bg-gray-100 border-gray-300 text-gray-400'}
                      `}>
                      {status === 'completed' ? <Check className="w-5 h-5" /> : stepNum}
                    </div>
                    
                    {/* Step Label */}
                    <span className={`
                        mt-2 text-xs text-center max-w-24 leading-tight
                        ${status === 'current' ? 'font-bold text-foreground' : 'text-muted-foreground'}
                      `}>
                      {title}
                    </span>
                  </div>;
            })}
            </div>
          </div>
          
          <Progress value={progressPercentage} className="h-2" />
        </div>

        {/* Current Step Content */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-foreground mb-2">
                {stepTitles[currentStep - 1]}
              </h2>
              <p className="text-muted-foreground">
                {stepDescriptions[currentStep - 1]}
              </p>
            </div>
            
            {renderCurrentStep()}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between pb-8">
          <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 1}>
            Previous
          </Button>
          
          <Button onClick={handleNext} disabled={!validateCurrentStep()} className="bg-race-red hover:bg-race-red/90">
            {currentStep === 6 ? 'Submit for Verification' : 'Next'}
          </Button>
        </div>
      </div>
    </main>;
};
export default Verification;