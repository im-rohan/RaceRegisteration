import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Sparkles, Send, Save, RefreshCw, Copy, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

const emailGoals = [
  { value: 'boost-signups', label: 'Boost Sign-ups', description: 'Increase event registrations' },
  { value: 'price-change', label: 'Announce Price Change', description: 'Notify about pricing updates' },
  { value: 'thank-volunteers', label: 'Thank Volunteers', description: 'Appreciate volunteer contributions' },
  { value: 'event-reminder', label: 'Event Reminder', description: 'Remind about upcoming race' },
  { value: 'weather-update', label: 'Weather Update', description: 'Share weather conditions' },
  { value: 'last-minute-push', label: 'Last-Minute Push', description: 'Final registration push' }
];

const mockGeneratedEmails = {
  'boost-signups': {
    subjects: [
      "🏃‍♀️ Last call: Join 500+ runners this weekend!",
      "⚡ 72 hours left to secure your race spot",
      "Don't miss out: Your community is racing without you"
    ],
    body: `Hi {{firstName}},

The countdown is on! Our {{eventName}} is just around the corner, and we're excited to see {{currentRegistrations}} amazing athletes have already signed up.

**What makes this race special:**
• Scenic {{distance}} route through downtown
• Professional timing and results
• Post-race celebration with local vendors
• Finisher medals for all participants

With only {{spotsLeft}} spots remaining, now is the perfect time to join your friends and neighbors for an unforgettable racing experience.

**Special offer:** Use code LASTCHANCE for 15% off registration (expires in 48 hours).

See you at the starting line!

Best regards,
The {{organizerName}} Team`,
    cta: "Register Now - 15% Off"
  },
  'price-change': {
    subjects: [
      "📢 Important: Registration pricing update",
      "Heads up: Race pricing changes this Friday",
      "Fair warning: Early bird pricing ends soon"
    ],
    body: `Hello {{firstName}},

We wanted to give you advance notice that our {{eventName}} registration pricing will be changing on {{priceChangeDate}}.

**Current pricing (until {{priceChangeDate}}):**
• {{currentDistance}}: $85
• Family Package: $240

**New pricing (starting {{priceChangeDate}}):**
• {{currentDistance}}: $95
• Family Package: $270

This adjustment helps us continue providing the high-quality race experience you've come to expect, including professional timing, safety support, and post-race festivities.

Register now to lock in current pricing!

Questions? Reply to this email or call us at {{phoneNumber}}.

Best,
{{organizerName}}`,
    cta: "Lock in Current Pricing"
  },
  'thank-volunteers': {
    subjects: [
      "🙏 Thank you for making our race amazing!",
      "You're the heroes behind our successful event",
      "Gratitude from all {{participantCount}} participants"
    ],
    body: `Dear {{firstName}},

What an incredible day! Thanks to volunteers like you, our {{eventName}} was an outstanding success.

**By the numbers:**
• {{participantCount}} happy finishers
• {{volunteerHours}} volunteer hours contributed
• {{satisfactionScore}}% participant satisfaction rate
• Zero safety incidents

Your dedication at the {{volunteerStation}} was noticed by everyone – from nervous first-timers to seasoned marathoners. Several participants specifically mentioned how your encouragement and support made their race experience special.

**Small token of appreciation:**
We've reserved a {{giftDescription}} for you as a thank-you gift. You can pick it up at our office or we'll mail it to you – just let us know your preference.

Already marking your calendar for next year? We'd love to have you back! Early volunteer registration opens {{nextYearDate}}.

With heartfelt gratitude,
{{organizerName}} and the entire race team

P.S. We'd love to feature your volunteer story in our newsletter. If you're interested, just reply to this email!`,
    cta: "Volunteer Again Next Year"
  }
};

