const ErrorResponse = require('../utils/errorResponse');

const errorHandler = (err, req, res, next) => {
    //
    let error = {...err};

    error.message = err.message;

    if(err.name === 'CastError'){
        const message = `Crudlist not find this id ${err.value}`;
        error = new ErrorResponse(message, 404);
    }
    //console.log(error.stack);
    res.status(error.statusCode || 500).json({ success: false, error: error.message || 'server error'});
}

module.exports = errorHandler;