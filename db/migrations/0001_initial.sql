-- Initial migration: Create suppliers table

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

CREATE INDEX IF NOT EXISTS idx_supplier ON suppliers(supplier);
CREATE INDEX IF NOT EXISTS idx_type ON suppliers(type);
CREATE INDEX IF NOT EXISTS idx_renewable ON suppliers(renewable);
CREATE INDEX IF NOT EXISTS idx_rating ON suppliers(rating);

-- Insert initial data
INSERT INTO suppliers (id, supplier, price, base_price, monthly_fee, type, duration, renewable, savings, rating, affiliate_link) VALUES
('1', 'Hehku Energia', '6,99', '6,99 snt/kWh', '3,90 €/kk', 'Kiinteä', '12 kk', 1, '250 €/vuosi', 4.8, '#'),
('2', 'Väre Energia', '7,15', '7,15 snt/kWh', '4,20 €/kk', 'Kiinteä', '24 kk', 1, '220 €/vuosi', 4.7, '#'),
('3', 'Fortum', '7,45', '7,45 snt/kWh', '3,50 €/kk', 'Kiinteä', '12 kk', 0, '200 €/vuosi', 4.5, '#'),
('4', 'Helen', '7,29', '7,29 snt/kWh', '4,00 €/kk', 'Kiinteä', '24 kk', 1, '210 €/vuosi', 4.6, '#'),
('5', 'Oomi', '6,89', '6,89 snt/kWh', '3,90 €/kk', 'Kiinteä', '12 kk', 1, '260 €/vuosi', 4.9, '#'),
('6', 'Caruna Energia', '7,35', '7,35 snt/kWh', '4,50 €/kk', 'Kiinteä', '12 kk', 0, '190 €/vuosi', 4.4, '#'),
('7', 'Lumo Energia', '7,05', '7,05 snt/kWh', '3,80 €/kk', 'Pörssisähkö', 'Ei sitoumusta', 1, '230 €/vuosi', 4.6, '#'),
('8', 'Kotimaan Energia', '7,19', '7,19 snt/kWh', '4,00 €/kk', 'Kiinteä', '24 kk', 1, '215 €/vuosi', 4.5, '#'),
('9', 'Tibber', '6,95', '6,95 snt/kWh', '3,90 €/kk', 'Pörssisähkö', 'Ei sitoumusta', 1, '245 €/vuosi', 4.7, '#'),
('10', 'E.ON', '7,39', '7,39 snt/kWh', '4,20 €/kk', 'Kiinteä', '12 kk', 0, '185 €/vuosi', 4.3, '#');
