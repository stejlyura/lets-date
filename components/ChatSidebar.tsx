'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Search, Heart, ShieldCheck, Sparkles, MessageCircle, Flame, Filter } from 'lucide-react';
import { Profile } from '@/lib/types';
import { getMatchedProfileIds, getMessagesForProfile, DISPATCH_EVENT_NAME } from '@/lib/storage';

interface ChatSidebarProps {
  profiles: Profile[];
  selectedProfileId: string | null;
  onSelectProfile: (profile: Profile) => void;
}

export default function ChatSidebar({
  profiles,
  selectedProfileId,
  onSelectProfile,
}: ChatSidebarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSubTab, setActiveSubTab] = useState<'matches' | 'all'>('matches');
  const [matchedIds, setMatchedIds] = useState<string[]>([]);
  const [updateTick, setUpdateTick] = useState(0);

  useEffect(() => {
    setMatchedIds(getMatchedProfileIds());

    const handleStorageUpdate = () => {
      setMatchedIds(getMatchedProfileIds());
      setUpdateTick((prev) => prev + 1);
    };

    window.addEventListener(DISPATCH_EVENT_NAME, handleStorageUpdate);
    return () => window.removeEventListener(DISPATCH_EVENT_NAME, handleStorageUpdate);
  }, []);

  const matchedProfiles = profiles.filter((p) => matchedIds.includes(p.id));
  const listToDisplay = activeSubTab === 'matches' ? matchedProfiles : profiles;

  const filtered = listToDisplay.filter((p) => {
    const q = searchQuery.toLowerCase();
    return p.name.toLowerCase().includes(q) || p.city.toLowerCase().includes(q) || p.Country.toLowerCase().includes(q);
  });

  return (
    <aside className="w-full md:w-80 lg:w-96 flex flex-col h-full bg-zinc-950 border-r border-zinc-800/80">
      {/* Top Header & Search */}
      <div className="p-4 border-b border-zinc-800/80 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-rose-500" />
            <span>Messages &amp; Matches</span>
          </h2>
          <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
            {matchedProfiles.length} active
          </span>
        </div>

        {/* Sub-tabs */}
        <div className="grid grid-cols-2 gap-1 p-1 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-semibold">
          <button
            onClick={() => setActiveSubTab('matches')}
            className={`py-1.5 rounded-lg transition-all ${
              activeSubTab === 'matches'
                ? 'bg-rose-600 text-white shadow'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            My Matches ({matchedProfiles.length})
          </button>
          <button
            onClick={() => setActiveSubTab('all')}
            className={`py-1.5 rounded-lg transition-all ${
              activeSubTab === 'all'
                ? 'bg-rose-600 text-white shadow'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            All Girls ({profiles.length})
          </button>
        </div>

        {/* Search bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, city or country..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-zinc-900 border border-zinc-800 rounded-xl text-white placeholder-zinc-400 focus:outline-none focus:border-rose-500 transition-colors"
          />
        </div>
      </div>

      {/* Matches Horizontal Ribbon (Top Stories style) */}
      {matchedProfiles.length > 0 && activeSubTab === 'matches' && (
        <div className="px-4 py-3 border-b border-zinc-800/80 bg-zinc-900/30">
          <p className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-2.5 flex items-center gap-1">
            <Flame className="w-3.5 h-3.5 text-rose-500" />
            <span>New Matches Waiting for You</span>
          </p>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
            {matchedProfiles.slice(0, 10).map((profile) => (
              <button
                key={profile.id}
                onClick={() => onSelectProfile(profile)}
                className="flex flex-col items-center gap-1 min-w-[56px] group focus:outline-none"
              >
                <div
                  className={`relative w-14 h-14 rounded-full p-0.5 ${
                    selectedProfileId === profile.id
                      ? 'bg-gradient-to-tr from-rose-500 to-amber-400 ring-2 ring-rose-500'
                      : 'bg-zinc-800 hover:bg-rose-500/50'
                  } transition-all`}
                >
                  <Image
                    src={profile.photoUrl}
                    alt={profile.name}
                    width={56}
                    height={56}
                    className="w-full h-full rounded-full object-cover"
                  />
                  <div className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-zinc-950" />
                </div>
                <span className="text-[11px] font-medium text-zinc-300 truncate max-w-[56px] group-hover:text-rose-400 transition-colors">
                  {profile.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Chat Thread List */}
      <div className="flex-1 overflow-y-auto divide-y divide-zinc-900/80">
        {filtered.length === 0 ? (
          <div className="p-8 text-center text-zinc-400">
            <Heart className="w-8 h-8 text-zinc-400 mx-auto mb-2" />
            <p className="text-sm font-medium">No matches found</p>
            <p className="text-xs text-zinc-400 mt-1">Try a different search query or discover more girls in the swipe deck.</p>
          </div>
        ) : (
          filtered.map((profile) => {
            const msgs = getMessagesForProfile(profile.id);
            const lastMsg = msgs[msgs.length - 1];
            const isSelected = selectedProfileId === profile.id;

            return (
              <button
                key={profile.id}
                onClick={() => onSelectProfile(profile)}
                className={`w-full p-3.5 flex items-center gap-3.5 transition-all text-left ${
                  isSelected
                    ? 'bg-rose-950/30 border-l-4 border-rose-500'
                    : 'hover:bg-zinc-900/60'
                }`}
              >
                {/* Avatar */}
                <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 border border-zinc-700/50">
                  <Image
                    src={profile.photoUrl}
                    alt={profile.name}
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-zinc-950" />
                </div>

                {/* Info & Last Message Snippet */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-sm text-white truncate">{profile.name}</span>
                      <span className="text-xs text-zinc-300 font-normal">{profile.age}</span>
                      {profile.isVerified && <ShieldCheck className="w-3.5 h-3.5 text-sky-400 shrink-0" />}
                    </div>
                    <span className="text-[10px] text-zinc-400 shrink-0">
                      {lastMsg ? new Date(lastMsg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Matched'}
                    </span>
                  </div>

                  <p className="text-xs text-zinc-400 truncate">
                    {lastMsg ? (
                      <span className="text-zinc-300">You: {lastMsg.text}</span>
                    ) : (
                      <span className="text-rose-400/90 font-medium">✨ She liked you! Say hi 👋</span>
                    )}
                  </p>
                </div>
              </button>
            );
          })
        )}
      </div>
    </aside>
  );
}
