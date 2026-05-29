-- Migration: Add canonical numeric value columns for price/fee/savings.
--
-- The string columns (price, base_price, monthly_fee, savings) are kept for
-- display, but the API now treats these numeric columns as the source of truth
-- and regenerates the display strings from them on write.
--
-- If you get "duplicate column name" (partial apply from the dashboard), use
-- db/migrations/0004_repair_numeric_fields.sql instead — it skips savings_value
-- if that column was already added manually.

ALTER TABLE suppliers ADD COLUMN price_value REAL;ALTER TABLE suppliers ADD COLUMN monthly_fee_value REAL;
ALTER TABLE suppliers ADD COLUMN savings_value REAL;

-- Backfill from the existing Finnish-formatted strings.
-- Replacing the comma with a dot lets CAST parse the leading number and ignore
-- the trailing unit (e.g. "3,90 €/kk" -> 3.90, "250 €/vuosi" -> 250).
UPDATE suppliers SET
  price_value = CAST(REPLACE(price, ',', '.') AS REAL),
  monthly_fee_value = CAST(REPLACE(monthly_fee, ',', '.') AS REAL),
  savings_value = CAST(REPLACE(savings, ',', '.') AS REAL);
