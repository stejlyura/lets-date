'use client';

import React, { useState, useEffect } from 'react';
import { 
  Database, 
  Zap, 
  Coins, 
  Activity, 
  ExternalLink, 
  X, 
  Code, 
  CheckCircle2, 
  Clock,
  Layers,
  Sparkles
} from 'lucide-react';
import { 
  subscribeToIndxflowStats, 
  getIndxflowCurrentStats, 
  getIndxflowLogs 
} from '@/lib/indxflow';
import { IndxflowStats, IndxflowQueryLog } from '@/lib/types';

interface IndxflowWidgetProps {
  forceOpenModal?: boolean;
  onCloseModal?: () => void;
}

export default function IndxflowWidget({ forceOpenModal, onCloseModal }: IndxflowWidgetProps) {
  const [stats, setStats] = useState<IndxflowStats>(getIndxflowCurrentStats());
  const [logs, setLogs] = useState<IndxflowQueryLog[]>(getIndxflowLogs());
  const [isOpen, setIsOpen] = useState(false);
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    if (forceOpenModal !== undefined) {
      setIsOpen(forceOpenModal);
    }
  }, [forceOpenModal]);

  useEffect(() => {
    const unsubscribe = subscribeToIndxflowStats((newStats, newLog) => {
      setStats(newStats);
      setLogs((prev) => [newLog, ...prev.slice(0, 49)]);
      setPulse(true);
      setTimeout(() => setPulse(false), 800);
    });

    return () => unsubscribe();
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    onCloseModal?.();
  };

  return (
    <>
      {/* Floating Bottom Badge */}
      <aside
        aria-label="Indxflow Database Status"
        className="fixed bottom-4 right-4 z-30 flex items-center gap-2"
      >
        <button
          onClick={() => setIsOpen(true)}
          className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-2xl bg-zinc-950/90 backdrop-blur-xl border ${
            pulse ? 'border-rose-500 shadow-lg shadow-rose-500/30 scale-105' : 'border-zinc-800/90'
          } hover:border-zinc-700 text-zinc-200 text-xs font-semibold shadow-2xl transition-all duration-300 group`}
        >
          <div className="relative flex items-center justify-center">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping absolute" />
            <span className="w-2 h-2 rounded-full bg-emerald-500 relative" />
          </div>

          <Database className="w-4 h-4 text-rose-400 group-hover:rotate-12 transition-transform" />

          <span className="font-mono text-white hidden sm:inline">Indxflow DB</span>

          <span className="px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-rose-300 font-mono text-[11px]">
            {stats.latencyMs.toFixed(1)}ms
          </span>

          <span className="hidden md:inline-flex items-center gap-1 text-amber-300 font-mono text-[11px]">
            <Coins className="w-3.5 h-3.5" />
            <span>{stats.tokensRemaining.toLocaleString()} 🪙</span>
          </span>
        </button>
      </aside>

      {/* Interactive Indxflow Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-zinc-950 rounded-3xl border border-zinc-800 p-6 sm:p-8 shadow-2xl shadow-rose-500/10 max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-rose-500 to-pink-500 flex items-center justify-center shadow-lg shadow-rose-500/30">
                <Database className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
                  <span>Indxflow Serverless DBaaS</span>
                  <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Live Telemetry
                  </span>
                </h3>
                <p className="text-xs text-zinc-400">
                  Zero-Cold-Start HTTP SQL &amp; Zero-Dependency ORM for Next.js 15
                </p>
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-5">
              <div className="p-3.5 rounded-2xl bg-zinc-900/80 border border-zinc-800">
                <span className="text-zinc-400 text-[11px] block font-medium">Avg Latency</span>
                <span className="text-xl font-extrabold text-emerald-400 font-mono">
                  {stats.latencyMs}ms
                </span>
                <span className="text-[10px] text-zinc-400 block mt-0.5">Sub-5ms HTTP</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-zinc-900/80 border border-zinc-800">
                <span className="text-zinc-400 text-[11px] block font-medium">Tokens Left</span>
                <span className="text-xl font-extrabold text-amber-300 font-mono">
                  {stats.tokensRemaining.toLocaleString()}
                </span>
                <span className="text-[10px] text-zinc-400 block mt-0.5">$1 = 100k tokens</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-zinc-900/80 border border-zinc-800">
                <span className="text-zinc-400 text-[11px] block font-medium">Queries Executed</span>
                <span className="text-xl font-extrabold text-rose-400 font-mono">
                  {stats.queryCount}
                </span>
                <span className="text-[10px] text-zinc-400 block mt-0.5">Parameterized SQL</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-zinc-900/80 border border-zinc-800">
                <span className="text-zinc-400 text-[11px] block font-medium">Idle Cost</span>
                <span className="text-xl font-extrabold text-white font-mono">
                  $0.00
                </span>
                <span className="text-[10px] text-zinc-400 block mt-0.5">Scale-to-Zero</span>
              </div>
            </div>

            {/* Architecture Highlights */}
            <div className="space-y-3 my-5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                Why Indxflow DBaaS for this Dating App?
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-zinc-300">
                <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800/80 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-semibold">Zero TCP Pool Fatigue</strong>
                    <span>Next.js Edge &amp; Vercel execute SQL via stateless sub-millisecond HTTP calls.</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800/80 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-semibold">Zero-Dependency ORM</strong>
                    <span>No 30MB+ Prisma engine binaries. Pure TypeScript &lt;4KB gzipped.</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800/80 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-semibold">Strict Schema-Per-Tenant</strong>
                    <span>All 36 dating profiles and chats are isolated in dedicated PostgreSQL schemas.</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800/80 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-semibold">Scale-to-Zero Tokenomics</strong>
                    <span>Pay only when queries execute. $0/month in idle, with instant wakeup.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Live SQL Query Stream */}
            <div className="space-y-2 my-5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center justify-between">
                <span>Recent SQL Queries ({logs.length})</span>
                <span className="font-mono text-[10px] text-zinc-400">POST /v1/sql</span>
              </h4>

              <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-3 max-h-48 overflow-y-auto font-mono text-[11px] space-y-2">
                {logs.length === 0 ? (
                  <p className="text-zinc-400 text-center py-2">No queries logged yet</p>
                ) : (
                  logs.slice(0, 10).map((log) => (
                    <div
                      key={log.id}
                      className="p-2 rounded-xl bg-zinc-950 border border-zinc-800/80 flex flex-col gap-1"
                    >
                      <div className="flex items-center justify-between text-zinc-400">
                        <span className="text-emerald-400 font-semibold">{log.status}</span>
                        <span className="text-zinc-400">{log.latencyMs.toFixed(1)}ms</span>
                      </div>
                      <span className="text-rose-300 break-all">{log.query}</span>
                      {log.params && log.params.length > 0 && (
                        <span className="text-zinc-400 text-[10px]">
                          params: {JSON.stringify(log.params)}
                        </span>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* CTA Link */}
            <div className="pt-3 border-t border-zinc-800 flex items-center justify-between flex-wrap gap-3">
              <span className="text-xs text-zinc-400">
                Get 25,000 free starter tokens for your next app
              </span>

              <a
                href="https://indxflow.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-bold text-xs shadow-lg shadow-rose-600/30 transition-all hover:scale-105"
              >
                <span>Explore Indxflow DBaaS</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
