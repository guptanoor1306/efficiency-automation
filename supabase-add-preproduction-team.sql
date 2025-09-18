-- Migration: Add Pre-production Team to Supabase
-- Run this on existing Supabase databases to add the new team

INSERT INTO teams (id, name, members, work_types) VALUES 
('preproduction', 'Pre-production Team',
 '["Vandit", "Bhavya Oberoi", "Abid", "Mudit", "Nikhil"]',
 '{
   "yt_shorts_full": {"level": "L1", "name": "YT Shorts (Script+Pre-Planning+VD+Shoot)", "perDay": 2},
   "yt_lf_moodboard": {"level": "L1", "name": "YT LF Visual Moodboard", "perDay": 2},
   "yt_lf_direction_script": {"level": "L2", "name": "YT LF Visual Direction + Script", "perDay": 1},
   "yt_lf_preplanning": {"level": "L1", "name": "YT LF Pre-planning", "perDay": 2},
   "yt_lf_shoots": {"level": "L1", "name": "YT LF Shoots (PS)", "perDay": 2},
   "yt_lf_big_moodboard": {"level": "L3", "name": "YT LF Big Visual Moodboard", "perDay": 0.5},
   "yt_lf_big_direction": {"level": "L3", "name": "YT LF Big Visual Direction + Script", "perDay": 0.5},
   "yt_lf_big_preplanning": {"level": "L3", "name": "YT LF Big Pre-planning (Location/Recce)", "perDay": 0.5},
   "yt_lf_big_shoots": {"level": "L2", "name": "YT LF Big Pre-Planning + Shoots (PS)", "perDay": 1},
   "reels_phone": {"level": "L1", "name": "Reels (Phone)", "perDay": 2},
   "production_outdoor": {"level": "L3", "name": "Production Outdoor", "perDay": 0.66},
   "production_indoor": {"level": "L2", "name": "Production Indoor", "perDay": 1},
   "no_ps_indoor": {"level": "L2", "name": "No PS Shoots Indoor", "perDay": 1},
   "no_ps_outdoor": {"level": "L3", "name": "No PS Shoots Outdoor", "perDay": 0.5},
   "intro_editing": {"level": "L1", "name": "Intro/Sequence Editing/Overview", "perDay": 2},
   "storyboard": {"level": "L2", "name": "Storyboard", "perDay": 1}
 }')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  members = EXCLUDED.members,
  work_types = EXCLUDED.work_types;
