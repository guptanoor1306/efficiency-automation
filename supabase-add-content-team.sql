-- SQL to add Content team to existing Supabase database
-- Run this script to add the Content team configuration

INSERT INTO teams (id, name, members, work_types) VALUES 
('content', 'Content Team',
 '["Nishita", "Akshat", "Urvish", "Meghna", "Shuchita"]',
 '{
   "shorts_topics": {"level": "Shorts", "name": "Topics", "perDay": 10},
   "shorts_og_script": {"level": "Shorts", "name": "OG Script", "perDay": 3},
   "shorts_rp_script": {"level": "Shorts", "name": "RP Script", "perDay": 4},
   "shorts_shoot": {"level": "Shorts", "name": "Shoot", "perDay": 5},
   "shorts_review": {"level": "Shorts", "name": "Review", "perDay": 14},
   "shorts_comments_community": {"level": "Shorts", "name": "Comments & Community Posts", "perDay": 25},
   "shorts_retro": {"level": "Shorts", "name": "Retro", "perDay": 10},
   "lf_topic_research": {"level": "Long-form", "name": "Topic Research", "perDay": 20},
   "lf_wordcloud_pov": {"level": "Long-form", "name": "Wordcloud & POV", "perDay": 2},
   "lf_pov_v2": {"level": "Long-form", "name": "POV V2", "perDay": 4},
   "lf_script_outline": {"level": "Long-form", "name": "Script Outline", "perDay": 0.66},
   "lf_script_writing": {"level": "Long-form", "name": "Script Writing", "perDay": 0.5},
   "lf_script_writing_v2": {"level": "Long-form", "name": "Script Writing V2", "perDay": 1},
   "lf_visual_direction": {"level": "Long-form", "name": "Visual Direction", "perDay": 2},
   "lf_shoot": {"level": "Long-form", "name": "Shoot", "perDay": 2},
   "lf_storyboarding": {"level": "Long-form", "name": "Storyboarding", "perDay": 1},
   "lf_video_review_changes": {"level": "Long-form", "name": "Video Review & Changes", "perDay": 1},
   "lf_launch_doc": {"level": "Long-form", "name": "Launch Doc", "perDay": 4},
   "lf_comments_comm_post": {"level": "Long-form", "name": "Comments & Comm Post", "perDay": 25},
   "lf_retro": {"level": "Long-form", "name": "Retro", "perDay": 2},
   "lf_interview_ass_rev": {"level": "Long-form", "name": "Interview Ass+ Rev/ Ext Feedback", "perDay": 2}
 }')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  members = EXCLUDED.members,
  work_types = EXCLUDED.work_types;

-- Verify the insert
SELECT id, name, members, work_types FROM teams WHERE id = 'content';
