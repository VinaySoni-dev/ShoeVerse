const admin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {          //check if the user is authenticated and has the role of admin
        next();                                            //if yes, allow the request to proceed to the next middleware or route handler
    } else {
        res.status(403).json({ message: 'Access denied. Admin only.' });
    }
};

module.exports = { admin };