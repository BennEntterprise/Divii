const jwt = require('jsonwebtoken')
const asyncHandler = require('./asyncHandler')
const ErrorResponse = require('../utils/errorResponse')
const User = require('../models/User')
const dotenv = require('dotenv')
dotenv.config({ path: `${__dirname}/../config/config.env` })

exports.protect = asyncHandler(async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1]
    }
    // else if (req.cookies.token) {
    //     token = req.cookies.token
    // }

    if (!token) {
        return next(new ErrorResponse(`NOT AUTHORIZED TO ACCESS THIS ROUTE, Token Required`, 401));
    }

    try {
        //verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = await User.findById(decoded.id)
        next();
    } catch (err) {
        return next(new ErrorResponse(`NOT AUTHORIZED TO ACCESS THIS ROUTE, Token Verification failed`, 401));
    }

})