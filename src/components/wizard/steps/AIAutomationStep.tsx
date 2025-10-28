import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { HelpCircle } from 'lucide-react';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

export type AIAutomationData = {
  goal_total: number;
  goal_by_distance: Record<string, number>;
  goal_deadline: Date | null;
  comms_tone: 'Professional' | 'Upbeat' | 'Motivational' | '';
  abandoned_checkout_enabled: boolean;
  milestone_emails_enabled: boolean;
  last_minute_push_enabled: boolean;
  marketing_budget: number;
};

interface AIAutomationStepProps {
  data: AIAutomationData;
  onChange: (data: Partial<AIAutomationData>) => void;
  errors: Record<string, string>;
  distances: string[];
}

function FieldWithTooltip({ 
  label, 
  tooltip, 
  children 
}: { 
  label: string; 
  tooltip: string; 
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-2">
      <div className="flex items-center gap-2">
        <Label>{label}</Label>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
            </TooltipTrigger>
            <TooltipContent>
              <p className="max-w-xs">{tooltip}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      {children}
    </div>
  );
}

export default function AIAutomationStep({ data, onChange, errors, distances }: AIAutomationStepProps) {
  const updateGoalByDistance = (distance: string, goal: number) => {
    onChange({
      goal_by_distance: {
        ...data.goal_by_distance,
        [distance]: goal
      }
    });
  };

  return (
    <div className="grid gap-6">
      <FieldWithTooltip 
        label="Target Registrations *"
        tooltip="Set how many registrations you want to hit for this event. We'll track your progress as a simple % to goal."
      >
        <Input
          type="number"
          value={data.goal_total || ""}
          onChange={(e) => onChange({ goal_total: Number(e.target.value) })}
          placeholder="e.g., 500"
          className={errors.goal_total ? "border-destructive" : ""}
        />
        {errors.goal_total && (
          <p className="text-sm text-destructive">{errors.goal_total}</p>
        )}
      </FieldWithTooltip>

      {distances.length > 0 && (
        <FieldWithTooltip 
          label="Per-Distance Goals (Optional)"
          tooltip="Optional: set goals for each distance. Your overall health score becomes a weighted average."
        >
          <div className="grid gap-3">
            {distances.map((distance) => (
              <div key={distance} className="flex items-center gap-3">
                <Label className="w-32 text-sm">{distance}:</Label>
                <Input
                  type="number"
                  value={data.goal_by_distance[distance] || ""}
                  onChange={(e) => updateGoalByDistance(distance, Number(e.target.value))}
                  placeholder="Goal"
                  className="w-32"
                />
              </div>
            ))}
          </div>
        </FieldWithTooltip>
      )}

      <FieldWithTooltip 
        label="Goal Deadline"
        tooltip="We'll compare your pace against this date to flag when you're behind or ahead."
      >
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "justify-start font-normal",
                !data.goal_deadline && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {data.goal_deadline ? format(data.goal_deadline, "PPP") : "Select deadline"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={data.goal_deadline || undefined}
              onSelect={(date) => onChange({ goal_deadline: date || null })}
              initialFocus
              className={cn("p-3 pointer-events-auto")}
            />
          </PopoverContent>
        </Popover>
      </FieldWithTooltip>

      <FieldWithTooltip 
        label="Communication Tone"
        tooltip="Choose the voice for automated messages. You can preview before anything sends."
      >
        <RadioGroup 
          value={data.comms_tone} 
          onValueChange={(value: 'Professional' | 'Upbeat' | 'Motivational') => onChange({ comms_tone: value })}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Professional" id="professional" />
            <Label htmlFor="professional">Professional</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Upbeat" id="upbeat" />
            <Label htmlFor="upbeat">Upbeat</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Motivational" id="motivational" />
            <Label htmlFor="motivational">Motivational</Label>
          </div>
        </RadioGroup>
      </FieldWithTooltip>

      <div className="grid gap-4">
        <Label>Automation Features</Label>
        
        <FieldWithTooltip 
          label="Abandoned Checkout Recovery"
          tooltip="Recover athletes who started sign-up but didn't finish. We'll send up to 3 reminders during daytime hours with a magic 'resume' link. You'll see recovered revenue in your dashboard."
        >
          <div className="flex items-center space-x-2">
            <Switch
              checked={data.abandoned_checkout_enabled}
              onCheckedChange={(checked) => onChange({ abandoned_checkout_enabled: checked })}
            />
            <Label>Enable abandoned checkout emails</Label>
          </div>
        </FieldWithTooltip>

        <FieldWithTooltip 
          label="Milestone Emails"
          tooltip="Automated pre-race touchpoints (8w, 4w, 2w, 72h, +24h). Includes tips, logistics, and sponsor placements. Personalizes for first-timers vs. returning athletes."
        >
          <div className="flex items-center space-x-2">
            <Switch
              checked={data.milestone_emails_enabled}
              onCheckedChange={(checked) => onChange({ milestone_emails_enabled: checked })}
            />
            <Label>Enable milestone communication</Label>
          </div>
        </FieldWithTooltip>

        <FieldWithTooltip 
          label="Last-Minute Push"
          tooltip="Timed urgency messages when you're behind pace, prices are about to increase, or spots run low. Sends at most once every 72 hours to avoid fatigue."
        >
          <div className="flex items-center space-x-2">
            <Switch
              checked={data.last_minute_push_enabled}
              onCheckedChange={(checked) => onChange({ last_minute_push_enabled: checked })}
            />
            <Label>Enable last-minute push campaigns</Label>
          </div>
        </FieldWithTooltip>
      </div>

      <FieldWithTooltip 
        label="Marketing Budget (Optional)"
        tooltip="Optional: tell us roughly what you plan to spend. We'll recommend where to put it for the best lift."
      >
        <Input
          type="number"
          value={data.marketing_budget || ""}
          onChange={(e) => onChange({ marketing_budget: Number(e.target.value) })}
          placeholder="e.g., 2000"
        />
      </FieldWithTooltip>
    </div>
  );
}