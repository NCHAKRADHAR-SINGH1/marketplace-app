# 🚀 Marketplace Full Stack App - Complete Setup & Deployment Guide

## ✨ Project Overview

A complete full-stack marketplace application with:
- ✅ Backend: Node.js + Express + MongoDB with JWT auth
- ✅ Web: React + Vite with animations and responsive design
- ✅ Mobile: React Native for iOS/Android
- ✅ 10 seed products + 2 test users
- ✅ Full CRUD for products + favorites system
- ✅ Search + pagination functionality
- ✅ Beautiful dark theme UI with Framer Motion animations

---

## 📁 Project Structure

```
marketplace/
├── backend/
│   ├── src/
│   │   ├── config/database.js
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middleware/
│   │   ├── scripts/seed.js
│   │   └── index.js
│   ├── package.json
│   ├── .env
│   ├── API_DOCUMENTATION.md
│   └── README.md
├── web/ (frontEnd folder)
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── context/
│   │   ├── utils/
│   │   ├── styles/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   ├── vite.config.js
│   ├── index.html
│   └── src/index.css
├── mobile/
│   ├── src/
│   │   ├── screens/
│   │   ├── navigation/
│   │   ├── context/
│   │   ├── utils/
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   ├── app.json
│   └── README.md
└── README.md (Main)
```

---

## 🔧 Initial Setup

### 1. Prerequisites Installation

**Windows:**
```bash
# Download from nodejs.org
# Download MongoDB Community Edition from mongodb.com

# Or use package manager:
# Using Chocolatey
choco install nodejs mongodb

# Using WinGet
winget install OpenJS.NodeJS
winget install MongoDB.Server
```

**macOS:**
```bash
# Using Homebrew
brew install node
brew install mongodb-community
```

**Linux (Ubuntu/Debian):**
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
sudo apt-get update && sudo apt-get install -y mongodb-org
```

### 2. Verify Installation

```bash
node --version      # Should be v16+
npm --version       # Should be v8+
mongod --version    # Should be v5+
```

### 3. Start MongoDB

**Windows (CMD):**
```bash
mongod --dbpath "C:\data\db"
```

**macOS:**
```bash
mongod --dbpath /usr/local/var/mongodb
```

**Linux:**
```bash
sudo systemctl start mongod
```

### 4. Clone/Setup Project

```bash
# Navigate to your frontEnd directory
cd c:\Users\sanka\OneDrive\Desktop\frontEnd

# Project structure is already set up!
ls  # You should see: backend/, web/, mobile/, README.md
```

---

## 🖥️ Backend Setup

### Step 1: Install Dependencies

```bash
cd backend
npm install
```

### Step 2: Configure Environment

```bash
# .env file already created, verify it contains:
cat .env
```

Should contain:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/marketplace
JWT_SECRET=your_marketplace_jwt_secret_key_2024_change_this_in_production
NODE_ENV=development
```

### Step 3: Seed Database

```bash
npm run seed
```

You should see:
```
✓ Users created
✓ Products created
✓ Favorites added
✓ Database seeded successfully!

Test Credentials:
User 1: john@example.com / password123
User 2: jane@example.com / password456
```

### Step 4: Start Backend Server

```bash
npm run dev
```

Backend running on: `http://localhost:5000`

✅ **Backend Ready!**

---

## 🌐 Web App Setup

### Step 1: Install Dependencies

```bash
cd ../web  # or cd ../
npm install
```

### Step 2: Start Development Server

```bash
npm run dev
```

Web app running on: `http://localhost:5173`

### Step 3: Test the Web App

1. Open browser: `http://localhost:5173`
2. Register or login with:
   - Email: `john@example.com`
   - Password: `password123`
3. Browse products, search, filter by category
4. Add/remove favorites
5. Click on products to see details

✅ **Web App Ready!**

---

## 📱 Mobile App Setup

### Prerequisites for Mobile

- **iOS**: macOS + Xcode (iOS development)
- **Android**: Android Studio + Java SDK

### Step 1: Install Dependencies

```bash
cd ../mobile
npm install

# Install Pods (iOS only)
cd ios && pod install && cd ..
```

### Step 2: Configure Backend URL

Edit `src/utils/api.js` to point to your backend:
```javascript
const API_BASE_URL = 'http://localhost:5000/api';  // For local testing
// For physical device: use your machine's IP
// const API_BASE_URL = 'http://192.168.x.x:5000/api';
```

### Step 3: Run on Android

```bash
npm run android
```

### Step 4: Run on iOS

```bash
npm run ios
```

### Step 5: Test Mobile App

1. Login with test credentials
2. Browse products
3. Search and filter
4. Add to favorites
5. View profile

✅ **Mobile App Ready!**

---

## 📊 Running All Services Together

### Terminal 1: Backend
```bash
cd backend
npm run dev
# Server running on port 5000
```

### Terminal 2: Web App
```bash
cd web
npm run dev
# App running on port 5173
```

### Terminal 3: Mobile (Optional)
```bash
cd mobile
npm run android  # or npm run ios
```

---

## 🌍 Deployment

### Backend Deployment (Heroku/Railway/Render)

#### Using Render.com (Free):

1. **Create account** at `render.com`
2. **Connect GitHub repository** (if using git)
3. **Create new Web Service**
4. **Set environment variables**:
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_atlas_uri
   JWT_SECRET=your_production_secret_key
   NODE_ENV=production
   ```
5. **Deploy**

Backend URL: `https://your-app.onrender.com`

