import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Share2, Download, Trophy, Users, TrendingUp } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Milestone {
  id: string;
  title: string;
  description: string;
  threshold: number;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  achieved: boolean;
  achievedDate?: string;
}

interface MilestoneBadgesProps {
  confirmedRegistrations: number;
  isGoalMet: boolean;
  isRecordYear?: boolean;
}

export default function MilestoneBadges({ 
  confirmedRegistrations, 
  isGoalMet, 
  isRecordYear = false 
}: MilestoneBadgesProps) {
  const { toast } = useToast();
  const [downloadingBadge, setDownloadingBadge] = useState<string | null>(null);

  const milestones: Milestone[] = [
    {
      id: 'first-100',
      title: '100 Registrants',
      description: 'First major milestone!',
      threshold: 100,
      icon: Users,
      color: '#10B981',
      achieved: confirmedRegistrations >= 100,
      achievedDate: confirmedRegistrations >= 100 ? 'March 5, 2024' : undefined
    },
    {
      id: 'milestone-250',
      title: '250 Registrants',
      description: 'Quarter way there!',
      threshold: 250,
      icon: TrendingUp,
      color: '#F59E0B',
      achieved: confirmedRegistrations >= 250,
      achievedDate: confirmedRegistrations >= 250 ? 'March 12, 2024' : undefined
    },
    {
      id: 'milestone-500',
      title: '500 Registrants',
      description: 'Major milestone achieved!',
      threshold: 500,
      icon: Trophy,
      color: '#8B5CF6',
      achieved: confirmedRegistrations >= 500,
      achievedDate: confirmedRegistrations >= 500 ? 'March 18, 2024' : undefined
    },
    {
      id: 'sold-out',
      title: 'Sold Out!',
      description: 'Event is fully booked',
      threshold: 500, // Assuming 500 is capacity
      icon: Trophy,
      color: '#FF4230',
      achieved: isGoalMet,
      achievedDate: isGoalMet ? 'Today' : undefined
    },
    {
      id: 'record-year',
      title: 'Record Year',
      description: 'Best performance to date!',
      threshold: 0,
      icon: Trophy,
      color: '#FFD700',
      achieved: isRecordYear,
      achievedDate: isRecordYear ? 'This year' : undefined
    }
  ];

  const achievedMilestones = milestones.filter(m => m.achieved);
  const nextMilestone = milestones.find(m => !m.achieved);

  const handleShareBadge = async (milestone: Milestone) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${milestone.title} Achievement!`,
          text: `Just hit ${milestone.title} for our race! ${milestone.description}`,
          url: window.location.href
        });
      } catch (err) {
        // Fallback to copying link
        navigator.clipboard.writeText(window.location.href);
        toast({
          title: "Link copied!",
          description: "Share link copied to clipboard"
        });
      }
    } else {
      // Fallback for browsers without Web Share API
      navigator.clipboard.writeText(
        `Just hit ${milestone.title} for our race! ${milestone.description} Check it out: ${window.location.href}`
      );
      toast({
        title: "Text copied!",
        description: "Achievement text copied to clipboard"
      });
    }
  };

  const handleDownloadBadge = async (milestone: Milestone) => {
    setDownloadingBadge(milestone.id);
    
    // Create a simple badge image using canvas
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 400;
    canvas.height = 200;

    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, 400, 200);
    gradient.addColorStop(0, milestone.color);
    gradient.addColorStop(1, '#000000');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 400, 200);

    // Badge content
    ctx.fillStyle = 'white';
    ctx.font = 'bold 24px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(milestone.title, 200, 80);
    
    ctx.font = '16px Arial';
    ctx.fillText(milestone.description, 200, 110);
    
    ctx.font = '14px Arial';
    ctx.fillText(`Achieved: ${milestone.achievedDate}`, 200, 140);

    // Download the image
    canvas.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${milestone.title.replace(/\s+/g, '-').toLowerCase()}-badge.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        toast({
          title: "Badge downloaded!",
          description: `${milestone.title} badge saved to your device`
        });
      }
      setDownloadingBadge(null);
    }, 'image/png');
  };

  if (achievedMilestones.length === 0 && !nextMilestone) {
    return null;
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-lg">Achievements</h3>
            {achievedMilestones.length > 0 && (
              <Badge variant="secondary" className="bg-green-100 text-green-700">
                {achievedMilestones.length} earned
              </Badge>
            )}
          </div>

          {/* Achieved Milestones */}
          {achievedMilestones.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-muted-foreground">Earned Badges</h4>
              <div className="grid grid-cols-1 gap-3">
                {achievedMilestones.map((milestone) => (
                  <div 
                    key={milestone.id}
                    className="flex items-center justify-between p-3 border rounded-lg bg-gradient-to-r from-green-50 to-transparent border-green-200"
                  >
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-8 h-8 rounded-full flex items-center justify-center text-white"
                        style={{ backgroundColor: milestone.color }}
                      >
                        <milestone.icon className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-medium">{milestone.title}</p>
                        <p className="text-sm text-muted-foreground">
                          Achieved {milestone.achievedDate}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleShareBadge(milestone)}
                        className="h-8 px-3"
                      >
                        <Share2 className="h-3 w-3 mr-1" />
                        Share
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDownloadBadge(milestone)}
                        disabled={downloadingBadge === milestone.id}
                        className="h-8 px-3"
                      >
                        <Download className="h-3 w-3 mr-1" />
                        {downloadingBadge === milestone.id ? 'Creating...' : 'Download'}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Next Milestone */}
          {nextMilestone && (
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-muted-foreground">Next Goal</h4>
              <div className="flex items-center justify-between p-3 border rounded-lg border-dashed">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center bg-muted">
                    <nextMilestone.icon className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-medium text-muted-foreground">{nextMilestone.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {nextMilestone.threshold - confirmedRegistrations} registrations away
                    </p>
                  </div>
                </div>
                <Badge variant="outline">
                  {Math.round(((confirmedRegistrations / nextMilestone.threshold) * 100))}%
                </Badge>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}