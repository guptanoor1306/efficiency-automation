// Supabase Integration for Real Efficiency Tracker
// Replaces Google Sheets with Supabase PostgreSQL database

class SupabaseAPI {
    constructor() {
        // Your Supabase configuration
        this.supabaseUrl = 'https://ygazzjwpazxekyqnsrsi.supabase.co';
        this.supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlnYXp6andwYXp4ZWt5cW5zcnNpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTczMjYwNTQsImV4cCI6MjA3MjkwMjA1NH0.t96cTbq_Yc3-FCMvPYTBoD_eQVTuTE9yKPlaKNHTGY4';
        
        // Initialize Supabase client
        this.supabase = null;
        this.initializeSupabase();
    }

    async initializeSupabase() {
        try {
            // Load Supabase client from CDN
            if (!window.supabase) {
                await this.loadSupabaseScript();
            }
            
            this.supabase = window.supabase.createClient(this.supabaseUrl, this.supabaseKey);
            console.log('✅ Supabase client initialized successfully');
            return true;
        } catch (error) {
            console.error('❌ Failed to initialize Supabase:', error);
            return false;
        }
    }

    async loadSupabaseScript() {
        return new Promise((resolve, reject) => {
            if (window.supabase) {
                resolve();
                return;
            }

            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.39.0/dist/umd/supabase.min.js';
            script.onload = () => {
                console.log('📦 Supabase script loaded');
                resolve();
            };
            script.onerror = () => {
                reject(new Error('Failed to load Supabase script'));
            };
            document.head.appendChild(script);
        });
    }

    // Load team configuration (work types, members)
    async loadTeamData(teamId) {
        try {
            console.log(`📊 Loading team data for: ${teamId}`);
            
            const { data, error } = await this.supabase
                .from('teams')
                .select('*')
                .eq('id', teamId)
                .single();

            if (error) {
                console.error('❌ Error loading team data:', error);
                return null;
            }

            console.log(`✅ Loaded team data for ${teamId}:`, data);
            return data;
        } catch (error) {
            console.error('❌ Exception loading team data:', error);
            return null;
        }
    }

    // Save week data for a team member
    async saveWeekData(teamId, weekId, memberName, weekData) {
        try {
            console.log(`💾 Saving week data for ${memberName} in ${teamId} week ${weekId}`);
            
            const weekEntry = {
                team_id: teamId,
                week_id: weekId,
                member_name: memberName,
                work_type_data: weekData.workTypes || {},
                working_days: weekData.workingDays || 5,
                leave_days: parseFloat(weekData.leaveDays) || 0,
                weekly_rating: parseFloat(weekData.weeklyRating) || 0,
                week_total: parseFloat(weekData.weekTotal) || 0
            };

            console.log('📝 Week entry to save:', weekEntry);

            // Use upsert to insert or update
            const { data, error } = await this.supabase
                .from('weekly_entries')
                .upsert(weekEntry, {
                    onConflict: 'team_id,week_id,member_name'
                })
                .select();

            if (error) {
                console.error('❌ Error saving week data:', error);
                throw error;
            }

            console.log('✅ Successfully saved week data:', data);
            return { success: true, data };
        } catch (error) {
            console.error('❌ Exception saving week data:', error);
            return { success: false, error: error.message };
        }
    }

    // Load week data for entire team
    async loadWeekData(teamId, weekId) {
        try {
            console.log(`📈 Loading week data for team ${teamId}, week ${weekId}`);
            
            const { data, error } = await this.supabase
                .from('weekly_entries')
                .select('*')
                .eq('team_id', teamId)
                .eq('week_id', weekId);

            if (error) {
                console.error('❌ Error loading week data:', error);
                return [];
            }

            console.log(`✅ Loaded ${data.length} week entries for ${teamId} ${weekId}`);
            return data;
        } catch (error) {
            console.error('❌ Exception loading week data:', error);
            return [];
        }
    }

    // Load all data for a team (for sync purposes)
    async loadAllTeamData(teamId) {
        try {
            console.log(`🔄 Loading all data for team: ${teamId}`);
            
            const { data, error } = await this.supabase
                .from('weekly_entries')
                .select('*')
                .eq('team_id', teamId)
                .order('week_id', { ascending: false });

            if (error) {
                console.error('❌ Error loading all team data:', error);
                return [];
            }

            console.log(`✅ Loaded ${data.length} total entries for ${teamId}`);
            return data;
        } catch (error) {
            console.error('❌ Exception loading all team data:', error);
            return [];
        }
    }

