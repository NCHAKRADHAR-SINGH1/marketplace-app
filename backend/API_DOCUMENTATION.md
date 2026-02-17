# 🛍️ Marketplace Backend API - Complete Documentation

## Overview

This is the backend server for the Marketplace application built with Node.js, Express, and MongoDB. It provides RESTful APIs for authentication, product management, and favorites.

## Technology Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Password Security**: bcrypt
- **Validation**: express-validator
- **CORS**: Enabled for cross-origin requests

## Project Structure

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
│   └── index.js                 # Main server file
├── package.json
├── .env.example
└── .gitignore
```

## Installation

### Prerequisites
- Node.js v16 or higher
- MongoDB (local or cloud)
- npm or yarn

### Setup Steps

```bash
# 1. Navigate to backend directory
cd backend

# 2. Install dependencies
npm install

# 3. Create .env file
cp .env.example .env

# 4. Update .env with your configuration
# Edit .env and set:
# - MONGODB_URI (MongoDB connection string)
# - JWT_SECRET (your secret key)
# - PORT (default: 5000)

# 5. Seed the database with initial data
npm run seed

# 6. Start development server
npm run dev

# Or start production server
npm start
```

## API Endpoints

### Base URL
```
http://localhost:5000/api
```

---

## Authentication Endpoints

### 1. POST /auth/register
Register a new user account

**URL**: `/auth/register`  
**Method**: `POST`  
**Authentication**: None  
**Rate Limit**: None

**Request Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Validation Rules**:
- `name`: Required, string
- `email`: Required, valid email format, must be unique
- `password`: Required, minimum 6 characters

**Response** (201 Created):
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZjZhNzU4YjliNGM1YzAwMmU5YzFjNDEiLCJpYXQiOjE2MDA2MDU2NzUsImV4cCI6MTYwMTIxMDQ3NX0.xN5BZHK3q9KxV-f5WcxCfKpPlVnWLgvfh78-5pY3nI0",
  "user": {
    "id": "5f6a758b9b4c5c002e9c1c41",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

**Error Responses**:
- `400 Bad Request`: Missing fields or validation error
- `400 Bad Request`: User already exists with that email

---

### 2. POST /auth/login
Authenticate user and get JWT token

**URL**: `/auth/login`  
**Method**: `POST`  
**Authentication**: None  
**Rate Limit**: None

**Request Body**:
```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Validation Rules**:
- `email`: Required, valid email format
- `password`: Required

