const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require("./async");
const User = require('../models/User');


//@dec      Register user
//@routes   POST /api/v1/auth/register
//@access   Privet
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
    const token = user.getSignedJwtToken();

    res.status(200).json({ success: true, token: token });
});

//@dec      Login user
//@routes   POST /api/v1/auth/login
//@access   Public
exports.register = asyncHandler( async (req, res, next) => {
    const { email, password } = req.body;
    // Validate email and password
    if(!email || !password){
        return next( new ErrorResponse('Please Provide an email and password', 400));
    }
    // Check for user
    const user = User.findOne({ email }).select('+password');

    if(!user){
        return next( new ErrorResponse('Invalide credentials', 401));
    }

    // Create token 
    const token = user.getSignedJwtToken();

    res.status(200).json({ success: true, token: token });
});