import React, { useState } from 'react';
import { Calendar, MapPin, Star, Info, Heart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useToast } from '@/hooks/use-toast';
import { useCart } from '@/contexts/CartContext';
import { useSavedEvents } from '@/contexts/SavedEventsContext';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export interface EventProps {
  id: string;
  title: string;
  imageUrl: string;
  date: string;
  location: string;
  type: string;
  isRacePlus?: boolean;
  isFeatured?: boolean;
  // Race-specific details
  swimType?: string;
  bikeType?: string;
  runType?: string;
  terrain?: string;
  elevation?: string;
  highTemp?: string;
  lowTemp?: string;
  waterTemp?: string;
  windConditions?: string;
  distances?: string[];
  equipment?: string[];
  requirements?: string[];
  weather?: string;
  tagline?: string;
}

const EventCard = ({ 
  id, 
  title, 
  imageUrl, 
  date, 
  location, 
  type,
  isRacePlus = false,
  isFeatured = false,
  // New fields with defaults
  distances = ["5K", "10K"],
  weather = "Expected 65-75°F, partly cloudy",
  elevation = "Mostly flat with slight inclines",
  equipment = ["Running shoes", "Water bottle"],
  requirements = ["Minimum age: 16", "Medical certificate required"]
}: EventProps) => {
  const { toast } = useToast();
  const { addToCart, isInCart } = useCart();
  const { toggleSaved, isSaved } = useSavedEvents();
  const [open, setOpen] = useState(false);

  // Function to get appropriate stock image based on event type
  const getEventImage = () => {
    // Use the provided image if it's not a placeholder
    if (imageUrl && !imageUrl.includes('placeholder')) {
      return imageUrl;
    }
    
    // Otherwise select an image based on event type
    switch(type.toLowerCase()) {
      case 'marathon':
      case 'half marathon':
      case '10k':
      case '5k':
        return "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?q=80&w=1470&auto=format&fit=crop";
      case 'trail run':
        return "https://images.unsplash.com/photo-1483721310020-03333e577078?q=80&w=1528&auto=format&fit=crop";
      case 'triathlon':
        return "https://images.unsplash.com/photo-1530143584546-01d69ced3148?q=80&w=1469&auto=format&fit=crop";
      case 'cycling':
        return "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=1470&auto=format&fit=crop";
      case 'obstacle course':
        return "https://images.unsplash.com/photo-1519311965067-36d3e5f33d39?q=80&w=1471&auto=format&fit=crop";
      default:
        return "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1474&auto=format&fit=crop";
    }
  };

  const handleAddToCart = (event: React.MouseEvent) => {
    event.preventDefault();
    
    // Add to cart context
    addToCart({ id, title, imageUrl, date, location, type, isRacePlus, isFeatured });
  };

  const handleToggleSaved = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    toggleSaved(id);
  };

  const alreadyInCart = isInCart(id);
  const savedEvent = isSaved(id);

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col">
      <div className="relative">
        <img 
          src={getEventImage()} 
          alt={title} 
          className="w-full h-48 object-cover"
          loading="lazy"
        />
        {isFeatured && (
          <div className="absolute top-3 left-3 flex items-center bg-black/70 text-white rounded-full px-2 py-1">
            <Star className="h-3 w-3 mr-1 fill-race-red text-race-red" />
            <span className="text-xs font-medium">Featured</span>
          </div>
        )}
        <button 
          onClick={handleToggleSaved}
          className="absolute top-3 right-3 p-2 bg-white/90 hover:bg-white rounded-full transition-all duration-200 hover:scale-110"
        >
          <Heart 
            className={`h-4 w-4 transition-colors ${savedEvent ? 'fill-race-red text-race-red' : 'text-gray-600 hover:text-race-red'}`} 
          />
        </button>
      </div>
      
      <div className="p-4 flex-grow flex flex-col">
        <div className="mb-2">
          <div className="flex items-center justify-between gap-2 mb-2">
            <Badge variant="outline" className="bg-race-gray text-race-darkgray border-none">
              {type}
            </Badge>
            <div className="flex items-center gap-1">
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-xs h-7 hover:bg-race-black hover:text-white transition-colors p-0 w-7"
                  >
                    <Info size={14} />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle className="text-xl">{title}</DialogTitle>
                    <DialogDescription className="text-race-darkgray">
                      {date} • {location}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div>
                      <h3 className="text-sm font-medium mb-1">Race Distances</h3>
                      <div className="flex flex-wrap gap-2">
                        {distances.map((distance, index) => (
                          <Badge key={index} variant="secondary" className="bg-race-gray text-race-darkgray">
                            {distance}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium mb-1">Weather</h3>
                      <p className="text-sm text-race-darkgray">{weather}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium mb-1">Elevation Profile</h3>
                      <p className="text-sm text-race-darkgray">{elevation}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium mb-1">Required Equipment</h3>
                      <ul className="list-disc list-inside text-sm text-race-darkgray">
                        {equipment.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium mb-1">Participation Requirements</h3>
                      <ul className="list-disc list-inside text-sm text-race-darkgray">
                        {requirements.map((req, index) => (
                          <li key={index}>{req}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Button onClick={() => setOpen(false)} className="bg-race-red hover:bg-race-red/90">
                      Close
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
              
              <Button 
                variant="outline" 
                size="sm" 
                className="text-xs h-7 hover:bg-race-red hover:text-white transition-colors" 
                onClick={handleAddToCart}
                disabled={alreadyInCart}
              >
                {alreadyInCart ? 'In Cart' : 'Add to Cart'}
              </Button>
            </div>
          </div>
          <h3 className="font-bold text-lg line-clamp-2">{title}</h3>
        </div>
        
        <div className="mt-auto space-y-2">
          <div className="flex items-center text-sm text-race-darkgray">
            <Calendar className="h-4 w-4 mr-2" />
            <span>{date}</span>
          </div>
          <div className="flex items-center text-sm text-race-darkgray">
            <MapPin className="h-4 w-4 mr-2" />
            <span className="truncate">{location}</span>
          </div>
        </div>
      </div>
      
      <div className="p-4 pt-0 flex flex-col gap-2">
        <Link to={`/checkout?eventId=${id}`}>
          <Button className="w-full bg-race-black hover:bg-race-red">
            Register Now
          </Button>
        </Link>
        <Link to={`/event-details/${id}`}>
          <Button variant="outline" className="w-full border-race-red text-race-red hover:bg-race-red hover:text-white">
            See Race Details
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default EventCard;
