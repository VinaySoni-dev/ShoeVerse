const Coupon = require('../model/coupon');



//create coupon function.

const createCoupon = async (req, res) => {
    try {
        const {
            code,
            discountType,
            discountValue,
            minOrderAmount,
            maxDiscount,
            expiryDate,
            usageLimit
        } = req.body;

    //check required fields
    if (!code || !discountType || !discountValue || !expiryDate) {
        return res.status(400).json ({
            message: 'Please provide all required coupon fields'
        });

    }

    //check if coupon already exists
    const existingCoupon = await Coupon.findOne({
        code: code.toUpperCase()
    });

    if (existingCoupon) {
        return res.status(400).json({
            message: 'coupon code already exists'
        });
    }

    //create coupon 
    const coupon = await Coupon.create({
        code: code.toUpperCase(),
        discountType,
        discountValue,
        minOrderAmount: minOrderAmount || 0,
        maxDiscount: maxDiscount || null,
        expiryDate,
        usageLimit: usageLimit || null
    });

    res.status(201).json({
        message: 'coupon created successfully',coupon
    });

} catch (error) {
    res.status(500).json({
        message: 'Failed to create coupon0',error: error.message
    });
}
};


//get all coupon function

const getCoupons = async (req, res) => {
    try {
        const coupons = await Coupon.find({})
        .sort({ createdAt: -1});

        res.status(200).json({
            coupons
        });
    } catch (error) {
        res.status(500).json ({
            message: 'Failed to get coupons ',
            error: error.message
        });
    }
};

//delete coupon function 

const  deleteCoupon = async (req, res) => {
    try {
        const coupon = await Coupon.findById(req.params.id);
        
        if (!coupon){
           return res.status(404).json ({
            message: 'Coupon not found'
           });
        }

        await coupon.deleteOne();

        res.status(200).json({
            message: 'Coupon deleted successfulley'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Failed to delete coupon',
            error: error.message 
        });
    }
};


const  applyCoupon = async (req, res) => {
    try {
        const { code, cartTotal } = req.body;

        //check required fields 
        if (!code || cartTotal === undefined){
            return res.status(400).json({
                message: 'Coupon code and cart total are required '
            });
        }

        //find coupon
        const coupon = await Coupon.findOne({
            code: code.toUpperCase()
        });
        
        if (!coupon) {
            return res.status(404).json({
                message: 'Invalid coupon code'
            });
        }

        if (!coupon.isActive) {
            return res.status(400).json({
                message: 'this coupon is inactive'
            });
        }

        if (new Date() > coupon.expiryDate){
            return res.status(400).json ({
                message: 'This coupon has expired '
            });
        }

        if (
        coupon.usageLimit !== null &&
        coupon.usedCount >= coupon.usageLimit
         ) {
         return res.status(400).json({
             message: 'Coupon usage limit has been reached'
            });
         }

        if (cartTotal < coupon.minOrderAmount) {
            return res.status(400).json({
                message: `Minimun order amount is ₹${coupon.minOrderAmount}`
            });
        }

            // Calculate discount
    let discount = 0;

    if (coupon.discountType === 'percentage') {
      discount = (cartTotal * coupon.discountValue) / 100;
    } else if (coupon.discountType === 'fixed') {
      discount = coupon.discountValue;
    }

    // Apply maximum discount
    if (
      coupon.maxDiscount !== null &&
      discount > coupon.maxDiscount
    ) {
      discount = coupon.maxDiscount;
    }

    // Don't allow discount greater than cart total
    if (discount > cartTotal) {
      discount = cartTotal;
    }

    const finalAmount = cartTotal - discount;

    res.status(200).json({
      message: 'Coupon applied successfully',
      couponCode: coupon.code,
      discount,
      finalAmount
    });

    }catch (error) {
    res.status(500).json({
      message: 'Failed to apply coupon',
      error: error.message
    });
  }
};


module.exports = {
    createCoupon,
    getCoupons,
    deleteCoupon,
    applyCoupon
};