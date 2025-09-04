# 🎯 Efficiency Automation Tracker

**Real-time Performance Management System for Teams**

## 🚀 **Features**

✅ **4 Teams Supported**: B2B, Varsity, Zero1-Bratish, Zero1-Harish  
✅ **Weekly Data Entry**: Team members input daily work and quality ratings  
✅ **Automatic Calculations**: Efficiency percentages, team summaries  
✅ **Google Sheets Integration**: Automatic backup to Google Sheets  
✅ **Historical Data**: Monthly summaries of past performance  
✅ **Auto Month Transition**: When all 4 weeks finalized → auto move to next month  
✅ **Role-based Work Types**: Different work types for each team with level mappings  

## 📋 **How It Works**

1. **Teams select their team** from dropdown
2. **Enter weekly data**: Work types, working days, leave days, quality ratings
3. **Save & Finalize** each week when complete
4. **Monthly Auto-Transition**: When all 4 weeks finalized → automatically creates monthly summary and moves to next month
5. **Data Backup**: All finalized data automatically saved to Google Sheets

## 🏗️ **Deployment Options**

### **Option 1: GitHub Pages (Recommended - Easiest)**
1. Create a new GitHub repository
2. Upload all 6 files to the repository
3. Enable GitHub Pages in repository settings
4. Teams access via: `https://yourusername.github.io/repository-name/real-efficiency-tracker.html`

### **Option 2: Netlify (Simple Drag & Drop)**
1. Go to [netlify.com](https://netlify.com)
2. Drag the entire project folder to Netlify
3. Get instant URL for teams to access

### **Option 3: Vercel (One-Click Deploy)**
1. Go to [vercel.com](https://vercel.com)
2. Import from GitHub or upload folder
3. Instant deployment with custom domain option

### **Option 4: Web Hosting (Traditional)**
- Upload all 6 files to any web hosting service (cPanel, FTP, etc.)
- Access via your domain: `yourdomain.com/real-efficiency-tracker.html`

## 📁 **Core Files (All 6 Required)**

- `real-efficiency-tracker.html` - Main application interface
- `real-efficiency-tracker.js` - Core logic and calculations  
- `real-sheets-integration.js` - Google Sheets backup system
- `week-system.js` - Week/month calculation system
- `index.html` - Alternative entry point
- `README.md` - This documentation

## ⚙️ **Configuration**

**Google Sheets Integration is already configured:**
- ✅ Service account authentication set up
- ✅ Backup sheet configured for automatic data saving
- ✅ All team data automatically synced

**Teams Available:**
- **B2B Team** (5 members): Deepak, Anjali Rawat, Swati Juyal, Satyam Gupta, Deepak Kumar
- **Varsity Team** (3-4 members): Aalim, Satyavrat Sharma, Somya Chamoli (until March)
- **Zero1 - Bratish Team** (5 members): Bratish Rawat, Ritik Joshi, Shaurya Bisht, Keshav Joshi, Mohd. Wasim
- **Zero1 - Harish Team** (4-5 members): Harish Rawat, Rishabh Bangwal, Pratik Sharma, Vikas Kumar, Divyanshu Mishra (until Jan)

## 🎉 **New Feature: Auto Month Transition**

When all 4 weeks of a month are finalized:
1. ✅ **Automatically creates monthly summary** from weekly data
2. ✅ **Moves completed month to historical data** (visible in monthly view)
3. ✅ **Activates next month** automatically
4. ✅ **Teams can immediately start entering next month's data**

## 📊 **Data Flow**

```
Weekly Entry → Save → Finalize → Google Sheets Backup
     ↓
All 4 Weeks Finalized → Auto Monthly Summary → Next Month Activated
     ↓
Historical Data (Monthly View) ← Team Performance Reports
```

## 🔧 **For Teams Using the System**

1. **Access the URL** provided by admin
2. **Select your team** from dropdown
3. **Choose current week** you're working on  
4. **Enter daily work data**: work types, hours, quality ratings
5. **Save weekly** when done
6. **Finalize when week complete** (locks data, sends to backup)
7. **System auto-moves to next month** when all weeks done

## 📈 **Views Available**

- **📅 Weekly View**: Enter and edit current week data
- **📊 Monthly View**: See completed monthly summaries  
- **👤 Person View**: Individual member performance tracking

## 🛠️ **Technical Details**

- **Frontend**: Pure HTML/CSS/JavaScript (no frameworks)
- **Data Storage**: Browser localStorage + Google Sheets backup
- **Authentication**: Service account for Google Sheets (already configured)
- **Performance**: Fast loading, works offline, auto-syncs when online

---

## 🚀 **Ready for Deployment!**

Choose any deployment option above and share the URL with your teams. The system is fully configured and ready to use immediately!