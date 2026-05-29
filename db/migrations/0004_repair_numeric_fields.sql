-- Repair migration: use when 0004 failed partway (e.g. duplicate column on savings_value).
-- Safe to run if price_value / monthly_fee_value are still missing.
-- If a column already exists, run that ALTER manually and skip it.

ALTER TABLE suppliers ADD COLUMN price_value REAL;
ALTER TABLE suppliers ADD COLUMN monthly_fee_value REAL;

UPDATE suppliers SET
  price_value = CAST(REPLACE(price, ',', '.') AS REAL),
  monthly_fee_value = CAST(REPLACE(monthly_fee, ',', '.') AS REAL),
  savings_value = CAST(REPLACE(savings, ',', '.') AS REAL);
