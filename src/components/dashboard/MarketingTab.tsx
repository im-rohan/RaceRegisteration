import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  HelpCircle, 
  Send, 
  Users, 
  Target, 
  Zap, 
  Clock, 
  Heart,
  TrendingUp,
  Mail,
  Globe,
  MessageCircle
} from 'lucide-react';
import AIEmailGenerator from './AIEmailGenerator';
import AbandonedCheckoutFunnel from './AbandonedCheckoutFunnel';

// Mock marketing data
const mockMarketingData = {
  automations: {
    abandonedCheckout: { enabled: true, recovered: 23, revenue: 1840 },
    milestoneEmails: { enabled: true, sent: 156, openRate: 68 },
    lastMinutePush: { enabled: false, sent: 0, conversionRate: 0 }
  },
  campaigns: [
    { name: "Early Bird Push", status: "active", sent: 2400, clicks: 312, conversions: 45 },
    { name: "8-Week Training Tips", status: "scheduled", sent: 0, clicks: 0, conversions: 0 },
    { name: "Last Chance Registration", status: "draft", sent: 0, clicks: 0, conversions: 0 }
  ],
  socialMedia: {
    facebook: { followers: 2840, engagement: "+12%" },
    instagram: { followers: 5620, engagement: "+18%" },
    strava: { followers: 892, engagement: "+6%" }
  }
};

function MarketingCard({ 
  title, 
  description, 
  icon: Icon, 
  children, 
  tooltip 
}: { 
  title: string; 
  description: string; 
  icon: React.ComponentType<any>; 
  children: React.ReactNode;
  tooltip?: string;
}) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Icon className="h-5 w-5 text-primary" />
          <div className="flex-1">
            <CardTitle className="text-lg">{title}</CardTitle>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
          {tooltip && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <HelpCircle className="h-4 w-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">{tooltip}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
}

