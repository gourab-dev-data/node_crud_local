const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require("./async");



//@dec      Register user
//@routes   POST /api/v1/auth/register
//@access   Public
exports.register = asyncHandler( async (req, res, next) => {
    //console.log(req.body);
    // const user = await User.create(req.body);
    // res.status(201).json({ success: true, data: user });
    const { name, email, password, role } = req.body;

    const user = await User.create({
        name,
        email,
        password,
        role
    });

    // Create token 
    sendTokenResponse(user, 200, res);
});

//@dec      Login user
//@routes   POST /api/v1/auth/login
//@access   Public
exports.login = asyncHandler( async (req, res, next) => {
    const { email, password } = req.body;
    // Validate email and password
    if(!email || !password){
        return next( new ErrorResponse('Please Provide an email and password', 400));
    }
    // Check for user
    const user = await User.findOne({ email }).select('+password');

    if(!user){
        return next( new ErrorResponse('Invalide credentials', 401));
    }

    // Check if password match
    const isMatch = await user.matchPassword(password);

    if(!isMatch){
        return next( new ErrorResponse('Password not match', 401));
    }

    // Create token 
    sendTokenResponse(user, 200, res);
});


// Get token from model, Create cookie and send response
const sendTokenResponse = ( user, statusCode, res ) => {
    //Create Token
    const token = user.getSignedJwtToken();

    const options = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly: true
    };

    if(process.env.NODE_ENV == 'production'){
        options.secure = true;
    }

    res.status(statusCode).cookie('token', token, options).json({ success: true, token: token });
}

//@dec      Get user
//@routes   GET /api/v1/auth/me
//@access   Public
exports.getUser = asyncHandler( async (req, res, next) => {
    const user = await User.findById(req.user.id);
    res.status(200).json({ success: true, data: user });
});