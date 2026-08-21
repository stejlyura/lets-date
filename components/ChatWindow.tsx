'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/image';
import NextLink from 'next/link';
import Image from 'next/image';
import { 
  Send, 
  Heart, 
  MapPin, 
  ShieldCheck, 
  Info, 
  Sparkles, 
  Smile, 
  CheckCheck, 
  Compass, 
  Zap,
  ArrowLeft
} from 'lucide-react';
import { Profile, Message } from '@/lib/types';
import { getMessagesForProfile, sendUserMessage, DISPATCH_EVENT_NAME } from '@/lib/storage';
import { indxflow } from '@/lib/indxflow';
import HobbyBadge from './HobbyBadge';

interface ChatWindowProps {
  profile: Profile | null;
  onBackToList?: () => void;
}

export default function ChatWindow({ profile, onBackToList }: ChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!profile) return;
    setMessages(getMessagesForProfile(profile.id));

    const handleStorageUpdate = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail?.key === `messages_${profile.id}` || customEvent.detail?.key === 'all_reset') {
        setMessages(getMessagesForProfile(profile.id));
      }
    };

    window.addEventListener(DISPATCH_EVENT_NAME, handleStorageUpdate);
    return () => window.removeEventListener(DISPATCH_EVENT_NAME, handleStorageUpdate);
  }, [profile]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim() || !profile) return;

    setIsSending(true);
    setInputText('');

    // Save to local storage
    const msg = sendUserMessage(profile.id, text);
    setMessages((prev) => [...prev, msg]);

    // Log to Indxflow HTTP SQL engine
    await indxflow.query(
      'INSERT INTO messages (profile_id, sender, text, created_at) VALUES ($1, $2, $3, $4)',
      [profile.id, 'user', text, new Date().toISOString()]
    );

    setIsSending(false);
  };

  const icebreakers = profile
    ? [
        `Hey ${profile.name}! Loved your travel stories ✨`,
        `Coffee this weekend in ${profile.city}? ☕`,
        `Your hobby ${profile.hobbies[0]?.name || 'style'} caught my eye!`,
        `What's your secret spot in ${profile.city}? 🌇`,
      ]
    : [];

  const quickEmojis = ['💖', '✨', '☕', '🍷', '🌴', '🎉', '🔥'];

  if (!profile) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-zinc-950">
        <div className="w-20 h-20 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-4 text-rose-500">
          <Heart className="w-10 h-10 fill-rose-500/20" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">Select a Match to Start Chatting</h3>
        <p className="text-zinc-400 text-sm max-w-sm">
          Pick any girl from the matches list on the left to start sending messages. All messages are stored locally in your browser.
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full bg-zinc-950 overflow-hidden">
      {/* Chat Top Header */}
      <div className="p-3.5 sm:p-4 border-b border-zinc-800/80 bg-zinc-900/60 backdrop-blur-md flex items-center justify-between z-10 shrink-0">
        <div className="flex items-center gap-3">
          {onBackToList && (
            <button
              onClick={onBackToList}
              className="p-1.5 rounded-lg bg-zinc-800 md:hidden text-zinc-300 hover:text-white"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}

          <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-rose-500/50 shrink-0">
            <Image
              src={profile.photoUrl}
              alt={profile.name}
              width={44}
              height={44}
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="font-bold text-white text-base">{profile.name}</h3>
              <span className="text-xs text-zinc-300">, {profile.age}</span>
              {profile.isVerified && <ShieldCheck className="w-4 h-4 text-sky-400" />}
            </div>
            <div className="flex items-center gap-2 text-xs text-zinc-400">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Active 5m ago</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-rose-400" />
                {profile.city}
              </span>
            </div>
          </div>
        </div>

        {/* View full profile link */}
        <NextLink
          href={`/user/${profile.id}`}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold text-zinc-200 hover:text-white transition-colors"
        >
          <Info className="w-4 h-4 text-rose-400" />
          <span className="hidden sm:inline">View Profile</span>
        </NextLink>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
        {/* Match Header Hero in Chat */}
        <div className="my-4 p-5 rounded-3xl bg-zinc-900/60 border border-zinc-800/80 text-center max-w-lg mx-auto">
          <div className="relative w-20 h-20 mx-auto mb-3 rounded-full overflow-hidden border-2 border-rose-500 shadow-lg shadow-rose-500/20">
            <Image
              src={profile.photoUrl}
              alt={profile.name}
              width={80}
              height={80}
              className="w-full h-full object-cover"
            />
          </div>
          <h4 className="font-extrabold text-lg text-white">
            You matched with {profile.name}! 🎉
          </h4>
          <p className="text-xs text-zinc-400 mt-1 max-w-sm mx-auto">
            {profile.about}
          </p>

          <div className="flex flex-wrap justify-center gap-1.5 mt-3">
            {profile.hobbies.map((h, i) => (
              <HobbyBadge key={i} hobby={h} size="sm" />
            ))}
          </div>
        </div>

        {/* Icebreakers suggestions */}
        {messages.length === 0 && (
          <div className="space-y-2 max-w-md mx-auto mt-6">
            <p className="text-center text-xs font-semibold uppercase tracking-wider text-zinc-300">
              Suggested Icebreakers
            </p>
            <div className="grid grid-cols-1 gap-2">
              {icebreakers.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(prompt)}
                  className="p-3 text-left rounded-2xl bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800/90 text-xs sm:text-sm text-zinc-200 hover:text-rose-300 transition-all flex items-center justify-between group"
                >
                  <span>{prompt}</span>
                  <Send className="w-3.5 h-3.5 text-zinc-400 group-hover:text-rose-400 transition-colors shrink-0" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Render Sent Messages */}
        {messages.map((msg) => (
          <div key={msg.id} className="flex flex-col items-end">
            <div className="max-w-xs sm:max-w-md px-4 py-2.5 rounded-2xl rounded-tr-sm bg-gradient-to-r from-rose-600 to-pink-600 text-white text-sm shadow-md leading-relaxed break-words">
              {msg.text}
            </div>
            <div className="flex items-center gap-1 text-[10px] text-zinc-400 mt-1 pr-1">
              <span>{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              <CheckCheck className="w-3.5 h-3.5 text-sky-400" />
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Emojis Bar */}
      <div className="px-4 py-1.5 bg-zinc-950/80 border-t border-zinc-800/50 flex items-center gap-2 overflow-x-auto scrollbar-none">
        <span className="text-[11px] text-zinc-300 flex items-center gap-1 shrink-0">
          <Smile className="w-3.5 h-3.5 text-amber-400" />
          <span>Quick:</span>
        </span>
        {quickEmojis.map((emoji) => (
          <button
            key={emoji}
            onClick={() => setInputText((prev) => prev + emoji)}
            className="px-2 py-0.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-xs transition-colors"
          >
            {emoji}
          </button>
        ))}
      </div>

      {/* Bottom Message Input Area */}
      <div className="p-3 sm:p-4 bg-zinc-900/70 border-t border-zinc-800/80">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={`Type a message to ${profile.name}...`}
            className="flex-1 px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-2xl text-sm text-white placeholder-zinc-400 focus:outline-none focus:border-rose-500 transition-colors"
          />
          <button
            type="submit"
            disabled={!inputText.trim() || isSending}
            className="p-3 rounded-2xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 disabled:opacity-50 text-white shadow-lg shadow-rose-600/30 transition-all hover:scale-105 active:scale-95 shrink-0"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
}
