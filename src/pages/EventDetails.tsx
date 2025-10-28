import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { allEvents } from '@/data/eventData';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ExternalLink, Calendar, MapPin, CloudSun, Info, Bike, Wind, Mountain, Thermometer, Waves, Sun, Cloud, Footprints, ArrowLeft } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Separator } from '@/components/ui/separator';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useToast } from '@/hooks/use-toast';
import { useCart } from '@/contexts/CartContext';
import { EventProps } from '@/components/EventCard';
import { useIsMobile } from '@/hooks/use-mobile';

// Helper function to determine which sections to show based on race type
const getRaceTypeConfig = (type: string) => {
  const lowerType = type.toLowerCase();

  // Default configuration (show everything)
  const config = {
    showSwim: false,
    showBike: false,
    showRun: false,
    showTerrain: true,
    showElevation: true,
    showHighTemp: true,
    showLowTemp: true,
    showWaterTemp: false,
    showWind: false
  };
  if (lowerType.includes('triathlon') || lowerType.includes('ironman')) {
    config.showSwim = true;
    config.showBike = true;
    config.showRun = true;
    config.showWaterTemp = true;
  } else if (lowerType.includes('marathon') || lowerType.includes('run') || lowerType === '5k' || lowerType === '10k' || lowerType === 'half marathon') {
    config.showRun = true;
  } else if (lowerType.includes('cycling') || lowerType.includes('bike')) {
    config.showBike = true;
    config.showWind = true;
  } else if (lowerType.includes('swim') || lowerType.includes('water')) {
    config.showSwim = true;
    config.showWaterTemp = true;
  } else if (lowerType.includes('obstacle')) {
    config.showTerrain = true;
  }
  return config;
};
const EventDetails = () => {
  const {
    id
  } = useParams<{
    id: string;
  }>();
  const {
    toast
  } = useToast();
  const {
    addToCart,
    isInCart
  } = useCart();
  const isMobile = useIsMobile();

  // Find the event by ID
  const event = allEvents.find(event => event.id === id);

  // Get recommended events (excluding current one)
  const recommendedEvents = allEvents.filter(e => e.id !== id).filter(e => e.type === event?.type || e.isFeatured).slice(0, 4);
  if (!event) {
    return <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Event not found</h2>
          <Button asChild>
            <Link to="/events">Back to Events</Link>
          </Button>
        </div>
      </div>;
  }
  const handleAddToCart = () => {
    addToCart(event);
    toast({
      title: "Added to cart",
      description: `${event.title} has been added to your cart.`
    });
  };

  // Calculate days until event
  const calculateDaysUntil = (eventDate: string) => {
    const today = new Date();
    const eventDay = new Date(eventDate);
    const timeDiff = eventDay.getTime() - today.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return daysDiff > 0 ? daysDiff : 0;
  };

  const daysUntilEvent = calculateDaysUntil(event.date);

  // Get configuration for what to display based on race type
  const raceConfig = getRaceTypeConfig(event.type);

  // Default tagline if not provided in the event data
  const tagline = event.tagline || "Captivating Race Experience";

  // Define links based on event type
  const quickLinks = [{
    label: "Event Schedule",
    url: "#schedule"
  }, {
    label: "Athlete Guide",
    url: "#guide"
  }, {
    label: "Volunteer Info",
    url: "#volunteer"
  }, {
    label: "Course Maps",
    url: "#maps"
  }];

  // Define "why do this" items
  const whyDoThis = [{
    title: "Historic Race",
    description: "One of the oldest races in the region since 1998",
    icon: "calendar"
  }, {
    title: "Stunning Location",
    description: "A one-of-a-kind race in beautiful surroundings",
    icon: "map-pin"
  }, {
    title: "Perfect Weather",
    description: "Ideal racing conditions with mild temperatures",
    icon: "cloud-sun"
  }];

  // Calculate the grid columns based on how many sport types to show
  const getGridCols = () => {
    let count = 0;
    if (raceConfig.showSwim) count++;
    if (raceConfig.showBike) count++;
    if (raceConfig.showRun) count++;
    if (!raceConfig.showSwim && !raceConfig.showBike && !raceConfig.showRun && raceConfig.showTerrain) count++;
    if (!raceConfig.showSwim && !raceConfig.showBike && !raceConfig.showRun && raceConfig.showElevation && !raceConfig.showTerrain) count++;
    return count === 0 ? 1 : count;
  };
  const gridColsClass = `grid-cols-${getGridCols()}`;
  return <div>
      {/* Hero Section */}
      <div className="relative min-h-[50vh] pt-20">
        {/* Back Button */}
        <Button 
          asChild
          variant="ghost"
          className="absolute top-24 left-4 z-20 text-race-red hover:text-race-red/80 hover:bg-transparent p-0 h-auto font-medium"
        >
          <Link to="/events" className="flex items-center gap-1">
            <ArrowLeft className="w-4 h-4" />
            Back to Events
          </Link>
        </Button>

        {/* Background Image */}
        <div className="absolute inset-0">
          <img src={event.imageUrl} alt={event.title} className="w-full h-full object-cover" />
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/65"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 flex items-center justify-center min-h-[50vh] text-white py-8">
          <div className="text-center px-4 max-w-4xl mx-auto">
            <Badge className="bg-race-red text-white px-4 py-2 text-sm mb-4">{event.type}</Badge>
            <h1 className="text-4xl lg:text-6xl font-bold mb-4">{event.title}</h1>
            <div className="text-xl lg:text-2xl text-white/90 mb-6 flex items-center justify-center">
              <div className="flex items-center">
                <Calendar className="h-6 w-6 mr-2" />
                <span>{event.date}</span>
              </div>
              <span className="mx-6 font-bold text-3xl">|</span>
              <div className="flex items-center">
                <MapPin className="h-6 w-6 mr-2" />
                <span>{event.location}</span>
              </div>
            </div>
            <Link to={`/checkout?eventId=${event.id}`}>
              <Button className="bg-race-red hover:bg-race-red/90 text-white px-8 py-4 text-lg h-auto">
                Register Now
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Event Information Section */}
      <div className="bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {isMobile ? (
              /* Mobile Accordion Layout */
              <Accordion type="multiple" className="w-full">
                {/* Race Details Accordion */}
                {(raceConfig.showSwim || raceConfig.showBike || raceConfig.showRun || raceConfig.showTerrain) && (
                  <AccordionItem value="race-details">
                    <AccordionTrigger className="text-lg font-bold">Race Details</AccordionTrigger>
                    <AccordionContent>
                      <div className="flex justify-center gap-8 pt-4">
                        {raceConfig.showSwim && (
                          <div className="flex flex-col items-center">
                            <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mb-2">
                              <Waves className="w-6 h-6 text-race-black" />
                            </div>
                            <span className="font-semibold text-sm">Swim</span>
                            <span className="text-xs text-gray-600 text-center">{event.swimType || "Open Water"}</span>
                          </div>
                        )}
                        {raceConfig.showBike && (
                          <div className="flex flex-col items-center">
                            <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mb-2">
                              <Bike className="w-6 h-6 text-race-black" />
                            </div>
                            <span className="font-semibold text-sm">Bike</span>
                            <span className="text-xs text-gray-600 text-center">{event.bikeType || "Road"}</span>
                          </div>
                        )}
                         {raceConfig.showRun && (
                          <div className="flex flex-col items-center">
                            <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mb-2">
                              <Footprints className="w-6 h-6 text-race-black" />
                            </div>
                            <span className="font-semibold text-sm">Run</span>
                            <span className="text-xs text-gray-600 text-center">{event.runType || "Rolling"}</span>
                          </div>
                        )}
                        {raceConfig.showTerrain && !raceConfig.showSwim && !raceConfig.showBike && !raceConfig.showRun && (
                          <div className="flex flex-col items-center">
                            <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mb-2">
                              <Mountain className="w-6 h-6 text-race-black" />
                            </div>
                            <span className="font-semibold text-sm">Terrain</span>
                            <span className="text-xs text-gray-600 text-center">{event.terrain || "Mixed"}</span>
                          </div>
                        )}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                )}

                {/* Weather Accordion */}
                <AccordionItem value="weather">
                  <AccordionTrigger className="text-lg font-bold">Weather Conditions</AccordionTrigger>
                  <AccordionContent>
                    <div className="flex justify-center gap-8 pt-4">
                      {raceConfig.showHighTemp && (
                        <div className="text-center">
                          <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mb-1">
                            <Sun className="w-3 h-3 text-orange-500" />
                            High Temp
                          </div>
                          <div className="font-bold text-lg">{event.highTemp || "65°F / 18°C"}</div>
                        </div>
                      )}
                      {raceConfig.showLowTemp && (
                        <div className="text-center">
                          <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mb-1">
                            <Cloud className="w-3 h-3 text-blue-500" />
                            Low Temp
                          </div>
                          <div className="font-bold text-lg">{event.lowTemp || "45°F / 7°C"}</div>
                        </div>
                      )}
                      {raceConfig.showWaterTemp && (
                        <div className="text-center">
                          <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mb-1">
                            <Waves className="w-3 h-3 text-blue-600" />
                            Water Temp
                          </div>
                          <div className="font-bold text-lg">{event.waterTemp || "N/A"}</div>
                        </div>
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Why Race Here Accordion */}
                <AccordionItem value="why-race">
                  <AccordionTrigger className="text-lg font-bold">Why Race Here</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4 pt-4">
                      {whyDoThis.slice(0, 2).map((item, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            {item.icon === "calendar" && <Calendar className="w-4 h-4" />}
                            {item.icon === "map-pin" && <MapPin className="w-4 h-4" />}
                            {item.icon === "cloud-sun" && <CloudSun className="w-4 h-4" />}
                          </div>
                          <div className="flex-1">
                            <div className="font-semibold text-sm mb-1">{item.title}</div>
                            <div className="text-sm text-gray-600 leading-relaxed">{item.description}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Quick Access Accordion */}
                <AccordionItem value="quick-access">
                  <AccordionTrigger className="text-lg font-bold">Quick Access</AccordionTrigger>
                  <AccordionContent>
                    <div className="grid grid-cols-1 gap-3 pt-4">
                      {quickLinks.map((link, index) => (
                        <a 
                          key={index} 
                          href={link.url} 
                          className="flex items-center justify-between bg-gray-50 hover:bg-gray-100 p-4 rounded-lg transition-all duration-200 group"
                        >
                          <span className="font-medium group-hover:text-race-red transition-colors duration-200">{link.label}</span>
                          <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform text-gray-400 group-hover:text-race-red" />
                        </a>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ) : (
              /* Desktop Layout - 2x2 Grid */
              <div className="space-y-8">
                {/* Countdown Timer */}
                {daysUntilEvent > 0 && (
                  <div className="bg-race-red text-white p-4 rounded-lg text-center max-w-md mx-auto">
                    <div className="text-sm font-medium">Event starts in</div>
                    <div className="text-2xl font-bold">{daysUntilEvent} days</div>
                  </div>
                )}

                {/* 2x2 Grid */}
                <div className="grid grid-cols-2 gap-8">
                  {/* Top Row */}
                  {/* Race Details Section */}
                  {(raceConfig.showSwim || raceConfig.showBike || raceConfig.showRun || raceConfig.showTerrain) && (
                    <div className="bg-gray-50 p-8 rounded-lg h-full">
                      <h3 className="font-bold text-2xl mb-6 text-center">Race Details</h3>
                      <div className="flex justify-center gap-8">
                        {raceConfig.showSwim && (
                          <div className="flex flex-col items-center group">
                            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-3 shadow-sm group-hover:shadow-lg transition-all duration-200">
                              <Waves className="w-8 h-8 text-race-black transition-transform duration-200 group-hover:scale-110" />
                            </div>
                            <span className="font-bold text-lg mb-1">Swim</span>
                            <span className="text-sm text-gray-600">{event.swimType || "Open Water"}</span>
                          </div>
                        )}
                        {raceConfig.showBike && (
                          <div className="flex flex-col items-center group">
                            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-3 shadow-sm group-hover:shadow-lg transition-all duration-200">
                              <Bike className="w-8 h-8 text-race-black transition-transform duration-200 group-hover:scale-110" />
                            </div>
                            <span className="font-bold text-lg mb-1">Bike</span>
                            <span className="text-sm text-gray-600">{event.bikeType || "Road"}</span>
                          </div>
                        )}
                         {raceConfig.showRun && (
                          <div className="flex flex-col items-center group">
                            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-3 shadow-sm group-hover:shadow-lg transition-all duration-200">
                              <Footprints className="w-8 h-8 text-race-black transition-transform duration-200 group-hover:scale-110" />
                            </div>
                            <span className="font-bold text-lg mb-1">Run</span>
                            <span className="text-sm text-gray-600">{event.runType || "Rolling"}</span>
                          </div>
                        )}
                        {raceConfig.showTerrain && !raceConfig.showSwim && !raceConfig.showBike && !raceConfig.showRun && (
                          <div className="flex flex-col items-center group">
                            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-3 shadow-sm group-hover:shadow-lg transition-all duration-200">
                              <Mountain className="w-8 h-8 text-race-black transition-transform duration-200 group-hover:scale-110" />
                            </div>
                            <span className="font-bold text-lg mb-1">Terrain</span>
                            <span className="text-sm text-gray-600">{event.terrain || "Mixed"}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Weather Conditions Section */}
                  <div className="bg-gray-50 p-8 rounded-lg h-full">
                    <h3 className="font-bold text-2xl mb-6 text-center">Weather Conditions</h3>
                    <div className="space-y-4">
                      {raceConfig.showHighTemp && (
                        <div className="text-center">
                          <div className="flex items-center justify-center gap-2 text-base text-gray-500 mb-2">
                            <Sun className="w-4 h-4 text-orange-500" />
                            High Temp
                          </div>
                          <div className="font-bold text-xl">{event.highTemp || "65°F / 18°C"}</div>
                        </div>
                      )}
                      {raceConfig.showLowTemp && (
                        <div className="text-center">
                          <div className="flex items-center justify-center gap-2 text-base text-gray-500 mb-2">
                            <Cloud className="w-4 h-4 text-blue-500" />
                            Low Temp
                          </div>
                          <div className="font-bold text-xl">{event.lowTemp || "45°F / 7°C"}</div>
                        </div>
                      )}
                      {raceConfig.showWaterTemp && (
                        <div className="text-center">
                          <div className="flex items-center justify-center gap-2 text-base text-gray-500 mb-2">
                            <Waves className="w-4 h-4 text-blue-600" />
                            Water Temp
                          </div>
                          <div className="font-bold text-xl">{event.waterTemp || "N/A"}</div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Bottom Row */}
                  {/* Why Race Here Section */}
                  <div className="bg-gray-50 p-8 rounded-lg h-full">
                    <h3 className="font-bold text-2xl mb-6 text-center">Why Race Here</h3>
                    <div className="space-y-6">
                      {whyDoThis.slice(0, 2).map((item, index) => (
                        <div key={index} className="flex items-start gap-4 group">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center flex-shrink-0 shadow-sm group-hover:shadow-lg transition-all duration-200">
                              {item.icon === "calendar" && <Calendar className="w-5 h-5 text-race-black transition-transform duration-200 group-hover:scale-110" />}
                              {item.icon === "map-pin" && <MapPin className="w-5 h-5 text-race-black transition-transform duration-200 group-hover:scale-110" />}
                              {item.icon === "cloud-sun" && <CloudSun className="w-5 h-5 text-race-black transition-transform duration-200 group-hover:scale-110" />}
                            </div>
                            <div className="flex-1">
                              <div className="font-bold text-lg mb-1">{item.title}</div>
                              <div className="text-sm text-gray-600 leading-relaxed">{item.description}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Quick Access Section */}
                  <div className="bg-gray-50 p-8 rounded-lg h-full">
                    <h3 className="font-bold text-2xl mb-6 text-center">Quick Access</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {quickLinks.map((link, index) => (
                        <a 
                          key={index} 
                          href={link.url} 
                          className="flex items-center justify-between bg-white hover:bg-gray-100 p-4 rounded-lg transition-all duration-200 group shadow-sm hover:shadow-lg min-h-[60px]"
                        >
                          <span className="font-medium text-sm leading-tight group-hover:text-race-red transition-colors duration-200">{link.label.replace(/Event |Info/, "")}</span>
                          <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform flex-shrink-0 ml-2 text-gray-400 group-hover:text-race-red" />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Recommended Races - Simplified */}
      <div className="bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Other Recommended Races</h2>
            <Link to="/events" className="text-race-red hover:underline font-medium flex items-center">
              See all races
              <ExternalLink className="w-4 h-4 ml-1" />
            </Link>
          </div>
          
          <Carousel className="w-full">
            <CarouselContent>
              {recommendedEvents.map((event: EventProps) => <CarouselItem key={event.id} className="md:basis-1/2 lg:basis-1/3">
                  <Card className="h-full">
                    <CardContent className="p-0">
                      <Link to={`/event-details/${event.id}`}>
                        <div className="relative">
                          <img src={event.imageUrl} alt={event.title} className="w-full h-36 object-cover" />
                        </div>
                        <div className="p-4">
                          <Badge variant="outline" className="mb-2 text-xs">
                            {event.type}
                          </Badge>
                          <h3 className="font-bold text-lg mb-2">{event.title}</h3>
                          <div className="flex items-center text-gray-600 text-sm">
                            <Calendar className="h-3 w-3 mr-1" />
                            <span className="mr-3">{event.date}</span>
                            <MapPin className="h-3 w-3 mr-1" />
                            <span>{event.location}</span>
                          </div>
                        </div>
                      </Link>
                    </CardContent>
                  </Card>
                </CarouselItem>)}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>
        </div>
      </div>
    </div>;
};
export default EventDetails;