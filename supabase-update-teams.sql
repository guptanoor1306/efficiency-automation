-- Update existing teams with correct work type configurations
-- Run this in Supabase SQL Editor

-- Update B2B Team work types
UPDATE teams 
SET work_types = '{
  "ost": {"level": "L1", "name": "OST", "perDay": 20},
  "screen_capture": {"level": "L1", "name": "Screen Capture", "perDay": 2},
  "first_cut": {"level": "L1", "name": "1st Cut", "perDay": 1},
  "hand_animation": {"level": "L2", "name": "Hand Animation", "perDay": 6},
  "scene_animation": {"level": "L3", "name": "Scene Animation", "perDay": 7},
  "character_animation": {"level": "L3", "name": "Character Animation", "perDay": 1},
  "full_animation": {"level": "L3", "name": "Full Animation", "perDay": 1},
  "intro": {"level": "L3", "name": "Intro", "perDay": 0.15}
}'::jsonb,
members = '["Deepak", "Anjali Rawat", "Swati Juyal", "Deepak Kumar"]'::jsonb
WHERE id = 'b2b';

-- Update Varsity Team work types  
UPDATE teams 
SET work_types = '{
  "ost": {"level": "L1", "name": "OST", "perDay": 20},
  "screen_capture": {"level": "L1", "name": "Screen Capture (5 min)", "perDay": 2},
  "hand_animation": {"level": "L1", "name": "Hand Animation", "perDay": 6},
  "first_cut": {"level": "L1", "name": "1st Cut", "perDay": 1},
  "fss_animation": {"level": "L2", "name": "FSS Animation", "perDay": 7},
  "character_animation": {"level": "L3", "name": "Character Animation", "perDay": 1},
  "vo_animation": {"level": "L3", "name": "VO Animation", "perDay": 1},
  "intro": {"level": "L3", "name": "Intro", "perDay": 0.15}
}'::jsonb,
members = '["Aalim", "Satyavrat Sharma", "Manish", "Apoorv Suman", "Anmol Anand"]'::jsonb
WHERE id = 'varsity';

-- Update Zero1 - Bratish Team work types
UPDATE teams 
SET work_types = '{
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
}'::jsonb,
members = '["Bratish", "Saiyam Verma", "Akriti Singh", "Manish Chauhan", "Mohd. Wasim"]'::jsonb
WHERE id = 'zero1';

-- Update Zero1 - Harish Team work types
UPDATE teams 
SET work_types = '{
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
}'::jsonb,
members = '["Harish Rawat", "Rishabh Bangwal", "Pratik Sharma", "Vikas Kumar"]'::jsonb
WHERE id = 'harish';

-- Verify the updates
SELECT id, name, members, jsonb_pretty(work_types) as work_types_formatted 
FROM teams 
ORDER BY id;
