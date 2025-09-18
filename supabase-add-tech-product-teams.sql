-- Add Tech and Product teams to Supabase schema
-- This adds both teams with their story points work types

INSERT INTO teams (id, name, members, work_types) VALUES 

-- Tech Team (story points based - 3 points per working day)
('tech', 'Tech Team',
 '["Supriya", "Tilak", "Rishi", "Sahil", "Chandan", "Harshita"]',
 '{
   "story_points": {"level": "SP", "name": "Story Points", "perDay": 3}
 }'),

-- Product Team (story points based - 1 point per working day)
('product', 'Product Team',
 '["Akshay", "Ankush", "Noor"]',
 '{
   "story_points": {"level": "SP", "name": "Story Points", "perDay": 1}
 }')

ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  members = EXCLUDED.members,
  work_types = EXCLUDED.work_types;

-- Comments:
-- Tech Team: 6 members, target 3 story points per working day
-- Product Team: 3 members, target 1 story point per working day
-- Both teams use "SP" level instead of traditional L1/L2/L3 levels
-- Story points tracking: Complete Story Points ÷ Expected Story Points × 100 = Efficiency
-- Expected calculation: (Working Days - Leave Days) × perDay target
