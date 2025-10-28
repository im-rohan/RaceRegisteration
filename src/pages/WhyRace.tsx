import React, { useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Users, Frown, Search, Zap, ArrowRight, X, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
const RevealText = ({
  children,
  delay = 0
}: {
  children: React.ReactNode;
  delay?: number;
}) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    amount: 0.3
  });
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);
  return <motion.div ref={ref} initial="hidden" animate={controls} variants={{
    hidden: {
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: delay,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  }}>
      {children}
    </motion.div>;
};
const StoryStep = ({
  icon,
  title,
  description,
  isLast = false
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  isLast?: boolean;
}) => {
  return <div className="flex flex-col items-center text-center relative z-10">
      {/* Icon Circle */}
      <div className="w-24 h-24 bg-race-red rounded-full flex items-center justify-center mb-6 shadow-lg">
        <div className="text-white">
          {icon}
        </div>
      </div>
      
      {/* Content */}
      <h3 className="text-2xl font-bold mb-4">{title}</h3>
      <p className="text-gray-600 max-w-xs">{description}</p>
    </div>;
};
const WhyRace = () => {
  return <div className="min-h-screen bg-white pt-16">
      {/* Our Story Timeline - Now the main section */}
      <section className="-mt-16 py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 text-center">
          <RevealText>
            <h1 className="text-3xl md:text-5xl font-bold mb-16">Our Story.</h1>
          </RevealText>
          
          {/* Timeline */}
          <div className="relative grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 max-w-6xl mx-auto mb-16">
            {/* Continuous connecting line for desktop - extends to page edges */}
            <div className="hidden md:block absolute top-12 -left-8 -right-8 h-1 bg-race-red z-0"></div>
            <RevealText delay={0.2}>
              <StoryStep icon={<Users className="h-12 w-12" />} title="2 Triathletes" description="Always training, registering, and racing" />
            </RevealText>
            
            <RevealText delay={0.4}>
              <StoryStep icon={<Frown className="h-12 w-12" />} title="Frustration" description="Race sign-ups were taking forever" />
            </RevealText>
            
            <RevealText delay={0.6}>
              <StoryStep icon={<Search className="h-12 w-12" />} title="Identified The Gap" description="No central hub and poor user experience" />
            </RevealText>
            
            <RevealText delay={0.8}>
              <StoryStep icon={<Zap className="h-12 w-12" />} title="Took Action" description="Built what we needed ourselves" isLast={true} />
            </RevealText>
          </div>
          
          {/* Story Quote */}
          <RevealText delay={1.0}>
            <div className="bg-gray-50 rounded-lg p-8 max-w-4xl mx-auto border border-black">
              <p className="text-xl md:text-2xl text-center text-gray-700 italic leading-relaxed">
                "After registering for over 100 races combined, we kept asking the same question: why is signing up still so frustrating and complicated? Athletes put in the work, the registration process should be effortless. That's when the idea for RACE was born."
              </p>
              <div className="mt-6 text-center">
                <p className="text-race-red font-semibold">– The Founders of RACE</p>
              </div>
            </div>
          </RevealText>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-24 bg-black">
        <div className="container mx-auto px-4">
          <RevealText>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-center text-white">What We're Building.</h2>
          </RevealText>
          
          <div className="max-w-4xl mx-auto text-center">
            <RevealText delay={0.2}>
              <p className="text-lg md:text-xl font-medium mb-8 text-gray-300">A platform that makes race registration seamless for both organizers and athletes.</p>
            </RevealText>
            
            
            {/* Before/After Comparison */}
            <RevealText delay={0.6}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                <div className="bg-white rounded-lg p-8 shadow-lg border-2 border-gray-400 text-center h-full">
                  <h3 className="text-xl font-bold mb-4 text-gray-800">Before RACE</h3>
                  <ul className="text-center text-gray-600 space-y-2">
                    <li className="flex items-center justify-center gap-2">
                      <X className="h-4 w-4 text-red-500" />
                      Scattered across multiple platforms
                    </li>
                    <li className="flex items-center justify-center gap-2">
                      <X className="h-4 w-4 text-red-500" />
                      Complex registration processes
                    </li>
                    <li className="flex items-center justify-center gap-2">
                      <X className="h-4 w-4 text-red-500" />
                      No unified athlete experience
                    </li>
                    <li className="flex items-center justify-center gap-2">
                      <X className="h-4 w-4 text-red-500" />
                      Difficult race discovery
                    </li>
                  </ul>
                </div>
                <div className="bg-white rounded-lg p-8 shadow-lg border-2 border-race-red text-center h-full">
                  <h3 className="text-xl font-bold mb-4 text-race-red">With RACE</h3>
                  <ul className="text-center text-gray-600 space-y-2">
                    <li className="flex items-center justify-center gap-2">
                      <Check className="h-4 w-4 text-green-600" />
                      One unified platform
                    </li>
                    <li className="flex items-center justify-center gap-2">
                      <Check className="h-4 w-4 text-green-600" />
                      Effortless registration
                    </li>
                    <li className="flex items-center justify-center gap-2">
                      <Check className="h-4 w-4 text-green-600" />
                      Seamless athlete journey
                    </li>
                    <li className="flex items-center justify-center gap-2">
                      <Check className="h-4 w-4 text-green-600" />
                      Easy race discovery
                    </li>
                  </ul>
                </div>
              </div>
            </RevealText>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 text-center">
          <RevealText>
            <h2 className="text-3xl md:text-5xl font-bold mb-8">Join the Movement.</h2>
          </RevealText>
          
          <RevealText delay={0.2}>
            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
              We're building RACE for athletes, by athletes. 
              Help us create the registration experience the endurance community deserves.
            </p>
          </RevealText>
          
          <div className="flex justify-center">
            <RevealText delay={0.4}>
              <Button size="lg" asChild className="bg-race-red hover:bg-race-red/90">
                <Link to="/events">
                  Find Your Next Race
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </RevealText>
          </div>
        </div>
      </section>
    </div>;
};
export default WhyRace;