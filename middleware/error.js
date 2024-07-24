const ErrorResponse = require('../utils/errorResponse');

const errorHandler = (err, req, res, next) => {
    console.log(err);
    //
    let error = {...err};

    error.message = err.message;

    // Mongosse bad request
    if(err.name === 'CastError'){
        const message = `Crudlist not find this id ${err.value}`;
        error = new ErrorResponse(message, 404);
    }
    // Mongosse validation error
    if(err.name === 'ValidationError'){
        const message = Object.values(err.errors).map(val => val.message);
        error = new ErrorResponse(message, 400);
    }
    // Mongosse duplicate key
    if(err.code === 11000){
        const message = 'Duplicate field value entered';
        error = new ErrorResponse(message, 400);
    }
    
    res.status(error.statusCode || 500).json({ success: false, error: error.message || 'server error'});
}

module.exports = errorHandler;