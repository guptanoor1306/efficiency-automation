-- Update Social team work types in Supabase
-- This updates the Rejection Meeting perDay from 3 to 7

UPDATE teams 
SET work_types = jsonb_set(
  work_types,
  '{rejection_meeting,perDay}',
  '7'::jsonb
)
WHERE id = 'social';

-- Verify the update
SELECT id, name,
       work_types->'rejection_meeting'->>'name' as work_type_name,
       work_types->'rejection_meeting'->>'perDay' as per_day
FROM teams 
WHERE id = 'social';

-- Show all Social team work types
SELECT id, name,
       key as work_type,
       value->>'name' as work_type_name,
       value->>'level' as level,
       (value->>'perDay')::numeric as per_day
FROM teams, jsonb_each(work_types)
WHERE id = 'social'
ORDER BY level, work_type;
