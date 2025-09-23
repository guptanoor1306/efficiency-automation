-- Add Social team to Supabase
-- This creates the Social team entry in the teams table

INSERT INTO teams (id, name, members, work_types, created_at) VALUES (
  'social',
  'Social Team',
  '[
    {"name": "Khushi"}, 
    {"name": "Siya"}, 
    {"name": "Rohit"}, 
    {"name": "Anish"}, 
    {"name": "Swapnil"}, 
    {"name": "Tanya"}, 
    {"name": "Somya"}, 
    {"name": "Satyam"}
  ]',
  '{
    "basic_story": {"level": "Writing/Posting L1", "name": "Basic Story", "perDay": 84},
    "ig_caption": {"level": "Writing/Posting L1", "name": "IG Caption", "perDay": 42},
    "curation_schedule_post": {"level": "Writing/Posting L1", "name": "Curation + Schedule + Post", "perDay": 28},
    "statics": {"level": "Writing/Posting L1", "name": "Statics", "perDay": 21},
    "carousels_copy_l1": {"level": "Writing/Posting L1", "name": "Carousels/Copy", "perDay": 7},
    "reel_script_l1": {"level": "Writing/Posting L1", "name": "Reel Script", "perDay": 7},
    "linkedin_caption": {"level": "Writing/Posting L1", "name": "Linkedin Caption (PS)", "perDay": 7},
    "carousels_copy_l2": {"level": "Writing/Posting L2", "name": "Carousels/Copy", "perDay": 3.5},
    "reel_script_edit": {"level": "Writing/Posting L2", "name": "Reel Script/Edit", "perDay": 2.8},
    "research_khushi": {"level": "Writing/Posting L2", "name": "Research (Khushi)", "perDay": 3},
    "reel_l1": {"level": "Editing L1", "name": "Reel L1", "perDay": 2},
    "repackaging": {"level": "Editing L1", "name": "Repackaging", "perDay": 7},
    "typography": {"level": "Editing L1", "name": "Typography", "perDay": 9.3},
    "broll_sound_library": {"level": "Editing L1", "name": "B Roll + Sound Library", "perDay": 7},
    "zero1_teaser": {"level": "Editing L1", "name": "Zero1 Teaser", "perDay": 4.7},
    "reel_l1_5": {"level": "Editing L1.5", "name": "Reel L1.5", "perDay": 1.4},
    "podcast": {"level": "Editing L2", "name": "Podcast", "perDay": 0.14},
    "statics_design": {"level": "Design L1", "name": "Statics", "perDay": 28},
    "story_reel_covers": {"level": "Design L1", "name": "Story/Reel covers", "perDay": 14},
    "carousel_design_l1": {"level": "Design L1", "name": "Carousel", "perDay": 7},
    "carousel_design_l1_5": {"level": "Design L1.5", "name": "Carousel", "perDay": 3.5},
    "carousel_design_l2": {"level": "Design L2", "name": "Carousel", "perDay": 1},
    "research_toolkit": {"level": "All", "name": "Research + Toolkit", "perDay": 7},
    "review_changes": {"level": "All", "name": "Review/Changes", "perDay": 42},
    "storyboard_qc": {"level": "All", "name": "Storyboard +QC", "perDay": 3},
    "subtitles_qc_fix": {"level": "All", "name": "Subtitles QC/Fix", "perDay": 42},
    "strategy_presentations": {"level": "All", "name": "Strategy (Presentations)", "perDay": 7},
    "shoot": {"level": "All", "name": "Shoot", "perDay": 7},
    "retro": {"level": "All", "name": "Retro", "perDay": 98},
    "rejection_meeting": {"level": "All", "name": "Rejection Meeting", "perDay": 3}
  }',
  NOW()
);

-- Verify the insert
SELECT id, name, 
       jsonb_array_length(members) as member_count,
       jsonb_object_keys(work_types) as work_type_count
FROM teams WHERE id = 'social';

-- Show all team members
SELECT id, name, 
       jsonb_array_elements(members)->>'name' as member_name
FROM teams WHERE id = 'social';