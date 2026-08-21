import React from 'react';
import { 
  Plane, 
  BookOpen, 
  Dumbbell, 
  PawPrint, 
  Utensils, 
  Music, 
  Palette, 
  Camera, 
  Gamepad2, 
  Sparkles,
  Heart
} from 'lucide-react';
import { Hobby } from '@/lib/types';

interface HobbyBadgeProps {
  hobby: Hobby | { name: string; typeId?: string };
  size?: 'sm' | 'md' | 'lg';
}

export function getHobbyIcon(name: string) {
  const normalized = name.toLowerCase();
  if (normalized.includes('travel')) return <Plane className="w-3.5 h-3.5 text-sky-400" />;
  if (normalized.includes('read') || normalized.includes('book')) return <BookOpen className="w-3.5 h-3.5 text-amber-400" />;
  if (normalized.includes('fit') || normalized.includes('sport')) return <Dumbbell className="w-3.5 h-3.5 text-emerald-400" />;
  if (normalized.includes('pet') || normalized.includes('dog') || normalized.includes('cat')) return <PawPrint className="w-3.5 h-3.5 text-orange-400" />;
  if (normalized.includes('cook') || normalized.includes('food')) return <Utensils className="w-3.5 h-3.5 text-rose-400" />;
  if (normalized.includes('music')) return <Music className="w-3.5 h-3.5 text-violet-400" />;
  if (normalized.includes('art') || normalized.includes('design')) return <Palette className="w-3.5 h-3.5 text-fuchsia-400" />;
  if (normalized.includes('yoga') || normalized.includes('meditation')) return <Sparkles className="w-3.5 h-3.5 text-teal-400" />;
  if (normalized.includes('photo')) return <Camera className="w-3.5 h-3.5 text-blue-400" />;
  if (normalized.includes('game') || normalized.includes('gaming')) return <Gamepad2 className="w-3.5 h-3.5 text-indigo-400" />;
  return <Heart className="w-3.5 h-3.5 text-pink-400" />;
}

export default function HobbyBadge({ hobby, size = 'md' }: HobbyBadgeProps) {
  const sizeClasses = {
    sm: 'text-xs px-2.5 py-1 gap-1.5',
    md: 'text-sm px-3 py-1.5 gap-2',
    lg: 'text-base px-4 py-2 gap-2.5',
  };

  return (
    <span
      className={`inline-flex items-center rounded-full bg-zinc-900/80 hover:bg-zinc-800/90 text-zinc-200 border border-zinc-700/60 shadow-sm transition-colors duration-200 ${sizeClasses[size]}`}
    >
      {getHobbyIcon(hobby.name)}
      <span className="font-medium">{hobby.name}</span>
    </span>
  );
}
