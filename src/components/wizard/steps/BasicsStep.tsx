import React from 'react';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';

export type BasicsData = {
  race_name: string;
  date: Date | null;
  city: string;
  state: string;
  race_type: string;
  organizer_email: string;
};

interface BasicsStepProps {
  data: BasicsData;
  onChange: (data: Partial<BasicsData>) => void;
  errors: Record<string, string>;
}

const raceTypes = [
  "Road", "Trail", "Triathlon", "Cycling", "Swim", "Other"
];

const states = [
  "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
  "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
  "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
  "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
  "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
];

export default function BasicsStep({ data, onChange, errors }: BasicsStepProps) {
  return (
    <div className="grid gap-6">
      <div className="grid gap-2">
        <Label htmlFor="race_name">Race Name *</Label>
        <Input
          id="race_name"
          value={data.race_name}
          onChange={(e) => onChange({ race_name: e.target.value })}
          placeholder="e.g., Sunrise Half Marathon"
          className={errors.race_name ? "border-destructive" : ""}
        />
        {errors.race_name && (
          <p className="text-sm text-destructive">{errors.race_name}</p>
        )}
      </div>

      <div className="grid gap-2">
        <Label>Date *</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start font-normal",
                !data.date && "text-muted-foreground",
                errors.date && "border-destructive"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {data.date ? format(data.date, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={data.date || undefined}
              onSelect={(date) => onChange({ date: date || null })}
              initialFocus
              className={cn("p-3 pointer-events-auto")}
            />
          </PopoverContent>
        </Popover>
        {errors.date && (
          <p className="text-sm text-destructive">{errors.date}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="city">City *</Label>
          <Input
            id="city"
            value={data.city}
            onChange={(e) => onChange({ city: e.target.value })}
            placeholder="e.g., Austin"
            className={errors.city ? "border-destructive" : ""}
          />
          {errors.city && (
            <p className="text-sm text-destructive">{errors.city}</p>
          )}
        </div>
        
        <div className="grid gap-2">
          <Label>State *</Label>
          <Select onValueChange={(state) => onChange({ state })} value={data.state}>
            <SelectTrigger className={errors.state ? "border-destructive" : ""}>
              <SelectValue placeholder="Select state" />
            </SelectTrigger>
            <SelectContent>
              {states.map((state) => (
                <SelectItem key={state} value={state}>{state}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.state && (
            <p className="text-sm text-destructive">{errors.state}</p>
          )}
        </div>
      </div>

      <div className="grid gap-2">
        <Label>Race Type *</Label>
        <Select onValueChange={(race_type) => onChange({ race_type })} value={data.race_type}>
          <SelectTrigger className={errors.race_type ? "border-destructive" : ""}>
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            {raceTypes.map((type) => (
              <SelectItem key={type} value={type}>{type}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.race_type && (
          <p className="text-sm text-destructive">{errors.race_type}</p>
        )}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="organizer_email">Organizer Email *</Label>
        <Input
          id="organizer_email"
          type="email"
          value={data.organizer_email}
          onChange={(e) => onChange({ organizer_email: e.target.value })}
          placeholder="you@company.com"
          className={errors.organizer_email ? "border-destructive" : ""}
        />
        {errors.organizer_email && (
          <p className="text-sm text-destructive">{errors.organizer_email}</p>
        )}
      </div>
    </div>
  );
}