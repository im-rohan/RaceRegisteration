import React from 'react';
import { format } from 'date-fns';
import { CalendarIcon, Plus, Trash2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

export type PricingTier = {
  id: string;
  name: string;
  price: number;
  start_date: Date | null;
  end_date: Date | null;
};

export type PricingData = {
  reg_open: Date | null;
  reg_close: Date | null;
  pricing_tiers: PricingTier[];
  capacity_total: number;
  capacity_by_distance: Record<string, number>;
};

interface PricingStepProps {
  data: PricingData;
  onChange: (data: Partial<PricingData>) => void;
  errors: Record<string, string>;
  distances: string[];
}

export default function PricingStep({ data, onChange, errors, distances }: PricingStepProps) {
  const addPricingTier = () => {
    const newTier: PricingTier = {
      id: `tier_${Date.now()}`,
      name: "",
      price: 0,
      start_date: null,
      end_date: null
    };
    onChange({
      pricing_tiers: [...data.pricing_tiers, newTier]
    });
  };

  const removePricingTier = (id: string) => {
    onChange({
      pricing_tiers: data.pricing_tiers.filter(tier => tier.id !== id)
    });
  };

  const updatePricingTier = (id: string, updates: Partial<PricingTier>) => {
    onChange({
      pricing_tiers: data.pricing_tiers.map(tier =>
        tier.id === id ? { ...tier, ...updates } : tier
      )
    });
  };

  const updateCapacityByDistance = (distance: string, capacity: number) => {
    onChange({
      capacity_by_distance: {
        ...data.capacity_by_distance,
        [distance]: capacity
      }
    });
  };

  return (
    <div className="grid gap-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label>Registration Opens *</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "justify-start font-normal",
                  !data.reg_open && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {data.reg_open ? format(data.reg_open, "PPP") : "Select date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={data.reg_open || undefined}
                onSelect={(date) => onChange({ reg_open: date || null })}
                initialFocus
                className={cn("p-3 pointer-events-auto")}
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="grid gap-2">
          <Label>Registration Closes *</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "justify-start font-normal",
                  !data.reg_close && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {data.reg_close ? format(data.reg_close, "PPP") : "Select date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={data.reg_close || undefined}
                onSelect={(date) => onChange({ reg_close: date || null })}
                initialFocus
                className={cn("p-3 pointer-events-auto")}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="grid gap-4">
        <div className="flex justify-between items-center">
          <Label>Pricing Tiers</Label>
          <Button onClick={addPricingTier} variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Tier
          </Button>
        </div>
        
        {data.pricing_tiers.map((tier) => (
          <div key={tier.id} className="border rounded-lg p-4 space-y-3">
            <div className="flex justify-between items-center">
              <Label className="text-sm font-medium">Pricing Tier</Label>
              <Button 
                onClick={() => removePricingTier(tier.id)}
                variant="ghost" 
                size="sm"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <Input
                placeholder="Tier name (e.g., Early Bird)"
                value={tier.name}
                onChange={(e) => updatePricingTier(tier.id, { name: e.target.value })}
              />
              <Input
                type="number"
                placeholder="Price"
                value={tier.price || ""}
                onChange={(e) => updatePricingTier(tier.id, { price: Number(e.target.value) })}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="justify-start font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {tier.start_date ? format(tier.start_date, "MMM d") : "Start date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={tier.start_date || undefined}
                    onSelect={(date) => updatePricingTier(tier.id, { start_date: date || null })}
                    initialFocus
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
              
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="justify-start font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {tier.end_date ? format(tier.end_date, "MMM d") : "End date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={tier.end_date || undefined}
                    onSelect={(date) => updatePricingTier(tier.id, { end_date: date || null })}
                    initialFocus
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="capacity_total">Total Capacity</Label>
        <Input
          id="capacity_total"
          type="number"
          value={data.capacity_total || ""}
          onChange={(e) => onChange({ capacity_total: Number(e.target.value) })}
          placeholder="Total number of participants"
        />
      </div>

      {distances.length > 0 && (
        <div className="grid gap-4">
          <Label>Capacity by Distance</Label>
          <div className="grid gap-3">
            {distances.map((distance) => (
              <div key={distance} className="flex items-center gap-3">
                <Label className="w-32 text-sm">{distance}:</Label>
                <Input
                  type="number"
                  value={data.capacity_by_distance[distance] || ""}
                  onChange={(e) => updateCapacityByDistance(distance, Number(e.target.value))}
                  placeholder="Capacity"
                  className="w-32"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}