import React from 'react';
import OrganizerAnalytics from '@/components/analytics/OrganizerAnalytics';
import YearOverYearComparison from './YearOverYearComparison';


// Mock current year data
const currentYearData = {
  year: 2024,
  registrations: 329,
  revenue: 26320,
  averageTicketPrice: 80
};

// Mock previous year data
const previousYearData = {
  year: 2023,
  registrations: 289,
  revenue: 23120,
  averageTicketPrice: 80,
  daysToSellOut: 67
};

interface FinancesTabProps {
  events?: Array<{ id: string; title: string; date: string }>;
}

export default function FinancesTab({ events = [] }: FinancesTabProps) {

  return (
    <div className="space-y-6">

      {/* Year-over-Year Comparison */}
      <YearOverYearComparison
        currentYear={currentYearData}
        previousYear={previousYearData}
      />

      {/* Existing Analytics */}
      <OrganizerAnalytics events={events} />
    </div>
  );
}
