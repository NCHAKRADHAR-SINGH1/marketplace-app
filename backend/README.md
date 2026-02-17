# 🖥️ Marketplace Backend - Node.js + Express + MongoDB

RESTful API backend for the marketplace application with JWT authentication, product management, and favorites system.

## 🎯 Features

- ✅ User registration and JWT authentication
- ✅ Complete product CRUD operations
- ✅ Full-text search with pagination
- ✅ Favorites management
- ✅ Input validation and error handling
- ✅ Password hashing with bcrypt
- ✅ CORS enabled
- ✅ 10 seed products + 2 test users

## 📋 Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Password Security**: bcrypt
- **Validation**: express-validator
- **HTTP Client**: axios (for testing)

## 📁 Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── database.js          # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js    # Auth logic
│   │   └── productController.js # Product logic
│   ├── middleware/
│   │   ├── auth.js              # JWT verification
│   │   └── validation.js        # Request validation
│   ├── models/
│   │   ├── User.js              # User schema
│   │   └── Product.js           # Product schema
│   ├── routes/
│   │   ├── authRoutes.js        # Auth endpoints
│   │   └── productRoutes.js     # Product endpoints
│   ├── scripts/
│   │   └── seed.js              # Database seeding
│   ├── index.js                 # Main server file
│   └── .env                     # Configuration
├── package.json
├── API_DOCUMENTATION.md         # Full API docs
└── README.md
```

## 🚀 Quick Start

### Prerequisites

- Node.js v16+
- MongoDB (local or cloud)
- npm or yarn

### Installation

```bash
# 1. Install dependencies
npm install

# 2. Create .env file (already exists)
# Verify it has correct configuration

# 3. Seed database with test data
npm run seed

# 4. Start development server
npm run dev
```

### Running the Server

**Development Mode** (with auto-reload):
```bash
npm run dev
```

**Production Mode**:
```bash
npm start
```

**Seed Database**:
```bash
npm run seed
```

Server will run on: `http://localhost:5000`

## 🔑 Test Credentials

```
User 1:
  Email: john@example.com
  Password: password123
  Favorites: Wireless Headphones, Coffee Beans, Portable Charger

User 2:
  Email: jane@example.com
  Password: password456
  Favorites: Water Bottle, Yoga Mat
```

## 📚 API Endpoints

### Base URL
```
http://localhost:5000/api
```

### Authentication

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

**Response (201):**
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGc...",
  "user": { "id": "...", "name": "John Doe", "email": "john@example.com" }
}
```

#### POST /auth/login
User login

**Request:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "message": "Login successful",
  "token": "eyJhbGc...",
  "user": { "id": "...", "name": "John Doe", "email": "john@example.com" }
}
```

### Products

#### GET /products
Get all products with search and pagination

**Query Parameters:**
- `search`: Search term
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)
- `category`: Filter by category

**Example:** `GET /products?search=headphones&page=1&limit=10&category=Electronics`

#### GET /products/:id
Get single product by ID

#### POST /products/favorite/add
Add product to favorites (Requires Auth)

**Headers:** `Authorization: Bearer <token>`

**Request:**
```json
{
  "productId": "507f1f77bcf86cd799439011"
}
```

#### POST /products/favorite/remove
Remove product from favorites (Requires Auth)

#### GET /products/user/favorites
Get user's favorite products (Requires Auth)

## 💾 Database Schema

