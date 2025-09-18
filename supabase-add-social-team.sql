-- SQL to add Social team to existing Supabase database
-- Run this script to add the Social team configuration
-- Note: Work types will be added when levels are defined

INSERT INTO teams (id, name, members, work_types) VALUES 
('social', 'Social Team',
 '["Khushi", "Siya", "Rohit", "Anish", "Swapnil", "Tanya", "Somya", "Satyam"]',
 '{}')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  members = EXCLUDED.members,
  work_types = EXCLUDED.work_types;

-- Verify the insert
SELECT id, name, members, work_types FROM teams WHERE id = 'social';

-- Note: 
-- - Social team has no quality ratings (efficiency only)
-- - Historical data available for July and August 2025
-- - Weekly input starts from September 2025 onwards
-- - Work types and levels to be added when provided by user