**Response** (200 OK):
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZjZhNzU4YjliNGM1YzAwMmU5YzFjNDEiLCJpYXQiOjE2MDA2MDU2NzUsImV4cCI6MTYwMTIxMDQ3NX0.xN5BZHK3q9KxV-f5WcxCfKpPlVnWLgvfh78-5pY3nI0",
  "user": {
    "id": "5f6a758b9b4c5c002e9c1c41",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

**Error Responses**:
- `400 Bad Request`: Invalid credentials
- `400 Bad Request`: Missing email or password

---

## Product Endpoints

### 3. GET /products
Get all products with search, filters, and pagination

**URL**: `/products`  
**Method**: `GET`  
**Authentication**: None (public endpoint)  
**Rate Limit**: None

**Query Parameters**:
| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| search | string | No | "" | Search term for full-text search |
| page | number | No | 1 | Page number for pagination |
| limit | number | No | 10 | Number of items per page |
| category | string | No | "all" | Filter by category |

**Example Request**:
```
GET /products?search=headphones&page=1&limit=10&category=Electronics
```

**Response** (200 OK):
```json
{
  "products": [
    {
      "_id": "5f6a758b9b4c5c002e9c1c42",
      "title": "Wireless Headphones",
      "description": "High-quality wireless headphones with noise cancellation",
      "price": 199.99,
      "image": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
      "category": "Electronics",
      "rating": 4.8,
      "reviews": 234,
      "createdAt": "2024-02-17T10:30:00.000Z",
      "updatedAt": "2024-02-17T10:30:00.000Z"
    }
  ],
  "pagination": {
    "total": 50,
    "page": 1,
    "limit": 10,
    "pages": 5
  }
}
```

---

### 4. GET /products/:id
Get a single product by ID

**URL**: `/products/:id`  
**Method**: `GET`  
**Authentication**: None (public endpoint)  
**Rate Limit**: None

**URL Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | string | Yes | MongoDB ObjectId of the product |

**Example Request**:
```
GET /products/5f6a758b9b4c5c002e9c1c42
```

**Response** (200 OK):
```json
{
  "_id": "5f6a758b9b4c5c002e9c1c42",
  "title": "Wireless Headphones",
  "description": "High-quality wireless headphones with noise cancellation and 30-hour battery life",
  "price": 199.99,
  "image": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
  "category": "Electronics",
  "rating": 4.8,
  "reviews": 234,
  "createdAt": "2024-02-17T10:30:00.000Z",
  "updatedAt": "2024-02-17T10:30:00.000Z"
}
```

**Error Responses**:
- `404 Not Found`: Product with given ID not found

---

### 5. POST /products
Create a new product (Admin only)

**URL**: `/products`  
**Method**: `POST`  
**Authentication**: Required (Bearer Token)  
**Rate Limit**: None

**Headers**:
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body**:
```json
{
  "title": "Gaming Mouse",
  "description": "High-precision gaming mouse with RGB lighting",
  "price": 79.99,
  "image": "https://images.unsplash.com/...",
  "category": "Electronics",
  "rating": 4.5,
  "reviews": 120
}
```

**Response** (201 Created):
```json
{
  "message": "Product created successfully",
  "product": {
    "_id": "5f6a758b9b4c5c002e9c1c50",
    "title": "Gaming Mouse",
    "description": "High-precision gaming mouse with RGB lighting",
    "price": 79.99,
    "image": "https://images.unsplash.com/...",
    "category": "Electronics",
    "rating": 4.5,
    "reviews": 120,
    "createdAt": "2024-02-17T10:35:00.000Z",
    "updatedAt": "2024-02-17T10:35:00.000Z"
  }
}
```

---

### 6. PUT /products/:id
Update a product (Admin only)

**URL**: `/products/:id`  
**Method**: `PUT`  
**Authentication**: Required (Bearer Token)  
**Rate Limit**: None

**Headers**:
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body**: (Any field can be updated)
```json
{
  "title": "Updated Product Name",
  "price": 89.99,
  "rating": 4.7
}
```

**Response** (200 OK):
```json
{
  "message": "Product updated successfully",
  "product": { /* updated product */ }
}
```

---

### 7. DELETE /products/:id
Delete a product (Admin only)

**URL**: `/products/:id`  
**Method**: `DELETE`  
**Authentication**: Required (Bearer Token)  
**Rate Limit**: None

**Headers**:
```
Authorization: Bearer <token>
```

**Response** (200 OK):
```json
{
  "message": "Product deleted successfully"
}
```

---

## Favorites Endpoints

### 8. POST /products/favorite/add
Add a product to user's favorites

**URL**: `/products/favorite/add`  
**Method**: `POST`  
**Authentication**: Required (Bearer Token)  
**Rate Limit**: None

**Headers**:
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body**:
```json
{
  "productId": "5f6a758b9b4c5c002e9c1c42"
}
```

**Response** (200 OK):
```json
{
  "message": "Product added to favorites",
  "favorites": [
    "5f6a758b9b4c5c002e9c1c42",
    "5f6a758b9b4c5c002e9c1c50"
  ]
}
```

**Error Responses**:
- `400 Bad Request`: Product already in favorites
- `404 Not Found`: User not found

---

### 9. POST /products/favorite/remove
Remove a product from user's favorites

**URL**: `/products/favorite/remove`  
**Method**: `POST`  
**Authentication**: Required (Bearer Token)  
**Rate Limit**: None

**Headers**:
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body**:
```json
{
  "productId": "5f6a758b9b4c5c002e9c1c42"
}
```

**Response** (200 OK):
```json
{
  "message": "Product removed from favorites",
  "favorites": [
    "5f6a758b9b4c5c002e9c1c50"
  ]
}
```

---

### 10. GET /products/user/favorites
Get all user's favorite products

**URL**: `/products/user/favorites`  
**Method**: `GET`  
**Authentication**: Required (Bearer Token)  
**Rate Limit**: None

**Headers**:
```
Authorization: Bearer <token>
```

**Response** (200 OK):
```json
[
  {
    "_id": "5f6a758b9b4c5c002e9c1c42",
    "title": "Wireless Headphones",
    "description": "...",
    "price": 199.99,
    "image": "https://...",
    "category": "Electronics",
    "rating": 4.8,
    "reviews": 234,
    "createdAt": "2024-02-17T10:30:00.000Z",
    "updatedAt": "2024-02-17T10:30:00.000Z"
  }
]
```

---

## Authentication

### JWT Token Format
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Token Expiration
- **Expires In**: 7 days
- **Refresh**: Login again to get a new token

### Required Headers for Protected Routes
```
Authorization: Bearer <token>
```

---

## Error Handling

### Standard Error Response Format
```json
{
  "message": "Error description",
  "errors": [
    {
      "msg": "Validation error message",
      "param": "field_name"
    }
  ]
}
```

### HTTP Status Codes
| Code | Meaning |
|------|---------|
| 200 | OK - Request succeeded |
| 201 | Created - Resource created successfully |
| 400 | Bad Request - Invalid input or validation error |
| 401 | Unauthorized - Missing or invalid token |
| 404 | Not Found - Resource not found |
| 500 | Internal Server Error - Server error |

---

## Database Models

### User Schema
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique, lowercase),
  password: String (bcrypt hashed),
  favorites: [ObjectId], // References to Product IDs
  createdAt: Date,
  updatedAt: Date
}
```

### Product Schema
```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  price: Number (>= 0),
  image: String (URL),
  category: String,
  rating: Number (0-5),
  reviews: Number (>= 0),
  createdAt: Date,
  updatedAt: Date
}
```

---

## Environment Variables

```env
PORT=5000                                    # Server port
MONGODB_URI=mongodb://localhost:27017/marketplace  # Database URL
JWT_SECRET=your_secret_key_here             # JWT secret key
NODE_ENV=development                        # Environment (development/production)
```

---

## Test Credentials

```
User 1:
  Email: john@example.com
  Password: password123

