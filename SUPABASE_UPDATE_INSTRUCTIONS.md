# Supabase Update Instructions

## Changes Made to Code (Already Applied ✅)

### 1. Team Member Corrections
- **Satyam**: Already correctly placed in Social Team ✅
- **Bhavya Oberoi**: Removed from Pre-production historicalMembers, kept only in Product Team ✅

### 2. Audio Team Work Types Updated
**Removed:**
- Dubbing - 1 Hour (deleted)
- Master Upload (deleted)

**Updated:**
- Reel: 3 → **5 per day**
- Short Videos/Ads: 2 → **3 per day**
- Podcast (1 Hr) w/o Animation: 1 → **2 per day**

**Added:**
- VD: **0.67 per day** (L3)
- Storyboarding: **8 per day** (L3)
- Editing: **8 per day** (L3)

### 3. Social Team Work Types Updated
- Rejection Meeting: 3 → **7 per day**

---

## Supabase Database Updates Required

### Step 1: Update Audio Team
Run the SQL file: `supabase-update-audio-team.sql`

This will:
- Remove: `dubbing_1hr`, `master_upload`
- Update perDay values for: `reel`, `short_videos_ads`, `podcast_1hr_no_animation`
- Add: `vd`, `storyboarding`, `editing`

**To Execute:**
1. Go to your Supabase Dashboard
2. Navigate to SQL Editor
3. Copy and paste the contents of `supabase-update-audio-team.sql`
4. Click "Run"
5. Verify the output shows all 9 work types with correct perDay values

### Step 2: Update Social Team
Run the SQL file: `supabase-update-social-team.sql`

This will:
- Update `rejection_meeting` perDay from 3 to 7

**To Execute:**
1. Go to your Supabase Dashboard
2. Navigate to SQL Editor
3. Copy and paste the contents of `supabase-update-social-team.sql`
4. Click "Run"
5. Verify the output shows `rejection_meeting` with perDay = 7

---

## Summary of Files Created

1. **supabase-update-audio-team.sql** - Updates Audio team work types
2. **supabase-update-social-team.sql** - Updates Social team rejection meeting
3. **SUPABASE_UPDATE_INSTRUCTIONS.md** - This file

---

## Audio Team Level Structure (After Update)

### L1 (3 work types):
- Reel: 5 per day
- Short Videos/Ads: 3 per day
- Live Shoot - 1 Hour: 8 per day

### L2 (1 work type):
- Podcast (1 Hr) w/o Animation: 2 per day

### L3 (5 work types):
- YT Long Form: 0.67 per day
- Video (8-10 mins) LF: 0.67 per day
- VD: 0.67 per day
- Storyboarding: 8 per day
- Editing: 8 per day

---

## Social Team - Updated Work Type

### All Level:
- Rejection Meeting: **7 per day** (was 3)

---

## Verification Steps

After running both SQL files:

1. **Verify Audio Team:**
   ```sql
   SELECT key as work_type,
          value->>'name' as name,
          value->>'level' as level,
          (value->>'perDay')::numeric as per_day
   FROM teams, jsonb_each(work_types)
   WHERE id = 'audio'
   ORDER BY level, work_type;
   ```
   Should show 9 work types total.

2. **Verify Social Team:**
   ```sql
   SELECT work_types->'rejection_meeting'->>'perDay' as rejection_meeting_per_day
   FROM teams 
   WHERE id = 'social';
   ```
   Should show: 7

---

## Notes

- All changes to `real-efficiency-tracker.js` have been applied ✅
- Browser refresh required to see changes in the UI
- Supabase updates are backward compatible - existing data will not be affected
- Only new weekly entries will use the updated work types and perDay values

