import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, ChevronRight, Star, Users, Handshake, Building } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";

// Partner data (placeholder content)
const partners = [{
  id: 1,
  name: "Velocity Sports",
  logo: "https://placehold.co/200x100/fff/ff4230?text=VELOCITY",
  category: "Title Sponsor",
  description: "Premier athletic gear designed for endurance athletes who demand the best.",
  featured: true,
  website: "#"
}, {
  id: 2,
  name: "Hydro Flow",
  logo: "https://placehold.co/200x100/fff/666?text=HYDRO+FLOW",
  category: "Hydration",
  description: "Advanced hydration solutions for optimal performance and recovery.",
  featured: true,
  website: "#"
}, {
  id: 3,
  name: "Peak Nutrition",
  logo: "https://placehold.co/200x100/fff/333?text=PEAK",
  category: "Nutrition",
  description: "Science-backed nutrition to fuel your training and racing.",
  featured: false,
  website: "#"
}, {
  id: 4,
  name: "Atlas Tracking",
  logo: "https://placehold.co/200x100/fff/444?text=ATLAS",
  category: "Technology",
  description: "GPS tracking and performance analytics for competitive athletes.",
  featured: false,
  website: "#"
}, {
  id: 5,
  name: "Enduro Wear",
  logo: "https://placehold.co/200x100/fff/555?text=ENDURO",
  category: "Apparel",
  description: "Technical apparel engineered for comfort and performance.",
  featured: false,
  website: "#"
}, {
  id: 6,
  name: "Recovery Plus",
  logo: "https://placehold.co/200x100/fff/777?text=RECOVERY+",
  category: "Recovery",
  description: "Cutting-edge recovery tools and techniques for athletes.",
  featured: false,
  website: "#"
}, {
  id: 7,
  name: "Sprint Financial",
  logo: "https://placehold.co/200x100/fff/888?text=SPRINT",
  category: "Financial Services",
  description: "Financial solutions tailored for athletes and sporting events.",
  featured: false,
  website: "#"
}, {
  id: 8,
  name: "Apex Media",
  logo: "https://placehold.co/200x100/fff/999?text=APEX",
  category: "Media",
  description: "Bringing race coverage and athlete stories to global audiences.",
  featured: false,
  website: "#"
}];

// Testimonial data (placeholder content)
const testimonials = [{
  id: 1,
  quote: "Our partnership with RACE has allowed us to connect with dedicated athletes who value performance and quality. Together we're pushing the boundaries of what's possible.",
  author: "Alex Johnson",
  title: "Marketing Director",
  company: "Velocity Sports"
}, {
  id: 2,
  quote: "We've been a proud partner of RACE for three years. The community engagement and brand alignment have exceeded our expectations.",
  author: "Sarah Chen",
  title: "Partnerships Lead",
  company: "Hydro Flow"
}, {
  id: 3,
  quote: "RACE events bring together the most passionate endurance athletes in the world. As a sponsor, we couldn't ask for a better audience for our products.",
  author: "Mark Williams",
  title: "CEO",
  company: "Peak Nutrition"
}];

