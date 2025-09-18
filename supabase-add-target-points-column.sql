-- Migration: Add target_points column for Tech team story points tracking
-- Run this on existing Supabase databases to add the new column

ALTER TABLE weekly_entries 
ADD COLUMN target_points DECIMAL DEFAULT NULL;

-- Add comment for clarity
COMMENT ON COLUMN weekly_entries.target_points IS 'Target story points for Tech team members (weekly basis)';
