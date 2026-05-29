-- Cloudflare D1 Database Schema for Sähköpomo.fi
--
-- This file represents the FULL current schema (all migrations applied).
-- It is the source of truth for setting up a fresh database. The numbered
-- files in db/migrations/ document incremental changes (and seed data) and
-- should be applied in order to an existing database instead.

-- Electricity suppliers/deals table
CREATE TABLE IF NOT EXISTS suppliers (
  id TEXT PRIMARY KEY,
  supplier TEXT NOT NULL,
  price TEXT NOT NULL,
  base_price TEXT NOT NULL,
  monthly_fee TEXT NOT NULL,
  type TEXT NOT NULL,
  duration TEXT NOT NULL,
  renewable INTEGER NOT NULL DEFAULT 0,
  savings TEXT NOT NULL,
  rating REAL NOT NULL DEFAULT 4.0,
  affiliate_link TEXT NOT NULL,
  logo TEXT,
  show_on_frontpage INTEGER NOT NULL DEFAULT 1,
  -- Canonical numeric values; the string columns above are derived from these.
  price_value REAL,
  monthly_fee_value REAL,
  savings_value REAL,
  created_at INTEGER DEFAULT (unixepoch()),
  updated_at INTEGER DEFAULT (unixepoch())
);

-- Indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_supplier ON suppliers(supplier);
CREATE INDEX IF NOT EXISTS idx_type ON suppliers(type);
CREATE INDEX IF NOT EXISTS idx_renewable ON suppliers(renewable);
CREATE INDEX IF NOT EXISTS idx_rating ON suppliers(rating);

-- Contact form submissions
CREATE TABLE IF NOT EXISTS contacts (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at INTEGER DEFAULT (unixepoch()),
  read INTEGER DEFAULT 0,
  replied INTEGER DEFAULT 0
);

CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON contacts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contacts_read ON contacts(read);
CREATE INDEX IF NOT EXISTS idx_contacts_email ON contacts(email);
