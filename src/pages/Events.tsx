import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import EventCard from '@/components/EventCard';
import SearchBar from '@/components/SearchBar';
import { allEvents } from '@/data/eventData';
import { SlidersHorizontal } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Checkbox } from '@/components/ui/checkbox';
import { EventProps } from '@/components/EventCard';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { parseNaturalQuery, summarizeParsed, semanticRankEvents } from '@/lib/nls';
const Events = () => {
  const [events, setEvents] = useState(allEvents);
  const [filteredEvents, setFilteredEvents] = useState(allEvents);

  // Filter states
  const [filterType, setFilterType] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState("all");

  // Search parameters
  const [searchParams, setSearchParams] = useState({
    searchQuery: "",
    location: "",
    date: undefined as Date | undefined,
    selectedRaceTypes: [] as string[]
  });
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [parsedSummary, setParsedSummary] = useState("");
  const [externalParams, setExternalParams] = useState({
    searchQuery: "",
    location: "",
    date: undefined as Date | undefined,
    selectedRaceTypes: [] as string[],
  });
  const raceTypes = ["Marathon", "Half Marathon", "10K", "5K", "Trail Run", "Triathlon", "Cycling", "Obstacle Course"];
  const toggleRaceTypeFilter = (type: string) => {
    setFilterType(prev => prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]);
  };
  const applyFilters = () => {
    let filtered = [...allEvents];
    if (filterType.length > 0) {
      filtered = filtered.filter(event => filterType.includes(event.type));
    }
    setEvents(filtered);
    applySearchFilters(filtered);
  };
  const clearFilters = () => {
    setFilterType([]);
    setEvents(allEvents);
    applySearchFilters(allEvents);
    setParsedSummary('');
    const reset = { searchQuery: '', location: '', date: undefined as Date | undefined, selectedRaceTypes: [] as string[] };
    setSearchParams(reset);
    setExternalParams(reset);
  };
  const resetNLS = () => {
    setParsedSummary('');
    setFilterType([]);
    const reset = { searchQuery: '', location: '', date: undefined as Date | undefined, selectedRaceTypes: [] as string[] };
    setSearchParams(reset);
    setExternalParams(reset);
    setActiveTab('all');
    setEvents(allEvents);
    applySearchFilters(allEvents, reset);
  };
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    let tabFiltered: EventProps[] = [];
    switch (value) {
      case "all":
        tabFiltered = allEvents;
        break;
      case "upcoming":
        // This would ideally filter by date - for now we'll just use all events
        tabFiltered = allEvents;
        break;
      case "featured":
        tabFiltered = allEvents.filter(event => event.isFeatured);
        break;
      case "saved":
        const savedEventIds = JSON.parse(localStorage.getItem('savedEvents') || '[]');
        tabFiltered = allEvents.filter(event => savedEventIds.includes(event.id));
        break;
      default:
        tabFiltered = allEvents;
    }
    setEvents(tabFiltered);
    applySearchFilters(tabFiltered);
  };
  const handleSearch = (params: {
    searchQuery: string;
    location: string;
    date: Date | undefined;
    selectedRaceTypes: string[];
  }) => {
    setSearchParams(params);

    const parsed = parseNaturalQuery(params.searchQuery || '');
    const inflated = { ...params };

    if (parsed.types.length) {
      inflated.selectedRaceTypes = parsed.types;
      setFilterType(parsed.types);
    }
    if (parsed.locationText) inflated.location = parsed.locationText;
    if (parsed.date) inflated.date = parsed.date;

    setExternalParams(inflated);
    setParsedSummary(summarizeParsed(parsed));

    applySearchFilters(events, inflated);
  };
  const applySearchFilters = (eventList: EventProps[], params = searchParams) => {
    let result = [...eventList];

    // Filter by search query (case-insensitive partial match)
    if (params.searchQuery && params.searchQuery.trim() !== "") {
      const query = params.searchQuery.toLowerCase();
      result = result.filter(event => event.title.toLowerCase().includes(query) || event.location.toLowerCase().includes(query) || event.type.toLowerCase().includes(query));
    }

    // Filter by location
    if (params.location && params.location.trim() !== "") {
      const locationQuery = params.location.toLowerCase();
      result = result.filter(event => event.location.toLowerCase().includes(locationQuery));
    }

    // Filter by date
    if (params.date) {
      const searchDate = params.date.toDateString();
      result = result.filter(event => {
        // Convert event.date string to Date object for comparison
        // This is a simple implementation - in real app you might need more complex date parsing
        const eventDate = new Date(event.date).toDateString();
        return eventDate === searchDate;
      });
    }

    // Filter by race types
    if (params.selectedRaceTypes.length > 0) {
      result = result.filter(event => params.selectedRaceTypes.includes(event.type));
    }
    const parsedLocal = parseNaturalQuery(params.searchQuery || '');
    const ranked = semanticRankEvents(result, params.searchQuery || '', parsedLocal);
    setFilteredEvents(ranked);
  };

  // Initial filtering
  useEffect(() => {
    applySearchFilters(events);
  }, [events]);
  return <div className="min-h-screen pt-16">
      {/* Events section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-16 py-10">
        {/* Centered Search Bar */}
        <div className="text-center mb-8">
          <h1 className="text-race-black mb-6 text-5xl font-bold">Find Your Next Race.</h1>
          <div className="flex justify-center">
            <SearchBar className="max-w-7xl w-full" placeholder="Try: Half Marathon near Boston in October" externalParams={externalParams} onSearch={handleSearch} />
          </div>
        </div>
        {/* Filter controls */}
        <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full sm:w-auto">
            <TabsList>
              <TabsTrigger value="all">All Events</TabsTrigger>
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="featured">Featured</TabsTrigger>
              <TabsTrigger value="saved">Favorites</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <Dialog open={filtersOpen} onOpenChange={setFiltersOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <SlidersHorizontal size={16} />
                Filters
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Filter Events</DialogTitle>
              </DialogHeader>
              <div className="py-4">
                <div className="mb-6">
                  <h4 className="font-medium mb-2">Race Type</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {raceTypes.map(type => <div key={type} className="flex items-center space-x-2">
                        <Checkbox id={`filter-${type}`} checked={filterType.includes(type)} onCheckedChange={() => toggleRaceTypeFilter(type)} />
                        <label htmlFor={`filter-${type}`} className="text-sm font-medium leading-none">
                          {type}
                        </label>
                      </div>)}
                  </div>
                </div>
                
                <div className="flex space-x-4 mt-8">
                  <Button variant="outline" className="flex-1" onClick={clearFilters}>
                    Clear All
                  </Button>
                  <Button className="flex-1 bg-race-red hover:bg-race-red/90" onClick={applyFilters}>
                    Apply Filters
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {parsedSummary && (
          <div className="mb-4 text-sm text-race-darkgray flex items-center gap-3">
            <span>Parsed: {parsedSummary}</span>
            <button type="button" className="underline text-race-red" onClick={() => setFiltersOpen(true)}>Edit</button>
            <button type="button" className="underline" onClick={resetNLS}>Reset</button>
          </div>
        )}

        {/* Events grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-start">
          {filteredEvents.length > 0 ? filteredEvents.map(event => 
            <EventCard key={event.id} {...event} />
          ) : <div className="col-span-full py-12 text-center">
              <h3 className="text-2xl font-medium text-race-darkgray mb-4">No events found</h3>
              <p className="text-race-darkgray mb-6">Try adjusting your filters to find more events.</p>
              <Button onClick={clearFilters} className="bg-race-red hover:bg-race-red/90">
                Clear Filters
              </Button>
            </div>}
        </div>
      </div>
    </div>;
};
export default Events;