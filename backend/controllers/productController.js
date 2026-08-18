const Product = require('../model/Product');
const cloudinary = require('../utils/cloudinary');

//get all products
const getProducts = async (req, res) => {
    try {

        const { category, brand } = req.query;

        let filter = {};

        // Filter by category
        if (category && category !== "All") {
            filter.category = category;
        }

        // Filter by brand
        if (brand && brand !== "All") {
            filter.brand = brand;
        }

        const products = await Product.find(filter);

        res.json(products);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


//get product by id
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            res.json(product);  
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};



//create product
const createProduct = async (req, res) => {
    try {
        const { name, description, price, brand, category, stock } = req.body;
        let imageUrl = ''; 
         if (req.file) {
                const result = await cloudinary.uploader.upload(req.file.path);
                imageUrl = result.secure_url;
            }
            const product = new Product({
                name,
                description,
                price,
                brand,
                category,
                stock,
                imageUrl
            });

            const createdProduct = await product.save();
            res.status(201).json(createdProduct);
        } catch (error) {
            res.status(500).json({ message:  error.message });
        }
}



//update product
const updateProduct = async (req, res) => {
    try {   
        const { name, description, price, brand, category, stock } = req.body;
        const product = await Product.findById(req.params.id);
        if (product) {
            product.name = name || product.name;    
            product.description = description || product.description;
            product.price = price || product.price;
            product.brand = brand || product.brand;
            product.category = category || product.category;
            product.stock = stock || product.stock;
            if (req.file) {
                const result = await cloudinary.uploader.upload(req.file.path);
                product.imageUrl = result.secure_url;
            }
            const updatedProduct = await product.save();
            res.json(updatedProduct);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};



//delete product
const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            await product.deleteOne();
            res.json({ message: 'Product removed' });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};

