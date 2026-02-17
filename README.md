# 🛍️ Micro Marketplace App - Full Stack Project

A complete full-stack marketplace application with backend API, responsive web app, and mobile app.

## 📋 Project Structure

```
marketplace/
├── backend/              # Node.js + Express + MongoDB
├── web/                  # React + Vite (This folder)
├── mobile/               # React Native
└── README.md
```

## ✨ Features

### Backend API
- ✅ User authentication with JWT
- ✅ Product CRUD operations
- ✅ Full-text search with pagination
- ✅ Favorites management
- ✅ Password hashing with bcrypt
- ✅ 10 seed products + 2 test users

### Web App
- ✅ Responsive design (mobile-first)
- ✅ User registration and login
- ✅ Product listing with search and filters
- ✅ Product details page
- ✅ Add/remove favorites
- ✅ Animated UI with Framer Motion
- ✅ Beautiful dark theme with gradients

### Mobile App (React Native)
- ✅ Cross-platform support
- ✅ User authentication
- ✅ Browse products
- ✅ Product details
- ✅ Favorites management

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (locally or cloud URI)
- npm or yarn

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create .env file:**
   ```bash
   cp .env.example .env
   ```

4. **Update .env with your MongoDB URI:**
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/marketplace
   JWT_SECRET=your_secret_key_here
   NODE_ENV=development
   ```

5. **Seed the database:**
   ```bash
   npm run seed
   ```

6. **Start the server:**
   ```bash
   npm run dev
   ```

   Server will run on `http://localhost:5000`

### Web App Setup

1. **Navigate to web directory:**
   ```bash
   cd ../web  # (or create a web folder and run from frontEnd)
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

   Web app will run on `http://localhost:5173`

4. **Build for production:**
   ```bash
   npm run build
   ```

### Mobile App Setup

1. **Navigate to mobile directory:**
   ```bash
   cd ../mobile
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **For iOS (macOS only):**
   ```bash
   npm run ios
   ```

4. **For Android:**
   ```bash
   npm run android
   ```

## 🔑 Test Credentials

Use these credentials to test the application:

| Email | Password |
|-------|----------|
| john@example.com | password123 |
| jane@example.com | password456 |

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

#### POST /auth/register
Register a new user

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

#### POST /auth/login
Login user

**Request:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### Product Endpoints

#### GET /products
Get all products with search and pagination

**Query Parameters:**
- `search` (optional): Search term
- `category` (optional): Filter by category
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)

**Response:**
```json
{
  "products": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "title": "Wireless Headphones",
      "description": "High-quality wireless headphones",
      "price": 199.99,
      "image": "https://...",
      "category": "Electronics",
      "rating": 4.8,
      "reviews": 234,
      "createdAt": "2024-02-17T..."
    }
  ],
  "pagination": {
    "total": 10,
    "page": 1,
    "limit": 10,
    "pages": 1
  }
}
```

#### GET /products/:id
Get single product

**Response:**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "title": "Wireless Headphones",
  "description": "High-quality wireless headphones",
  "price": 199.99,
  "image": "https://...",
  "category": "Electronics",
  "rating": 4.8,
  "reviews": 234
}
```

#### POST /products/favorite/add
Add product to favorites (requires authentication)

**Headers:**
```
Authorization: Bearer <token>
```

**Request:**
```json
{
  "productId": "507f1f77bcf86cd799439011"
}
```

**Response:**
```json
{
  "message": "Product added to favorites",
  "favorites": ["507f1f77bcf86cd799439011", "507f1f77bcf86cd799439012"]
}
```

#### POST /products/favorite/remove
Remove product from favorites (requires authentication)

**Headers:**
```
Authorization: Bearer <token>
```

**Request:**
```json
{
  "productId": "507f1f77bcf86cd799439011"
}
```

**Response:**
```json
{
  "message": "Product removed from favorites",
  "favorites": ["507f1f77bcf86cd799439012"]
}
```

#### GET /products/user/favorites
Get user's favorite products (requires authentication)

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Wireless Headphones",
    "price": 199.99,
    ...
  }
]
```

## 🎨 UI Features

### Web App
- **Dark Theme**: Comfortable dark interface with accent colors
- **Animations**: Smooth page transitions and interactive elements using Framer Motion
- **Responsive Grid**: Product cards that adapt to all screen sizes
- **Category Filters**: Quick filtering by product categories
- **Search Functionality**: Real-time search with pagination
- **Favorite Heart Animation**: Interactive favorite button with visual feedback

### Mobile App
- **Native UI**: Platform-specific design (iOS/Android)
- **Touch Gestures**: Smooth navigation and interactions
- **Performance Optimized**: Efficient loading and caching

## 💾 Database Schema

### User
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  favorites: [ObjectId] (references to Products),
  createdAt: Date,
  updatedAt: Date
}
```

### Product
```javascript
{
  title: String,
  description: String,
  price: Number,
  image: String (URL),
  category: String,
  rating: Number (0-5),
  reviews: Number,
  createdAt: Date,
  updatedAt: Date
}
```

## 🔐 Security Features

- ✅ JWT-based authentication
- ✅ Password hashing with bcrypt (10 salt rounds)
- ✅ Protected routes requiring authentication
- ✅ CORS enabled for cross-origin requests
- ✅ Input validation using express-validator
- ✅ Proper HTTP status codes

## 📱 Sample Products

The seed script creates 10 sample products in categories:
- Electronics (Headphones, Smartwatch, Portable Charger, Mechanical Keyboard, Blue Light Glasses)
- Sports (Water Bottle, Yoga Mat)
- Food & Beverage (Organic Coffee)
- Kitchen (Bamboo Cutting Board Set)
- Health & Beauty (Essential Oils Kit)

## 🌐 Deployment

### Backend (Heroku/Railway/Render)
1. Push code to GitHub
2. Connect repository to deployment platform
3. Set environment variables
4. Deploy

### Web App (Vercel/Netlify)
1. Build: `npm run build`
2. Connect repository to deployment platform
3. Deploy

### Mobile App (App Store/Play Store)
1. Generate signed APK/IPA
2. Submit to respective stores

## 🐛 Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check MONGODB_URI in .env file
- Verify database credentials

### Port Already in Use
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Or use different port
PORT=5001 npm run dev
```

### CORS Issues
- Verify backend is running
- Check API_BASE_URL in frontend config
- Ensure CORS is enabled in Express

## 📞 Support

For issues or questions:
1. Check the troubleshooting section
2. Review API documentation
3. Check console for error messages
4. Verify environment variables

## 📄 License

This project is open source and available under the MIT License.

---

**Created:** February 2026  
**Full Stack Marketplace Application**
