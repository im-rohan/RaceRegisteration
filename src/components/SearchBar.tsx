
import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Filter, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';

interface SearchBarProps {
  className?: string;
  placeholder?: string;
  externalParams?: {
    searchQuery: string;
    location: string;
    date: Date | undefined;
    selectedRaceTypes: string[];
  } | undefined;
  onSearch?: (searchParams: {
    searchQuery: string;
    location: string;
    date: Date | undefined;
    selectedRaceTypes: string[];
  }) => void;
}

const SearchBar = ({ className = "", placeholder = "Try: Half Marathon near Boston in October", externalParams, onSearch }: SearchBarProps) => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [location, setLocation] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Race types for filter
  const raceTypes = [
    "Marathon", "Half Marathon", "10K", "5K",
    "Trail Run", "Triathlon", "Cycling", "Obstacle Course"
  ];

  const [selectedRaceTypes, setSelectedRaceTypes] = useState<string[]>([]);

  const toggleRaceType = (type: string) => {
    if (selectedRaceTypes.includes(type)) {
      setSelectedRaceTypes(selectedRaceTypes.filter(t => t !== type));
    } else {
      setSelectedRaceTypes([...selectedRaceTypes, type]);
    }
  };

  // Sync with external params (for NLS autopopulate)
  useEffect(() => {
    if (!externalParams) return;
    setSearchQuery(externalParams.searchQuery || "");
    setLocation(externalParams.location || "");
    setDate(externalParams.date);
    setSelectedRaceTypes(externalParams.selectedRaceTypes || []);
  }, [externalParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    triggerSearch();
  };

  const triggerSearch = () => {
    console.log("Searching for:", { searchQuery, location, date, selectedRaceTypes });
    if (onSearch) {
      onSearch({ searchQuery, location, date, selectedRaceTypes });
    }
  };

  // Trigger search with debounce when inputs change to avoid typing lag
  useEffect(() => {
    const id = window.setTimeout(() => {
      triggerSearch();
    }, 300);
    return () => window.clearTimeout(id);
  }, [searchQuery, location, date, selectedRaceTypes]);

  return (
    <form onSubmit={handleSearch} className={`bg-white rounded-lg shadow-lg p-2 ${className}`}>
      <div className="flex flex-col md:flex-row gap-2">
        {/* Main search input */}
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            type="text"
            placeholder={placeholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-36 h-12 border-none bg-race-gray placeholder-italic"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 select-none"
          >
            <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold tracking-wide text-primary ring-1 ring-inset ring-primary/20 shadow-sm">
              Powered by AI
            </span>
          </span>
        </div>

        {/* Location filter */}
        <div className="relative md:w-1/4">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="pl-10 h-12 border-none bg-race-gray"
          />
        </div>

        {/* Date picker */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="h-12 border-none bg-race-gray justify-start text-left font-normal text-gray-500">
              <Calendar className="mr-2 h-4 w-4" />
              {date ? date.toLocaleDateString() : "Select Date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 bg-white z-50">
            <CalendarComponent
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
              className="p-3 pointer-events-auto"
            />
          </PopoverContent>
        </Popover>

        {/* Race type filter */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="h-12 border-none bg-race-gray justify-start text-left font-normal text-gray-500">
              <Filter className="mr-2 h-4 w-4" />
              {selectedRaceTypes.length > 0 
                ? `${selectedRaceTypes.length} selected` 
                : "Race Type"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64 bg-white z-50">
            <div className="grid grid-cols-1 gap-2">
              {raceTypes.map((type) => (
                <div key={type} className="flex items-center space-x-2">
                  <Checkbox
                    id={`race-type-${type}`}
                    checked={selectedRaceTypes.includes(type)}
                    onCheckedChange={() => toggleRaceType(type)}
                  />
                  <label
                    htmlFor={`race-type-${type}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {type}
                  </label>
                </div>
              ))}
            </div>
          </PopoverContent>
        </Popover>

        {/* Search button */}
        <Button type="submit" className="h-12 bg-race-red hover:bg-race-red/90 text-white">
          Search
        </Button>
      </div>
    </form>
  );
};

export default SearchBar;
