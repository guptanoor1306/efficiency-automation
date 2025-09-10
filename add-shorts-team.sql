-- Add Shorts Team to existing database
-- Run this script to add the Shorts team to your existing Supabase database

INSERT INTO teams (id, name, members, work_types) VALUES 
('shorts', 'Shorts Team',
 '["Divyanshu Mishra", "Abhishek Sharma", "Dheeraj Rajvania", "Aayush Srivastava", "Manoj Kumar"]',
 '{
   "ost": {"level": "L1", "name": "OST", "perDay": 20},
   "screen_capture": {"level": "L1", "name": "Screen Capture", "perDay": 2},
   "hand_animation": {"level": "L1", "name": "Hand Animation", "perDay": 6},
   "first_cut_storyboard": {"level": "L2", "name": "1st Cut + Storyboard", "perDay": 1},
   "script_discussion": {"level": "L2", "name": "Script Discussion + Moodboard", "perDay": 3},
   "thumbnail_ideation": {"level": "L2", "name": "Thumbnail Ideation", "perDay": 4},
   "script_review": {"level": "L2", "name": "Script Review", "perDay": 3},
   "shoot_data_copy": {"level": "L2", "name": "Shoot + Data copy", "perDay": 3},
   "fss_animation": {"level": "L3", "name": "FSS Animation", "perDay": 7},
   "character_animation": {"level": "L3", "name": "Character Animation", "perDay": 1},
   "vo_animation": {"level": "L3", "name": "VO Animation", "perDay": 1},
   "intro": {"level": "L3", "name": "Intro", "perDay": 0.15},
   "shot_division": {"level": "L3", "name": "Shot Division", "perDay": 0.67}
 }')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  members = EXCLUDED.members,
  work_types = EXCLUDED.work_types;
