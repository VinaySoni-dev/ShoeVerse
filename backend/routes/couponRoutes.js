const express = require('express');
const { protect } = require('../middleware/authmiddleware');
const { admin } = require('../middleware/adminMiddleware');
const { createCoupon, getCoupons, deleteCoupon, applyCoupon } = require('../controllers/couponController');
const router = express.Router();


//create coupon - Admin only 
router.post('/',protect, admin, createCoupon);

// get all coupons - Admin only
router.get('/',protect, admin, getCoupons);

// Apply coupon - User
router.post('/apply', protect, applyCoupon);

//delete coupons - Admin only 
router.delete('/:id',protect, admin, deleteCoupon);

module.exports = router;
