'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import confetti from 'canvas-confetti';
import { Heart, MessageCircle, ArrowRight, Sparkles, X } from 'lucide-react';
import { Profile } from '@/lib/types';

interface MatchModalProps {
  matchProfile: Profile | null;
  onClose: () => void;
  onStartChat: (profile: Profile) => void;
}

export default function MatchModal({
  matchProfile,
  onClose,
  onStartChat,
}: MatchModalProps) {
  useEffect(() => {
    if (matchProfile) {
      // Fire festive multi-colored confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#f43f5e', '#ec4899', '#8b5cf6', '#fbbf24', '#ffffff'],
        });

        const timer = setTimeout(() => {
          confetti({
            particleCount: 50,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: ['#f43f5e', '#fbbf24'],
          });
          confetti({
            particleCount: 50,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: ['#ec4899', '#8b5cf6'],
          });
        }, 250);

        return () => clearTimeout(timer);
      } catch (err) {
        console.error('Confetti error:', err);
      }
    }
  }, [matchProfile]);

  if (!matchProfile) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-300">
      <div className="relative w-full max-w-md bg-zinc-950 rounded-3xl border border-rose-500/30 p-6 sm:p-8 text-center shadow-2xl shadow-rose-500/20 overflow-hidden">
        {/* Glow Background Gradient */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-64 h-64 bg-rose-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-zinc-900/80 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Match Header */}
        <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-bold uppercase tracking-wider mb-4">
          <Sparkles className="w-4 h-4" />
          <span>Mutual Connection</span>
        </div>

        <h2 className="text-4xl sm:text-5xl font-black italic tracking-tight bg-gradient-to-r from-rose-400 via-pink-400 to-amber-300 bg-clip-text text-transparent mb-2">
          It&apos;s a Match!
        </h2>
        <p className="text-zinc-300 text-sm mb-6">
          You and <span className="font-semibold text-white">{matchProfile.name}</span> liked each other.
        </p>

        {/* Match Avatars */}
        <div className="flex items-center justify-center gap-4 sm:gap-6 my-6">
          {/* User Avatar */}
          <div className="relative">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-rose-500/60 overflow-hidden bg-zinc-900 shadow-xl shadow-rose-500/30">
              <Image
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"
                alt="You"
                width={112}
                height={112}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-2 -right-1 w-8 h-8 rounded-full bg-zinc-900 border-2 border-rose-500 flex items-center justify-center text-xs font-bold text-white">
              You
            </div>
          </div>

          {/* Heart Center Badge */}
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-rose-500 to-pink-500 flex items-center justify-center shadow-lg shadow-rose-500/50 animate-bounce">
            <Heart className="w-6 h-6 fill-white text-white" />
          </div>

          {/* Girl Avatar */}
          <div className="relative">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-pink-500 overflow-hidden bg-zinc-900 shadow-xl shadow-pink-500/30">
              <Image
                src={matchProfile.photoUrl}
                alt={matchProfile.name}
                width={112}
                height={112}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-2 -left-1 px-2 py-0.5 rounded-full bg-pink-600 text-[10px] font-bold text-white shadow">
              {matchProfile.age} yo
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 mt-8">
          <button
            onClick={() => onStartChat(matchProfile)}
            className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-bold text-base shadow-lg shadow-rose-600/30 flex items-center justify-center gap-2 transition-all duration-200 hover:scale-102 active:scale-98"
          >
            <MessageCircle className="w-5 h-5" />
            <span>Send a Message to {matchProfile.name}</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>

          <button
            onClick={onClose}
            className="w-full py-3 px-6 rounded-2xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 font-semibold text-sm transition-colors border border-zinc-800"
          >
            Keep Swiping
          </button>
        </div>
      </div>
    </div>
  );
}