### User Collection
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (bcrypt hashed),
  favorites: [ObjectId], // Product IDs
  createdAt: Date,
  updatedAt: Date
}
```

### Product Collection
```javascript
{
  _id: ObjectId,
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

## 🌾 Seed Data

The seed script creates:
- **2 test users** with pre-populated favorites
- **10 sample products** across 8 categories:
  - Electronics (5 products)
  - Sports (2 products)
  - Food & Beverage (1 product)
  - Kitchen (1 product)
  - Health & Beauty (1 product)

Run: `npm run seed`

## 🔐 Security Features

✅ **Implemented:**
- Password hashing with bcrypt (10 salt rounds)
- JWT token-based authentication
- Protected routes with auth middleware
- Input validation and sanitization
- CORS enabled
- Proper HTTP status codes
- Error handling and logging

## 🌍 Environment Variables

```env
PORT=5000                                    # Server port
MONGODB_URI=mongodb://localhost:27017/<db>  # Database URL
JWT_SECRET=your_secret_key_here             # JWT secret
NODE_ENV=development                        # Environment
```

## 📡 API Response Format

### Success Response
```json
{
  "message": "Success message",
  "data": { /* response data */ },
  "user": { /* user info if applicable */ }
}
```

### Error Response
```json
{
  "message": "Error description",
  "errors": [
    { "msg": "Validation error", "param": "field_name" }
  ]
}
```

## 🐛 Troubleshooting

### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution:**
- Start MongoDB: `mongod --dbpath "path/to/db"`
- Check MONGODB_URI in .env

### Port Already in Use
```bash
# Windows: Find and kill process on port 5000
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux: 
lsof -ti:5000 | xargs kill -9

# Or use different port:
PORT=5001 npm run dev
```

### JWT Token Expired
- Token expires after 7 days
- User must login again
- Expired tokens return 401 Unauthorized

### CORS Error
- Ensure frontend URL is correct
- Check CORS middleware is enabled
- Frontend and backend might need different ports

## 🧪 Testing Endpoints

### Using cURL

**Register:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123"
  }'
```

**Login:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

**Get Products:**
```bash
curl http://localhost:5000/api/products
```

**Add to Favorites:**
```bash
curl -X POST http://localhost:5000/api/products/favorite/add \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"productId": "<product_id>"}'
```

### Using Postman

1. Import the collection from API_DOCUMENTATION.md
2. Set base URL: `http://localhost:5000/api`
3. Use provided examples for each endpoint

## 📄 Full API Documentation

See [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) for:
- Complete endpoint reference
- Detailed request/response formats
- Status codes and error handling
- Authentication details
- Code examples

## 🚀 Deployment

### Heroku Deployment

```bash
# 1. Install Heroku CLI
# 2. Create Heroku app
heroku create marketplace-app

# 3. Set config variables
heroku config:set MONGODB_URI=<your_mongodb_uri>
heroku config:set JWT_SECRET=<your_secure_secret>
heroku config:set NODE_ENV=production

# 4. Deploy
git push heroku main

# 5. View logs
heroku logs --tail
```

### Using Railway/Render

1. Connect your GitHub repository
2. Select Node.js as runtime
3. Set environment variables
4. Deploy!

## 📊 Performance

- ✅ Indexed full-text search on products
- ✅ Pagination for large datasets
- ✅ Connection pooling with MongoDB
- ✅ Efficient JWT verification
- ✅ Error handling prevents crashes

## 🔄 Continuous Development

### Adding New Features

1. Create controller in `controllers/`
2. Add route to `routes/`
3. Update models if needed
4. Add middleware if required
5. Update API_DOCUMENTATION.md

### Database Migrations

```bash
# Backup database
mongodump --out ./backup

# Run migrations (create new script)
node src/scripts/migrate.js

# Restore if needed
mongorestore ./backup
```

## 📞 Support

For issues or questions:
1. Check API_DOCUMENTATION.md
2. Review error logs
3. Verify .env configuration
4. Check MongoDB connection
5. Verify all dependencies installed

## 📝 Notes

- Token expires in 7 days
- All passwords are hashed before storage
- Database is indexed for performance
- CORS is enabled for all origins
- Rate limiting not implemented (add for production)

## 📄 License

This project is open source and available for educational purposes.

---

**Version**: 1.0.0  
**Last Updated**: February 17, 2026  
**Status**: ✅ Production Ready
