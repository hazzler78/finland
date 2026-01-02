-- Cloudflare D1 Database Schema for Sähköpomo.fi

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
  created_at INTEGER DEFAULT (unixepoch()),
  updated_at INTEGER DEFAULT (unixepoch())
);

-- Indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_supplier ON suppliers(supplier);
CREATE INDEX IF NOT EXISTS idx_type ON suppliers(type);
CREATE INDEX IF NOT EXISTS idx_renewable ON suppliers(renewable);
CREATE INDEX IF NOT EXISTS idx_rating ON suppliers(rating);
