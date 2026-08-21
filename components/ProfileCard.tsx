'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Heart, 
  X, 
  Sparkles, 
  Clock, 
  MessageCircle, 
  Info, 
  MapPin, 
  ShieldCheck, 
  Compass, 
  Zap, 
  ChevronDown, 
  ChevronUp,
  Share2
} from 'lucide-react';
import { Profile } from '@/lib/types';
import HobbyBadge from './HobbyBadge';

interface ProfileCardProps {
  profile: Profile;
  onLike: (profile: Profile) => void;
  onDislike: (profile: Profile) => void;
  onLater: (profile: Profile) => void;
  onMessage: (profile: Profile) => void;
  isDetailed?: boolean;
}

export default function ProfileCard({
  profile,
  onLike,
  onDislike,
  onLater,
  onMessage,
  isDetailed = false,
}: ProfileCardProps) {
  const [showFullBio, setShowFullBio] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="relative w-full max-w-md mx-auto rounded-3xl overflow-hidden bg-zinc-900/90 border border-zinc-800/90 shadow-2xl transition-all duration-300 hover:border-zinc-700/80 group">
      {/* Top Media Container */}
      <div className="relative w-full h-[480px] sm:h-[520px] overflow-hidden bg-zinc-950">
        <Image
          src={profile.photoUrl}
          alt={`${profile.name} - Profile on Let's Date`}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 450px"
          className={`object-cover object-center transition-transform duration-700 group-hover:scale-105 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
        />

        {!imageLoaded && (
          <div className="absolute inset-0 bg-zinc-800 animate-pulse flex items-center justify-center">
            <Sparkles className="w-8 h-8 text-zinc-600 animate-spin" />
          </div>
        )}

        {/* Top Badges Overlay */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-600/90 backdrop-blur-md text-white border border-rose-400/30 shadow-lg animate-bounce">
              <Heart className="w-3.5 h-3.5 fill-white" />
              <span>She Liked You!</span>
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-zinc-900/80 backdrop-blur-md text-zinc-200 border border-zinc-700/60 shadow">
              <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span>{profile.compatibilityScore ?? 95}% Match</span>
            </span>
            <Link
              href={`/user/${profile.id}`}
              className="p-2 rounded-full bg-zinc-900/80 hover:bg-zinc-800 backdrop-blur-md text-zinc-200 border border-zinc-700/60 transition-colors shadow"
              title="Open full dedicated profile page"
            >
              <Info className="w-4 h-4 text-white" />
            </Link>
          </div>
        </div>

        {/* Gradient Bottom Shading */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent pointer-events-none" />

        {/* Floating Profile Info inside the Image */}
        <div className="absolute bottom-4 left-4 right-4 z-10 text-white">
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="text-3xl font-extrabold tracking-tight drop-shadow-md flex items-center gap-2">
              {profile.name}
              <span className="text-2xl font-normal text-zinc-300">, {profile.age}</span>
            </h2>
            {profile.isVerified && (
              <span title="Verified Profile" className="text-sky-400 flex items-center">
                <ShieldCheck className="w-6 h-6 fill-sky-500/20 text-sky-400" />
              </span>
            )}
          </div>

          {/* Location & Occupation */}
          <div className="flex items-center gap-3 text-xs sm:text-sm text-zinc-300 mt-1 font-medium flex-wrap">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-rose-400" />
              {profile.city}, {profile.Country}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 text-zinc-300">
              <Compass className="w-3.5 h-3.5 text-indigo-400" />
              {profile.distanceKm ?? 4} km away
            </span>
            {profile.zodiacSign && (
              <>
                <span>•</span>
                <span className="text-amber-300 font-semibold">{profile.zodiacSign}</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Profile Details Card Body */}
      <div className="p-4 sm:p-5 space-y-4 bg-zinc-900/90">
        {/* Hobbies / Interests */}
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">Interests &amp; Hobbies</h3>
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {profile.hobbies.map((hobby, idx) => (
              <HobbyBadge key={idx} hobby={hobby} size="sm" />
            ))}
          </div>
        </div>

        {/* Bio */}
        <div className="rounded-2xl bg-zinc-950/60 p-3.5 border border-zinc-800/80">
          <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
            <span>About {profile.name}</span>
            <button
              onClick={() => setShowFullBio(!showFullBio)}
              className="text-rose-400 hover:text-rose-300 flex items-center gap-1 font-normal lowercase"
            >
              {showFullBio ? (
                <>
                  <span>collapse</span>
                  <ChevronUp className="w-3.5 h-3.5" />
                </>
              ) : (
                <>
                  <span>more</span>
                  <ChevronDown className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>
          <p className={`text-sm text-zinc-200 leading-relaxed ${showFullBio ? '' : 'line-clamp-2'}`}>
            &ldquo;{profile.about}&rdquo;
          </p>
        </div>

        {/* Action Controls Dock */}
        <div className="pt-2 flex items-center justify-center gap-3 sm:gap-4">
          {/* Dislike / Pass */}
          <button
            onClick={() => onDislike(profile)}
            title="Pass / Dislike (Swipe Left)"
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-zinc-950 border border-zinc-800 hover:border-red-500/60 text-zinc-400 hover:text-red-400 flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110 active:scale-95 group/btn"
          >
            <X className="w-6 h-6 group-hover/btn:rotate-90 transition-transform" />
          </button>

          {/* Decide Later */}
          <button
            onClick={() => onLater(profile)}
            title="Save for Later"
            className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-zinc-950 border border-zinc-800 hover:border-amber-500/60 text-zinc-400 hover:text-amber-400 flex items-center justify-center shadow-md transition-all duration-200 hover:scale-110 active:scale-95"
          >
            <Clock className="w-5 h-5" />
          </button>

          {/* Message Directly */}
          <button
            onClick={() => onMessage(profile)}
            title="Send Direct Message"
            className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-zinc-950 border border-zinc-800 hover:border-violet-500/60 text-zinc-400 hover:text-violet-400 flex items-center justify-center shadow-md transition-all duration-200 hover:scale-110 active:scale-95"
          >
            <MessageCircle className="w-5 h-5" />
          </button>

          {/* Like / Match */}
          <button
            onClick={() => onLike(profile)}
            title="Like & Match (Swipe Right)"
            className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-rose-600 via-pink-600 to-amber-500 text-white flex items-center justify-center shadow-xl shadow-rose-600/30 border border-rose-400/40 transition-all duration-200 hover:scale-115 active:scale-95 animate-pulse-subtle"
          >
            <Heart className="w-7 h-7 sm:w-8 sm:h-8 fill-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
