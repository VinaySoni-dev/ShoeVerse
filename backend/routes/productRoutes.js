const express = require('express');
const { protect } = require('../middleware/authmiddleware');
const { admin } = require('../middleware/adminMiddleware');
const { getProducts, createProduct, getProductById, updateProduct, deleteProduct } = require('../controllers/productController');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // Temporary storage for uploaded files



const router = express.Router();

//all products
router.route('/').get(getProducts).post(protect, admin, upload.single('image'), createProduct);      //if get request is made to /api/products then getProducts function will be called and if post request is made then createProduct function will be called
//specific product
router.route('/:id').get(getProductById).put(protect, admin, upload.single('image'), updateProduct).delete(protect, admin, deleteProduct);  //if get request is made to /api/products/:id then getProductById function will be called and if put request is made then updateProduct function will be called and if delete request is made then deleteProduct function will be called




module.exports = router;
