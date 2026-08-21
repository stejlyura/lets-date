-- ==============================================================================
-- Indxflow DBaaS PostgreSQL Schema for Let's Date (Tinder-Like Web App)
-- Schema Isolation: Schema-per-tenant (e.g. tenant_lets_date_v1)
-- Zero TCP connection pool fatigue via HTTP SQL API
-- ==============================================================================

-- 1. Profiles Table
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(64) NOT NULL,
    age INT NOT NULL CHECK (age >= 18),
    date_of_birth DATE NOT NULL,
    is_verified BOOLEAN DEFAULT TRUE,
    about TEXT NOT NULL,
    country VARCHAR(64) NOT NULL,
    city VARCHAR(64) NOT NULL,
    timezone VARCHAR(64) NOT NULL,
    photo_url TEXT NOT NULL,
    hobbies JSONB NOT NULL DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Swipes & Interaction History
CREATE TABLE IF NOT EXISTS swipes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id VARCHAR(64) NOT NULL,
    profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    action VARCHAR(16) NOT NULL CHECK (action IN ('like', 'dislike', 'later', 'superlike')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Mutual Matches Table
CREATE TABLE IF NOT EXISTS matches (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id VARCHAR(64) NOT NULL,
    profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    matched_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, profile_id)
);

-- 4. Messages & Conversation History
CREATE TABLE IF NOT EXISTS messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    sender VARCHAR(16) NOT NULL CHECK (sender IN ('user', 'match')),
    text TEXT NOT NULL,
    is_read BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for Sub-Millisecond Query Execution
CREATE INDEX IF NOT EXISTS idx_profiles_city ON profiles(city);
CREATE INDEX IF NOT EXISTS idx_swipes_user_profile ON swipes(user_id, profile_id);
CREATE INDEX IF NOT EXISTS idx_matches_user_id ON matches(user_id);
CREATE INDEX IF NOT EXISTS idx_messages_profile_id ON messages(profile_id, created_at DESC);
