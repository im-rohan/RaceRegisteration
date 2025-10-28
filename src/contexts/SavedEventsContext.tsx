import React, { createContext, useContext, useState, useEffect } from 'react';

interface SavedEventsContextType {
  savedEvents: string[];
  toggleSaved: (eventId: string) => void;
  isSaved: (eventId: string) => boolean;
}

const SavedEventsContext = createContext<SavedEventsContextType | undefined>(undefined);

export const SavedEventsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [savedEvents, setSavedEvents] = useState<string[]>([]);

  // Load saved events from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('savedEvents');
    if (saved) {
      setSavedEvents(JSON.parse(saved));
    }
  }, []);

  // Save to localStorage whenever savedEvents changes
  useEffect(() => {
    localStorage.setItem('savedEvents', JSON.stringify(savedEvents));
  }, [savedEvents]);

  const toggleSaved = (eventId: string) => {
    setSavedEvents(prev => 
      prev.includes(eventId) 
        ? prev.filter(id => id !== eventId)
        : [...prev, eventId]
    );
  };

  const isSaved = (eventId: string) => savedEvents.includes(eventId);

  return (
    <SavedEventsContext.Provider value={{ savedEvents, toggleSaved, isSaved }}>
      {children}
    </SavedEventsContext.Provider>
  );
};

export const useSavedEvents = () => {
  const context = useContext(SavedEventsContext);
  if (context === undefined) {
    throw new Error('useSavedEvents must be used within a SavedEventsProvider');
  }
  return context;
};