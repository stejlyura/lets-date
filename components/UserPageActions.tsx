'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Heart, MessageCircle, Clock, Share2, Check } from 'lucide-react';
import { Profile } from '@/lib/types';
import { addMatchedProfile, saveForLater, saveSwipeRecord } from '@/lib/storage';
import MatchModal from '@/components/MatchModal';

interface UserPageActionsProps {
  profile: Profile;
}

export default function UserPageActions({ profile }: UserPageActionsProps) {
  const router = useRouter();
  const [showMatchModal, setShowMatchModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isLater, setIsLater] = useState(false);

  const handleLike = () => {
    saveSwipeRecord(profile.id, 'like');
    addMatchedProfile(profile.id);
    setShowMatchModal(true);
  };

  const handleLater = () => {
    saveForLater(profile.id);
    setIsLater(true);
  };

  const handleStartChat = () => {
    addMatchedProfile(profile.id);
    router.push(`/?chat=${profile.id}`);
  };

  const handleShare = async () => {
    if (typeof window !== 'undefined') {
      try {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy link:', err);
      }
    }
  };

  return (
    <>
      <div className="space-y-2.5">
        <button
          onClick={handleStartChat}
          className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-bold text-sm shadow-lg shadow-rose-600/30 flex items-center justify-center gap-2 transition-all hover:scale-102 active:scale-98"
        >
          <MessageCircle className="w-4 h-4" />
          <span>Send Message Directly</span>
        </button>

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={handleLike}
            className="py-3 px-4 rounded-2xl bg-zinc-900 hover:bg-zinc-800 border border-rose-500/30 hover:border-rose-500 text-rose-300 hover:text-white font-semibold text-xs transition-all flex items-center justify-center gap-2"
          >
            <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
            <span>Instant Match</span>
          </button>

          <button
            onClick={handleLater}
            className={`py-3 px-4 rounded-2xl border text-xs font-semibold transition-all flex items-center justify-center gap-2 ${
              isLater
                ? 'bg-amber-950/40 border-amber-500/50 text-amber-300'
                : 'bg-zinc-900 hover:bg-zinc-800 border-zinc-800 text-zinc-300 hover:text-white'
            }`}
          >
            <Clock className="w-4 h-4 text-amber-400" />
            <span>{isLater ? 'Saved to Later' : 'Decide Later'}</span>
          </button>
        </div>

        <button
          onClick={handleShare}
          className="w-full py-2.5 px-4 rounded-xl bg-zinc-950 hover:bg-zinc-900 border border-zinc-800 text-xs font-medium text-zinc-400 hover:text-zinc-200 transition-colors flex items-center justify-center gap-2"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400 font-semibold">Profile Link Copied!</span>
            </>
          ) : (
            <>
              <Share2 className="w-3.5 h-3.5" />
              <span>Share {profile.name}&apos;s Profile</span>
            </>
          )}
        </button>
      </div>

      {showMatchModal && (
        <MatchModal
          matchProfile={profile}
          onClose={() => setShowMatchModal(false)}
          onStartChat={handleStartChat}
        />
      )}
    </>
  );
}
