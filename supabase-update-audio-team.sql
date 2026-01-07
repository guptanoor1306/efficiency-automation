-- Update Audio team work types in Supabase
-- This updates the Audio team's work_types to match the new configuration

UPDATE teams 
SET work_types = '{
  "reel": {"level": "L1", "name": "Reel", "perDay": 5},
  "short_videos_ads": {"level": "L1", "name": "Short Videos/Ads", "perDay": 3},
  "live_shoot_1hr": {"level": "L1", "name": "Live Shoot - 1 Hour", "perDay": 8},
  "podcast_1hr_no_animation": {"level": "L2", "name": "Podcast (1 Hr) w/o Animation", "perDay": 2},
  "yt_long_form": {"level": "L3", "name": "YT Long Form", "perDay": 0.67},
  "video_8_10_mins_lf": {"level": "L3", "name": "Video (8-10 mins) LF", "perDay": 0.67},
  "vd": {"level": "L3", "name": "VD", "perDay": 0.67},
  "storyboarding": {"level": "L3", "name": "Storyboarding", "perDay": 8},
  "editing": {"level": "L3", "name": "Editing", "perDay": 8}
}'::jsonb
WHERE id = 'audio';

-- Verify the update
SELECT id, name, 
       jsonb_object_keys(work_types) as work_type_keys
FROM teams WHERE id = 'audio';

-- Show all work types with their perDay values
SELECT id, name,
       key as work_type,
       value->>'name' as work_type_name,
       value->>'level' as level,
       (value->>'perDay')::numeric as per_day
FROM teams, jsonb_each(work_types)
WHERE id = 'audio'
ORDER BY level, work_type;

