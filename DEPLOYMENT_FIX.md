# Fix 404 Error - Backend Deployment Guide

The 404 error you're seeing means the backend needs to be redeployed with the new RSS import functionality.

## 🔧 **Quick Fix Steps**

### 1. **Redeploy Backend**
```bash
cd be
npm run build
# Deploy to Vercel or your hosting platform
```

### 2. **Test Backend Connectivity**
Visit your admin panel and click the "🧪 Test Backend" button to verify the backend is working.

### 3. **Alternative Endpoints**
If the main RSS import fails, the system will automatically try these endpoints:
- `POST /api/v1/news/import/rss/simple` (new simple endpoint)
- `POST /api/v1/news/import/rss/now` (original endpoint)

## 🚀 **Deployment Commands**

### For Vercel:
```bash
cd be
vercel --prod
```

### For Manual Deployment:
```bash
cd be
npm install
npm run build
# Upload dist/ folder to your server
```

## 🔍 **Debugging Steps**

### 1. **Check Backend Status**
```bash
curl https://newsmonkey-be.vercel.app/api/v1/news/test
```

### 2. **Verify Endpoints**
```bash
# Test simple RSS import
curl -X POST https://newsmonkey-be.vercel.app/api/v1/news/import/rss/simple

# Test original RSS import
curl -X POST https://newsmonkey-be.vercel.app/api/v1/news/import/rss/now
```

### 3. **Check Dependencies**
Make sure these packages are installed in your backend:
- `@nestjs/schedule`
- `xml2js`
- `@types/xml2js`

## 🛠️ **What Was Added**

### New Endpoints:
- `POST /api/v1/news/import/rss/simple` - Simple RSS import
- `POST /api/v1/news/import/rss/now` - Manual RSS import
- `GET /api/v1/news/test` - Backend test endpoint

### New Services:
- `RssImportService` - Handles RSS feed fetching
- `ScheduledImportService` - Handles automated imports

## 📊 **Expected Response**

After successful deployment, you should see:
```json
{
  "message": "RSS import completed successfully",
  "imported": 15,
  "category": "all categories"
}
```

## 🔄 **Fallback Strategy**

The frontend now tries multiple endpoints:
1. **Simple endpoint** first (more reliable)
2. **Original endpoint** as fallback
3. **Test endpoint** for debugging

## 🎯 **Next Steps**

1. **Redeploy backend** with new RSS functionality
2. **Test connectivity** using the test button
3. **Try RSS import** from admin panel
4. **Check news page** to see imported articles

The 404 error should be resolved once the backend is redeployed with the new RSS import endpoints! 