### Web App Deployment (Vercel/Netlify)

#### Using Vercel (Recommended):

1. **Create account** at `vercel.com`
2. **Import GitHub repository**
3. **Configure build settings**:
   - Framework: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. **Set environment variable**:
   ```
   VITE_API_URL=https://your-backend-url.onrender.com/api
   ```
5. **Deploy**

Web URL: `https://your-app.vercel.app`

### Update API URL in Code

After deployment, update `src/utils/api.js`:
```javascript
const API_BASE_URL = process.env.VITE_API_URL || 'http://localhost:5000/api';
```

### Mobile App Deployment

#### iOS App Store:
1. Create Apple Developer account ($99/year)
2. Build signed IPA with Xcode
3. Submit to App Store

#### Google Play Store:
1. Create Google Play Developer account ($25 one-time)
2. Build signed APK with Android Studio
3. Submit to Play Store

---

## 📝 API URLs Reference

### Local Development
```
Backend: http://localhost:5000/api
Web: http://localhost:5173
```

### Production (Example)
```
Backend: https://marketplace-backend.onrender.com/api
Web: https://marketplace-web.vercel.app
```

---

## 🔑 Test Credentials

```
Primary User:
  Email: john@example.com
  Password: password123

Secondary User:
  Email: jane@example.com
  Password: password456
```

---

## 🎨 UI Features

### Web App Features:
- ✅ Dark theme with gradients
- ✅ Smooth page transitions
- ✅ Animated product cards
- ✅ Interactive favorite button
- ✅ Category filters
- ✅ Search + pagination
- ✅ Responsive design
- ✅ Beautiful navigation bar

### Mobile App Features:
- ✅ Platform-specific design
- ✅ Touch-optimized UI
- ✅ Bottom tab navigation
- ✅ Product grid layout
- ✅ Smooth animations
- ✅ Favorites management

---

## 🐛 Troubleshooting

### Backend Issues

**Error: connect ECONNREFUSED**
```bash
# MongoDB not running
mongod --dbpath "path/to/db"
```

**Error: Port 5000 already in use**
```bash
# Use different port
PORT=5001 npm run dev

# Or kill the process
lsof -ti:5000 | xargs kill -9
```

**Error: MongoDB URI not found**
- Check `.env` file exists
- Verify `MONGODB_URI` is set correctly

### Web App Issues

**Error: Backend API not responding**
- Ensure backend is running on port 5000
- Check `src/utils/api.js` has correct API URL
- Check browser console for CORS errors

**Error: Products not loading**
- Verify backend is running
- Check network tab in DevTools
- Ensure database is seeded

**Error: Module not found**
```bash
# Reinstall dependencies
rm -rf node_modules
npm install
npm run dev
```

### Mobile App Issues

**Error: Cannot connect to backend**
- Use machine IP instead of localhost
- Update `src/utils/api.js`
- Check firewall settings

**Error: Build fails**
```bash
# Clean and rebuild
cd ios && pod deintegrate && pod install && cd ..
npm start -- --reset-cache
npm run android  # or ios
```

---

## 📚 File Reference

### Backend
- [API_DOCUMENTATION.md](backend/API_DOCUMENTATION.md) - Complete API docs
- [backend/README.md](backend/README.md) - Backend setup
- [backend/.env](backend/.env) - Configuration file

### Web App
- [src/App.jsx](web/src/App.jsx) - Main app component
- [src/pages/](web/src/pages/) - Page components
- [src/components/](web/src/components/) - Reusable components
- [src/styles/](web/src/styles/) - CSS files

### Mobile App
- [mobile/App.js](mobile/App.js) - Main app component
- [mobile/src/screens/](mobile/src/screens/) - Screen components
- [mobile/src/navigation/](mobile/src/navigation/) - Navigation setup

---

## 📞 Support & Resources

### Documentation
- [README.md](README.md) - Main project README
- [backend/API_DOCUMENTATION.md](backend/API_DOCUMENTATION.md) - Full API docs
- [backend/README.md](backend/README.md) - Backend details

### External Resources
- [Express.js Docs](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [React Native Docs](https://reactnative.dev/)
- [MongoDB Manual](https://docs.mongodb.com/manual/)
- [JWT.io](https://jwt.io/) - JWT explanation

### Common Issues
- Check `.env` configuration
- Ensure all services are running
- Clear browser cache
- Restart services if issues persist

---

## 🎯 Checklist

- [ ] MongoDB installed and running
- [ ] Backend dependencies installed
- [ ] Backend server running on port 5000
- [ ] Database seeded with test data
- [ ] Web app dependencies installed
- [ ] Web app running on port 5173
- [ ] Can login with test credentials
- [ ] Products displaying with images
- [ ] Search and filters working
- [ ] Favorites system working
- [ ] Mobile app building (optional)
- [ ] All tests passing

---

## 🚀 Next Steps

1. **Test the application** with demo credentials
2. **Explore product pages** and favorites
3. **Try search and filtering** functionality
4. **Check animations** on web app
5. **Optional**: Deploy to production
6. **Optional**: Build and release mobile app

---

## 📄 License

This project is open source and available for educational purposes.

**Project Status**: ✅ Complete and Ready to Use

**Last Updated**: February 17, 2026
