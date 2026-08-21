'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, RotateCcw, Heart, Flame, MessageCircle, SlidersHorizontal, Check } from 'lucide-react';
import { Profile } from '@/lib/types';
import ProfileCard from './ProfileCard';
import { saveSwipeRecord, addMatchedProfile } from '@/lib/storage';
import { indxflow } from '@/lib/indxflow';

interface SwipeDeckProps {
  profiles: Profile[];
  onOpenMatchModal: (profile: Profile) => void;
  onOpenChat: (profile: Profile) => void;
}

export default function SwipeDeck({
  profiles,
  onOpenMatchModal,
  onOpenChat,
}: SwipeDeckProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedCount, setLikedCount] = useState(0);
  const [dislikedCount, setDislikedCount] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | 'up' | null>(null);

  const currentProfile = profiles[currentIndex];

  const handleLike = useCallback(
    async (profile: Profile) => {
      setSwipeDirection('right');
      saveSwipeRecord(profile.id, 'like');
      addMatchedProfile(profile.id);
      setLikedCount((prev) => prev + 1);

      // Record in Indxflow SQL mock engine
      await indxflow.query(
        'INSERT INTO swipes (user_id, profile_id, action) VALUES ($1, $2, $3)',
        ['usr_current_user', profile.id, 'like']
      );

      setTimeout(() => {
        onOpenMatchModal(profile);
        setCurrentIndex((prev) => prev + 1);
        setSwipeDirection(null);
      }, 250);
    },
    [onOpenMatchModal]
  );

  const handleDislike = useCallback(async (profile: Profile) => {
    setSwipeDirection('left');
    saveSwipeRecord(profile.id, 'dislike');
    setDislikedCount((prev) => prev + 1);

    await indxflow.query(
      'INSERT INTO swipes (user_id, profile_id, action) VALUES ($1, $2, $3)',
      ['usr_current_user', profile.id, 'dislike']
    );

    setTimeout(() => {
      setCurrentIndex((prev) => prev + 1);
      setSwipeDirection(null);
    }, 250);
  }, []);

  const handleLater = useCallback(async (profile: Profile) => {
    saveSwipeRecord(profile.id, 'later');
    await indxflow.query(
      'INSERT INTO swipes (user_id, profile_id, action) VALUES ($1, $2, $3)',
      ['usr_current_user', profile.id, 'later']
    );
    setCurrentIndex((prev) => prev + 1);
  }, []);

  const handleMessage = useCallback(
    (profile: Profile) => {
      addMatchedProfile(profile.id);
      onOpenChat(profile);
    },
    [onOpenChat]
  );

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!currentProfile) return;
      if (e.key === 'ArrowRight' || e.key === 'l' || e.key === 'L') {
        handleLike(currentProfile);
      } else if (e.key === 'ArrowLeft' || e.key === 'h' || e.key === 'H') {
        handleDislike(currentProfile);
      } else if (e.key === 'ArrowDown' || e.key === 'j' || e.key === 'J') {
        handleLater(currentProfile);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentProfile, handleLike, handleDislike, handleLater]);

  const handleRestartDeck = () => {
    setCurrentIndex(0);
    setLikedCount(0);
    setDislikedCount(0);
  };

  if (!currentProfile || currentIndex >= profiles.length) {
    return (
      <div className="w-full max-w-md mx-auto min-h-[500px] flex flex-col items-center justify-center p-8 rounded-3xl bg-zinc-900/80 border border-zinc-800 text-center shadow-2xl">
        <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-rose-500 to-pink-500 flex items-center justify-center mb-6 shadow-xl shadow-rose-500/20 animate-pulse">
          <Sparkles className="w-10 h-10 text-white" />
        </div>
        <h3 className="text-2xl font-extrabold text-white mb-2">You&apos;ve Explored All Profiles!</h3>
        <p className="text-zinc-400 text-sm mb-6 max-w-xs">
          You reviewed all 36 verified profiles. Head over to your matches to continue the conversation!
        </p>

        <div className="grid grid-cols-2 gap-3 w-full mb-6">
          <div className="p-4 rounded-2xl bg-zinc-950/80 border border-zinc-800">
            <span className="text-2xl font-black text-rose-400">{likedCount}</span>
            <p className="text-xs text-zinc-400 font-medium mt-1">Likes &amp; Matches</p>
          </div>
          <div className="p-4 rounded-2xl bg-zinc-950/80 border border-zinc-800">
            <span className="text-2xl font-black text-zinc-300">{dislikedCount}</span>
            <p className="text-xs text-zinc-400 font-medium mt-1">Passed</p>
          </div>
        </div>

        <button
          onClick={handleRestartDeck}
          className="flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-bold text-sm shadow-lg shadow-rose-600/30 transition-all hover:scale-102"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Shuffle &amp; Start Over</span>
        </button>
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-md mx-auto flex flex-col items-center">
      {/* Keyboard Shortcuts Hint Pill */}
      <div className="w-full flex items-center justify-between px-2 mb-3 text-xs text-zinc-300">
        <span className="flex items-center gap-1.5">
          <Flame className="w-3.5 h-3.5 text-rose-400" />
          <span>Profile {currentIndex + 1} of {profiles.length}</span>
        </span>
        <span className="hidden sm:inline-flex items-center gap-1.5 font-mono text-[11px] text-zinc-300">
          <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 border border-zinc-700 text-zinc-200">←</kbd> Pass
          <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 border border-zinc-700 text-zinc-200">↓</kbd> Later
          <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 border border-zinc-700 text-zinc-200">→</kbd> Like
        </span>
      </div>

      {/* Main Animated Deck Container */}
      <div className="relative w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentProfile.id}
            initial={{ scale: 0.95, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{
              x: swipeDirection === 'right' ? 300 : swipeDirection === 'left' ? -300 : 0,
              opacity: 0,
              scale: 0.9,
              transition: { duration: 0.25 },
            }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className="w-full"
          >
            <ProfileCard
              profile={currentProfile}
              onLike={handleLike}
              onDislike={handleDislike}
              onLater={handleLater}
              onMessage={handleMessage}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
