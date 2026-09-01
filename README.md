# ShoeVerse

ShoeVerse is a full-stack e-commerce web application built with React, Node.js, Express.js, and MongoDB. It provides a complete online shopping workflow including user registration, email OTP verification, product browsing, cart management, coupons, Razorpay payments, order management, and an admin dashboard.

## Live Demo

- Backend API: https://shoeverse-backend-t5dm.onrender.com
- Frontend: Deployed on Render

## Features

### Customer Features
- User registration and login
- Email OTP verification
- JWT-based authentication
- Product listing and product details
- Shopping cart and quantity management
- Coupon/discount support
- Razorpay payment integration
- Order creation and confirmation
- User profile and order history
- Responsive interface

### Admin Features
- Protected admin access
- Admin dashboard
- Add, edit, and delete products
- Product stock management
- Order management and status updates
- Coupon creation and management
- Cloudinary product image uploads
- Customer/order visibility

## Tech Stack

### Frontend
- React
- React Router DOM
- Redux Toolkit
- React Redux
- CSS
- Lucide React
- React Scripts

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- Cloudinary
- Razorpay
- Nodemailer / production email service
- Multer
- CORS
- dotenv

### Deployment and Tools
- Git
- GitHub
- Render
- npm
- Nodemon
- Concurrently

## Project Structure

```text
ShoeVerse/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── model/
│   ├── routes/
│   ├── uploads/
│   ├── utils/
│   ├── index.js
│   ├── server.js
│   ├── seed.js
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── redux/
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
├── package.json
├── README.md
└── .gitignore
```

> Do not upload `.env` files or private credentials to GitHub.

## Main Workflow

### Registration and Authentication
1. User registers with name, email, and password.
2. Backend creates the user and generates an OTP.
3. OTP is sent to the registered email.
4. User verifies the OTP.
5. JWT authentication is used for protected requests.

### Shopping
1. Browse products.
2. Open product details.
3. Add products to cart.
4. Update quantities.
5. Continue to checkout.

### Checkout and Payment
1. Enter shipping address.
2. Apply a valid coupon if available.
3. Create a Razorpay payment order.
4. Complete payment.
5. Verify payment on the backend.
6. Create and save the order in MongoDB.
7. Reduce product stock.
8. Send an order confirmation email when the configured email service is available.

### Admin
1. Sign in as admin.
2. Open the dashboard.
3. Manage products and stock.
4. Manage coupons.
5. View customer orders.
6. Update order status.

## Environment Variables

Create `backend/.env` for local development:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

EMAIL_USER=your_email_or_sender
EMAIL_PASS=your_email_service_password_or_api_key

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

