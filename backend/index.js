const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://192.168.31.128:3000'
  ],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Backend testing API
app.get("/", (req, res) => {
  res.send("ShoeVerse backend is working properly");
});

// 1. Auth API
app.use('/api/auth', require('./routes/authRoutes'));

// 2. Product API
app.use('/api/products', require('./routes/productRoutes'));

// 3. Order API
app.use('/api/orders', require('./routes/orderRoutes'));

// 4. Payment API
app.use('/api/payments', require('./routes/paymentRoutes'));

// 5. Analytics API
app.use('/api/analytics', require('./routes/analyticsRoutes.js'));

// 6. Coupon API
app.use('/api/coupons', require('./routes/couponRoutes'));

const PORT = process.env.PORT || 5000;

// Listen on all network interfaces
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});