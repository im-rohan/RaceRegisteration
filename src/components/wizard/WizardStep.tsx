import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Save } from 'lucide-react';

interface WizardStepProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  currentStep: number;
  totalSteps: number;
  onNext?: () => void;
  onPrevious?: () => void;
  onSaveExit?: () => void;
  isNextDisabled?: boolean;
  isLastStep?: boolean;
}

export default function WizardStep({
  title,
  description,
  children,
  currentStep,
  totalSteps,
  onNext,
  onPrevious,
  onSaveExit,
  isNextDisabled = false,
  isLastStep = false,
}: WizardStepProps) {
  return (
    <div className="space-y-6">
      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Step {currentStep} of {totalSteps}</span>
          <span>{Math.round((currentStep / totalSteps) * 100)}% Complete</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* Step Content */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-xl">{title}</CardTitle>
              {description && (
                <p className="text-muted-foreground mt-1">{description}</p>
              )}
            </div>
            <Button variant="ghost" size="sm" onClick={onSaveExit}>
              <Save className="h-4 w-4 mr-2" />
              Save & Exit
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {children}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={onPrevious}
          disabled={currentStep === 1}
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>
        
        <Button
          onClick={onNext}
          disabled={isNextDisabled}
        >
          {isLastStep ? 'Review & Launch' : 'Next'}
          <ChevronRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}