FRONTEND_URL=http://localhost:3000
NODE_ENV=development
```

Never commit real secrets to GitHub.

## Installation

Clone the repository:

```bash
git clone https://github.com/VinaySoni-dev/ShoeVerse.git
cd ShoeVerse
```

Install root dependencies:

```bash
npm install
```

Install backend dependencies:

```bash
cd backend
npm install
```

Install frontend dependencies:

```bash
cd ../frontend
npm install
```

## Run Locally

### Backend

```bash
cd backend
npm run dev
```

Backend:

```text
http://localhost:5000
```

### Frontend

Open another terminal:

```bash
cd frontend
npm start
```

Frontend:

```text
http://localhost:3000
```

### Seed Database

```bash
cd backend
npm run seed
```

## API Routes

The backend contains API groups including:

```text
/api/auth
/api/products
/api/orders
/api/payment
/api/analytics
/api/coupons
```

The exact endpoints are defined in the corresponding route files.

## Frontend API Requests

During local development, the React application uses:

```json
"proxy": "http://localhost:5000"
```

API calls can therefore use relative paths such as:

```javascript
fetch("/api/products")
```

This avoids hard-coding the local backend URL throughout the frontend.

## Render Deployment

### Backend Web Service

For the backend Render Web Service, use:

```text
Root Directory: backend
Build Command: npm install
Start Command: node server.js
```

If you use `index.js` as the entry point instead:

```text
Start Command: node index.js
```

Add all required environment variables in Render.

Production values should include:

```env
NODE_ENV=production
FRONTEND_URL=https://your-frontend-url.onrender.com
```

Keep the following server-side secrets private:

```text
MONGO_URI
JWT_SECRET
EMAIL credentials/API keys
CLOUDINARY_API_SECRET
RAZORPAY_KEY_SECRET
```

The server should use:

```javascript
const PORT = process.env.PORT || 5000;
```

### Frontend Static Site

For the Render Static Site:

```text
Root Directory: frontend
Build Command: npm install && npm run build
Publish Directory: build
```

After deployment, copy the frontend Render URL and set it as:

```env
FRONTEND_URL=https://your-frontend-url.onrender.com
```

Then redeploy the backend.

## CORS

The backend should allow the deployed frontend URL:

```javascript
app.use(cors({
  origin: [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    process.env.FRONTEND_URL
  ],
  credentials: true
}));
```

## Email Service

The application sends OTP and/or order notification emails through the email utility.

For production deployment, configure the email provider using Render environment variables. If SMTP connections produce `ETIMEDOUT`, `ESOCKET`, or `ENETUNREACH`, use a production-friendly email API/service rather than an SMTP connection that is unavailable from the deployment environment.

## Payment

Razorpay is used for online payments.

Required variables:

```env
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

Never expose `RAZORPAY_KEY_SECRET` in frontend code.

## Cloudinary

Cloudinary is used for product image uploads.

```env
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

The Cloudinary API secret must remain on the backend.

## Security

Add these to `.gitignore`:

```gitignore
node_modules/
.env
.env.*
!.env.example
build/
uploads/*
```

Never commit:
- MongoDB passwords
- JWT secrets
- Razorpay secret keys
- Cloudinary API secrets
- Email passwords or API keys

If a secret is accidentally pushed to GitHub, revoke or rotate it immediately.

## Common Deployment Issues

### Case-sensitive filenames

Render runs on Linux, where filenames are case-sensitive.

For example, if the actual file is:

```text
authmiddleware.js
```

the import must match it exactly:

```javascript
require("../middleware/authmiddleware");
```

If you rename it to:

```text
authMiddleware.js
```

then use:

```javascript
require("../middleware/authMiddleware");
```

The same rule applies to files such as `sendemail.js` and their imports.

### Insufficient Stock

If the API returns:

```text
Insufficient stock for product ...
```

check the product stock in MongoDB and make sure the requested quantity is available.

### Email Connection Errors

Errors such as:

```text
ETIMEDOUT
ESOCKET
ENETUNREACH
```

usually indicate that the deployed server cannot establish the configured SMTP connection. Check the email provider configuration or use a production email API.

## Current Backend

Current Render backend:

```text
https://shoeverse-backend-t5dm.onrender.com
```

Backend health endpoint:

```text
https://shoeverse-backend-t5dm.onrender.com/
```

## Customer Journey

```text
Home
  ↓
Register
  ↓
Email OTP Verification
  ↓
Login
  ↓
Browse Products
  ↓
Add to Cart
  ↓
Checkout
  ↓
Apply Coupon
  ↓
Razorpay Payment
  ↓
Order Created
  ↓
Order Confirmation
  ↓
Profile / Order History
```

## Admin Journey

```text
Admin Login
  ↓
Admin Dashboard
  ↓
Manage Products
  ↓
Manage Stock
  ↓
Manage Coupons
  ↓
View Orders
  ↓
Update Order Status
```

## Future Improvements

- Product search and advanced filtering
- Wishlist
- Product reviews and ratings
- Improved email templates
- Order tracking
- Sales reports
- Advanced analytics
- Pagination
- Payment webhooks
- Improved admin management
- Automated deployment

## GitHub

Repository:

https://github.com/VinaySoni-dev/ShoeVerse

## License

This project is intended for educational, personal, and portfolio purposes.

© 2026 Vinay Soni. All rights reserved.
