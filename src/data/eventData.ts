import { EventProps } from '@/components/EventCard';

export const featuredEvents: EventProps[] = [
  {
    id: "1",
    title: "RACE Endurance Event (Demo)",
    imageUrl: "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=1500&h=600&auto=format&fit=crop",
    date: "April 21, 2025",
    location: "Boston, MA",
    type: "Marathon",
    isRacePlus: true,
    isFeatured: true,
    runType: "Rolling",
    terrain: "Urban streets with some hills",
    elevation: "Moderate with notable Heartbreak Hill",
    highTemp: "65 °F / 18 °C",
    lowTemp: "45 °F / 7 °C",
    distances: ["42.2K"],
    equipment: ["Running shoes", "Weather-appropriate gear"],
    requirements: ["Qualifying time", "Official registration"]
  },
  {
    id: "2",
    title: "RACE Endurance Event (Demo)",
    imageUrl: "https://images.unsplash.com/photo-1530549387789-4c1017266635?q=80&w=1500&h=600&auto=format&fit=crop",
    date: "July 15, 2025",
    location: "Chicago, IL",
    type: "Triathlon",
    isRacePlus: true,
    isFeatured: true,
    swimType: "Lake",
    bikeType: "Flat",
    runType: "Flat",
    highTemp: "85 °F / 29 °C",
    lowTemp: "70 °F / 21 °C",
    waterTemp: "72 °F / 22 °C",
    distances: ["1.5K Swim", "40K Bike", "10K Run"],
    equipment: ["Wetsuit", "Bike", "Running shoes"],
    requirements: ["USA Triathlon membership", "Bike check"]
  },
  {
    id: "3",
    title: "RACE Endurance Event (Demo)",
    imageUrl: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?q=80&w=1500&h=600&auto=format&fit=crop",
    date: "May 3, 2025",
    location: "Seattle, WA",
    type: "Half Marathon",
    isRacePlus: false,
    isFeatured: true,
    runType: "Hilly",
    terrain: "Urban with elevation changes",
    elevation: "Significant hills throughout course",
    highTemp: "60 °F / 16 °C",
    lowTemp: "48 °F / 9 °C",
    distances: ["21.1K"],
    equipment: ["Running shoes", "Rain gear"],
    requirements: ["Age 16+"]
  },
  {
    id: "4",
    title: "RACE Endurance Event (Demo)",
    imageUrl: "https://images.unsplash.com/photo-1541625602330-2277a4c46182?q=80&w=1500&h=600&auto=format&fit=crop",
    date: "June 12, 2025",
    location: "San Diego, CA",
    type: "Obstacle Course",
    isRacePlus: true,
    isFeatured: true,
    terrain: "Muddy with obstacles",
    elevation: "Varied with constructed obstacles",
    highTemp: "75 °F / 24 °C",
    lowTemp: "60 °F / 16 °C",
    distances: ["10K", "15K"],
    equipment: ["Old clothes", "Gloves", "Trail shoes"],
    requirements: ["Signed waiver", "Age 18+"]
  },
  {
    id: "5",
    title: "RACE Endurance Event (Demo)",
    imageUrl: "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=1500&h=600&auto=format&fit=crop",
    date: "May 29, 2025",
    location: "New York, NY",
    type: "Cycling",
    isRacePlus: false,
    isFeatured: true,
    bikeType: "Mixed terrain",
    terrain: "Urban and suburban roads",
    elevation: "Rolling hills with some steep sections",
    highTemp: "70 °F / 21 °C",
    lowTemp: "55 °F / 13 °C",
    windConditions: "Light, 5-10 mph",
    distances: ["50K", "100K", "160K"],
    equipment: ["Road bike", "Helmet", "Repair kit"],
    requirements: ["Bike inspection", "Helmet mandatory"]
  }
];

