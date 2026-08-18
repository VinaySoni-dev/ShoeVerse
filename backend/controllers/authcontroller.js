const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sendEmail = require('../utils/sendemail');


const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

//register a new user 
const registerUser = async (req, res) => {

    const { name, email, password } = req.body;      //the data is coming from the frontend in the form of json object and we are destructuring it here
    try {
        const existingUser = await User.findOne({ email });      //check if the user already exists in the database
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const salt = await bcrypt.genSalt(10);        //generate a salt for hashing the password
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({ name, email, password: hashedPassword, verified: false });      //create a new user
        if (user) {
            const otp = Math.floor(100000 + Math.random() * 900000).toString();      //generate a random 6 digit otp

            user.otp = otp;
            user.otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

            await user.save();

            const message = `                                                        
            Dear ${name},

            Welcome to ShoevVerse!

            Thank you for registering with us. We're excited to have you as part of our community.

            Your One-Time Password (OTP) for account registration is:

            ${otp}

            This OTP is valid for a limited time. Please do not share it with anyone for security reasons.

            If you did not request this registration, please ignore this email.

            Best regards,
            The ShoevVerse Team`; //message to be sent to the user by email

            await sendEmail(email,"Verify Your ShoevVerse Account - OTP Inside",message);           //send the email to the user in the from of to, subject, message   

            return res.status(201).json({ 
                message: "OTP sent successfully.",
                email: user.email
             });                                 


        }
        else {
            return res.status(400).json({ message: 'Invalid user data' });
        }
    }
    catch (error) {
        return res.status(500).json({ message: 'Server error' });
    }
};





//login a user
const LoginUser = async (req, res) => {                               
    const { email, password } = req.body;                        //the data is coming from the frontend in the form of json object and we are destructuring it here
    try {
        const user = await User.findOne({ email });               //find the user in the database by email
        if (user && (await bcrypt.compare(password, user.password))) {           //check if the user exists and the password is correct
            if (!user.verified) {
             return res.status(401).json({
                message: "Please verify your email before logging in."
            });
            }

            return res.status(200).json({                                   //return the user data and the token to the frontend
                _id: user._id, 
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id)
            });
        } else {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Server error' });
    }
};    




//get all users
const getUsers = async (req, res) => {
    try {
        const users = await User.find({}).select('-password');          //find all the users in the database
        res.json(users);                                                     //return the users to the frontend
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};



//verify user OTP
const verifyOtp = async (req, res) => {
    const { email, otp } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        if (user.otp.toString() !== otp.toString()) {
            return res.status(400).json({
                message: "Invalid OTP"
            });
        }

        if (user.otpExpires < Date.now()) {
            return res.status(400).json({
                message: "OTP expired"
            });
        }

        user.verified = true;
        user.otp = null;
        user.otpExpires = null;

        await user.save();

        return res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id)
        });

    } catch (error) {
        return res.status(500).json({
            message: "Server error"
        });
    }
};

module.exports = { registerUser, LoginUser, getUsers, verifyOtp };

