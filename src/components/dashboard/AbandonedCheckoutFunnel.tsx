import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ShoppingCart, CreditCard, CheckCircle, Mail, ArrowDown, TrendingDown } from 'lucide-react';

// Mock funnel data
const funnelData = {
  addedToCart: {
    count: 1247,
    percentage: 100,
    icon: ShoppingCart,
    label: 'Added to Cart',
    color: 'bg-blue-500',
    dropoffRate: undefined
  },
  startedCheckout: {
    count: 856,
    percentage: 68.6,
    icon: CreditCard,
    label: 'Started Checkout',
    color: 'bg-yellow-500',
    dropoffRate: 31.4
  },
  completedPayment: {
    count: 634,
    percentage: 50.8,
    icon: CheckCircle,
    label: 'Completed Payment',
    color: 'bg-green-500',
    dropoffRate: 17.8
  }
};

const mockRecoveryEmail = {
  subject: "Don't let your race spot slip away! 🏃‍♀️",
  preview: "Complete your registration for the City Marathon in just 2 minutes...",
  body: `Hi [First Name],

We noticed you started registering for the City Marathon but didn't complete your sign-up. We'd hate for you to miss out on this amazing race!

**What you left behind:**
• 1x Marathon Registration ($85)
• Early bird pricing (expires in 48 hours)
• Finisher medal and t-shirt included

**Why runners love this race:**
⭐ "Best organized marathon in the city!" - Sarah M.
⭐ "Perfect course for a PR attempt" - Mike R.
⭐ "Amazing crowd support!" - Lisa K.

Complete your registration now and we'll hold your spot. Plus, you'll still qualify for early bird pricing!

[COMPLETE REGISTRATION BUTTON]

Questions? Just reply to this email or call us at (555) 123-RACE.

See you at the starting line!

The Race Team

P.S. Over 2,000 runners have already registered. Don't miss your chance to be part of something special!`
};

export default function AbandonedCheckoutFunnel() {
  const [showEmailPreview, setShowEmailPreview] = useState(false);

  const handleTestRecoveryEmail = () => {
    console.log('Testing abandoned checkout recovery email:', {
      timestamp: new Date().toISOString(),
      emailType: 'abandoned_checkout_recovery'
    });
    setShowEmailPreview(true);
  };

  const stages = [funnelData.addedToCart, funnelData.startedCheckout, funnelData.completedPayment];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingDown className="h-5 w-5 text-race-red" />
          Abandoned Checkout Funnel
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Funnel Visualization */}
        <div className="space-y-4">
          {stages.map((stage, index) => (
            <div key={stage.label}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${stage.color} text-white`}>
                    <stage.icon className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-medium">{stage.label}</h4>
                    <p className="text-sm text-gray-500">{stage.count.toLocaleString()} users</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg">{stage.percentage}%</p>
                  {stage.dropoffRate && (
                    <Badge variant="destructive" className="text-xs">
                      -{stage.dropoffRate}% drop-off
                    </Badge>
                  )}
                </div>
              </div>
              
              <Progress value={stage.percentage} className="h-3 mb-3" />
              
              {index < stages.length - 1 && (
                <div className="flex justify-center py-2">
                  <ArrowDown className="h-5 w-5 text-gray-400" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
          <div className="text-center">
            <p className="text-2xl font-bold text-race-red">
              {(funnelData.addedToCart.count - funnelData.completedPayment.count).toLocaleString()}
            </p>
            <p className="text-sm text-gray-600">Abandoned Carts</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">
              ${((funnelData.addedToCart.count - funnelData.completedPayment.count) * 85).toLocaleString()}
            </p>
            <p className="text-sm text-gray-600">Potential Revenue</p>
          </div>
        </div>

        {/* Recovery Insights */}
        <div className="space-y-3">
          <h4 className="font-medium">Recovery Insights</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between p-2 bg-blue-50 rounded">
              <span>Cart abandonment rate</span>
              <span className="font-medium">49.2%</span>
            </div>
            <div className="flex justify-between p-2 bg-yellow-50 rounded">
              <span>Checkout abandonment rate</span>
              <span className="font-medium">25.9%</span>
            </div>
            <div className="flex justify-between p-2 bg-green-50 rounded">
              <span>Average recovery rate with email</span>
              <span className="font-medium text-green-600">12.4%</span>
            </div>
          </div>
        </div>

        {/* Test Recovery Email Button */}
        <Dialog open={showEmailPreview} onOpenChange={setShowEmailPreview}>
          <DialogTrigger asChild>
            <Button 
              onClick={handleTestRecoveryEmail}
              className="w-full"
              variant="outline"
            >
              <Mail className="h-4 w-4 mr-2" />
              Test Recovery Email
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Abandoned Checkout Recovery Email Preview</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              {/* Email Header */}
              <div className="border rounded-lg p-4 bg-gray-50">
                <div className="text-sm text-gray-600 mb-1">Subject:</div>
                <div className="font-medium">{mockRecoveryEmail.subject}</div>
                <div className="text-sm text-gray-600 mt-2 mb-1">Preview:</div>
                <div className="text-sm text-gray-700">{mockRecoveryEmail.preview}</div>
              </div>

              {/* Email Body */}
              <div className="border rounded-lg p-6 bg-white">
                <div className="whitespace-pre-line text-sm leading-relaxed">
                  {mockRecoveryEmail.body}
                </div>
              </div>

              {/* Email Stats */}
              <div className="grid grid-cols-3 gap-4 p-4 bg-blue-50 rounded-lg text-center">
                <div>
                  <p className="text-lg font-bold text-blue-600">18.2%</p>
                  <p className="text-xs text-gray-600">Open Rate</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-green-600">12.4%</p>
                  <p className="text-xs text-gray-600">Recovery Rate</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-purple-600">$1,847</p>
                  <p className="text-xs text-gray-600">Avg. Recovery Value</p>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button className="flex-1">
                  Send Test Email
                </Button>
                <Button variant="outline" className="flex-1">
                  Edit Template
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}