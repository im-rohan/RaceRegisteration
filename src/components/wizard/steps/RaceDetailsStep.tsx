import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Trash2, Upload } from 'lucide-react';

export type RaceDetailsData = {
  race_type: string;
  distances: string[];
  start_times: Record<string, string>;
  start_address: string;
  course_map_file: File | null;
  gpx_file: File | null;
  description: string;
  custom_distance: string;
};

interface RaceDetailsStepProps {
  data: RaceDetailsData;
  onChange: (data: Partial<RaceDetailsData>) => void;
  errors: Record<string, string>;
}

const raceTypes = [
  "Running",
  "Swimming", 
  "Cycling",
  "Triathlon",
  "Obstacle Race",
  "Trail Running",
  "Other"
];

const distancesByType: Record<string, string[]> = {
  "Running": ["5K", "10K", "Half Marathon", "Marathon", "Relay"],
  "Swimming": ["800m", "1000m", "1500m", "5km", "10km"],
  "Cycling": ["20km", "40km", "80km", "100km", "Century (160km)"],
  "Triathlon": ["Sprint", "Olympic", "Half Ironman", "Ironman"],
  "Obstacle Race": ["5K", "10K", "15K", "Beast (21K)"],
  "Trail Running": ["5K", "10K", "Half Marathon", "Marathon", "Ultra (50K)"],
  "Other": ["5K", "10K", "Half Marathon", "Marathon"]
};

export default function RaceDetailsStep({ data, onChange, errors }: RaceDetailsStepProps) {
  const availableDistances = data.race_type ? distancesByType[data.race_type] || [] : [];

  const handleDistanceChange = (distance: string, checked: boolean) => {
    const newDistances = checked 
      ? [...data.distances, distance]
      : data.distances.filter(d => d !== distance);
    
    const newStartTimes = { ...data.start_times };
    if (!checked) {
      delete newStartTimes[distance];
    }
    
    onChange({ 
      distances: newDistances,
      start_times: newStartTimes
    });
  };

  const handleRaceTypeChange = (raceType: string) => {
    // Clear distances when race type changes
    onChange({
      race_type: raceType,
      distances: [],
      start_times: {}
    });
  };

  const handleCustomDistanceAdd = () => {
    if (data.custom_distance && !data.distances.includes(data.custom_distance)) {
      onChange({
        distances: [...data.distances, data.custom_distance],
        custom_distance: ""
      });
    }
  };

  const handleStartTimeChange = (distance: string, time: string) => {
    onChange({
      start_times: { ...data.start_times, [distance]: time }
    });
  };

  const handleFileUpload = (field: 'course_map_file' | 'gpx_file', file: File | null) => {
    onChange({ [field]: file });
  };

  return (
    <div className="grid gap-6">
      <div className="grid gap-2">
        <Label htmlFor="race_type">Race Type *</Label>
        <Select value={data.race_type} onValueChange={handleRaceTypeChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select race type" />
          </SelectTrigger>
          <SelectContent>
            {raceTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4">
        <Label>Race Distances *</Label>
        {data.race_type ? (
          <>
            <div className="grid grid-cols-2 gap-3">
              {availableDistances.map((distance) => (
                <div key={distance} className="flex items-center space-x-2">
                  <Checkbox
                    id={distance}
                    checked={data.distances.includes(distance)}
                    onCheckedChange={(checked) => handleDistanceChange(distance, !!checked)}
                  />
                  <Label htmlFor={distance}>{distance}</Label>
                </div>
              ))}
            </div>
            
            <div className="flex gap-2">
              <Input
                placeholder="Custom distance (e.g., 15K)"
                value={data.custom_distance}
                onChange={(e) => onChange({ custom_distance: e.target.value })}
              />
              <Button onClick={handleCustomDistanceAdd} variant="outline" size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </>
        ) : (
          <p className="text-sm text-muted-foreground">Please select a race type first</p>
        )}
        
        {errors.distances && (
          <p className="text-sm text-destructive">{errors.distances}</p>
        )}
      </div>

      {data.distances.length > 0 && (
        <div className="grid gap-4">
          <Label>Start Times by Distance *</Label>
          <div className="grid gap-3">
            {data.distances.map((distance) => (
              <div key={distance} className="flex items-center gap-3">
                <Label className="w-24 text-sm">{distance}:</Label>
                <Input
                  type="time"
                  value={data.start_times[distance] || ""}
                  onChange={(e) => handleStartTimeChange(distance, e.target.value)}
                  className="w-32"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid gap-2">
        <Label htmlFor="start_address">Address</Label>
        <Input
          id="start_address"
          value={data.start_address}
          onChange={(e) => onChange({ start_address: e.target.value })}
          placeholder="123 Race Start Ave, City, State"
        />
      </div>

      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label>Course Map (PDF/JPG)</Label>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" asChild>
              <label htmlFor="course_map">
                <Upload className="h-4 w-4 mr-2" />
                Upload Map
              </label>
            </Button>
            <input
              id="course_map"
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              className="hidden"
              onChange={(e) => handleFileUpload('course_map_file', e.target.files?.[0] || null)}
            />
            {data.course_map_file && (
              <span className="text-sm text-muted-foreground">
                {data.course_map_file.name}
              </span>
            )}
          </div>
        </div>

        <div className="grid gap-2">
          <Label>GPX File (Optional)</Label>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" asChild>
              <label htmlFor="gpx_file">
                <Upload className="h-4 w-4 mr-2" />
                Upload GPX
              </label>
            </Button>
            <input
              id="gpx_file"
              type="file"
              accept=".gpx"
              className="hidden"
              onChange={(e) => handleFileUpload('gpx_file', e.target.files?.[0] || null)}
            />
            {data.gpx_file && (
              <span className="text-sm text-muted-foreground">
                {data.gpx_file.name}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="description">Race Description</Label>
        <Textarea
          id="description"
          value={data.description}
          onChange={(e) => onChange({ description: e.target.value })}
          placeholder="Describe your race, course highlights, what makes it special..."
          rows={4}
        />
      </div>
    </div>
  );
}