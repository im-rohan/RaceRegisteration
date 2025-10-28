import React from 'react';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

export type LogisticsData = {
  packet_pickup_date: Date | null;
  packet_pickup_start_time: string;
  packet_pickup_end_time: string;
  packet_pickup_address: string;
  packet_pickup_notes: string;
  parking_transport: string;
  volunteer_signup_url: string;
};

interface LogisticsStepProps {
  data: LogisticsData;
  onChange: (data: Partial<LogisticsData>) => void;
  errors: Record<string, string>;
}

export default function LogisticsStep({ data, onChange, errors }: LogisticsStepProps) {
  return (
    <div className="grid gap-6">
      <div className="grid gap-4">
        <Label>Packet Pickup</Label>
        
        <div className="grid gap-2">
          <Label>Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "justify-start font-normal",
                  !data.packet_pickup_date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {data.packet_pickup_date ? format(data.packet_pickup_date, "PPP") : "Select date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={data.packet_pickup_date || undefined}
                onSelect={(date) => onChange({ packet_pickup_date: date || null })}
                initialFocus
                className={cn("p-3 pointer-events-auto")}
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="grid gap-2">
            <Label htmlFor="pickup_start">Start Time</Label>
            <Input
              id="pickup_start"
              type="time"
              value={data.packet_pickup_start_time}
              onChange={(e) => onChange({ packet_pickup_start_time: e.target.value })}
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="pickup_end">End Time</Label>
            <Input
              id="pickup_end"
              type="time"
              value={data.packet_pickup_end_time}
              onChange={(e) => onChange({ packet_pickup_end_time: e.target.value })}
            />
          </div>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="pickup_address">Address</Label>
          <Input
            id="pickup_address"
            value={data.packet_pickup_address}
            onChange={(e) => onChange({ packet_pickup_address: e.target.value })}
            placeholder="123 Pickup Location, City, State"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="pickup_notes">Additional Notes</Label>
          <Textarea
            id="pickup_notes"
            value={data.packet_pickup_notes}
            onChange={(e) => onChange({ packet_pickup_notes: e.target.value })}
            placeholder="Special instructions, ID requirements, etc."
            rows={3}
          />
        </div>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="parking_transport">Parking & Transportation</Label>
        <Textarea
          id="parking_transport"
          value={data.parking_transport}
          onChange={(e) => onChange({ parking_transport: e.target.value })}
          placeholder="Describe parking options, shuttle services, public transit, etc."
          rows={4}
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="volunteer_signup_url">Volunteer Signup URL</Label>
        <Input
          id="volunteer_signup_url"
          value={data.volunteer_signup_url}
          onChange={(e) => onChange({ volunteer_signup_url: e.target.value })}
          placeholder="https://signupgenius.com/... or similar"
        />
      </div>
    </div>
  );
}