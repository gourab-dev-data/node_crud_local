const jwt = require('jsonwebtoken');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require("../controllers/async");
const User = require('../models/User');

// Protect routes

exports.protect = asyncHandler ( async ( req, res, next ) => {
    let token;
    //console.log(req.headers.authorization);
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1];
    }
    /*else if(req.cookies.token){
        token = req.cookies.token;
    }*/

    // Make sure exists 
    if(!token){
        return next( new ErrorResponse('Not authorization to access route', 401));
    }
    //console.log(token);
    //
    try{
        // Varify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded);

        req.user = await User.findById(decoded.id);
        next();
    }catch (err){
        return next( new ErrorResponse('Not authorization to access route', 401));
    }
})

