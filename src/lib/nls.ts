import { EventProps } from '@/components/EventCard';

export type ParsedNLS = {
  types: string[];
  locationText?: string;
  date?: Date;
  priceCap?: number;
  tags: string[]; // terrain/features etc.
  extras: string[]; // bq, wheelchair, etc.
  nearMe?: boolean;
};

const TYPE_ALIASES: Record<string, string> = {
  '5k': '5K',
  '10k': '10K',
  'half marathon': 'Half Marathon',
  'half-marathon': 'Half Marathon',
  'marathon': 'Marathon',
  'triathlon': 'Triathlon',
  'trail': 'Trail Run',
  'trail run': 'Trail Run',
  'obstacle': 'Obstacle Course',
  'obstacle course': 'Obstacle Course',
  'cycling': 'Cycling',
};

const TERRAIN_TAGS = ['flat', 'hilly', 'trail', 'road', 'scenic', 'night', 'coastal', 'warm', 'cold'];
const EXTRA_TAGS: Record<string, string> = {
  'bq': 'boston qualifier',
  'boston qualifier': 'boston qualifier',
  'dogs': 'dogs allowed',
  'dogs allowed': 'dogs allowed',
  'wheelchair': 'wheelchair friendly',
  'wheelchair friendly': 'wheelchair friendly',
  'chip timed': 'chip timed',
  'chip-timed': 'chip timed',
};

const MONTHS = [
  'january','february','march','april','may','june',
  'july','august','september','october','november','december'
];

function monthIndex(word: string) {
  const idx = MONTHS.indexOf(word.toLowerCase());
  return idx >= 0 ? idx : -1;
}

export function parseNaturalQuery(query: string): ParsedNLS {
  const q = query.toLowerCase();
  const types: string[] = [];
  const tags: string[] = [];
  const extras: string[] = [];
  let locationText: string | undefined;
  let date: Date | undefined;
  let priceCap: number | undefined;
  let nearMe = false;

  // Race type/distance
  Object.keys(TYPE_ALIASES).forEach((key) => {
    if (q.includes(key)) types.push(TYPE_ALIASES[key]);
  });

  // Terrain/features
  TERRAIN_TAGS.forEach((t) => {
    if (q.includes(t)) tags.push(t);
  });

  // Extras
  Object.keys(EXTRA_TAGS).forEach((k) => {
    if (q.includes(k)) extras.push(EXTRA_TAGS[k]);
  });

  // Price cap
  const cheapMatch = q.match(/(?:under|less than|<=|≤|below)\s*\$?\s*(\d{1,4})/);
  if (cheapMatch) priceCap = Number(cheapMatch[1]);
  if (!priceCap && q.includes('cheap')) priceCap = 75;

  // Date parsing: month names (defaults to first day of month current/next year)
  const monthFound = MONTHS.find((m) => q.includes(m));
  if (monthFound) {
    const now = new Date();
    let year = now.getFullYear();
    const mIdx = monthIndex(monthFound);
    const monthHasPassed = mIdx < now.getMonth();
    if (monthHasPassed) year += 1;
    date = new Date(year, mIdx, 1);
  } else if (q.includes('next month')) {
    const now = new Date();
    const next = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    date = next;
  } else if (q.includes('this weekend')) {
    const now = new Date();
    const day = now.getDay();
    const diffToSat = (6 - day + 7) % 7; // Saturday
    const sat = new Date(now);
    sat.setDate(now.getDate() + diffToSat);
    date = sat;
  } else if (q.includes('next spring')) {
    const now = new Date();
    const year = now.getMonth() > 5 ? now.getFullYear() + 1 : now.getFullYear();
    date = new Date(year, 2, 1); // March
  }

  // Location: "near me" or after prepositions
  if (q.includes('near me')) nearMe = true;
  const locPrepositionMatch = q.match(/\b(?:in|near|around|at|in the|within)\s+([a-zA-Z\s\.,]+?)(?:\s*(?:in|on|at|under|next|this|near|within|$))/);
  if (locPrepositionMatch && locPrepositionMatch[1]) {
    locationText = locPrepositionMatch[1].trim().replace(/\s+$/,'');
  }

  return { types: Array.from(new Set(types)), locationText, date, priceCap, tags: Array.from(new Set(tags)), extras: Array.from(new Set(extras)), nearMe };
}

export function summarizeParsed(parsed: ParsedNLS): string {
  const parts: string[] = [];
  if (parsed.types.length) parts.push(parsed.types.join(' / '));
  if (parsed.locationText) parts.push(capitalize(parsed.locationText));
  if (parsed.date) parts.push(parsed.date.toLocaleString(undefined, { month: 'long' }));
  if (parsed.priceCap) parts.push(`≤ $${parsed.priceCap}`);
  if (parsed.tags.length) parts.push(parsed.tags.map(capitalize).join(', '));
  return parts.join(' • ');
}

function capitalize(s: string) {
  return s.replace(/\b\w/g, (c) => c.toUpperCase());
}

function eventToSearchText(e: EventProps): string {
  const bits: string[] = [e.title, e.type, e.location, e.elevation ?? '', e.terrain ?? '', e.runType ?? '', e.bikeType ?? '', (e.distances ?? []).join(' '), (e.equipment ?? []).join(' '), (e.requirements ?? []).join(' ')];
  return bits.join(' ').toLowerCase();
}

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(Boolean);
}

function buildFreq(tokens: string[]): Map<string, number> {
  const m = new Map<string, number>();
  tokens.forEach((t) => m.set(t, (m.get(t) ?? 0) + 1));
  return m;
}

function dot(a: Map<string, number>, b: Map<string, number>): number {
  let sum = 0;
  a.forEach((v, k) => {
    const bv = b.get(k) ?? 0;
    sum += v * bv;
  });
  return sum;
}

function norm(a: Map<string, number>): number {
  let s = 0;
  a.forEach((v) => (s += v * v));
  return Math.sqrt(s) || 1;
}

export function semanticRankEvents(events: EventProps[], query: string, parsed?: ParsedNLS): EventProps[] {
  const enrichedQueryParts = [query];
  if (parsed) {
    if (parsed.types.length) enrichedQueryParts.push(parsed.types.join(' '));
    if (parsed.tags.length) enrichedQueryParts.push(parsed.tags.join(' '));
    if (parsed.extras.length) enrichedQueryParts.push(parsed.extras.join(' '));
    if (parsed.locationText) enrichedQueryParts.push(parsed.locationText);
  }
  const enrichedQuery = enrichedQueryParts.join(' ').toLowerCase();
  const qTokens = tokenize(enrichedQuery);
  const qVec = buildFreq(qTokens);
  const qNorm = norm(qVec);

  const scored = events.map((e) => {
    const text = eventToSearchText(e);
    const eTokens = tokenize(text);
    const eVec = buildFreq(eTokens);
    const score = dot(qVec, eVec) / (qNorm * norm(eVec));

    // Lightweight boosts
    let boost = 0;
    if (parsed?.types?.length && parsed.types.includes(e.type)) boost += 0.15;
    if (parsed?.locationText && e.location.toLowerCase().includes(parsed.locationText.toLowerCase())) boost += 0.1;
    if (parsed?.tags?.length) parsed.tags.forEach((t) => { if (text.includes(t)) boost += 0.05; });

    return { e, s: score + boost };
  });

  return scored.sort((a, b) => b.s - a.s).map((x) => x.e);
}
