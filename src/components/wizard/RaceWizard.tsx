import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

import WizardStep from './WizardStep';
import BasicsStep, { BasicsData } from './steps/BasicsStep';
import RaceDetailsStep, { RaceDetailsData } from './steps/RaceDetailsStep';
import PricingStep, { PricingData } from './steps/PricingStep';
import BrandingStep, { BrandingData } from './steps/BrandingStep';
import LogisticsStep, { LogisticsData } from './steps/LogisticsStep';
import ReviewStep from './steps/ReviewStep';
import { Button } from '@/components/ui/button';

export type EventDraft = {
  id: string;
  basics: BasicsData;
  raceDetails: RaceDetailsData;
  pricing: PricingData;
  branding: BrandingData;
  logistics: LogisticsData;
  createdAt: string;
  updatedAt: string;
};

const stepTitles = [
  "Race Details", 
  "Pricing & Registration",
  "Branding & Marketing",
  "Logistics",
  "Review & Launch"
];

const stepDescriptions = [
  "Type, distances, course, and description",
  "Registration pricing and capacity",
  "Logos, images, and social links", 
  "Packet pickup and event logistics",
  "Final review before launch"
];

const createEmptyDraft = (userEmail?: string): EventDraft => ({
  id: `draft_${Date.now()}`,
  basics: {
    race_name: "",
    date: null,
    city: "",
    state: "",
    race_type: "",
    organizer_email: userEmail || ""
  },
  raceDetails: {
    race_type: "",
    distances: [],
    start_times: {},
    start_address: "",
    course_map_file: null,
    gpx_file: null,
    description: "",
    custom_distance: ""
  },
  pricing: {
    reg_open: null,
    reg_close: null,
    pricing_tiers: [],
    capacity_total: 0,
    capacity_by_distance: {}
  },
  branding: {
    logo: null,
    hero_image: null,
    instagram_url: "",
    tiktok_url: "",
    x_url: "",
    meta_url: ""
  },
  logistics: {
    packet_pickup_date: null,
    packet_pickup_start_time: "",
    packet_pickup_end_time: "",
    packet_pickup_address: "",
    packet_pickup_notes: "",
    parking_transport: "",
    volunteer_signup_url: ""
  },
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
});

interface RaceWizardProps {
  onClose?: () => void;
  onEventCreated?: (event: EventDraft) => void;
}

