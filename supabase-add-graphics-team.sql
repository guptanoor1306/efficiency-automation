-- Add Graphics team to Supabase schema
-- This adds the Graphics team with all members and work types

INSERT INTO teams (id, name, members, work_types) VALUES 
-- Graphics Team (uses this.graphicsWorkTypes)
('graphics', 'Graphics Team',
 '["Amit Joshi", "Rakhi Dhama", "Raj", "Abhishek Shukla", "Mayank", "Shreya Sureka", "Anubha", "Pranchal Chaudhary", "Piyush Vaid", "Vaibhav Singhal", "Ishika", "Aman"]',
 '{
   "graphics_l1": {"level": "L1", "name": "Graphics", "perDay": 5},
   "ppt_slides": {"level": "L1", "name": "PPT Slides", "perDay": 30},
   "research": {"level": "L1", "name": "Research", "perDay": 1},
   "graphics_l2": {"level": "L2", "name": "Graphics", "perDay": 2}
 }')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  members = EXCLUDED.members,
  work_types = EXCLUDED.work_types;
