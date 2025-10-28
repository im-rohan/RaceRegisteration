import React, { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  LineChart as ReLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  BarChart as ReBarChart,
  Bar,
  ResponsiveContainer,
} from "recharts";
import {
  BarChart2,
  ChartLine,
  DollarSign,
  Eye,
  ShoppingCart,
  Percent,
  Trophy,
  CalendarClock,
  Plus,
  Share2,
  Megaphone,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Types kept minimal to avoid tight coupling with EventProps
export type SimpleEvent = {
  id: string;
  title: string;
  date: string; // e.g. "April 21, 2025"
};

interface OrganizerAnalyticsProps {
  events: SimpleEvent[]; // upcoming/registered events
}

// Small helper to parse human-readable dates like "April 21, 2025"
const parseDate = (d: string) => new Date(d);

function MetricTile({
  label,
  value,
  icon: Icon,
  trend,
  className,
}: {
  label: string;
  value: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  trend?: string;
  className?: string;
}) {
  return (
    <Card className={cn("shadow-sm", className)}>
      <CardContent className="p-4 md:p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground">{label}</p>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-2xl md:text-3xl font-semibold">{value}</span>
              {trend && (
                <span className="text-xs text-muted-foreground">{trend}</span>
              )}
            </div>
          </div>
          <div className="rounded-md bg-muted p-2">
            <Icon width={18} height={18} className="text-muted-foreground" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function OrganizerAnalytics({ events }: OrganizerAnalyticsProps) {
  const noData = events.length === 0;
  const { toast } = useToast();
  // Placeholder datasets — wire to Supabase when tables are ready
  const series = useMemo(() => {
    if (noData) return [] as { label: string; registrations: number; revenue: number }[];
    return Array.from({ length: 8 }).map((_, i) => ({
      label: `W${i + 1}`,
      registrations: Math.round(20 + Math.random() * 60),
      revenue: Math.round(800 + Math.random() * 4200),
    }));
  }, [noData]);

  const totals = useMemo(() => {
    if (noData) {
      return {
        totalRegistrations: 0,
        totalRevenue: 0,
        pageViews: 0,
        cartAdds: 0,
        abandoned: 0,
        conversion: 0,
      };
    }

    const totalRegistrations = series.reduce((s, p) => s + p.registrations, 0);
    const totalRevenue = series.reduce((s, p) => s + p.revenue, 0);
    const pageViews = 4600 + Math.round(Math.random() * 900); // placeholder
    const cartAdds = 300 + Math.round(Math.random() * 120); // placeholder
    const abandoned = 60 + Math.round(Math.random() * 40); // placeholder
    const conversion = pageViews ? (totalRegistrations / pageViews) * 100 : 0;

    return {
      totalRegistrations,
      totalRevenue,
      pageViews,
      cartAdds,
      abandoned,
      conversion,
    };
  }, [noData, series]);

  const nextRace = useMemo(() => {
    const upcoming = [...events]
      .map((e) => ({ ...e, dateObj: parseDate(e.date) }))
      .filter((e) => e.dateObj.getTime() > Date.now())
      .sort((a, b) => a.dateObj.getTime() - b.dateObj.getTime())[0];

    if (!upcoming) return null;

    const diffMs = upcoming.dateObj.getTime() - Date.now();
    const days = Math.max(0, Math.floor(diffMs / (1000 * 60 * 60 * 24)));

    return { title: upcoming.title, date: upcoming.dateObj, days };
  }, [events]);

  const topRace = useMemo(() => {
    // Placeholder: pick first event as top; later use per‑race registrations
    return events[0]?.title ?? "—";
  }, [events]);

  return (
    <section aria-labelledby="analytics-heading" className="space-y-4 md:space-y-6">
      <header className="flex items-center justify-between">
        <h2 id="analytics-heading" className="text-xl md:text-2xl font-semibold tracking-tight">
          Race Performance Overview
        </h2>
      </header>

      {/* Top metrics row */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
        <MetricTile
          label="Total Registrations"
          value={totals.totalRegistrations.toLocaleString()}
          icon={BarChart2}
          trend={"Last 8 weeks"}
        />
        <MetricTile
          label="Total Revenue"
          value={`$${totals.totalRevenue.toLocaleString()}`}
          icon={DollarSign}
          trend={"Gross"}
        />
        <MetricTile
          label="Race Page Views"
          value={totals.pageViews.toLocaleString()}
          icon={Eye}
          trend={"Site-wide"}
          className="hidden md:block"
        />
        <MetricTile
          label="Cart Adds"
          value={totals.cartAdds.toLocaleString()}
          icon={ShoppingCart}
        />
        <MetricTile
          label="Abandoned Carts"
          value={totals.abandoned.toLocaleString()}
          icon={() => <span className="text-sm">⛔️</span>}
        />
        <MetricTile
          label="Conversion Rate"
          value={`${totals.conversion.toFixed(1)}%`}
          icon={Percent}
        />
      </div>

      {noData && (
        <Card className="shadow-sm">
          <CardContent className="p-4 md:p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <p className="text-sm md:text-base font-medium">Ready to get your first registrations?</p>
            <div className="flex flex-wrap gap-2">
              <Button asChild className="rounded-full">
                <a href="/organize/new"><Plus className="mr-2 h-4 w-4" />Create a Race</a>
              </Button>
              <TooltipProvider>
                <div className="flex gap-2">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="inline-flex">
                        <Button variant="outline" className="rounded-full" disabled>
                          <Share2 className="mr-2 h-4 w-4" />
                          Share Race Page
                        </Button>
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Create a race first to get a shareable page.</p>
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        className="rounded-full"
                        onClick={() =>
                          toast({
                            title: "Coming soon",
                            description: "Email tools to reach local athletes.",
                          })
                        }
                      >
                        <Megaphone className="mr-2 h-4 w-4" />
                        Send Email Blast to Potential Participants
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Coming soon: Email tools to reach local athletes.</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </TooltipProvider>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Mini charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Registrations over time</CardTitle>
          </CardHeader>
          <CardContent className="h-44">
            {series.length === 0 ? (
              <div className="h-full w-full flex items-center justify-center text-center text-sm text-muted-foreground">
                No data yet — create and share your race to see performance here.
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <ReLineChart data={series} margin={{ left: 8, right: 8, top: 10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="label" tickLine={false} axisLine={false} className="text-xs" />
                  <YAxis width={28} tickLine={false} axisLine={false} className="text-xs" />
                  <Line type="monotone" dataKey="registrations" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
                </ReLineChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Revenue over time</CardTitle>
          </CardHeader>
          <CardContent className="h-44">
            {series.length === 0 ? (
              <div className="h-full w-full flex items-center justify-center text-center text-sm text-muted-foreground">
                No data yet — create and share your race to see performance here.
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <ReBarChart data={series} margin={{ left: 8, right: 8, top: 10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="label" tickLine={false} axisLine={false} className="text-xs" />
                  <YAxis width={28} tickLine={false} axisLine={false} className="text-xs" />
                  <Bar dataKey="revenue" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </ReBarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Context cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="shadow-sm">
          <CardContent className="p-5 flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Top Performing Race</p>
              <p className="mt-1 font-medium">{topRace}</p>
            </div>
            <div className="rounded-md bg-muted p-2">
              <Trophy width={18} height={18} className="text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardContent className="p-5 flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Next Race Countdown</p>
              {nextRace ? (
                <div className="mt-1">
                  <p className="font-medium">{nextRace.title}</p>
                  <p className="text-sm text-muted-foreground">{nextRace.days} days left</p>
                </div>
              ) : (
                <p className="mt-1 font-medium">No upcoming races</p>
              )}
            </div>
            <div className="rounded-md bg-muted p-2">
              <CalendarClock width={18} height={18} className="text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