export const allEvents: EventProps[] = [
  ...featuredEvents,
  {
    id: "6",
    title: "RACE Endurance Event (Demo)",
    imageUrl: "https://images.unsplash.com/photo-1483721310020-03333e577078?q=80&w=1528&auto=format&fit=crop",
    date: "July 8, 2025",
    location: "Portland, OR",
    type: "Trail Run",
    isRacePlus: true,
    runType: "Technical trail",
    terrain: "Forest trails with roots and rocks",
    elevation: "Significant with 800+ ft gain",
    highTemp: "80 °F / 27 °C",
    lowTemp: "60 °F / 16 °C",
    distances: ["10K", "25K", "50K"],
    equipment: ["Trail shoes", "Hydration pack"],
    requirements: ["Trail experience recommended"]
  },
  {
    id: "7",
    title: "RACE Endurance Event (Demo)",
    imageUrl: "https://images.unsplash.com/photo-1571008887538-b36bb32f4571?q=80&w=1000&auto=format&fit=crop",
    date: "August 15, 2025",
    location: "Denver, CO",
    type: "10K",
    runType: "Road",
    terrain: "Urban streets",
    elevation: "Moderate with slight inclines",
    highTemp: "85 °F / 29 °C",
    lowTemp: "65 °F / 18 °C",
    distances: ["10K"],
    equipment: ["Running shoes"],
    requirements: ["None"]
  },
  {
    id: "8",
    title: "RACE Endurance Event (Demo)",
    imageUrl: "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=1000&auto=format&fit=crop",
    date: "September 3, 2025",
    location: "Miami, FL",
    type: "5K",
    runType: "Flat",
    terrain: "Beachside roads",
    elevation: "Completely flat",
    highTemp: "88 °F / 31 °C",
    lowTemp: "75 °F / 24 °C",
    distances: ["5K"],
    equipment: ["Running shoes", "Sun protection"],
    requirements: ["None"]
  },
  {
    id: "9",
    title: "RACE Endurance Event (Demo)",
    imageUrl: "https://images.unsplash.com/photo-1530549387789-4c1017266635?q=80&w=1000&auto=format&fit=crop",
    date: "October 10, 2025",
    location: "Austin, TX",
    type: "Triathlon",
    isRacePlus: true,
    swimType: "Lake",
    bikeType: "Hilly",
    runType: "Rolling",
    highTemp: "80 °F / 27 °C",
    lowTemp: "65 °F / 18 °C",
    waterTemp: "75 °F / 24 °C",
    distances: ["3.8K Swim", "180K Bike", "42.2K Run"],
    equipment: ["Wetsuit", "Triathlon bike", "Running shoes"],
    requirements: ["Previous triathlon experience"]
  },
  {
    id: "10",
    title: "RACE Endurance Event (Demo)",
    imageUrl: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?q=80&w=1000&auto=format&fit=crop",
    date: "November 12, 2025",
    location: "Los Angeles, CA",
    type: "Marathon",
    isRacePlus: true,
    runType: "Mostly flat",
    terrain: "Urban coastline",
    elevation: "Minimal elevation gain",
    highTemp: "72 °F / 22 °C",
    lowTemp: "58 °F / 14 °C",
    distances: ["42.2K"],
    equipment: ["Running shoes", "Sun protection"],
    requirements: ["Age 18+"]
  },
  {
    id: "11",
    title: "RACE Endurance Event (Demo)",
    imageUrl: "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=1000&auto=format&fit=crop",
    date: "June 25, 2025",
    location: "San Francisco, CA",
    type: "Cycling",
    isRacePlus: true,
    bikeType: "Hilly",
    terrain: "Urban hills and coastal roads",
    elevation: "Significant climbs",
    highTemp: "68 °F / 20 °C",
    lowTemp: "55 °F / 13 °C",
    windConditions: "Moderate, 10-15 mph",
    distances: ["75K", "150K"],
    equipment: ["Road bike", "Helmet", "Layered clothing"],
    requirements: ["Experience with hills", "Bike inspection"]
  },
  {
    id: "12",
    title: "RACE Endurance Event (Demo)",
    imageUrl: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1000&auto=format&fit=crop",
    date: "July 19, 2025",
    location: "Chicago, IL",
    type: "Open Water Swim",
    isRacePlus: true,
    swimType: "Lake",
    highTemp: "82 °F / 28 °C",
    lowTemp: "68 °F / 20 °C",
    waterTemp: "71 °F / 22 °C",
    distances: ["1K", "2.5K", "5K"],
    equipment: ["Wetsuit", "Swim cap", "Goggles"],
    requirements: ["Open water swimming experience"]
  }
];