export default function RaceWizard({ onClose, onEventCreated }: RaceWizardProps = {}) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [eventDraft, setEventDraft] = useState<EventDraft>(() => createEmptyDraft(user?.email));
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Auto-save on field blur
  const saveDraft = useCallback(async (draft: EventDraft) => {
    try {
      const updatedDraft = { ...draft, updatedAt: new Date().toISOString() };
      localStorage.setItem('raceWizardDraft', JSON.stringify(updatedDraft));
      setEventDraft(updatedDraft);
    } catch (error) {
      console.error('Failed to save draft:', error);
    }
  }, []);

  // Load existing draft
  useEffect(() => {
    try {
      const saved = localStorage.getItem('raceWizardDraft');
      if (saved) {
        const draft = JSON.parse(saved);
        setEventDraft(draft);
      }
    } catch (error) {
      console.error('Failed to load draft:', error);
    }
  }, []);

  const updateBasics = (data: Partial<BasicsData>) => {
    const newDraft = {
      ...eventDraft,
      basics: { ...eventDraft.basics, ...data }
    };
    saveDraft(newDraft);
  };

  const updateRaceDetails = (data: Partial<RaceDetailsData>) => {
    const newDraft = {
      ...eventDraft,
      raceDetails: { ...eventDraft.raceDetails, ...data }
    };
    saveDraft(newDraft);
  };

  const updatePricing = (data: Partial<PricingData>) => {
    const newDraft = {
      ...eventDraft,
      pricing: { ...eventDraft.pricing, ...data }
    };
    saveDraft(newDraft);
  };

  const updateBranding = (data: Partial<BrandingData>) => {
    const newDraft = {
      ...eventDraft,
      branding: { ...eventDraft.branding, ...data }
    };
    saveDraft(newDraft);
  };

  const updateLogistics = (data: Partial<LogisticsData>) => {
    const newDraft = {
      ...eventDraft,
      logistics: { ...eventDraft.logistics, ...data }
    };
    saveDraft(newDraft);
  };

  const validateCurrentStep = (): boolean => {
    const newErrors: Record<string, string> = {};

    switch (currentStep) {
      case 1: // Race Details
        if (!eventDraft.raceDetails.race_type) {
          newErrors.race_type = "Race type is required";
        }
        if (eventDraft.raceDetails.distances.length === 0) {
          newErrors.distances = "At least one distance is required";
        }
        break;
      // Other steps don't have required validations for now
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateCurrentStep()) {
      setCurrentStep(Math.min(currentStep + 1, 5));
      setErrors({});
    }
  };

  const handlePrevious = () => {
    setCurrentStep(Math.max(currentStep - 1, 1));
    setErrors({});
  };

  const handleSaveExit = () => {
    toast({
      title: "Draft saved",
      description: "Your race draft has been saved. You can continue editing anytime.",
    });
    if (onClose) {
      onClose();
    } else {
      navigate('/profile');
    }
  };

  const handleEditStep = (step: number) => {
    setCurrentStep(step);
  };

  const handleLaunch = async () => {
    if (!validateCurrentStep()) return;

    try {
      // In a real app, this would submit to the backend
      console.log('Launching race:', eventDraft);
      
      // Clear the draft
      localStorage.removeItem('raceWizardDraft');
      
      toast({
        title: "Race launched!",
        description: "Your race has been successfully created and published.",
      });
      
      // Notify parent component about the new event
      if (onEventCreated) {
        onEventCreated(eventDraft);
      }
      
      // Close the wizard or navigate
      if (onClose) {
        onClose();
      } else {
        navigate('/profile');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to launch race. Please try again.",
        variant: "destructive"
      });
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <RaceDetailsStep
            data={eventDraft.raceDetails}
            onChange={updateRaceDetails}
            errors={errors}
          />
        );
      case 2:
        return (
          <PricingStep
            data={eventDraft.pricing}
            onChange={updatePricing}
            errors={errors}
            distances={eventDraft.raceDetails.distances}
          />
        );
      case 3:
        return (
          <BrandingStep
            data={eventDraft.branding}
            onChange={updateBranding}
            errors={errors}
          />
        );
      case 4:
        return (
          <LogisticsStep
            data={eventDraft.logistics}
            onChange={updateLogistics}
            errors={errors}
          />
        );
      case 5:
        return (
          <ReviewStep
            basics={eventDraft.basics}
            raceDetails={eventDraft.raceDetails}
            pricing={eventDraft.pricing}
            branding={eventDraft.branding}
            logistics={eventDraft.logistics}
            onEditStep={handleEditStep}
          />
        );
      default:
        return null;
    }
  };

  const isNextDisabled = () => {
    // Basic validation for required fields
    switch (currentStep) {
      case 1:
        return !eventDraft.raceDetails.race_type || eventDraft.raceDetails.distances.length === 0;
      default:
        return false;
    }
  };

  return (
    <div className="container mx-auto max-w-4xl px-4 py-10">
      {currentStep < 5 ? (
        <WizardStep
          title={stepTitles[currentStep - 1]}
          description={stepDescriptions[currentStep - 1]}
          currentStep={currentStep}
          totalSteps={5}
          onNext={handleNext}
          onPrevious={handlePrevious}
          onSaveExit={handleSaveExit}
          isNextDisabled={isNextDisabled()}
          isLastStep={false}
        >
          {renderCurrentStep()}
        </WizardStep>
      ) : (
        <div className="space-y-6">
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Step {currentStep} of 5</span>
              <span>100% Complete</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div className="bg-primary h-2 rounded-full w-full" />
            </div>
          </div>

          {renderCurrentStep()}

          {/* Final Actions */}
          <div className="flex justify-between pt-6">
            <Button variant="outline" onClick={handlePrevious}>
              Back to Edit
            </Button>
            <div className="flex gap-3">
              <Button variant="outline" onClick={handleSaveExit}>
                Save & Exit
              </Button>
              <Button onClick={handleLaunch} className="bg-primary">
                Launch Race
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}