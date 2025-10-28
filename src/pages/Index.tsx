import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
const Index = () => {
  const {
    user
  } = useAuth();
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);
  return <div className="flex flex-col min-h-screen -mt-16">
      {/* Hero section - Now with Vimeo video background filling entire screen */}
      <section className="relative bg-black h-screen flex items-center overflow-hidden">
        {/* Vimeo Video Background */}
        <div className="absolute inset-0 w-full h-full">
          {/* <iframe src="https://player.vimeo.com/video/1106523780?badge=0&autopause=0&autoplay=1&muted=1&loop=1&controls=0&background=1&app_id=58479" title="Race Background Video" className="absolute top-0 left-1/2 pointer-events-none" style={{
          width: '100vw',
          height: '56.25vw',
          // 16:9 aspect ratio
          minHeight: '100vh',
          minWidth: '177.78vh',
          // 16:9 aspect ratio
          transform: 'translateX(-50%)',
          filter: 'brightness(1.1)'
        }} allow="autoplay; fullscreen; picture-in-picture; encrypted-media" frameBorder="0" /> */}
        </div>
        
        {/* Dark overlay for better text readability */}
        {/* <div className="absolute inset-0 bg-black/40 z-10"></div> */}
        
        <div className="container mx-auto px-4 relative z-20 text-center">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">Race Registration, Simplified.</h1>
            <p className="text-xl text-white/80 mb-6">The world's best race registration platform for endurance sports.</p>
            <div className="mt-2 grid grid-cols-1 sm:grid-cols-[auto_auto] justify-center gap-y-4 sm:gap-x-6 max-w-3xl mx-auto">
              <div className="text-center max-w-sm mx-auto sm:mx-0">
                
                <Button className="bg-race-red hover:bg-race-red/90 text-white text-base font-semibold py-7 px-4 rounded-md shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-race-red focus-visible:ring-offset-4" aria-label="Find your event" asChild>
                  <Link to="/events">Find Your Event</Link>
                </Button>
              </div>
              <div className="text-center max-w-sm mx-auto sm:mx-0">
                
                <Button 
                  className="bg-race-red hover:bg-race-red/90 text-white text-base font-semibold py-7 px-4 rounded-md shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-race-red focus-visible:ring-offset-4" 
                  aria-label="Host your event" 
                  asChild
                >
                  <Link to={user ? "/profile?openWizard=true" : "/auth?role=organizer&tab=signup"}>
                    Host Your Event
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>;
};
export default Index;