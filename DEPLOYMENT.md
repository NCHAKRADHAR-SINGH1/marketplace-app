# Deployment Guide

## Prerequisites
- GitHub repository pushed (✅ Done)
- MongoDB Atlas account with connection string (✅ Have: ``)

---

## 1️⃣ Deploy Backend to Render

### Step-by-Step:

1. **Go to**: https://render.com
2. **Click**: "New +" → "Web Service"
3. **Connect GitHub**: 
   - Click "Connect account"
   - Authorize Render to access GitHub
   - Select repository: `marketplace-app`
4. **Configure Web Service**:
   - **Name**: `marketplace-backend`
   - **Environment**: `Node`
   - **Region**: `Oregon` (or your closest region)
   - **Branch**: `main`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

5. **Add Environment Variables** (click "Add Secret File"):
   ```
   PORT=5000
   MONGODB_URI=mongodb+srv://chakriaugust2006_db_user:cILWVRlk6pZ05L1w@cluster0.yfcj4lh.mongodb.net/marketplace
   JWT_SECRET=super_secret_jwt_key_change_in_production_12345
   NODE_ENV=production
   ```

6. **Click**: "Create Web Service"
7. **Wait**: ~3-5 minutes for deployment
8. **Get URL**: Render will give you a URL like `https://marketplace-backend-xxxxx.onrender.com`
9. **Copy this URL** - you'll need it for web app deployment

---

## 2️⃣ Deploy Web App to Vercel

### Step-by-Step:

1. **Go to**: https://vercel.com
2. **Click**: "Add New" → "Project"
3. **Import from GitHub**:
   - Search: `marketplace-app`
   - Click "Import"
4. **Configure Project**:
   - **Framework Preset**: React
   - **Root Directory**: `./` (leave default)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. **Add Environment Variable**:
   - **Name**: `VITE_API_URL`
   - **Value**: `https://YOUR-RENDER-BACKEND-URL/api` (replace with actual URL from step 1.8)
   
   Example: `https://marketplace-backend-xyz123.onrender.com/api`

6. **Click**: "Deploy"
7. **Wait**: ~2-3 minutes
8. **Get URL**: Vercel will display your live site URL, like `https://marketplace-web-xxxxx.vercel.app`

---

## 3️⃣ Test Live Deployment

Once both are deployed:

1. **Open web app**: https://your-vercel-url.vercel.app
2. **Login with test account**:
   - Email: `john@example.com`
   - Password: `password123`
3. **Verify features**:
   - ✅ Can browse products
   - ✅ Can search products
   - ✅ Can filter by category
   - ✅ Can add/remove favorites
   - ✅ Can view product details

---

## 4️⃣ Record Demo Video

### Tools:
- **Windows**: Game Bar (Win+G) or OBS Studio (free)
- **Mac**: QuickTime
- **Cross-platform**: OBS Studio (recommended)

### Demo Script (3-5 minutes):
1. Show deployed URL in browser
2. Click "Login" → demonstrate login with test account
3. **Browse products**: Show the 10 seed products
4. **Search**: Search for a product (e.g., "laptop")
5. **Filter**: Filter by category
6. **Add to favorites**: Click heart icon on a product
7. **View product detail**: Click on a product to see full details
8. **Responsive design**: Show on mobile/tablet view (F12 → Toggle device)
9. **Logout**: Show logout functionality
10. **Conclusion**: "All features working! Deployed and live!"

### Upload:
- YouTube (Unlisted): https://youtube.com
- Or save as MP4 file locally

---

## Common Issues & Solutions

### Backend not deploying:
- Check `.env` variables are set correctly in Render
- Verify MongoDB connection string is correct
- Check logs in Render dashboard

### Web app showing blank page:
- Verify `VITE_API_URL` env var is set in Vercel
- Check browser console (F12) for errors
- Redeploy from Vercel dashboard if needed

### API calls failing:
- Ensure backend URL in Vercel env var is correct
- Wait 2-3 minutes for Render backend to wake up (free tier has cold starts)

### CORS errors:
- Backend already has CORS enabled for all origins
- If issues persist, check backend logs in Render

---

## 📱 Mobile App (Optional)

To deploy React Native app:
- **iOS**: Use Expo (https://expo.dev)
- **Android**: Use Expo or build APK with Android Studio

For this assignment, web deployment is sufficient.

---

## Deadline: February 20, 2026
**Status**: ✅ Backend & Web deployed  
**Remaining**: Report live URLs + Demo video
