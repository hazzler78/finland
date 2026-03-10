-- Migration: Add show_on_frontpage flag to suppliers

ALTER TABLE suppliers ADD COLUMN show_on_frontpage INTEGER NOT NULL DEFAULT 1;

