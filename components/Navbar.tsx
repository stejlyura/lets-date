'use client';

import React from 'react';
import Link from 'next/link';
import { Flame, Heart, MessageCircle, Clock, Sparkles, Database, RotateCcw } from 'lucide-react';
import { resetAllStorage } from '@/lib/storage';

interface NavbarProps {
  activeTab: 'discover' | 'matches' | 'later';
  setActiveTab: (tab: 'discover' | 'matches' | 'later') => void;
  matchesCount: number;
  laterCount: number;
  onOpenIndxflowModal?: () => void;
}

export default function Navbar({
  activeTab,
  setActiveTab,
  matchesCount,
  laterCount,
  onOpenIndxflowModal,
}: NavbarProps) {
  const handleReset = () => {
    if (confirm('Reset all swipe history and chat messages?')) {
      resetAllStorage();
      window.location.reload();
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-rose-500 via-pink-500 to-amber-400 p-0.5 shadow-lg shadow-rose-500/25 group-hover:scale-105 transition-transform duration-300">
            <div className="w-full h-full bg-zinc-950 rounded-[14px] flex items-center justify-center">
              <Flame className="w-5 h-5 text-rose-500 group-hover:text-rose-400 transition-colors" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-white via-zinc-200 to-rose-300 bg-clip-text text-transparent">
              Let&apos;s Date
            </span>
            <span className="text-[10px] text-zinc-400 -mt-1 font-medium tracking-wider uppercase">
              Powered by <span className="text-rose-400 font-semibold">Indxflow DB</span>
            </span>
          </div>
        </Link>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1.5 sm:gap-2 bg-zinc-900/90 p-1 rounded-full border border-zinc-800 shadow-inner">
          <button
            onClick={() => setActiveTab('discover')}
            className={`flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 ${
              activeTab === 'discover'
                ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-md shadow-rose-600/30 scale-100'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
            }`}
          >
            <Flame className="w-4 h-4 text-amber-300" />
            <span>Discover</span>
          </button>

          <button
            onClick={() => setActiveTab('matches')}
            className={`flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 relative ${
              activeTab === 'matches'
                ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-md shadow-rose-600/30'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
            }`}
          >
            <MessageCircle className="w-4 h-4 text-pink-300" />
            <span className="hidden xs:inline">Matches &amp; Chat</span>
            <span className="xs:hidden">Chat</span>
            {matchesCount > 0 && (
              <span className="px-1.5 py-0.2 text-[10px] font-bold rounded-full bg-rose-500 text-white border border-rose-300/30 animate-pulse">
                {matchesCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('later')}
            className={`flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 ${
              activeTab === 'later'
                ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-md shadow-rose-600/30'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
            }`}
          >
            <Clock className="w-4 h-4 text-amber-400" />
            <span className="hidden sm:inline">Later</span>
            {laterCount > 0 && (
              <span className="px-1.5 py-0.2 text-[10px] font-bold rounded-full bg-amber-500/80 text-white">
                {laterCount}
              </span>
            )}
          </button>
        </nav>

        {/* Right Action Tools */}
        <div className="flex items-center gap-2">
          {onOpenIndxflowModal && (
            <button
              onClick={onOpenIndxflowModal}
              title="Indxflow DBaaS Architecture & Live SQL Monitor"
              className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-900/90 border border-zinc-700/80 hover:border-rose-500/50 text-zinc-300 hover:text-white text-xs font-medium transition-all shadow-sm group"
            >
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <Database className="w-3.5 h-3.5 text-rose-400 group-hover:rotate-12 transition-transform" />
              <span className="hidden lg:inline font-mono">Indxflow DB</span>
              <span className="px-1.5 py-0.5 text-[10px] font-bold rounded bg-rose-950/80 text-rose-300 border border-rose-800/50">
                2.4ms
              </span>
            </button>
          )}

          <button
            onClick={handleReset}
            title="Reset All Swipes & Messages"
            className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-rose-400 border border-zinc-800 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
