const express = require('express');
const { register } = require('../controllers/auth');

const User = require('../models/User');

const router = express.Router();

//router.route('/').post(createUser);

router.post( '/register', register );

module.exports = router;