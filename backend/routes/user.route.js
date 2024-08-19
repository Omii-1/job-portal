const express = require('express');

const {userSignUp, userSignIn, userLogout, userDetails, userUpdate} = require("../controllers/user.controller")
const protectRoute  = require("../middlewares/protectRoute")

const router = express.Router();

router.post('/signup', userSignUp);
router.post('/signin', userSignIn);
router.post('/logout', userLogout);
router.get('/get-details', protectRoute, userDetails);
router.put('/update-details', protectRoute, userUpdate);

module.exports = router;