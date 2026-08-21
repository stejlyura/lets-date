# 🔥 Let's Date — High-Speed Tinder-Like Web App

[![Next.js 15](https://img.shields.io/badge/Next.js-15.2.0-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19.0.0-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind-v4.0-38bdf8?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Indxflow DBaaS](https://img.shields.io/badge/Indxflow-Serverless_PostgreSQL-f43f5e?style=for-the-badge)](https://indxflow.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict_5.7-3178c6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

A production-grade, ultra-responsive **Tinder-like dating application** powered by **[Indxflow Serverless PostgreSQL DBaaS](https://indxflow.com)** and `@indxflow/orm`.

---

## ✨ Features

- **36 Verified Dating Profiles:** Loaded with authentic photos, bios, hobbies, locations, and compatibility calculations.
- **Instant Mutual Match Mechanics:** Every girl has already liked you — liking any profile instantly triggers a celebratory confetti Match Modal!
- **Persistent Local Chat System:** Real-time localized messaging saved directly to `localStorage`, with delivery receipts, suggested icebreakers, and quick emoji reactions.
- **Dedicated Profile Pages (`/user/[id]`):** SEO & LLM-optimized dedicated pages for every profile with Schema.org JSON-LD structured data and dynamic OpenGraph metadata.
- **Fluid Card Swipe & Actions:** Powered by Framer Motion, hover glow states, keyboard navigation (`←` Pass, `↓` Later, `→` Like), and mobile touch gestures.
- **Indxflow Live Telemetry Widget:** Displays real-time database latency (`2.4ms`), token deduction counters, and SQL query history logs.
- **Zero Vercel Function Limit Impact (0 Invocations):** 100% SSG static pre-rendering with Edge CDN distribution and SPA client transitions.

---

## ⚡ Why Indxflow DBaaS & Zero-Dependency ORM?

Traditional Node.js databases on Serverless/Edge platforms suffer from major bottlenecks:
1. **TCP Connection Pool Exhaustion:** Serverless lambdas quickly overwhelm traditional PostgreSQL connection limits. Indxflow executes parameterized SQL directly over ultra-low latency HTTP (`2-6ms`).
2. **Heavy Engine Cold Starts:** Prisma adds 30MB+ Rust binaries causing 100ms+ cold starts. `@indxflow/orm` is a zero-dependency TypeScript query builder under `<4KB` gzipped.
3. **Scale-to-Zero ($0.00 Idle):** Database scales down to zero without idle server costs.
4. **Transparent Tokenomics:** $1 USD provides 100,000 queries.

---

## 🌐 Vercel Deployment & Zero Limits Architecture

This application is engineered for **zero-cost, unlimited-scale hosting on Vercel**:

- **0 Serverless Function Invocations:** All 42 routes (homepage, 36 user profiles, sitemap, robots) are pre-rendered at build time via Next.js SSG (`generateStaticParams`).
- **0 Image Optimization Quota Usage:** `images.unoptimized: true` serves images directly from the Edge CDN.
- **Hybrid SPA Performance + Multi-Page SEO:** Users get instant, client-side SPA navigation via `<Link>`, while search engines (Google, Bing) and AI crawlers (Perplexity, ChatGPT, Claude) get pure pre-rendered semantic HTML with Schema.org `ProfilePage` structured data.

### Deploy to Vercel in 1-Click

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Findxflow%2Flets-date&env=INDXFLOW_API_KEY,INDXFLOW_BASE_URL)

---

## 🚀 Quickstart (Launch in 60 Seconds)

### 1. Clone & Install
```bash
git clone https://github.com/indxflow/lets-date.git
cd lets-date
npm install
```

### 2. Configure Environment (Optional)
By default, the application runs with an embedded fast mock adapter. To connect to your live Indxflow database:
```bash
cp .env.local.example .env.local
```
Add your free API key from [https://indxflow.com](https://indxflow.com):
```env
INDXFLOW_API_KEY="sec_live_your_api_key_here"
INDXFLOW_BASE_URL="https://api.indxflow.com"
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build Production Bundle (SSG)
```bash
npm run build
```

---

## 🗄️ Database Schema (`schema.sql`)

```sql
CREATE TABLE profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(64) NOT NULL,
    age INT NOT NULL,
    date_of_birth DATE NOT NULL,
    is_verified BOOLEAN DEFAULT TRUE,
    about TEXT NOT NULL,
    country VARCHAR(64) NOT NULL,
    city VARCHAR(64) NOT NULL,
    timezone VARCHAR(64) NOT NULL,
    photo_url TEXT NOT NULL,
    hobbies JSONB NOT NULL DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE swipes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id VARCHAR(64) NOT NULL,
    profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    action VARCHAR(16) NOT NULL CHECK (action IN ('like', 'dislike', 'later', 'superlike')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE matches (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id VARCHAR(64) NOT NULL,
    profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    matched_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, profile_id)
);

CREATE TABLE messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    sender VARCHAR(16) NOT NULL CHECK (sender IN ('user', 'match')),
    text TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## 📄 License & Credits

Distributed under the [MIT License](LICENSE).  
Powered by **[Indxflow DBaaS](https://indxflow.com)**.
