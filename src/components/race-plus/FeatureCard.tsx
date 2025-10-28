
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface FeatureCardProps {
  icon: React.ComponentType<any>;
  title: string;
  description: string;
}

const FeatureCard = ({ icon: Icon, title, description }: FeatureCardProps) => (
  <Card className="h-full border-gray-200">
    <CardHeader className="pb-2">
      <div className="mb-4 bg-race-gray rounded-full w-12 h-12 flex items-center justify-center">
        <Icon className="h-6 w-6 text-race-red" />
      </div>
      <CardTitle>{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <CardDescription className="text-base">{description}</CardDescription>
    </CardContent>
  </Card>
);

export default FeatureCard;
