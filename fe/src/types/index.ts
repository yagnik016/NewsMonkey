export interface News {
  _id: string;
  title: string;
  summary: string;
  category?: { name: string };
  publishedAt?: string;
  createdAt?: string;
  images?: string[];
  isBreaking?: boolean;
  source?: string;
  externalUrl?: string;
}

export interface BlogEntry {
  timestamp?: string;
  content: string;
  image?: string;
  author?: string;
}

export interface Blog {
  _id: string;
  title: string;
  description: string;
  eventSlug?: string;
  createdAt?: string;
  entries?: BlogEntry[];
}

export interface Score {
  _id: string;
  sport: string;
  status: string;
  teams: string[];
  score: Record<string, string | number>;
  currentInning?: string;
  lastUpdate?: string;
  events?: Array<{ over?: number; timestamp?: string; desc: string }>;
}

export interface User {
  _id: string;
  email: string;
  name: string;
  interests: string[];
  token?: string;
  isSubscriber?: boolean;
} 