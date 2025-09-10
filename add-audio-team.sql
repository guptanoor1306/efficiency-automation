-- Add Audio Team to existing database
-- Run this script to add the Audio team to your existing Supabase database

INSERT INTO teams (id, name, members, work_types) VALUES 
('audio', 'Audio Team',
 '["Amardeep", "Amandeep", "Bhavya Menon", "Rahul", "Ashutosh", "Naveen"]',
 '{
   "reel": {"level": "L1", "name": "Reel", "perDay": 3},
   "short_videos_ads": {"level": "L1", "name": "Short Videos/Ads", "perDay": 2},
   "live_shoot_1hr": {"level": "L1", "name": "Live Shoot - 1 Hour", "perDay": 8},
   "dubbing_1hr": {"level": "L1", "name": "Dubbing - 1 Hour", "perDay": 6},
   "master_upload": {"level": "L1", "name": "Master Upload", "perDay": 3},
   "podcast_1hr_no_animation": {"level": "L2", "name": "Podcast (1 Hr) w/o Animation", "perDay": 1},
   "yt_long_form": {"level": "L3", "name": "YT Long Form", "perDay": 0.67},
   "video_8_10_mins_lf": {"level": "L3", "name": "Video (8-10 mins) LF", "perDay": 0.67}
 }')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  members = EXCLUDED.members,
  work_types = EXCLUDED.work_types;
