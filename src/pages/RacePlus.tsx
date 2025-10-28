
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Percent, Calendar, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import FeatureCard from '@/components/race-plus/FeatureCard';
import TestimonialCard from '@/components/race-plus/TestimonialCard';
import PriceCard from '@/components/race-plus/PriceCard';

const RacePlus = () => {
  const navigate = useNavigate();
  
  const features = [{
    icon: Shield,
    title: 'Race Insurance',
    description: 'Partial refund protection for illness, injury, or last-minute changes.'
  }, {
    icon: Percent,
    title: 'Exclusive Discounts',
    description: 'Save on race entries and gear with RACE+ partner offers.'
  }, {
    icon: Calendar,
    title: 'Smart Calendar & Alerts',
    description: 'Sync races with Google/Apple Calendar to avoid conflicts.'
  }, {
    icon: Users,
    title: 'Friends & Leaderboards',
    description: 'Compare times with friends and track your ranking over time.'
  }];
  
  const testimonials = [{
    quote: 'RACE+ made it easier to manage my entire race season — and I saved over $60 last year alone.',
    author: 'Sarah Johnson',
    position: 'Marathon Runner',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&h=120'
  }, {
    quote: 'The race insurance has saved me twice this year. Worth every penny for serious athletes.',
    author: 'Michael Chen',
    position: 'Triathlete',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&h=120'
  }, {
    quote: 'I love the leaderboard feature. It keeps me motivated and connected with my running group.',
    author: 'Taylor Wilson',
    position: 'Trail Runner',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=120&h=120'
  }];

  return (
    <div className="min-h-screen relative pt-16">
      {/* Hero Section */}
      <section className="bg-white py-20 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="inline-block mb-6 px-4 py-2 border-0 bg-race-red text-white">
              Premium Membership
            </Badge>
            <h1 className="text-4xl font-bold mb-6 md:text-6xl">Upgrade Your Journey with RACE<span className="text-race-red">+</span></h1>
            <p className="text-lg md:text-xl mb-10 text-gray-700">
              Unlock insurance, discounts, leaderboards, and race planning tools — all in one place.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-race-red hover:bg-race-red/90 text-white text-lg py-6 px-8" onClick={() => navigate('/membership-checkout?plan=monthly')}>
                Join for $9.99/month
              </Button>
              <Button variant="outline" className="border-race-red text-race-red hover:bg-race-red hover:text-white text-lg py-6 px-8" onClick={() => navigate('/membership-checkout?plan=yearly')}>
                Save with $99/year
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-white"></div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Upgrade Your Journey with RACE<span className="text-race-red">+</span></h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              RACE<span className="text-race-red">+</span> members get access to premium features designed to enhance your racing experience.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => <FeatureCard key={index} icon={feature.icon} title={feature.title} description={feature.description} />)}
          </div>
        </div>
      </section>

      {/* Plan Comparison Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Choose Your Plan</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Compare our plans to find what works best for you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Free Plan */}
            <PriceCard title="Free" price="$0" period="/ month" features={[{
            label: "Register for events",
            included: true
          }, {
            label: "Race insurance",
            included: false
          }, {
            label: "Exclusive discounts",
            included: false
          }, {
            label: "Calendar sync",
            included: false
          }, {
            label: "Friends & Leaderboards",
            included: false
          }, {
            label: "Partner deals",
            included: false
          }]} buttonText="Continue for Free" buttonVariant="default" planType="free" />
            
            {/* Monthly Plan */}
            <PriceCard title="RACE+" price="$9.99" period="/ month" features={[{
            label: "Register for events",
            included: true
          }, {
            label: "Race insurance",
            included: true
          }, {
            label: "Exclusive race discounts",
            included: true
          }, {
            label: "Calendar sync & alerts",
            included: true
          }, {
            label: "Friends & Leaderboards",
            included: true
          }, {
            label: "Partner brand deals",
            included: true
          }]} subtext="Flexible monthly access" buttonText="Join Monthly" buttonVariant="default" planType="monthly" />
            
            {/* Yearly Plan */}
            <PriceCard title="RACE+" price="$99" period="/ year" savingsText="Save $21 vs. monthly billing" features={[{
            label: "All RACE+ monthly benefits",
            included: true
          }, {
            label: "Priority support access",
            included: true
          }]} subtext="Equivalent to $8.25/month" buttonText="Save with Yearly Plan" buttonVariant="default" isMostPopular={true} borderColor="border-race-red" planType="yearly" />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Athletes Love RACE<span className="text-race-red">+</span></h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Hear what our members have to say about their experience with RACE<span className="text-race-red">+</span>.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {testimonials.map((testimonial, index) => <TestimonialCard key={index} quote={testimonial.quote} author={testimonial.author} position={testimonial.position} image={testimonial.image} />)}
          </div>
        </div>
      </section>

      {/* Sticky CTA Footer has been removed as requested */}
    </div>
  );
};

export default RacePlus;
