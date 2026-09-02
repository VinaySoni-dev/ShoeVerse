const Order = require('../model/Order');
const Product = require('../model/Product');


const sendemail = require('../utils/sendemail');

const createOrder = async (req, res) => {
  try {
    const { items, totalAmount, address, paymentId } = req.body;

    if (!items || items.length === 0 || !totalAmount || !address) {
      return res.status(400).json({
        message: 'Invalid order data'
      });
    }

    // Check and reduce stock for every product
    for (const item of items) {
      const product = await Product.findOneAndUpdate(
        {
          _id: item.productId,
          stock: { $gte: item.qty }
        },
        {
          $inc: { stock: -item.qty }
        },
        {
          new: true
        }
      );

      if (!product) {
        return res.status(400).json({
          message: `Insufficient stock for product ${item.productId}`
        });
      }
    }

    // Create order
    const order = new Order({
      user: req.user._id,
      items,
      totalAmount,
      address,
      paymentId
    });

    await order.save();

    const message = `Dear ${req.user.name},

Your order has been successfully created. Here are the details:

Order ID: ${order._id}
Total Amount: ${order.totalAmount}
Shipping Address: 
${order.address.fullName}
${order.address.street}
${order.address.city}
${order.address.postalCode}
${order.address.country}

We will notify you once your order is shipped.

Thank you for shopping with us!

Best regards,
ShoeVerse Team`;

try {
  await sendemail(
    req.user.email,
    'Order Created',
    message
  );
} catch (emailError) {
  console.error('Order email failed:', emailError);
}

res.status(201).json({
  message: 'Order created successfully',
  order
});



  } catch (error) {
    res.status(500).json({
      message: 'Error creating order',
      error
    });
  }
};




// my orders

const myOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id }).populate('items.productId', 'name price');
        res.json({ orders });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching orders', error });
    }
};





//get all orders (admin only)
const getOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('user', 'name email');
        res.json({ orders });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching orders', error });
    }
};





// Update order status (admin only)
const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const order = await Order.findById(req.params.id);
        if (order) {
            order.status = status;
            await order.save();
            res.json({ message: 'Order status updated successfully', order });
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating order status', error });
    }
};







module.exports = {
    createOrder,
    myOrders,
    getOrders,
    updateOrderStatus
};



