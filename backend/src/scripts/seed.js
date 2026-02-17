require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const Product = require('../models/Product');

const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/marketplace';
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

const seedData = async () => {
  try {
    await connectDB();

    // Clear existing data
    await User.deleteMany({});
    await Product.deleteMany({});

    // Create test users
    const salt = await bcrypt.genSalt(10);
    const hashedPassword1 = await bcrypt.hash('password123', salt);
    const hashedPassword2 = await bcrypt.hash('password456', salt);

    const users = await User.insertMany([
      {
        name: 'John Doe',
        email: 'john@example.com',
        password: hashedPassword1,
        favorites: [],
      },
      {
        name: 'Jane Smith',
        email: 'jane@example.com',
        password: hashedPassword2,
        favorites: [],
      },
    ]);

    console.log('✓ Users created');

    // Create sample products
    const products = await Product.insertMany([
      {
        title: 'Premium Wireless Headphones',
        description:
          'High-quality wireless headphones with noise cancellation and 30-hour battery life',
        price: 199.99,
        image:
          'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
        category: 'Electronics',
        rating: 4.8,
        reviews: 234,
      },
      {
        title: 'Stainless Steel Water Bottle',
        description:
          'Keep your drinks cold for up to 24 hours with this durable water bottle',
        price: 29.99,
        image:
          'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500',
        category: 'Sports',
        rating: 4.5,
        reviews: 156,
      },
      {
        title: 'Organic Coffee Beans',
        description:
          'Premium organic coffee beans sourced from sustainable farms',
        price: 14.99,
        image:
          'https://images.unsplash.com/photo-1559056199-641a0ac8b3f4?w=500',
        category: 'Food & Beverage',
        rating: 4.7,
        reviews: 89,
      },
      {
        title: 'Yoga Mat',
        description: 'Non-slip yoga mat with carrying strap, ideal for all levels',
        price: 24.99,
        image:
          'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500',
        category: 'Fitness',
        rating: 4.4,
        reviews: 201,
      },
      {
        title: 'Portable Phone Charger',
        description: '20000mAh power bank with fast charging support',
        price: 34.99,
        image:
          'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500',
        category: 'Electronics',
        rating: 4.6,
        reviews: 342,
      },
      {
        title: 'Blue Light Blocking Glasses',
        description: 'Protect your eyes from screen fatigue with these stylish glasses',
        price: 44.99,
        image:
          'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500',
        category: 'Accessories',
        rating: 4.3,
        reviews: 127,
      },
      {
        title: 'Bamboo Cutting Board Set',
        description: 'Eco-friendly bamboo cutting boards with knife included',
        price: 39.99,
        image:
          'https://images.unsplash.com/photo-1578500494198-246f612d03b3?w=500',
        category: 'Kitchen',
        rating: 4.5,
        reviews: 98,
      },
      {
        title: 'Smart Watch',
        description: 'Feature-rich smartwatch with fitness tracking and notifications',
        price: 249.99,
        image:
          'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
        category: 'Electronics',
        rating: 4.7,
        reviews: 512,
      },
      {
        title: 'Aromatherapy Essential Oils Kit',
        description: '10 essential oils kit for diffusers and personal care',
        price: 29.99,
        image:
          'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=500',
        category: 'Health & Beauty',
        rating: 4.6,
        reviews: 178,
      },
      {
        title: 'Mechanical Keyboard',
        description: 'RGB backlit mechanical keyboard with Cherry MX switches',
        price: 129.99,
        image:
          'https://images.unsplash.com/photo-1587829191301-bae6d8e573f7?w=500',
        category: 'Electronics',
        rating: 4.8,
        reviews: 289,
      },
    ]);

    console.log('✓ Products created');

    // Add some products to favorites
    users[0].favorites = [products[0]._id, products[2]._id, products[4]._id];
    users[1].favorites = [products[1]._id, products[3]._id];

    await users[0].save();
    await users[1].save();

    console.log('✓ Favorites added');
    console.log('\n✓ Database seeded successfully!');
    console.log('\nTest Credentials:');
    console.log('User 1: john@example.com / password123');
    console.log('User 2: jane@example.com / password456');

    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedData();
