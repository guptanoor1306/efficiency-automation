-- Update Graphics team work types with new level structure
-- This updates the Graphics team to use the new work types and levels

UPDATE teams SET work_types = '{
  "ost_text_graphic": {"level": "L0", "name": "OST/ Text Graphic", "perDay": 25},
  "img_video_gen_final": {"level": "L0", "name": "Imag Gen/ Video Gen (Final)", "perDay": 25},
  "changes": {"level": "L0", "name": "Changes", "perDay": 25},
  "graphic_ost_basic_chart": {"level": "L0.5", "name": "Graphic 0ST/ Basic Chart", "perDay": 14},
  "shorts_storyboard": {"level": "L0.5", "name": "Shorts Storyboard", "perDay": 14},
  "graphic_fss_charts": {"level": "L1", "name": "Graphic FSS/ Charts", "perDay": 7},
  "ai_graphic_manipulation": {"level": "L1", "name": "AI Graphic Manipulation", "perDay": 7},
  "research": {"level": "L1", "name": "Research", "perDay": 7},
  "sf_broll_shoot": {"level": "L1.5", "name": "SF B-roll/shoot", "perDay": 4},
  "varsity_shorts_thumbnail_3v": {"level": "L1.5", "name": "Varsity Shorts Thumbnail (3 V)", "perDay": 4},
  "heavy_scenic_graphic": {"level": "L2", "name": "Heavy Scenic Graphic", "perDay": 3.5},
  "og_shorts_thumbnail_3v": {"level": "L2", "name": "OG Shorts Thumbnail (3 V)", "perDay": 3.5},
  "varsity_lf_3v": {"level": "L2", "name": "Varsity LF (3V)", "perDay": 3.5},
  "retro": {"level": "L2", "name": "Retro", "perDay": 3.5},
  "moodboard": {"level": "L3", "name": "Moodboard", "perDay": 2},
  "video_theme_10_graphics": {"level": "L3", "name": "Video Theme (10 graphics min)", "perDay": 1},
  "vd": {"level": "L3", "name": "VD", "perDay": 1},
  "lf_storyboard": {"level": "L3", "name": "LF Storyboard", "perDay": 1},
  "topic_res": {"level": "L3", "name": "Topic Res", "perDay": 10},
  "ppt_slides": {"level": "L3", "name": "PPT Slides", "perDay": 30},
  "og_thumb": {"level": "L3", "name": "OG Thumb", "perDay": 1}
}' 
WHERE id = 'graphics';

-- Verify the update
SELECT id, name, work_types FROM teams WHERE id = 'graphics';