    // Clear week data for a team
    async clearWeekData(teamId, weekId) {
        try {
            console.log(`🗑️ Clearing week data for ${teamId} week ${weekId}`);
            
            const { error } = await this.supabase
                .from('weekly_entries')
                .delete()
                .eq('team_id', teamId)
                .eq('week_id', weekId);

            if (error) {
                console.error('❌ Error clearing week data:', error);
                return { success: false, error: error.message };
            }

            console.log(`✅ Successfully cleared week data for ${teamId} ${weekId}`);
            return { success: true };
        } catch (error) {
            console.error('❌ Exception clearing week data:', error);
            return { success: false, error: error.message };
        }
    }

    // Clear all September data for a team
    async clearSeptemberData(teamId) {
        try {
            console.log(`🗑️ Clearing September data for team: ${teamId}`);
            
            const { error } = await this.supabase
                .from('weekly_entries')
                .delete()
                .eq('team_id', teamId)
                .like('week_id', '%Sep%');

            if (error) {
                console.error('❌ Error clearing September data:', error);
                return { success: false, error: error.message };
            }

            console.log(`✅ Successfully cleared September data for ${teamId}`);
            return { success: true };
        } catch (error) {
            console.error('❌ Exception clearing September data:', error);
            return { success: false, error: error.message };
        }
    }

    // Clear all September data for all teams
    async clearAllSeptemberData() {
        try {
            console.log('🗑️ Clearing September data for ALL teams');
            
            const { error } = await this.supabase
                .from('weekly_entries')
                .delete()
                .like('week_id', '%Sep%');

            if (error) {
                console.error('❌ Error clearing all September data:', error);
                return { success: false, error: error.message };
            }

            console.log('✅ Successfully cleared ALL September data');
            return { success: true };
        } catch (error) {
            console.error('❌ Exception clearing all September data:', error);
            return { success: false, error: error.message };
        }
    }

    // Subscribe to real-time changes for a team
    subscribeToTeamChanges(teamId, callback) {
        try {
            console.log(`🔔 Subscribing to real-time changes for team: ${teamId}`);
            
            const subscription = this.supabase
                .channel(`team-${teamId}-changes`)
                .on('postgres_changes', {
                    event: '*',
                    schema: 'public',
                    table: 'weekly_entries',
                    filter: `team_id=eq.${teamId}`
                }, (payload) => {
                    console.log('🔄 Real-time update received:', payload);
                    if (callback) callback(payload);
                })
                .subscribe();

            console.log('✅ Subscribed to real-time changes');
            return subscription;
        } catch (error) {
            console.error('❌ Error subscribing to changes:', error);
            return null;
        }
    }

    // Unsubscribe from real-time changes
    unsubscribe(subscription) {
        if (subscription) {
            this.supabase.removeChannel(subscription);
            console.log('✅ Unsubscribed from real-time changes');
        }
    }

    // Health check
    async healthCheck() {
        try {
            const { data, error } = await this.supabase
                .from('teams')
                .select('id, name')
                .limit(1);

            if (error) {
                console.error('❌ Health check failed:', error);
                return false;
            }

            console.log('✅ Supabase health check passed:', data);
            return true;
        } catch (error) {
            console.error('❌ Health check exception:', error);
            return false;
        }
    }

    // Get team statistics
    async getTeamStats(teamId) {
        try {
            console.log(`📊 Getting statistics for team: ${teamId}`);
            
            const { data, error } = await this.supabase
                .from('weekly_entries')
                .select('week_id, member_name, week_total, weekly_rating')
                .eq('team_id', teamId);

            if (error) {
                console.error('❌ Error getting team stats:', error);
                return null;
            }

            // Process statistics
            const stats = {
                totalEntries: data.length,
                uniqueWeeks: [...new Set(data.map(entry => entry.week_id))].length,
                uniqueMembers: [...new Set(data.map(entry => entry.member_name))].length,
                averageRating: data.length > 0 ? 
                    data.reduce((sum, entry) => sum + (entry.weekly_rating || 0), 0) / data.length : 0,
                totalOutput: data.reduce((sum, entry) => sum + (entry.week_total || 0), 0)
            };

            console.log(`✅ Team stats for ${teamId}:`, stats);
            return stats;
        } catch (error) {
            console.error('❌ Exception getting team stats:', error);
            return null;
        }
    }
}

// Export for use in main application
window.SupabaseAPI = SupabaseAPI;
