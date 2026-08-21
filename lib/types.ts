export interface Hobby {
  typeId: string;
  name: string;
  iconClass: string;
  lucideIcon?: string;
}

export interface Profile {
  id: string;
  name: string;
  age: number;
  dateOfBirth: string;
  isVerified: boolean;
  hobbies: Hobby[];
  about: string;
  Country: string;
  city: string;
  timezone: string;
  photoUrl: string;
  zodiacSign?: string;
  occupation?: string;
  distanceKm?: number;
  compatibilityScore?: number;
  instagramHandle?: string;
  likedYou?: boolean;
}

export interface Message {
  id: string;
  profileId: string;
  sender: 'user' | 'match';
  text: string;
  timestamp: string;
  isRead?: boolean;
}

export interface MatchState {
  profileId: string;
  matchedAt: string;
  lastMessage?: string;
  lastMessageTime?: string;
}

export type SwipeDirection = 'left' | 'right' | 'up' | 'down' | 'later';

export interface IndxflowQueryLog {
  id: string;
  query: string;
  params?: unknown[];
  latencyMs: number;
  tokensUsed: number;
  tokensRemaining: number;
  timestamp: string;
  status: '200 OK' | '402 Payment Required' | '429 Rate Limited';
}

export interface IndxflowStats {
  tokensRemaining: number;
  latencyMs: number;
  queryCount: number;
  totalTokensBurned: number;
  activeTenant: string;
}
