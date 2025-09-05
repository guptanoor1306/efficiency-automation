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
        const currentDate = new Date();
        
        // Generate weeks for 2025 and some future months
        const startYear = 2025;
        const endYear = currentDate.getFullYear() + 1;
        
        for (let year = startYear; year <= endYear; year++) {
            const monthLimit = year === endYear ? currentDate.getMonth() + 3 : 11;
            
            for (let month = 0; month <= monthLimit; month++) {
                const monthName = new Date(year, month, 1).toLocaleDateString('en-US', { month: 'long' });
                const daysInMonth = new Date(year, month + 1, 0).getDate();
                
                // Week 1: 1-7
                weeks.push(this.createFixedWeek(year, month, monthName, 1, 1, 7, currentDate));
                
                // Week 2: 8-14
                weeks.push(this.createFixedWeek(year, month, monthName, 2, 8, 14, currentDate));
                
                // Week 3: 15-21
                weeks.push(this.createFixedWeek(year, month, monthName, 3, 15, 21, currentDate));
                
                // Week 4: 22 to end of month
                weeks.push(this.createFixedWeek(year, month, monthName, 4, 22, daysInMonth, currentDate));
            }
        }
        
        return weeks;
    }
    
    createFixedWeek(year, month, monthName, weekNum, startDay, endDay, currentDate) {
        const startDate = new Date(year, month, startDay);
        const endDate = new Date(year, month, endDay);
        const weekId = `${year}-${String(month + 1).padStart(2, '0')}-${String(startDay).padStart(2, '0')}`;
        
        // Calculate working days (Monday-Friday only)
        let workingDays = 0;
        for (let day = startDay; day <= endDay; day++) {
            const dayOfWeek = new Date(year, month, day).getDay();
            if (dayOfWeek >= 1 && dayOfWeek <= 5) { // Monday = 1, Friday = 5
                workingDays++;
            }
        }
        
        // Target calculation: 5 for first 3 weeks, working days for week 4
        const target = weekNum <= 3 ? 5 : workingDays;
        
        return {
            id: weekId,
            weekNumber: weekNum,
            year: year,
            month: month + 1,
            monthName: monthName,
            startDate: startDate,
            endDate: endDate,
            dateRange: `${monthName.substr(0,3)} ${startDay}-${endDay}, ${year}`,
            label: `Week ${weekNum} (${monthName.substr(0,3)} ${startDay}-${endDay})`,
            workingDays: workingDays,
            target: target,
            isPast: endDate < currentDate,
            isCurrent: currentDate >= startDate && currentDate <= endDate,
            isFuture: startDate > currentDate
        };
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
    
    getWeeksForMonth(monthName, year) {
        return this.weeks.filter(week => 
            week.monthName === monthName && week.year === year
        );
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
