import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { 
  Heart, 
  MapPin, 
  ShieldCheck, 
  MessageCircle, 
  ArrowLeft, 
  Sparkles, 
  Calendar, 
  Globe, 
  Zap, 
  Share2, 
  Activity,
  Database,
  CheckCircle2,
  Clock,
  Compass
} from 'lucide-react';
import { PROFILES, getProfileById } from '@/lib/data';
import HobbyBadge from '@/components/HobbyBadge';
import UserPageActions from '@/components/UserPageActions';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return PROFILES.map((profile) => ({
    id: profile.id,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const profile = getProfileById(id);

  if (!profile) {
    return {
      title: 'Profile Not Found | Let\'s Date',
      description: 'The requested dating profile does not exist.',
    };
  }

  const title = `${profile.name}, ${profile.age} from ${profile.city} — Dating Profile | Let's Date & Indxflow`;
  const description = `Connect with ${profile.name} (${profile.age}) from ${profile.city}, ${profile.Country}. Interests: ${profile.hobbies.map((h) => h.name).join(', ')}. Powered by Indxflow Serverless PostgreSQL DBaaS.`;

  return {
    title,
    description,
    keywords: [
      profile.name,
      `dating ${profile.city}`,
      'tinder clone nextjs',
      'indxflow serverless dbaas',
      'indxflow orm',
      'serverless postgresql http api',
      'zero cold start database',
      ...profile.hobbies.map((h) => h.name.toLowerCase()),
    ],
    openGraph: {
      title,
      description,
      images: [
        {
          url: profile.photoUrl,
          width: 800,
          height: 1000,
          alt: `${profile.name}'s profile photo on Let's Date`,
        },
      ],
      type: 'profile',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [profile.photoUrl],
    },
  };
}

export default async function UserProfilePage({ params }: PageProps) {
  const { id } = await params;
  const profile = getProfileById(id);

  if (!profile) {
    notFound();
  }

  // JSON-LD Structured Data for rich Google and LLM indexing
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    mainEntity: {
      '@type': 'Person',
      name: profile.name,
      gender: 'Female',
      age: profile.age,
      birthDate: profile.dateOfBirth,
      address: {
        '@type': 'PostalAddress',
        addressLocality: profile.city,
        addressCountry: profile.Country,
      },
      description: profile.about,
      image: `https://lets-date-mu.vercel.app${profile.photoUrl}`,
      knowsAbout: profile.hobbies.map((h) => h.name),
    },
    provider: {
      '@type': 'SoftwareApplication',
      name: "Let's Date DBaaS Showcase",
      applicationCategory: 'DatingApplication',
      operatingSystem: 'Web, Next.js 15, Edge Runtime',
      softwareHelp: {
        '@type': 'CreativeWork',
        name: 'Indxflow Serverless PostgreSQL Documentation',
        url: 'https://indxflow.com',
      },
    },
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Top Breadcrumb Navigation */}
      <header className="sticky top-0 z-40 bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-800/80 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-300 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-rose-500" />
          <span>Back to Discovery Deck</span>
        </Link>

        <div className="flex items-center gap-2">
          <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-zinc-900 border border-zinc-800 text-zinc-400">
            <Database className="w-3.5 h-3.5 text-rose-400" />
            <span>Indxflow ID:</span>
            <code className="text-zinc-200 font-mono text-[11px]">{profile.id.slice(0, 8)}...</code>
          </span>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Left Column: Photo & Action Dock */}
          <div className="md:col-span-5 space-y-4">
            <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden bg-zinc-900 border border-zinc-800 shadow-2xl group">
              <Image
                src={profile.photoUrl}
                alt={`${profile.name}, ${profile.age}`}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 400px"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />

              <div className="absolute top-4 left-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-600/90 backdrop-blur-md text-white border border-rose-400/30 shadow-lg">
                  <Heart className="w-3.5 h-3.5 fill-white" />
                  <span>She Liked You!</span>
                </span>
              </div>

              <div className="absolute bottom-4 right-4">
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-zinc-900/90 backdrop-blur-md text-white border border-zinc-700/60 shadow">
                  <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <span>{profile.compatibilityScore}% Match</span>
                </span>
              </div>
            </div>

            {/* Interactive Client-side Action Buttons */}
            <UserPageActions profile={profile} />
          </div>

          {/* Right Column: Deep Profile Details & Indxflow Data Specs */}
          <div className="md:col-span-7 space-y-6">
            {/* Header Title */}
            <div>
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white flex items-center gap-2">
                  {profile.name}
                  <span className="font-normal text-zinc-400">, {profile.age}</span>
                </h1>
                {profile.isVerified && (
                  <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-bold">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Verified</span>
                  </span>
                )}
              </div>

              <div className="flex items-center gap-3 text-sm text-zinc-400 mt-2 flex-wrap">
                <span className="flex items-center gap-1.5 text-zinc-300">
                  <MapPin className="w-4 h-4 text-rose-500" />
                  {profile.city}, {profile.Country}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5 text-zinc-300">
                  <Compass className="w-4 h-4 text-indigo-400" />
                  {profile.distanceKm} km away
                </span>
                {profile.zodiacSign && (
                  <>
                    <span>•</span>
                    <span className="text-amber-300 font-semibold">{profile.zodiacSign}</span>
                  </>
                )}
              </div>
            </div>

            {/* About Section */}
            <div className="p-5 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-2">
              <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-400">About Me</h2>
              <p className="text-base text-zinc-200 leading-relaxed font-normal">
                &ldquo;{profile.about}&rdquo;
              </p>
            </div>

            {/* Hobbies & Passions with Lucide Icons */}
            <div className="p-5 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-3">
              <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-400">Interests &amp; Passions</h2>
              <div className="flex flex-wrap gap-2">
                {profile.hobbies.map((h, i) => (
                  <HobbyBadge key={i} hobby={h} size="md" />
                ))}
              </div>
            </div>

            {/* Profile Data Specifications */}
            <div className="p-5 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-3">
              <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-400">Profile Details</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-zinc-950/80 border border-zinc-800">
                  <span className="text-zinc-400 block mb-1">Occupation</span>
                  <span className="font-semibold text-white">{profile.occupation}</span>
                </div>
                <div className="p-3 rounded-xl bg-zinc-950/80 border border-zinc-800">
                  <span className="text-zinc-400 block mb-1">Birthday</span>
                  <span className="font-semibold text-white">{profile.dateOfBirth}</span>
                </div>
                <div className="p-3 rounded-xl bg-zinc-950/80 border border-zinc-800">
                  <span className="text-zinc-400 block mb-1">Timezone</span>
                  <span className="font-semibold text-white">{profile.timezone}</span>
                </div>
              </div>
            </div>

            {/* Compatibility Insights Card */}
            <div className="p-5 rounded-2xl bg-gradient-to-tr from-rose-950/40 via-zinc-900/80 to-zinc-900/80 border border-rose-500/20 space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-xs font-bold uppercase tracking-wider text-rose-300 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-rose-400" />
                  <span>AI Compatibility Matrix</span>
                </h2>
                <span className="text-sm font-black text-rose-400">{profile.compatibilityScore}% Match</span>
              </div>
              <div className="space-y-2">
                <div>
                  <div className="flex justify-between text-xs text-zinc-400 mb-1">
                    <span>Lifestyle &amp; Values</span>
                    <span className="text-zinc-200">96%</span>
                  </div>
                  <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full bg-rose-500 rounded-full" style={{ width: '96%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs text-zinc-400 mb-1">
                    <span>Mutual Interests</span>
                    <span className="text-zinc-200">94%</span>
                  </div>
                  <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full bg-pink-500 rounded-full" style={{ width: '94%' }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Indxflow Serverless PostgreSQL Telemetry Section */}
            <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800/80 font-mono text-xs text-zinc-400 space-y-1.5">
              <div className="flex items-center justify-between text-zinc-300 font-semibold">
                <span className="flex items-center gap-1 text-emerald-400">
                  <Database className="w-3.5 h-3.5" />
                  <span>Indxflow DBaaS Query Telemetry</span>
                </span>
                <span className="text-rose-400 font-bold">2.4ms HTTP SQL</span>
              </div>
              <p className="text-[11px] text-zinc-400">
                Record retrieved via <code className="text-zinc-200">@indxflow/orm</code>: 
                <span className="text-zinc-300"> db.from(&apos;profiles&apos;).where(&apos;id&apos;, &apos;=&apos;, &apos;{profile.id}&apos;)</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
