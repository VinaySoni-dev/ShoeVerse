const express = require("express");
const router = express.Router();
const { registerUser, LoginUser, getUsers, verifyOtp } = require("../controllers/authcontroller");
const { protect } = require("../middleware/authMiddleware");
const { admin } = require("../middleware/adminMiddleware");


router.post("/register", registerUser);                          //register route
router.post("/Login", LoginUser);                                //login route
router.post("/verify-otp", verifyOtp);         // OTP verification route
router.get("/users", protect, admin, getUsers);                  //user route


module.exports = router;