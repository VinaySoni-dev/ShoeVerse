const jwt = require('jsonwebtoken');
const User = require('../model/User');

const protect = async (req, res, next) => {      // this middleware function is used to protect the routes that require authentication. It checks if the user is authenticated by verifying the JWT token sent in the request headers. If the token is valid, it allows the request to proceed to the next middleware or route handler. If not, it returns a 401 Unauthorized response.
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {   //check if the authorization header is present and starts with 'Bearer'
        try {
            token = req.headers.authorization.split(' ')[1];     //get the token from the authorization header
            const decoded = jwt.verify(token, process.env.JWT_SECRET);   //verify the token using the secret key
            req.user = await User.findById(decoded.id).select('-password');  //find the user in the database by id and exclude the password field from the response
            next();                                                           
        } catch (error) {
            return res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        return res.status(401).json({ message: 'Not authorized, no token' });
    }
};

module.exports = { protect };