User 2:
  Email: jane@example.com
  Password: password456
```

---

## Running the Server

### Development Mode
```bash
npm run dev
```
Runs with nodemon for auto-reload.

### Production Mode
```bash
npm start
```

### Seed Database
```bash
npm run seed
```
Creates 10 sample products and 2 test users.

---

## Troubleshooting

### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
- Ensure MongoDB is running
- Check MONGODB_URI in .env
- Verify database credentials

### Port Already in Use
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9
# Or use different port
PORT=5001 npm run dev
```

### JWT Token Expired
- The token expires after 7 days
- User needs to login again to get a new token

### CORS Errors
- Frontend must be on a different port/domain
- CORS is enabled in the backend
- Check that frontend is making requests to correct URL

---

## Security Best Practices

✅ **Implemented**:
- Password hashing with bcrypt (10 salt rounds)
- JWT-based authentication
- Protected routes
- Input validation
- CORS enabled
- Proper HTTP status codes

⚠️ **For Production**:
- Use HTTPS/SSL
- Store JWT_SECRET in env variable
- Implement rate limiting
- Add request logging
- Set secure CORS origins
- Use strong JWT_SECRET (32+ characters)
- Enable database authentication
- Regular security audits

---

## Future Enhancements

- [ ] Order management system
- [ ] Payment integration (Stripe/PayPal)
- [ ] User profile management
- [ ] Product reviews and ratings
- [ ] Admin dashboard
- [ ] Email notifications
- [ ] Cart functionality
- [ ] Wishlist/favorites persistence
- [ ] Product recommendations
- [ ] Inventory management

---

**Created**: February 2026  
**Last Updated**: February 17, 2026
