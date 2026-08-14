# Shoeverse

Shoeverse is a full-stack e-commerce application built for modern online retail workflows, combining a React frontend with a Node.js/Express backend and MongoDB data layer. The platform supports customer browsing, registration, OTP verification, secure checkout, coupon usage, payment processing, and admin inventory and order management.

## Overview

This project is designed to mirror a real-world online store experience, from landing on the storefront to placing an order and managing the business behind the scenes. It includes both customer-facing pages and an administrative dashboard for store operations.

## Key Features

### Customer Experience
- User registration with email OTP verification
- Login and authenticated user sessions using JWT
- Product catalog with individual product detail pages
- Shopping cart and order summary updates
- Discount coupon support during checkout
- Razorpay payment integration
- Order confirmation and success flow
- User profile with order history

### Admin Workflow
- Admin login protection and authorization middleware
- Dashboard overview for store management
- Product management: view, add, edit, and delete products
- Order administration and tracking
- User management visibility
- Coupon creation and management
- Image upload handling with Cloudinary

### Technical Capabilities
- RESTful API design with Express.js
- MongoDB-based storage and schema modeling
- Email service for OTP and user communication
- Frontend routing for storefront and admin pages
- Production-ready static frontend serving from Express

---

## Project Workflow

### 1. User Registration and Authentication
1. A new user registers with name, email, and password.
2. The backend creates a user record and generates a 6-digit OTP.
3. The OTP is sent to the user’s email for verification.
4. The user verifies the OTP on the dedicated verification screen.
5. On successful verification, the user is logged in and a JWT token is issued.

### 2. Shopping and Product Discovery
- Customers can browse the shop page and view featured products.
- Each product page displays details, pricing, and product imagery.
- Users can add products to the cart and update quantities before checkout.

### 3. Checkout and Coupon Flow
- Users proceed to checkout after confirming cart items.
- They can apply a valid coupon code.
- The backend validates coupon expiry, activity status, and discount rules.
- Discounted totals are reflected before payment is initiated.

### 4. Payment and Order Placement
- The frontend creates a Razorpay order request.
- Payment is processed securely through Razorpay.
- Payment verification is completed on the backend.
- Once verified, an order is created and saved to MongoDB.
- The user is redirected to the order success page.

### 5. Admin Management
- Admin users can access the dashboard.
- Admins can manage products, users, orders, and promotional coupons.
- They can add product images using Cloudinary integration and create special discount codes for customers.

---

## Tech Stack

### Frontend
- React
- React Router DOM
- Redux Toolkit
- CSS Modules and custom styling

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT for authentication
- Cloudinary for image uploads
- Razorpay for payments
- Nodemailer for email automation
- Multer for file handling

### Tools
- npm
- Concurrently
- Nodemon
- dotenv

---

## Project Structure

```text
Ecommers/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── model/
│   ├── routes/
│   ├── uploads/
│   ├── utils/
│   ├── .env
│   ├── index.js
│   ├── package.json
│   ├── seed.js
│   └── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── build/
├── package.json
├── README.md
└── .gitignore
```

---

## Prerequisites

Before running the project, make sure the following are installed:

- Node.js v18 or newer
- npm
- MongoDB running locally or via a cloud MongoDB service
- A valid email account for OTP delivery
- Razorpay account credentials for payment integration
- Cloudinary credentials for product image uploads

---

## Environment Setup

Create a `.env` file in the `backend` folder with the following variables:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
EMAIL_USER=your_email_address
EMAIL_PASS=your_email_password
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
FRONTEND_URL=http://localhost:3000
```

> The frontend is configured to communicate with the backend on `http://localhost:5000` during local development.

---

## Installation

From the root project directory:

```bash
npm install
```

This installs both the backend and frontend dependencies.

---

## Running the Project

### Start both frontend and backend together

```bash
npm run dev
```

### Start backend only

```bash
cd backend
npm run dev
```

### Start frontend only

```bash
cd frontend
npm start
```

### Seed the database

```bash
cd backend
npm run seed
```

---

## Local URLs

- Frontend: http://localhost:3000
- Backend: http://localhost:5000

---

## Typical User Journey

1. Visit the storefront homepage
2. Register a new account and verify OTP
3. Browse products and add items to cart
4. Apply an available coupon
5. Complete the checkout flow
6. Pay using Razorpay
7. View order confirmation and profile history

---

## Admin Journey

1. Sign in as an admin
2. Open the admin dashboard
3. Manage products, users, and orders
4. Create promotional coupons
5. Review customer purchase activity and maintain the store catalog

---

## Notes

- MongoDB must be running before starting the backend.
- For production deployment, the backend serves the frontend build from the `frontend/build` folder.
- Credentials and secret keys should be kept private and stored securely.

---

## License

This project is intended for educational, personal, and portfolio use.
