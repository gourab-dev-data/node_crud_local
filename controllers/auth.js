const crypto = require('crypto');
const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');
const sendEmail = require('../utils/sendEmail');
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
//@access   Privet
exports.getUser = asyncHandler( async (req, res, next) => {
    const user = await User.findById(req.user.id);
    res.status(200).json({ success: true, data: user });
});

//@dec      Update details
//@routes   GET /api/v1/auth/updatedetails
//@access   Privet
exports.updateDetails = asyncHandler( async (req, res, next) => {
    const fieldsToUpdate = {
        name: req.body.name,
        email: req.body.email
    };
    user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
        new: true,
        runValidators: true
    });
    res.status(200).json({ success: true, data: user });
});

//@dec      Update password
//@routes   GET /api/v1/auth/updatepassword
//@access   Privet
exports.updatePassword = asyncHandler( async (req, res, next) => {
    // Check for user
    const user = await User.findById(req.user.id).select('+password');

    if(!user){
        return next( new ErrorResponse('Invalide credentials', 401));
    }

    // Check if password match
    const isMatch = await user.matchPassword(req.body.currentPassword);

    if(!isMatch){
        return next( new ErrorResponse('Password not match', 401));
    }
    user.password = req.body.newPassword;
    user.save();

    // Create token 
    sendTokenResponse(user, 200, res);
});

//@dec      Forget password
//@routes   GET /api/v1/auth/forgetpassword
//@access   Public
exports.forgetPassword = asyncHandler( async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });

    // Get reset token
    const resetToken = await user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false });

    // Create reset url
    const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/auth/resetpassword/${resetToken}`;

    const message = `You are rerciving this email because you has requested the reset of password. Please make a PUT request to: \n\n ${resetUrl}`;

    try{
        await sendEmail({
            email: user.email,
            subject: 'password reset password',
            message: message
        });
        res.status(200).json({ success: true, data: 'Email sent' });
    }catch(err){
        console.log(err);
        user.resetPasswordToken = undefined;
        user.resetpasswordExpire = undefined;
        user.save({ validateBeforeSave: false });
        return next( new ErrorResponse(`Email could not be sent`, 500));
    }
    console.log(resetToken);

    
});

//@dec      Reset password
//@routes   PUT /api/v1/auth/resetpassword:resettoken
//@access   Public
exports.resetPassword = asyncHandler( async (req, res, next) => {
    //Hash token and set to resetPasswordToken field
    const restPasswordToken = crypto.createHash('sha256').update(req.params.resettoken).digest('hex');

    const user = await User.findOne({
        restPasswordToken,
        restPasswordExpire: { $gt: Date.now() }
    });
    if(!user){
        return next( new ErrorResponse('Invalide credentials', 401));
    }

    // Set new password
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.restPasswordExpire = undefined;
    await user.save();

    sendTokenResponse(user, 200, res);
});