export const getEventById = (id: string) => {
  return allEvents.find(event => event.id === id);
};

export const newsCategories = ["Training", "Nutrition", "Gear", "Race Reports", "Athletes"];

export const newsData = [
  {
    id: "1",
    title: "Training Tips: Preparing for Your First Marathon",
    category: "Training",
    imageUrl: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=1000&auto=format&fit=crop",
    excerpt: "Essential advice for first-time marathon runners to help you cross that finish line.",
    date: "May 12, 2025",
    isNew: true
  },
  {
    id: "2",
    title: "Nutrition Guide: What to Eat Before Race Day",
    category: "Nutrition",
    imageUrl: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?q=80&w=1000&auto=format&fit=crop",
    excerpt: "The ultimate nutrition guide to optimize your performance on race day.",
    date: "May 8, 2025"
  },
  {
    id: "3",
    title: "Meet the Champions: Interview with Elite Runners",
    category: "Athletes",
    imageUrl: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=1000&auto=format&fit=crop",
    excerpt: "Get inspired by the stories and advice from top endurance athletes.",
    date: "May 5, 2025"
  },
  {
    id: "4",
    title: "Recovery Strategies: Post-Race Rehabilitation",
    category: "Training",
    imageUrl: "https://images.unsplash.com/photo-1434682881908-b43d0467b798?q=80&w=1000&auto=format&fit=crop",
    excerpt: "Expert advice on how to properly recover after an intense endurance event.",
    date: "May 3, 2025"
  },
  {
    id: "5",
    title: "Top 5 Running Shoes for Long Distance Events",
    category: "Gear",
    imageUrl: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1000&auto=format&fit=crop",
    excerpt: "Find the perfect footwear for your next marathon or ultra-distance event.",
    date: "April 29, 2025"
  },
  {
    id: "6",
    title: "Mental Toughness: Psychology of Endurance Athletes",
    category: "Athletes",
    imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1000&auto=format&fit=crop",
    excerpt: "How to build mental resilience for challenging endurance events.",
    date: "April 25, 2025"
  },
  {
    id: "7",
    title: "Beginner Marathon Training Guide",
    category: "Training",
    imageUrl: "https://images.unsplash.com/photo-1461897104016-0b3b00cc81ee?q=80&w=1000&auto=format&fit=crop",
    excerpt: "Learn how to build up to 26.2 miles with our expert tips for first-time marathoners.",
    date: "April 22, 2025",
    isNew: true
  },
  {
    id: "8",
    title: "Top 10 Foods for Runners",
    category: "Nutrition",
    imageUrl: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=1000&auto=format&fit=crop",
    excerpt: "Fueling strategies, what to eat to optimize performance and recovery for endurance athletes.",
    date: "April 18, 2025"
  },
  {
    id: "9",
    title: "How to Choose a GPS Watch",
    category: "Gear",
    imageUrl: "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?q=80&w=1000&auto=format&fit=crop",
    excerpt: "Find the best GPS model for your running needs and budget with our comprehensive guide.",
    date: "April 14, 2025"
  },
  {
    id: "10",
    title: "Interview with an Ultramarathoner",
    category: "Athletes",
    imageUrl: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?q=80&w=1000&auto=format&fit=crop",
    excerpt: "An elite ultrarunner shares insights into her training and racing strategies for 100-mile events.",
    date: "April 10, 2025"
  },
  {
    id: "11",
    title: "Race Day Checklist: What to Pack",
    category: "Race Reports",
    imageUrl: "https://images.unsplash.com/photo-1460574283810-2aab119d8511?q=80&w=1000&auto=format&fit=crop",
    excerpt: "The ultimate packing list to ensure you're prepared for any race day scenario.",
    date: "April 7, 2025"
  },
  {
    id: "12",
    title: "Boston Marathon Race Report",
    category: "Race Reports",
    imageUrl: "https://images.unsplash.com/photo-1504025468847-0e438279542c?q=80&w=1000&auto=format&fit=crop",
    excerpt: "A firsthand account of tackling the historic Boston Marathon course from start to finish.",
    date: "April 3, 2025",
    isNew: true
  }
];
