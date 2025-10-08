-- Clean up old Pre-production entry for Bhavya Oberoi after team move
-- Bhavya Oberoi moved from Pre-production to Product team
-- This removes the old Pre-production entry from Week 1 October 2025

-- Delete the old Pre-production entry for Bhavya Oberoi
DELETE FROM weekly_entries
WHERE team_id = 'preproduction'
  AND member_name = 'Bhavya Oberoi'
  AND week_id = '2025-10-01';

-- Verify the deletion
SELECT * FROM weekly_entries
WHERE member_name = 'Bhavya Oberoi'
  AND week_id = '2025-10-01'
ORDER BY team_id;

-- Expected result: Should only show Product team entry, not Pre-production

