 const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const connectDB = require('./config/db');
const User = require('./model/User');
const Product = require('./model/Product');
const Order = require('./model/Order');

dotenv.config();

const seedDatabase = async () => {
  try {
    await connectDB();

    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const users = [
      {
        name: 'Admin User',
        email: 'admin@shoeverse.com',
        password: bcrypt.hashSync('Admin@123', 10),
        role: 'admin',
        verified: true,
      },
      {
        name: 'John Doe',
        email: 'john@example.com',
        password: bcrypt.hashSync('John1234', 10),
        role: 'user',
        verified: true,
      },
      {
        name: 'Jane Smith',
        email: 'jane@example.com',
        password: bcrypt.hashSync('Jane1234', 10),
        role: 'user',
        verified: true,
      },
    ];

    const createdUsers = await User.insertMany(users);

    const products = [
      {
        name: 'Black Running Shoes',
        description: 'Lightweight running shoes with cushioned sole',
        price: 85,
        category: 'Sports',
        stock: 30,
        imageUrl: 'https://example.com/images/black-running-shoes.jpg',
      },
      {
        name: 'White Casual Sneakers',
        description: 'Comfortable sneakers for everyday wear',
        price: 70,
        category: 'Casual',
        stock: 40,
        imageUrl: 'https://example.com/images/white-casual-sneakers.jpg',
      },
      {
        name: 'Brown Leather Boots',
        description: 'Durable boots with premium leather finish',
        price: 120,
        category: 'Formal',
        stock: 20,
        imageUrl: 'https://example.com/images/brown-leather-boots.jpg',
      },
    ];

    const createdProducts = await Product.insertMany(products);

    const orders = [
      {
        user: createdUsers[1]._id,
        items: [
          {
            productId: createdProducts[0]._id,
            qty: 2,
            price: createdProducts[0].price,
          },
          {
            productId: createdProducts[1]._id,
            qty: 1,
            price: createdProducts[1].price,
          },
        ],
        totalAmount: createdProducts[0].price * 2 + createdProducts[1].price,
        address: {
          fullName: 'John Doe',
          street: '123 Maple Street',
          city: 'Dallas',
          postalCode: '75201',
          country: 'USA',
        },
        paymetId: 'PAYMENT123456',
        status: 'processing',
      },
      {
        user: createdUsers[2]._id,
        items: [
          {
            productId: createdProducts[2]._id,
            qty: 1,
            price: createdProducts[2].price,
          },
        ],
        totalAmount: createdProducts[2].price,
        address: {
          fullName: 'Jane Smith',
          street: '456 Oak Avenue',
          city: 'Austin',
          postalCode: '73301',
          country: 'USA',
        },
        paymetId: 'PAYMENT987654',
        status: 'pending',
      },
    ];

    await Order.insertMany(orders);

    console.log('Seed data successfully created.');
    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
};

seedDatabase();
