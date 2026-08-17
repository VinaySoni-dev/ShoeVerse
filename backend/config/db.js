const mongoose = require('mongoose');

//connection of mongoDB
const connectDB = async () => {
    try {       
       const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connect successfully');
    }
    catch (error) {
        console.error('mongoDB connection failed:', error.message);
        process.exit(1);
    }
};
module.exports = connectDB;