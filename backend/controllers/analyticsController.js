const Order = require('../model/Order');
const user = require('../model/User');
const Product = require('../model/Product');


const getAdminstats = async (req, res) => {
    try {
        const totalUsers = await user.countDocuments({role: "user"});
        const totalOrders = await Order.countDocuments({});
        const totalProducts = await Product.countDocuments({});

        const orders = await Order.find();


        const totalRevenueData = orders.reduce((acc, order) => acc + order.totalAmount, 0);
        res.status(200).json({
            totalUsers,
            totalOrders,
            totalProducts,
            totalRevenue: totalRevenueData,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Something went wrong while fetching admin stats" });
    }
};
module.exports = { getAdminstats };