export default function MarketingTab() {
  return (
    <div className="space-y-6">
      {/* AI Automation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <MarketingCard
          title="Abandoned Checkout Recovery"
          description="Automatically re-engage users who started registration"
          icon={Heart}
          tooltip="Recover athletes who started sign-up but didn't finish. We'll send up to 3 reminders during daytime hours with a magic 'resume' link."
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="abandoned-checkout">Enable recovery emails</Label>
              <Switch 
                id="abandoned-checkout"
                checked={mockMarketingData.automations.abandonedCheckout.enabled} 
              />
            </div>
            {mockMarketingData.automations.abandonedCheckout.enabled && (
              <div className="space-y-2 pt-2 border-t">
                <div className="flex justify-between text-sm">
                  <span>Recovered this month:</span>
                  <span className="font-medium">{mockMarketingData.automations.abandonedCheckout.recovered}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Revenue recovered:</span>
                  <span className="font-medium text-green-600">
                    ${mockMarketingData.automations.abandonedCheckout.revenue}
                  </span>
                </div>
              </div>
            )}
          </div>
        </MarketingCard>

        <MarketingCard
          title="Milestone Communication"
          description="Automated pre-race touchpoints and tips"
          icon={Clock}
          tooltip="Automated pre-race touchpoints (8w, 4w, 2w, 72h, +24h). Includes tips, logistics, and sponsor placements. Personalizes for first-timers vs. returning athletes."
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="milestone-emails">Enable milestone emails</Label>
              <Switch 
                id="milestone-emails"
                checked={mockMarketingData.automations.milestoneEmails.enabled} 
              />
            </div>
            {mockMarketingData.automations.milestoneEmails.enabled && (
              <div className="space-y-2 pt-2 border-t">
                <div className="flex justify-between text-sm">
                  <span>Emails sent:</span>
                  <span className="font-medium">{mockMarketingData.automations.milestoneEmails.sent}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Open rate:</span>
                  <span className="font-medium text-green-600">
                    {mockMarketingData.automations.milestoneEmails.openRate}%
                  </span>
                </div>
              </div>
            )}
          </div>
        </MarketingCard>

        <MarketingCard
          title="Last-Minute Push"
          description="Urgency campaigns when behind pace"
          icon={Zap}
          tooltip="Timed urgency messages when you're behind pace, prices are about to increase, or spots run low. Sends at most once every 72 hours to avoid fatigue."
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="last-minute-push">Enable push campaigns</Label>
              <Switch 
                id="last-minute-push"
                checked={mockMarketingData.automations.lastMinutePush.enabled} 
              />
            </div>
            {!mockMarketingData.automations.lastMinutePush.enabled && (
              <p className="text-sm text-muted-foreground pt-2 border-t">
                Enable to automatically send urgency messages when registration pace is behind target.
              </p>
            )}
          </div>
        </MarketingCard>
      </div>

      {/* Campaign Management */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Email Campaigns</CardTitle>
              <p className="text-sm text-muted-foreground">Manage your marketing campaigns</p>
            </div>
            <Button>
              <Send className="h-4 w-4 mr-2" />
              Create Campaign
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockMarketingData.campaigns.map((campaign, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{campaign.name}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>Sent: {campaign.sent}</span>
                      <span>Clicks: {campaign.clicks}</span>
                      <span>Conversions: {campaign.conversions}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={
                    campaign.status === 'active' ? 'default' :
                    campaign.status === 'scheduled' ? 'secondary' : 'outline'
                  }>
                    {campaign.status}
                  </Badge>
                  <Button variant="ghost" size="sm">Edit</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Social Media Boost */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-primary" />
            <div>
              <CardTitle>Social Media Integration</CardTitle>
              <p className="text-sm text-muted-foreground">Boost your race across social platforms</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">Facebook</h4>
                <Badge variant="outline">{mockMarketingData.socialMedia.facebook.engagement}</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                {mockMarketingData.socialMedia.facebook.followers} followers
              </p>
              <Button variant="outline" size="sm" className="mt-2 w-full">
                <TrendingUp className="h-4 w-4 mr-2" />
                Boost Post
              </Button>
            </div>
            
            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">Instagram</h4>
                <Badge variant="outline">{mockMarketingData.socialMedia.instagram.engagement}</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                {mockMarketingData.socialMedia.instagram.followers} followers
              </p>
              <Button variant="outline" size="sm" className="mt-2 w-full">
                <TrendingUp className="h-4 w-4 mr-2" />
                Boost Post
              </Button>
            </div>
            
            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">Strava</h4>
                <Badge variant="outline">{mockMarketingData.socialMedia.strava.engagement}</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                {mockMarketingData.socialMedia.strava.followers} followers
              </p>
              <Button variant="outline" size="sm" className="mt-2 w-full">
                <Users className="h-4 w-4 mr-2" />
                Share Event
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Marketing Actions</CardTitle>
          <p className="text-sm text-muted-foreground">One-click marketing tools</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="promo-code">Create Promo Code</Label>
                <div className="flex gap-2 mt-1">
                  <Input id="promo-code" placeholder="EARLY10" />
                  <Input placeholder="10%" className="w-20" />
                  <Button variant="outline">Create</Button>
                </div>
              </div>
              
              <div>
                <Label htmlFor="push-message">Send Push Email</Label>
                <div className="flex gap-2 mt-1">
                  <Textarea 
                    id="push-message" 
                    placeholder="Registration closing soon! Don't miss out..."
                    className="min-h-[80px]"
                  />
                  <Button className="self-end">
                    <Send className="h-4 w-4 mr-2" />
                    Send
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <Button variant="outline" className="w-full justify-start">
                <MessageCircle className="h-4 w-4 mr-2" />
                Generate Social Media Posts
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Target className="h-4 w-4 mr-2" />
                Create Targeted Ad Campaign
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Users className="h-4 w-4 mr-2" />
                Invite Local Running Groups
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI-Driven Marketing Automation */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AIEmailGenerator />
        <AbandonedCheckoutFunnel />
      </div>
    </div>
  );
}