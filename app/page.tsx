'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Flame, 
  MessageCircle, 
  Clock, 
  Heart, 
  Trash2, 
  ArrowRight, 
  Info, 
  ShieldCheck, 
  Sparkles,
  MapPin,
  Compass
} from 'lucide-react';
import { PROFILES, getProfileById } from '@/lib/data';
import { Profile } from '@/lib/types';
import { 
  getMatchedProfileIds, 
  getSavedForLaterIds, 
  removeSavedForLater, 
  addMatchedProfile,
  DISPATCH_EVENT_NAME 
} from '@/lib/storage';
import Navbar from '@/components/Navbar';
import SwipeDeck from '@/components/SwipeDeck';
import MatchModal from '@/components/MatchModal';
import ChatSidebar from '@/components/ChatSidebar';
import ChatWindow from '@/components/ChatWindow';
import IndxflowWidget from '@/components/IndxflowWidget';
import SeoFooter from '@/components/SeoFooter';
import HobbyBadge from '@/components/HobbyBadge';

function MainAppContent() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<'discover' | 'matches' | 'later'>('discover');
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const [matchModalProfile, setMatchModalProfile] = useState<Profile | null>(null);
  const [matchedIds, setMatchedIds] = useState<string[]>([]);
  const [laterIds, setLaterIds] = useState<string[]>([]);
  const [isIndxflowModalOpen, setIsIndxflowModalOpen] = useState(false);

  // Sync state with storage
  useEffect(() => {
    setMatchedIds(getMatchedProfileIds());
    setLaterIds(getSavedForLaterIds());

    const handleStorageUpdate = () => {
      setMatchedIds(getMatchedProfileIds());
      setLaterIds(getSavedForLaterIds());
    };

    window.addEventListener(DISPATCH_EVENT_NAME, handleStorageUpdate);
    return () => window.removeEventListener(DISPATCH_EVENT_NAME, handleStorageUpdate);
  }, []);

  // Handle URL query param ?chat={id}
  useEffect(() => {
    const chatId = searchParams.get('chat');
    if (chatId) {
      const profile = getProfileById(chatId);
      if (profile) {
        setSelectedProfile(profile);
        setActiveTab('matches');
      }
    }
  }, [searchParams]);

  const handleOpenMatchModal = (profile: Profile) => {
    setMatchModalProfile(profile);
  };

  const handleStartChatFromModal = (profile: Profile) => {
    setMatchModalProfile(null);
    setSelectedProfile(profile);
    setActiveTab('matches');
  };

  const handleOpenChat = (profile: Profile) => {
    setSelectedProfile(profile);
    setActiveTab('matches');
  };

  const handleMoveLaterToChat = (profile: Profile) => {
    removeSavedForLater(profile.id);
    addMatchedProfile(profile.id);
    setSelectedProfile(profile);
    setActiveTab('matches');
  };

  const savedLaterProfiles = PROFILES.filter((p) => laterIds.includes(p.id));

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col justify-between selection:bg-rose-500 selection:text-white">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        matchesCount={matchedIds.length}
        laterCount={laterIds.length}
        onOpenIndxflowModal={() => setIsIndxflowModalOpen(true)}
      />

      {/* Main Tab Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Tab 1: Discovery Swipe Deck */}
        {activeTab === 'discover' && (
          <div className="py-4 animate-in fade-in duration-300">
            {/* Header Hero Title */}
            <div className="text-center mb-6 max-w-lg mx-auto">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-500/10 border border-rose-500/30 text-rose-400 mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>36 Girls Already Liked You!</span>
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Find Your Perfect Connection
              </h1>
              <p className="text-xs sm:text-sm text-zinc-400 mt-1">
                Swipe right to trigger an instant match or send a direct message.
              </p>
            </div>

            <SwipeDeck
              profiles={PROFILES}
              onOpenMatchModal={handleOpenMatchModal}
              onOpenChat={handleOpenChat}
            />
          </div>
        )}

        {/* Tab 2: Matches & Chat Window */}
        {activeTab === 'matches' && (
          <div className="h-[750px] max-h-[82vh] rounded-3xl overflow-hidden border border-zinc-800 bg-zinc-950 flex flex-col md:flex-row shadow-2xl animate-in fade-in duration-300">
            {/* Sidebar list (hidden on mobile when chat is open) */}
            <div className={`h-full ${selectedProfile ? 'hidden md:flex' : 'flex'} w-full md:w-auto`}>
              <ChatSidebar
                profiles={PROFILES}
                selectedProfileId={selectedProfile?.id || null}
                onSelectProfile={(p) => setSelectedProfile(p)}
              />
            </div>

            {/* Main Chat Conversation */}
            <div className={`h-full flex-1 ${!selectedProfile ? 'hidden md:flex' : 'flex'}`}>
              <ChatWindow
                profile={selectedProfile}
                onBackToList={() => setSelectedProfile(null)}
              />
            </div>
          </div>
        )}

        {/* Tab 3: Saved For Later */}
        {activeTab === 'later' && (
          <div className="py-4 animate-in fade-in duration-300">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-extrabold text-white flex items-center gap-2">
                  <Clock className="w-6 h-6 text-amber-400" />
                  <span>Saved for Later ({savedLaterProfiles.length})</span>
                </h2>
                <p className="text-xs sm:text-sm text-zinc-400 mt-0.5">
                  Profiles you saved to review when you have more time.
                </p>
              </div>
            </div>

            {savedLaterProfiles.length === 0 ? (
              <div className="p-12 text-center rounded-3xl bg-zinc-900/60 border border-zinc-800 max-w-md mx-auto">
                <Clock className="w-12 h-12 text-zinc-400 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-white mb-1">No Saved Profiles Yet</h3>
                <p className="text-xs text-zinc-400 mb-6">
                  While browsing the discovery deck, click the &ldquo;Decide Later&rdquo; button to save profiles here.
                </p>
                <button
                  onClick={() => setActiveTab('discover')}
                  className="px-6 py-2.5 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-lg transition-transform hover:scale-105"
                >
                  Start Discovering
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedLaterProfiles.map((profile) => (
                  <div
                    key={profile.id}
                    className="rounded-3xl bg-zinc-900 border border-zinc-800 overflow-hidden shadow-xl hover:border-zinc-700 transition-all flex flex-col justify-between"
                  >
                    <div className="relative aspect-[4/3] w-full bg-zinc-950">
                      <Image
                        src={profile.photoUrl}
                        alt={profile.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 350px"
                        className="object-cover"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="px-2.5 py-0.5 rounded-full bg-rose-600/90 text-white text-[11px] font-bold shadow">
                          She Liked You!
                        </span>
                      </div>
                      <div className="absolute bottom-3 right-3">
                        <Link
                          href={`/user/${profile.id}`}
                          className="p-1.5 rounded-full bg-zinc-900/80 hover:bg-zinc-800 text-white border border-zinc-700 shadow"
                          title="View Profile"
                        >
                          <Info className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>

                    <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between">
                          <h3 className="font-extrabold text-lg text-white flex items-center gap-1.5">
                            {profile.name}, {profile.age}
                            {profile.isVerified && <ShieldCheck className="w-4 h-4 text-sky-400" />}
                          </h3>
                          <span className="text-xs text-rose-400 font-semibold">{profile.city}</span>
                        </div>
                        <p className="text-xs text-zinc-400 mt-1 line-clamp-2">{profile.about}</p>
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {profile.hobbies.slice(0, 2).map((h, i) => (
                          <HobbyBadge key={i} hobby={h} size="sm" />
                        ))}
                      </div>

                      <div className="pt-3 border-t border-zinc-800/80 flex items-center gap-2">
                        <button
                          onClick={() => handleMoveLaterToChat(profile)}
                          className="flex-1 py-2 px-3 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-bold text-xs shadow flex items-center justify-center gap-1.5 transition-transform hover:scale-102"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>Chat Now</span>
                        </button>
                        <button
                          onClick={() => removeSavedForLater(profile.id)}
                          title="Remove from saved"
                          className="p-2 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-zinc-400 hover:text-red-400 border border-zinc-800 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Match Celebration Modal */}
      <MatchModal
        matchProfile={matchModalProfile}
        onClose={() => setMatchModalProfile(null)}
        onStartChat={handleStartChatFromModal}
      />

      {/* Indxflow Live Telemetry Widget & Modal */}
      <IndxflowWidget
        forceOpenModal={isIndxflowModalOpen}
        onCloseModal={() => setIsIndxflowModalOpen(false)}
      />

      {/* SEO & Technical Footer */}
      <SeoFooter />
    </div>
  );
}

export default function HomePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center">Loading Let&apos;s Date...</div>}>
      <MainAppContent />
    </Suspense>
  );
}
