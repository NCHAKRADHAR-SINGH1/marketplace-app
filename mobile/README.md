# 📱 Marketplace Mobile App - React Native

A cross-platform mobile marketplace app built with React Native for iOS and Android.

## 🎯 Features

- ✅ User authentication (Login/Register)
- ✅ Browse marketplace products
- ✅ Search and filter products
- ✅ View detailed product information
- ✅ Add/remove favorites
- ✅ User profile
- ✅ Dark theme UI
- ✅ Bottom tab navigation
- ✅ Smooth animations

## 📋 Tech Stack

- **React Native** 0.72
- **React Navigation** - Navigation stack and tabs
- **Axios** - HTTP client
- **AsyncStorage** - Local data persistence
- **React Native Vector Icons** - Iconography

## 📁 Project Structure

```
mobile/
├── src/
│   ├── screens/
│   │   ├── LoginScreen.js
│   │   ├── RegisterScreen.js
│   │   ├── ProductsScreen.js
│   │   ├── ProductDetailScreen.js
│   │   └── ProfileScreen.js
│   ├── navigation/
│   │   └── RootNavigator.js
│   ├── context/
│   │   └── AuthContext.js
│   ├── utils/
│   │   └── api.js
│   ├── App.js
│   └── index.js
├── App.js
├── package.json
├── app.json
└── README.md
```

## 🚀 Quick Start

### Prerequisites

- Node.js v16+
- npm or yarn
- React Native CLI
- Xcode (for iOS) or Android Studio (for Android)

### Installation

```bash
# 1. Navigate to mobile directory
cd mobile

# 2. Install dependencies
npm install

# 3. Install pods (iOS only)
cd ios && pod install && cd ..
```

### Development Server

```bash
# Start Metro bundler
npm start

# In another terminal, run on iOS
npm run ios

# Or run on Android
npm run android
```

## 🔑 Test Credentials

```
Email: john@example.com
Password: password123

OR

Email: jane@example.com
Password: password456
```

## 📱 Screens

### 1. Login Screen
- Email and password input
- Demo credentials display
- Link to registration
- Loading state

### 2. Register Screen
- Full name, email, password input
- Password confirmation
- Link to login
- Validation feedback

### 3. Products Screen
- Product grid (2 columns)
- Search functionality
- Pagination controls
- Product cards with images, prices, ratings
- Tap to view details

### 4. Product Detail Screen
- Large product image
- Full description
- Star rating and reviews
- Category badge
- Favorite button
- Add to cart button

### 5. Profile Screen
- User information display
- App version info
- Platform information
- Logout button

## 🔌 API Integration

The app connects to the backend API running on `http://localhost:5000/api`.

### Authentication Endpoints
- `POST /auth/register` - Create new account
- `POST /auth/login` - User login

### Product Endpoints
- `GET /products` - Get all products with pagination
- `GET /products/:id` - Get product details
- `POST /products/favorite/add` - Add to favorites
- `POST /products/favorite/remove` - Remove from favorites
- `GET /products/user/favorites` - Get favorite products

## 🎨 Styling

- **Dark theme** (#0f172a background)
- **Primary color** (#6366f1 - Indigo)
- **Secondary color** (#ec4899 - Pink)
- **Custom animations** and transitions

## 💾 Data Persistence

User authentication tokens and data are stored locally using AsyncStorage:
- `userToken` - JWT authentication token
- `userData` - User profile information

## 🔐 Security

- JWT token stored in AsyncStorage
- Auto token injection in API requests
- Logout clears all stored data
- Secure password input fields

## 📡 Backend Configuration

Update the API base URL in `src/utils/api.js`:

```javascript
// Local testing (simulator)
const API_BASE_URL = 'http://localhost:5000/api';

// Physical device testing (replace with your IP)
const API_BASE_URL = 'http://192.168.x.x:5000/api';

// Production
const API_BASE_URL = 'https://your-production-api.com/api';
```

## 🏗️ Building for Production

### Android

```bash
# Build release APK
cd android
./gradlew assembleRelease

# APK location: android/app/build/outputs/apk/release/app-release.apk
```

### iOS

```bash
# Open Xcode project
open ios/Marketplace\ Mobile.xcworkspace

# Build for production in Xcode
# Product → Scheme → Edit Scheme → Run → Release

# Archive and export for distribution
```

## 🧪 Testing

Test features:
1. Register with new account
2. Login with test credentials
3. Search for products
4. Filter by category
5. Add/remove favorites
6. View product details
7. Check profile information
8. Logout

## 🐛 Troubleshooting

### Metro Bundler Error
```bash
npm start -- --reset-cache
```

### Android Build Error
```bash
cd android
./gradlew clean
cd ..
npm run android
```

### iOS Build Error
```bash
cd ios
pod deintegrate
pod install
cd ..
npm run ios
```

### API Connection Error
- Ensure backend is running
- For physical device, use machine IP (not localhost)
- Check firewall settings
- Update API_BASE_URL in `src/utils/api.js`

### AsyncStorage Error
```bash
npm start -- --reset-cache
npx react-native start --reset-cache
```

## 📚 Documentation

- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [React Navigation Docs](https://reactnavigation.org/)
- [Axios Documentation](https://axios-http.com/)

## 🤝 Contributing

Feel free to contribute improvements!

## 📄 License

This project is open source and available for educational purposes.

---

**Version**: 1.0.0  
**Last Updated**: February 17, 2026  
**Status**: ✅ Ready for Development & Distribution
