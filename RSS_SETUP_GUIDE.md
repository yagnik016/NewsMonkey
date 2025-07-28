# RSS News Integration Setup Guide

This guide will help you set up the complete RSS news integration for NewsMonkey.

## 🚀 Quick Start

### 1. Install Dependencies
```bash
cd be
npm install @nestjs/schedule xml2js @types/xml2js
```

### 2. Start the Backend
```bash
cd be
npm run start:dev
```

### 3. Test RSS Import
```bash
# Test the import script
npm run import:rss

# Or test via API
curl -X POST http://localhost:3005/api/v1/news/import/rss/now
```

### 4. Start the Frontend
```bash
cd fe
npm run dev
```

## 📰 What's Been Implemented

### Backend Features
- ✅ **RSS Import Service**: Fetches from BBC, Reuters, CNN, The Guardian
- ✅ **Scheduled Imports**: Every 2 hours + daily at 6 AM
- ✅ **Manual Import Endpoints**: Trigger imports via API
- ✅ **Category Support**: General, Technology, Business, Sports, Entertainment, Science
- ✅ **Error Handling**: Graceful fallbacks and logging

### Frontend Features
- ✅ **Updated News Fetching**: Uses RSS-imported news instead of external API
- ✅ **Admin Panel**: `/admin` page to trigger imports
- ✅ **Breaking News**: Real-time breaking news banner
- ✅ **Latest News**: Homepage shows RSS-imported articles
- ✅ **Category Pages**: Filter news by category

## 🔧 API Endpoints

### RSS Import Endpoints
```bash
# Import all categories
POST /api/v1/news/import/rss/all

# Import specific category
POST /api/v1/news/import/rss?category=technology&limit=20

# Manual trigger (immediate)
POST /api/v1/news/import/rss/now
```

### News Fetching Endpoints
```bash
# Get all news
GET /api/v1/news

# Get breaking news
GET /api/v1/news?isBreaking=true

# Get featured news
GET /api/v1/news?isFeatured=true

# Get by category
GET /api/v1/news?category=technology

# Search news
GET /api/v1/news/search?q=artificial intelligence
```

## 📊 RSS Sources

### Active Feeds
- **BBC News**: `https://feeds.bbci.co.uk/news/rss.xml`
- **Reuters**: `https://feeds.reuters.com/reuters/topNews`
- **CNN**: `http://rss.cnn.com/rss/edition.rss`
- **The Guardian**: `https://www.theguardian.com/world/rss`

### Category-Specific Feeds
- **Technology**: BBC Tech, The Verge
- **Business**: BBC Business, Reuters Business
- **Sports**: BBC Sport, ESPN
- **Science**: BBC Science & Environment

## 🎯 How to Use

### 1. Initial Setup
1. Start the backend server
2. Visit `/admin` in your browser
3. Click "🚀 Import All News" to populate the database
4. Check `/news` to see the imported articles

### 2. Daily Usage
- **Automatic**: News imports every 2 hours automatically
- **Manual**: Use the admin panel to trigger imports anytime
- **Monitoring**: Check the admin dashboard for import status

### 3. Frontend Access
- **Homepage**: Shows latest RSS-imported news
- **News Page**: `/news` - All articles with pagination
- **Categories**: `/news?category=technology` - Filtered news
- **Admin**: `/admin` - Import management

## 🔄 Automation

### Scheduled Imports
The system automatically imports news:
- **Every 2 hours**: Light import for fresh content
- **Daily at 6 AM**: Comprehensive import of all categories

### Manual Triggers
You can trigger imports manually:
- **Admin Panel**: Web interface at `/admin`
- **API Calls**: Direct API endpoints
- **Script**: `npm run import:rss`

## 📈 Monitoring

### Check Import Status
```bash
# Check recent imports
curl http://localhost:3005/api/v1/news?limit=1

# Check specific category
curl http://localhost:3005/api/v1/news?category=technology&limit=5
```

### View Logs
```bash
# Backend logs show import activity
cd be
npm run start:dev
```

## 🛠️ Troubleshooting

### Common Issues

1. **No News Showing**
   - Check if RSS import was successful
   - Visit `/admin` and trigger manual import
   - Check backend logs for errors

2. **Import Failing**
   - Verify internet connection
   - Check RSS feed URLs are accessible
   - Review error logs in console

3. **Frontend Not Loading**
   - Ensure backend is running on port 3005
   - Check API configuration in `fe/src/utils/apiConfig.ts`
   - Verify CORS settings

### Debug Commands
```bash
# Test RSS import
cd be && npm run import:rss

# Test API endpoints
curl http://localhost:3005/api/v1/news

# Check database
# (Use MongoDB Compass or similar to view articles)
```

## 🎉 Benefits

### Cost Savings
- **Before**: $99-449/month for News API
- **After**: $0/month with RSS feeds

### Reliability
- **Multiple Sources**: BBC, Reuters, CNN, The Guardian
- **No Rate Limits**: Unlimited RSS feed access
- **Automatic Updates**: Every 2 hours

### Quality Content
- **Professional Sources**: Major news organizations
- **Diverse Categories**: Technology, Business, Sports, etc.
- **Fresh Content**: Regular updates from trusted sources

## 🚀 Next Steps

1. **Test the Integration**: Run the setup and verify everything works
2. **Monitor Performance**: Check import logs and news quality
3. **Customize Feeds**: Add more RSS sources if needed
4. **Scale Up**: Consider adding more categories or sources

## 📞 Support

If you encounter any issues:
1. Check the backend logs for error messages
2. Verify RSS feed URLs are accessible
3. Test individual API endpoints
4. Review the troubleshooting section above

The RSS integration provides a complete, free solution for production news aggregation! 🎉 