export default function AIEmailGenerator() {
  const [selectedGoal, setSelectedGoal] = useState('');
  const [generatedEmail, setGeneratedEmail] = useState<any>(null);
  const [selectedSubject, setSelectedSubject] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedItems, setCopiedItems] = useState<Set<string>>(new Set());

  const handleGenerateEmail = async () => {
    if (!selectedGoal) {
      toast.error('Please select an email goal first');
      return;
    }

    setIsGenerating(true);
    
    // Simulate AI generation delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setGeneratedEmail(mockGeneratedEmails[selectedGoal as keyof typeof mockGeneratedEmails]);
    setSelectedSubject(0);
    setIsGenerating(false);
    
    // Log action for backend auditing
    console.log('AI Email Generation:', {
      goal: selectedGoal,
      timestamp: new Date().toISOString(),
      eventId: 'event-123' // This would come from context
    });
    
    toast.success('Email generated successfully!');
  };

  const handleCopy = async (content: string, type: string) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedItems(prev => new Set(prev).add(type));
      setTimeout(() => {
        setCopiedItems(prev => {
          const newSet = new Set(prev);
          newSet.delete(type);
          return newSet;
        });
      }, 2000);
      toast.success(`${type} copied to clipboard`);
    } catch (err) {
      toast.error('Failed to copy to clipboard');
    }
  };

  const handleSendEmail = () => {
    toast.success('Email scheduled for delivery!');
    console.log('Email Send Action:', {
      goal: selectedGoal,
      subject: generatedEmail.subjects[selectedSubject],
      timestamp: new Date().toISOString()
    });
  };

  const handleSaveDraft = () => {
    toast.success('Email saved as draft!');
    console.log('Email Save Action:', {
      goal: selectedGoal,
      subject: generatedEmail.subjects[selectedSubject],
      timestamp: new Date().toISOString()
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-race-red" />
          AI Email Generator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Goal Selection */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Select Email Goal</label>
          <Select value={selectedGoal} onValueChange={setSelectedGoal}>
            <SelectTrigger>
              <SelectValue placeholder="Choose what you want to accomplish..." />
            </SelectTrigger>
            <SelectContent>
              {emailGoals.map((goal) => (
                <SelectItem key={goal.value} value={goal.value}>
                  <div>
                    <div className="font-medium">{goal.label}</div>
                    <div className="text-xs text-gray-500">{goal.description}</div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Generate Button */}
        <Button 
          onClick={handleGenerateEmail} 
          disabled={!selectedGoal || isGenerating}
          className="w-full"
        >
          {isGenerating ? (
            <>
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              Generating Email...
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4 mr-2" />
              Generate AI Email
            </>
          )}
        </Button>

        {/* Generated Email Content */}
        {generatedEmail && (
          <div className="space-y-6">
            <Separator />
            
            {/* Subject Lines */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Subject Line Options</h4>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleCopy(generatedEmail.subjects[selectedSubject], 'Subject')}
                >
                  {copiedItems.has('Subject') ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <div className="space-y-2">
                {generatedEmail.subjects.map((subject: string, index: number) => (
                  <div
                    key={index}
                    className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                      selectedSubject === index 
                        ? 'border-race-red bg-red-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedSubject(index)}
                  >
                    <p className="text-sm font-medium">{subject}</p>
                    {selectedSubject === index && (
                      <Badge variant="secondary" className="mt-2 text-xs">
                        Selected
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Email Body */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Email Body</h4>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleCopy(generatedEmail.body, 'Email body')}
                >
                  {copiedItems.has('Email body') ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <Textarea
                value={generatedEmail.body}
                readOnly
                className="min-h-[300px] text-sm"
              />
            </div>

            {/* CTA */}
            <div className="space-y-3">
              <h4 className="font-medium">Suggested Call-to-Action</h4>
              <div className="p-3 bg-race-red text-white rounded-lg text-center font-medium">
                {generatedEmail.cta}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button onClick={handleSendEmail} className="flex-1">
                <Send className="h-4 w-4 mr-2" />
                Send Email
              </Button>
              <Button variant="outline" onClick={handleSaveDraft} className="flex-1">
                <Save className="h-4 w-4 mr-2" />
                Save as Draft
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}