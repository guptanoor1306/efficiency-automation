-- Add Graphics, Tech, and Product teams to Supabase schema
-- This adds all three new teams with their respective work types

INSERT INTO teams (id, name, members, work_types) VALUES 

-- Graphics Team (traditional work types with L1/L2 levels)
('graphics', 'Graphics Team',
 '["Amit Joshi", "Rakhi Dhama", "Raj", "Abhishek Shukla", "Mayank", "Shreya Sureka", "Anubha", "Pranchal Chaudhary", "Piyush Vaid", "Vaibhav Singhal", "Ishika", "Aman"]',
 '{
   "graphics_l1": {"level": "L1", "name": "Graphics", "perDay": 5},
   "ppt_slides": {"level": "L1", "name": "PPT Slides", "perDay": 30},
   "research": {"level": "L1", "name": "Research", "perDay": 1},
   "graphics_l2": {"level": "L2", "name": "Graphics", "perDay": 2}
 }'),

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

-- Team Summary:
-- 
-- Graphics Team: 12 members
--   - Traditional work types with L1/L2 levels
--   - Graphics (L1: 5/day, L2: 2/day), PPT Slides (30/day), Research (1/day)
--   - Historical data: June-August 2025
--
-- Tech Team: 6 members  
--   - Story points system (3 points per working day)
--   - Uses "SP" level instead of L1/L2/L3
--   - Historical data: August 2025 only
--   - September 2025 onwards: Live tracking
--
-- Product Team: 3 members
--   - Story points system (1 point per working day)  
--   - Uses "SP" level instead of L1/L2/L3
--   - Historical data: August 2025 only
--   - September 2025 onwards: Live tracking
--
-- Story Points Calculation:
-- - Expected Story Points = (Working Days - Leave Days) × perDay target
-- - Efficiency = (Complete Story Points ÷ Expected Story Points) × 100
