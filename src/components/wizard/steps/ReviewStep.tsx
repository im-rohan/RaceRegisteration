import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Users, DollarSign, Mail, Clock, Edit } from 'lucide-react';
import { format } from 'date-fns';
import { BasicsData } from './BasicsStep';
import { RaceDetailsData } from './RaceDetailsStep';
import { PricingData } from './PricingStep';
import { BrandingData } from './BrandingStep';
import { LogisticsData } from './LogisticsStep';

interface ReviewStepProps {
  basics: BasicsData;
  raceDetails: RaceDetailsData;
  pricing: PricingData;
  branding: BrandingData;
  logistics: LogisticsData;
  onEditStep: (step: number) => void;
}

export default function ReviewStep({
  basics,
  raceDetails,
  pricing,
  branding,
  logistics,
  onEditStep
}: ReviewStepProps) {
  return (
    <div className="grid gap-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Review & Launch Your Race</h2>
        <p className="text-muted-foreground">
          Review all the details below and click "Launch Race" when you're ready.
        </p>
      </div>

      <div className="grid gap-4">
        {/* Basics */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Race Basics</CardTitle>
            <Button variant="ghost" size="sm" onClick={() => onEditStep(1)}>
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">{basics.race_name}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>{basics.date ? format(basics.date, "PPP") : "No date set"}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>{basics.city}, {basics.state}</span>
            </div>
            <div className="flex items-center gap-2">
              <span>Type:</span>
              <Badge variant="secondary">{raceDetails.race_type}</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Race Details */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Race Details</CardTitle>
            <Button variant="ghost" size="sm" onClick={() => onEditStep(1)}>
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <span className="font-medium">Distances: </span>
              <div className="flex flex-wrap gap-1 mt-1">
                {raceDetails.distances.map((distance) => (
                  <Badge key={distance} variant="outline">{distance}</Badge>
                ))}
              </div>
            </div>
            {raceDetails.start_address && (
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>Start: {raceDetails.start_address}</span>
              </div>
            )}
            {raceDetails.description && (
              <div>
                <span className="font-medium">Description: </span>
                <span className="text-muted-foreground">
                  {raceDetails.description.substring(0, 100)}
                  {raceDetails.description.length > 100 && "..."}
                </span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Pricing */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Pricing & Registration</CardTitle>
            <Button variant="ghost" size="sm" onClick={() => onEditStep(2)}>
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span>Capacity: {pricing.capacity_total || "Not set"}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>
                Registration: {pricing.reg_open ? format(pricing.reg_open, "MMM d") : "TBD"} - {pricing.reg_close ? format(pricing.reg_close, "MMM d") : "TBD"}
              </span>
            </div>
            <div>
              <span className="font-medium">Pricing Tiers: </span>
              <span>{pricing.pricing_tiers.length} tier(s)</span>
            </div>
          </CardContent>
        </Card>

        {/* Branding */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Branding & Marketing</CardTitle>
            <Button variant="ghost" size="sm" onClick={() => onEditStep(3)}>
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <span className="font-medium">Logo: </span>
              <span>{branding.logo ? branding.logo.name : "Not uploaded"}</span>
            </div>
            <div>
              <span className="font-medium">Hero Image: </span>
              <span>{branding.hero_image ? branding.hero_image.name : "Not uploaded"}</span>
            </div>
            <div>
              <span className="font-medium">Social Media: </span>
              <div className="flex flex-wrap gap-1 mt-1">
                {branding.instagram_url && <Badge variant="outline">Instagram</Badge>}
                {branding.tiktok_url && <Badge variant="outline">TikTok</Badge>}
                {branding.x_url && <Badge variant="outline">X</Badge>}
                {branding.meta_url && <Badge variant="outline">Meta</Badge>}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Logistics */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Logistics</CardTitle>
            <Button variant="ghost" size="sm" onClick={() => onEditStep(4)}>
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {logistics.packet_pickup_date && (
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>Packet pickup: {format(logistics.packet_pickup_date, "MMM d")}</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>Volunteer signup: {logistics.volunteer_signup_url || "Not set"}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}