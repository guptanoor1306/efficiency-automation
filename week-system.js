// Week System - Monday to Friday structure
// Fixed dates within weeks, no date change options

class WeekSystem {
    constructor() {
        this.initializeWeeks();
    }
    
    initializeWeeks() {
        // Generate all weeks from January 2025 to current date + some future weeks
        this.weeks = this.generateWeeksFrom2025();
    }
    
    generateWeeksFrom2025() {
        const weeks = [];
        const startDate = new Date('2025-01-06'); // First Monday of 2025
        const currentDate = new Date();
        
        // Add some weeks into the future for planning
        const endDate = new Date(currentDate);
        endDate.setMonth(endDate.getMonth() + 3);
        
        let weekStart = new Date(startDate);
        let weekNumber = 1;
        
        while (weekStart <= endDate) {
            const weekEnd = new Date(weekStart);
            weekEnd.setDate(weekStart.getDate() + 4); // Friday
            
            const week = {
                id: this.getWeekId(weekStart),
                weekNumber: weekNumber,
                year: weekStart.getFullYear(),
                month: weekStart.getMonth() + 1,
                monthName: weekStart.toLocaleDateString('en-US', { month: 'long' }),
                startDate: new Date(weekStart),
                endDate: new Date(weekEnd),
                dateRange: `${this.formatDate(weekStart)} - ${this.formatDate(weekEnd)}`,
                days: this.generateWeekDays(weekStart),
                isPast: weekEnd < currentDate,
                isCurrent: this.isCurrentWeek(weekStart, weekEnd, currentDate),
                isFuture: weekStart > currentDate
            };
            
            weeks.push(week);
            
            // Move to next Monday
            weekStart.setDate(weekStart.getDate() + 7);
            weekNumber++;
        }
        
        return weeks;
    }
    
    generateWeekDays(weekStart) {
        const days = [];
        const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
        
        for (let i = 0; i < 5; i++) {
            const date = new Date(weekStart);
            date.setDate(weekStart.getDate() + i);
            
            days.push({
                name: dayNames[i],
                shortName: dayNames[i].substring(0, 3),
                date: new Date(date),
                dateString: this.formatDate(date),
                dayOfWeek: i + 1 // Monday = 1, Friday = 5
            });
        }
        
        return days;
    }
    
    getWeekId(weekStart) {
        const year = weekStart.getFullYear();
        const month = String(weekStart.getMonth() + 1).padStart(2, '0');
        const day = String(weekStart.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    
    formatDate(date) {
        return date.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric'
        });
    }
    
    isCurrentWeek(weekStart, weekEnd, currentDate) {
        return currentDate >= weekStart && currentDate <= weekEnd;
    }
    
    getWeekById(weekId) {
        return this.weeks.find(week => week.id === weekId);
    }
    
    getWeeksByMonth(year, month) {
        return this.weeks.filter(week => 
            week.year === year && week.month === month
        );
    }
    
    getWeeksByMonthName(monthName, year = null) {
        return this.weeks.filter(week => {
            if (year) {
                return week.monthName === monthName && week.year === year;
            }
            return week.monthName === monthName;
        });
    }
    
    getCurrentWeek() {
        return this.weeks.find(week => week.isCurrent);
    }
    
    getWeekForDate(date) {
        return this.weeks.find(week => 
            date >= week.startDate && date <= week.endDate
        );
    }
    
    getAvailableMonths() {
        const months = new Set();
        this.weeks.forEach(week => {
            months.add(`${week.monthName} ${week.year}`);
        });
        return Array.from(months).sort();
    }
    
    getWeeksForSelector() {
        return this.weeks.map(week => ({
            id: week.id,
            label: `Week ${week.weekNumber} (${week.dateRange})`,
            monthYear: `${week.monthName} ${week.year}`,
            isPast: week.isPast,
            isCurrent: week.isCurrent,
            isFuture: week.isFuture
        }));
    }
    
    // Get Week 1 of September 2025 specifically
    getSeptemberWeek1() {
        // First Monday of September 2025
        const sept2025 = new Date('2025-09-01');
        const dayOfWeek = sept2025.getDay();
        const mondayOffset = dayOfWeek === 1 ? 0 : (8 - dayOfWeek) % 7;
        const firstMonday = new Date(sept2025);
        firstMonday.setDate(sept2025.getDate() + mondayOffset);
        
        return this.getWeekForDate(firstMonday);
    }
    
    // Create a new week entry template
    createWeekEntry(weekId, memberId) {
        const week = this.getWeekById(weekId);
        if (!week) return null;
        
        const entry = {
            weekId: weekId,
            memberId: memberId,
            year: week.year,
            month: week.month,
            weekNumber: week.weekNumber,
            dateRange: week.dateRange,
            workTypes: {
                ost: { mon: 0, tue: 0, wed: 0, thu: 0, fri: 0 },
                screen: { mon: 0, tue: 0, wed: 0, thu: 0, fri: 0 },
                firstcut: { mon: 0, tue: 0, wed: 0, thu: 0, fri: 0 },
                hand: { mon: 0, tue: 0, wed: 0, thu: 0, fri: 0 },
                fss: { mon: 0, tue: 0, wed: 0, thu: 0, fri: 0 },
                character: { mon: 0, tue: 0, wed: 0, thu: 0, fri: 0 },
                vo: { mon: 0, tue: 0, wed: 0, thu: 0, fri: 0 },
                intro: { mon: 0, tue: 0, wed: 0, thu: 0, fri: 0 }
            },
            totals: {
                weekTotal: 0,
                dailyTotals: { mon: 0, tue: 0, wed: 0, thu: 0, fri: 0 }
            },
            lastUpdated: new Date().toISOString()
        };
        
        return entry;
    }
    
    // Validate week data
    validateWeekEntry(entry) {
        const errors = [];
        
        if (!entry.weekId || !this.getWeekById(entry.weekId)) {
            errors.push('Invalid week ID');
        }
        
        if (!entry.memberId) {
            errors.push('Member ID is required');
        }
        
        // Validate work type data
        const workTypes = ['ost', 'screen', 'firstcut', 'hand', 'fss', 'character', 'vo', 'intro'];
        const days = ['mon', 'tue', 'wed', 'thu', 'fri'];
        
        workTypes.forEach(workType => {
            if (!entry.workTypes[workType]) {
                errors.push(`Missing work type: ${workType}`);
                return;
            }
            
            days.forEach(day => {
                const value = entry.workTypes[workType][day];
                if (typeof value !== 'number' || value < 0) {
                    errors.push(`Invalid value for ${workType} on ${day}`);
                }
            });
        });
        
        return {
            isValid: errors.length === 0,
            errors: errors
        };
    }
    
    // Calculate totals for a week entry
    calculateWeekTotals(entry) {
        const days = ['mon', 'tue', 'wed', 'thu', 'fri'];
        const workTypes = ['ost', 'screen', 'firstcut', 'hand', 'fss', 'character', 'vo', 'intro'];
        
        // Reset totals
        entry.totals.dailyTotals = { mon: 0, tue: 0, wed: 0, thu: 0, fri: 0 };
        entry.totals.weekTotal = 0;
        
        // Calculate daily totals
        days.forEach(day => {
            let dayTotal = 0;
            workTypes.forEach(workType => {
                const value = entry.workTypes[workType][day] || 0;
                dayTotal += value;
            });
            entry.totals.dailyTotals[day] = dayTotal;
            entry.totals.weekTotal += dayTotal;
        });
        
        return entry;
    }
}

// Export for use
window.WeekSystem = WeekSystem;
