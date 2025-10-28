import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { UserPlus, CheckCircle, BarChart3 } from "lucide-react";

export default function OrganizeNew() {
  // SEO: title, meta description, canonical
  useEffect(() => {
    document.title = "Become a Race Organizer | RACE";
    const desc = "Join RACE as an event organizer. Complete our simple 3-step process to start hosting and managing your endurance racing events.";
    let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "description";
      document.head.appendChild(meta);
    }
    meta.content = desc;

    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement("link");
      link.rel = "canonical";
      document.head.appendChild(link);
    }
    link.href = `${window.location.origin}/organize/new`;
  }, []);

  const steps = [
    {
      number: 1,
      title: "Create an account on RACE",
      description: "Sign up for your free organizer account.",
      icon: UserPlus
    },
    {
      number: 2,
      title: "Complete our one-time verification",
      description: "Quickly verify you’re a legitimate race organizer.",
      icon: CheckCircle
    },
    {
      number: 3,
      title: "Gain access to your Events Dashboard",
      description: "View registrations, analytics, and live event stats.",
      icon: BarChart3
    }
  ];

  // dynamic connector heights
  const circleRefs = useRef<HTMLDivElement[]>([]);
  const [lineHeights, setLineHeights] = useState<number[]>([]);
  useEffect(() => {
    const calc = () => {
      const heights: number[] = [];
      for (let i = 0; i < circleRefs.current.length - 1; i++) {
        const cur = circleRefs.current[i];
        const next = circleRefs.current[i + 1];
        if (cur && next) {
          const curRect = cur.getBoundingClientRect();
          const nextRect = next.getBoundingClientRect();
          const h = Math.max(0, nextRect.top - curRect.top - curRect.height);
          heights[i] = h;
        }
      }
      setLineHeights(heights);
    };
    calc();
    window.addEventListener('resize', calc);
    return () => window.removeEventListener('resize', calc);
  }, []);

  return (
    <main className="bg-white min-h-screen">
      <section className="relative pt-24 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6">
              Are you an organizer?
            </h1>
            <div className="w-24 h-1 bg-race-red mx-auto rounded-full"></div>
          </div>

          {/* Vertical Stepper */}
          <div className="max-w-3xl mx-auto mb-0">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <div key={step.number} className="flex items-start relative">
                  {/* Step Circle */}
                  <div ref={(el) => { if (el) circleRefs.current[index] = el; }} className="flex-shrink-0 w-16 h-16 bg-race-red rounded-full flex items-center justify-center text-white font-bold text-xl mr-8 shadow-lg shadow-race-red/30 z-10 relative">
                    {step.number}
                  </div>
                  
                  {/* Step Content - Positioned to center with circle */}
                  <div className="flex-grow" style={{ marginTop: '-1rem', paddingBottom: index === steps.length - 1 ? '0rem' : '4rem' }}>
                    <Card className="border-l-4 border-l-race-red shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white backdrop-blur-sm">
                      <CardContent className="p-8">
                        <div className="flex items-start gap-4">
                          <div className="p-3 bg-race-red/10 rounded-lg">
                            <IconComponent className="w-6 h-6 text-race-red" />
                          </div>
                          <div className="flex-grow">
                            <h3 className="text-xl font-semibold text-foreground mb-3">
                              {step.title}
                            </h3>
                            <p className="text-muted-foreground leading-relaxed">
                              {step.description}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Connecting Line - Properly connects all circles */}
                  {index < steps.length - 1 && (
                    <div 
                      className="absolute left-8 w-0.5 bg-gradient-to-b from-race-red to-race-red/30 z-0"
                      style={{ 
                        top: '64px',
                        height: `${lineHeights[index] ?? 120}px`
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* CTA Button - Made bigger */}
          <div className="text-center mt-8">
            <Button 
              asChild
              className="bg-race-red hover:bg-race-red/90 text-white font-semibold py-6 px-16 rounded-lg text-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-race-red focus-visible:ring-offset-4"
            >
              <Link 
                to="/profile?openWizard=true"
              >
                Host Your Event
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