const Partners = () => {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const filteredPartners = activeCategory === "all" ? partners : partners.filter(partner => partner.category.toLowerCase() === activeCategory.toLowerCase());
  const featuredPartners = partners.filter(partner => partner.featured);
  
  return <div className="min-h-screen pt-16">
      {/* Hero Section - Cleaner version without wave divider */}
      <section className="bg-gray-950 py-28">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="inline-block mb-6 px-4 py-2 text-white border-0 bg-race-red">
              <div className="flex items-center gap-2">
                <Handshake className="h-4 w-4" />
                <span className="text-sm font-medium">Strategic Alliances</span>
              </div>
            </Badge>
            
            <h1 className="text-5xl font-bold mb-6 text-race-red md:text-6xl">
              Powered by Partnerships
            </h1>
            
            <p className="text-xl mb-10 text-slate-50">
              We collaborate with industry leaders to support endurance athletes around the world.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 items-center">
              <Button className="px-6 shadow-lg bg-race-red text-slate-50" asChild>
                <Link to="/partner-application">
                  Become a Partner <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Partner Logo Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Trusted Partners</h2>
            <p className="text-race-darkgray max-w-2xl mx-auto">
              RACE is proud to collaborate with these industry-leading companies that share our vision for excellence in endurance sports.
            </p>
            
            <div className="flex flex-wrap justify-center gap-3 mt-6">
              <Button variant={activeCategory === "all" ? "default" : "outline"} onClick={() => setActiveCategory("all")} className={activeCategory === "all" ? "bg-race-red hover:bg-race-red/90" : ""}>
                All
              </Button>
              {Array.from(new Set(partners.map(p => p.category))).map(category => <Button key={category} variant={activeCategory === category.toLowerCase() ? "default" : "outline"} onClick={() => setActiveCategory(category.toLowerCase())} className={activeCategory === category.toLowerCase() ? "bg-race-red hover:bg-race-red/90" : ""}>
                  {category}
                </Button>)}
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredPartners.map(partner => <HoverCard key={partner.id}>
                <HoverCardTrigger asChild>
                  <div className="bg-white border border-gray-100 rounded-lg p-6 shadow-sm transition-all duration-300 hover:shadow-md cursor-pointer flex items-center justify-center h-40 group">
                    <img src={partner.logo} alt={partner.name} className="max-w-full max-h-20 group-hover:scale-105 transition-transform duration-300 filter grayscale group-hover:grayscale-0" />
                  </div>
                </HoverCardTrigger>
                <HoverCardContent className="w-80">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold">{partner.name}</h3>
                      <span className="text-xs bg-race-gray text-race-darkgray px-2 py-1 rounded">
                        {partner.category}
                      </span>
                    </div>
                    <p className="text-sm text-race-darkgray">{partner.description}</p>
                    <a href={partner.website} className="text-race-red text-sm flex items-center gap-1 hover:underline">
                      Visit website <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </HoverCardContent>
              </HoverCard>)}
          </div>
        </div>
      </section>

      {/* Featured Partners */}
      {featuredPartners.length > 0 && <section className="py-20 bg-zinc-950">
          <div className="container mx-auto px-4">
            <h2 className="font-bold mb-12 text-center text-[#ff4230] text-4xl">Featured Partners</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredPartners.map(partner => <Card key={partner.id} className="overflow-hidden border-0 shadow-lg">
                  <div className="flex flex-col md:flex-row">
                    <div className="w-full md:w-1/3 bg-gradient-to-br from-red-50 to-red-100 p-6 flex items-center justify-center">
                      <img src={partner.logo} alt={partner.name} className="max-w-full max-h-32" />
                    </div>
                    
                    <CardContent className="w-full md:w-2/3 p-6 bg-[ff4230] bg-[#ff4230]">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-xl font-bold text-slate-950">{partner.name}</h3>
                        
                      </div>
                      
                      <p className="mb-4 text-zinc-950">{partner.description}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-yellow-500">
                          <Star className="fill-yellow-500 h-4 w-4" />
                          <Star className="fill-yellow-500 h-4 w-4" />
                          <Star className="fill-yellow-500 h-4 w-4" />
                          <Star className="fill-yellow-500 h-4 w-4" />
                          <Star className="fill-yellow-500 h-4 w-4" />
                        </div>
                        
                        <Button variant="outline" className="text-race-red border-race-red hover:bg-race-red hover:text-white" asChild>
                          <Link to={partner.website}>Visit Website</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </div>
                </Card>)}
            </div>
          </div>
        </section>}

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">What Our Partners Say</h2>
          
          <Carousel className="max-w-4xl mx-auto">
            <CarouselContent>
              {testimonials.map(testimonial => <CarouselItem key={testimonial.id}>
                  <Card className="border-0 shadow-none">
                    <CardContent className="p-6 text-center">
                      <div className="mb-6 text-race-red">
                        <svg className="h-8 w-8 mx-auto opacity-50" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                        </svg>
                      </div>
                      
                      <p className="text-lg italic text-race-darkgray mb-6">{testimonial.quote}</p>
                      
                      <div>
                        <p className="font-bold">{testimonial.author}</p>
                        <p className="text-sm text-race-darkgray">{testimonial.title}, {testimonial.company}</p>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>)}
            </CarouselContent>
            <CarouselPrevious className="left-0" />
            <CarouselNext className="right-0" />
          </Carousel>
        </div>
      </section>

      {/* Become a Partner CTA - Simplified design */}
      <section className="bg-race-red py-16">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-xl shadow-xl p-8 md:p-12 relative overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="bg-red-100 p-2 rounded-full">
                    <Building className="h-5 w-5 text-race-red" />
                  </div>
                  <p className="font-semibold text-race-red">Partnership Opportunities</p>
                </div>
                
                <h2 className="text-3xl font-bold mb-4">Become a RACE Partner</h2>
                
                <p className="text-race-darkgray mb-6">
                  Join our network of industry leaders supporting endurance athletes worldwide. Together, we can create meaningful connections and drive the future of endurance sports.
                </p>
                
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-race-red" />
                    <span className="text-sm">100K+ Athletes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-race-red" />
                    <span className="text-sm">Global Exposure</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Handshake className="h-4 w-4 text-race-red" />
                    <span className="text-sm">Brand Alignment</span>
                  </div>
                </div>
                
                <Button className="bg-race-red hover:bg-race-red/90" asChild>
                  <Link to="/partner-application">
                    Contact Us Today <ChevronRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                <h3 className="font-bold">Partnership Benefits</h3>
                
                {["Brand visibility across digital and physical platforms", "Direct access to our community of passionate athletes", "Co-branded content and marketing opportunities", "VIP access to RACE events worldwide", "Product testing and feedback from elite athletes"].map((benefit, index) => <div key={index} className="flex items-start gap-2">
                    <div className="min-w-5 mt-1">
                      <div className="h-4 w-4 rounded-full bg-race-red flex items-center justify-center">
                        <div className="h-2 w-2 bg-white rounded-full"></div>
                      </div>
                    </div>
                    <p className="text-sm">{benefit}</p>
                  </div>)}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>;
};

export default Partners;
