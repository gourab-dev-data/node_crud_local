const express = require('express');
const { register, login, getUser } = require('../controllers/auth');

const User = require('../models/User');
const { protect } = require('../middleware/auth');

const router = express.Router();

//router.route('/').post(createUser);

router.post( '/register', register );
router.post( '/login', login );
router.get( '/me', protect, getUser );

module.exports = router;