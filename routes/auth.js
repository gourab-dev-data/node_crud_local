const express = require('express');
const { register, login, getUser, forgetPassword, resetPassword, updateDetails, updatePassword } = require('../controllers/auth');

const User = require('../models/User');
const { protect } = require('../middleware/auth');

const router = express.Router();

//router.route('/').post(createUser);

router.post( '/register', register );
router.post( '/login', login );
router.post( '/forgetpassword', forgetPassword );
router.put( '/resetpassword/:resettoken', resetPassword );
router.get( '/me', protect, getUser );
router.put( '/updatedetails', protect, updateDetails );
router.put( '/updatepassword', protect, updatePassword );
module.exports = router;