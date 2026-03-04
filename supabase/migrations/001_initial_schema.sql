-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- USERS
-- Core user identity. Waiver_signed_at populated after signing.
-- ============================================================
CREATE TABLE users (
  id               UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  email            TEXT NOT NULL UNIQUE,
  name             TEXT NOT NULL,
  user_type        TEXT NOT NULL DEFAULT 'free'
                     CHECK (user_type IN ('free', 'program', 'admin')),
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  waiver_signed_at TIMESTAMPTZ,
  deleted_at       TIMESTAMPTZ
);

CREATE INDEX idx_users_email ON users(email);

-- ============================================================
-- EMAIL LEADS
-- Mailing list signups tagged by resource. Separate from users
-- — a lead may never become a paying user.
-- ============================================================
CREATE TABLE email_leads (
  id                UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  email             TEXT NOT NULL,
  name              TEXT NOT NULL,
  resource_id       TEXT,
  source            TEXT NOT NULL DEFAULT 'modal'
                      CHECK (source IN ('modal', 'signup_bar', 'footer')),
  kit_subscriber_id TEXT,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(email, resource_id)
);

CREATE INDEX idx_email_leads_email      ON email_leads(email);
CREATE INDEX idx_email_leads_resource_id ON email_leads(resource_id);

-- ============================================================
-- WAIVER SIGNATURES
-- Append-only audit log. Never UPDATE a row here.
-- Insert a new row if document version changes and re-signature is needed.
-- ============================================================
CREATE TABLE waiver_signatures (
  id               UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id          UUID REFERENCES users(id) ON DELETE CASCADE,
  email            TEXT NOT NULL,
  name             TEXT NOT NULL,
  signed_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  ip_address       INET,
  user_agent       TEXT,
  document_version TEXT NOT NULL DEFAULT 'v1.0',
  confirmations    JSONB NOT NULL DEFAULT '{}'::jsonb
);

CREATE INDEX idx_waiver_signatures_user_id ON waiver_signatures(user_id);
CREATE INDEX idx_waiver_signatures_email   ON waiver_signatures(email);

-- ============================================================
-- PROGRAMS
-- The 3 paid programs. Managed from Supabase dashboard.
-- ============================================================
CREATE TABLE programs (
  id            TEXT PRIMARY KEY,
  title         TEXT NOT NULL,
  description   TEXT NOT NULL,
  price_cents   INTEGER NOT NULL,
  price_display TEXT NOT NULL,
  stripe_link   TEXT,
  is_active     BOOLEAN NOT NULL DEFAULT true,
  sort_order    INTEGER NOT NULL DEFAULT 0,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

INSERT INTO programs (id, title, description, price_cents, price_display, sort_order) VALUES
  ('foundations',
   'Foundations: 6-Week Postpartum Recovery',
   'Return to strength safely with expert-guided progressions for your core and pelvic floor.',
   14700, '$147', 1),
  ('strong-mama',
   'Strong Mama: 12-Week Strength Training',
   'Build full-body strength with a program designed for real mom life—safe, effective, sustainable.',
   29700, '$297', 2),
  ('virtual-pt',
   '1:1 Virtual PT Sessions',
   'Personalized assessment and treatment plans for your specific needs.',
   17500, '$175/session', 3);

-- ============================================================
-- PROGRAM VIDEOS
-- Future video content delivery within programs.
-- ============================================================
CREATE TABLE program_videos (
  id            UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  program_id    TEXT NOT NULL REFERENCES programs(id) ON DELETE CASCADE,
  title         TEXT NOT NULL,
  description   TEXT,
  video_url     TEXT NOT NULL,
  thumbnail_url TEXT,
  duration_sec  INTEGER,
  sort_order    INTEGER NOT NULL DEFAULT 0,
  is_preview    BOOLEAN NOT NULL DEFAULT false,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_program_videos_program_id ON program_videos(program_id);

-- ============================================================
-- EXERCISES
-- Exercise library tied to programs.
-- sets/reps stored as TEXT to support ranges like "3-4" or "8-12".
-- ============================================================
CREATE TABLE exercises (
  id            UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  program_id    TEXT REFERENCES programs(id) ON DELETE SET NULL,
  title         TEXT NOT NULL,
  description   TEXT,
  video_url     TEXT,
  sets          TEXT,
  reps          TEXT,
  duration_sec  INTEGER,
  notes         TEXT,
  muscle_groups TEXT[],
  sort_order    INTEGER NOT NULL DEFAULT 0,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_exercises_program_id ON exercises(program_id);

-- ============================================================
-- HANDOUTS
-- PDFs and file resources (free or paid).
-- ============================================================
CREATE TABLE handouts (
  id            UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  program_id    TEXT REFERENCES programs(id) ON DELETE CASCADE,
  resource_id   TEXT,
  title         TEXT NOT NULL,
  description   TEXT,
  file_url      TEXT NOT NULL,
  file_size_kb  INTEGER,
  resource_type TEXT NOT NULL DEFAULT 'free'
                  CHECK (resource_type IN ('free', 'paid')),
  is_active     BOOLEAN NOT NULL DEFAULT true,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CHECK (program_id IS NOT NULL OR resource_id IS NOT NULL)
);

CREATE INDEX idx_handouts_program_id  ON handouts(program_id);
CREATE INDEX idx_handouts_resource_id ON handouts(resource_id);

-- ============================================================
-- USER PROGRAM ACCESS
-- Junction table: created after Stripe payment is confirmed.
-- ============================================================
CREATE TABLE user_program_access (
  id                UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id           UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  program_id        TEXT NOT NULL REFERENCES programs(id) ON DELETE CASCADE,
  granted_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  stripe_payment_id TEXT,
  UNIQUE(user_id, program_id)
);

CREATE INDEX idx_user_program_access_user_id ON user_program_access(user_id);

-- ============================================================
-- ROW LEVEL SECURITY
-- Default deny. Explicit policies for public reads.
-- All writes use service role key in Route Handlers.
-- ============================================================
ALTER TABLE users              ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_leads        ENABLE ROW LEVEL SECURITY;
ALTER TABLE waiver_signatures  ENABLE ROW LEVEL SECURITY;
ALTER TABLE programs           ENABLE ROW LEVEL SECURITY;
ALTER TABLE program_videos     ENABLE ROW LEVEL SECURITY;
ALTER TABLE exercises          ENABLE ROW LEVEL SECURITY;
ALTER TABLE handouts           ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_program_access ENABLE ROW LEVEL SECURITY;

-- Active programs are publicly readable (for /programs page)
CREATE POLICY "Active programs are public"
  ON programs FOR SELECT
  USING (is_active = true);

-- Preview videos are publicly readable
CREATE POLICY "Preview videos are public"
  ON program_videos FOR SELECT
  USING (is_preview = true);

-- Free handouts are publicly readable
CREATE POLICY "Free handouts are public"
  ON handouts FOR SELECT
  USING (resource_type = 'free' AND is_active = true);
