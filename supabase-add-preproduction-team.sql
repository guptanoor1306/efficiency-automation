-- Migration: Add Pre-production Team to Supabase
-- Run this on existing Supabase databases to add the new team

INSERT INTO teams (id, name, members, work_types) VALUES 
('preproduction', 'Pre-production Team',
 '["Vandit", "Abid", "Mudit", "Nikhil"]',
 '{
   "script_preplanning_vd_shoot": {"level": "YT Shorts", "name": "Script Screenplay + Pre-Planning + VD + Shoot", "perDay": 2},
   "yt_normal_moodboard": {"level": "YT LF (Normal)", "name": "Visual Moodboard", "perDay": 2},
   "yt_normal_direction_script": {"level": "YT LF (Normal)", "name": "Visual Direction + Script Screenplay", "perDay": 1},
   "yt_normal_preplanning": {"level": "YT LF (Normal)", "name": "Pre-planning", "perDay": 2},
   "yt_normal_shoots": {"level": "YT LF (Normal)", "name": "Shoots (PS)", "perDay": 2},
   "yt_big_moodboard": {"level": "YT LF (Big)", "name": "Visual Moodboard", "perDay": 0.5},
   "yt_big_direction_script": {"level": "YT LF (Big)", "name": "Visual Direction + Script Screenplay", "perDay": 0.5},
   "yt_big_preplanning": {"level": "YT LF (Big)", "name": "Pre-planning (location scouting/recce/permissions, etc)", "perDay": 0.5},
   "yt_big_shoots": {"level": "YT LF (Big)", "name": "Pre Planning + Shoots (PS)", "perDay": 1},
   "reels_phone": {"level": "Reels Pre-planning + Shoots", "name": "Reels (Phone)", "perDay": 2},
   "production_outdoor": {"level": "Reels Pre-planning + Shoots", "name": "Production Outdoor", "perDay": 0.66},
   "production_indoor": {"level": "Reels Pre-planning + Shoots", "name": "Production Indoor", "perDay": 1},
   "no_ps_indoor": {"level": "No PS Shoots", "name": "Indoor", "perDay": 1},
   "no_ps_outdoor": {"level": "No PS Shoots", "name": "Outdoor", "perDay": 0.5},
   "intro_editing": {"level": "Post-Production", "name": "Intro/sequence Editing/overview", "perDay": 2},
   "storyboard": {"level": "Post-Production", "name": "Storyboard", "perDay": 1}
 }')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  members = EXCLUDED.members,
  work_types = EXCLUDED.work_types;
