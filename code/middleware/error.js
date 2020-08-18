const ErrorResponse = require("../utils/errorResponse");

const errorHandler = (err, req, res, next) => {
    let error = { ...err };

    error.message = err.message

    // Log to console for dev
    console.log(err)


    // ********************
    // HANLDE INDIVIDUAL ERRORS BY BUILDING UP THE ERROR OBJECT
    // ********************

    // Mongoose Bad Object ID
    if (err.name === "CastError") {
        const message = `Resource not found with id of ${err.value}`
        error = new ErrorResponse(message, 404)
    }

    // Mongoose Duplicat Key
    if (err.code === 11000) {
        const message = `Duplicate field value entered`
        error = new ErrorResponse(message, 400)
    }

    // Mongoose Validation Errors
    if (err.name === 'ValidationError') {
        const message = Object.values(err.errors).map(val => val.message)
        error = new Error(message, 400)
    }

    // Default Server Error Message
    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || 'Server Error'
    });

}

module.exports = errorHandler