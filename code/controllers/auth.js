var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/asyncHandler');
const User = require('../models/User');
// @desc Register User
// @route POST /api/auth/register
// @access Public
exports.register = asyncHandler((req, res, next) => __awaiter(this, void 0, void 0, function* () {
    const { name, email, password, role } = req.body;
    //create user
    const user = yield User.create({
        name, email, password, role
    });
    sendTokenResponse(user, 200, res);
}));
// @desc Login User
// @route POST /api/auth/login
// @access Public
exports.login = asyncHandler((req, res, next) => __awaiter(this, void 0, void 0, function* () {
    const { email, password } = req.body;
    // Validate Email/Pass
    if (!email || !password) {
        return next(new ErrorResponse(`Please provide email and password`, 400));
    }
    // Find user
    const user = yield User.findOne({ email: email }).select('+password');
    if (!user) {
        return next(new ErrorResponse(`Invalid credentials`, 401));
    }
    //Check password match
    const isMatch = yield user.matchPassword(password);
    if (!isMatch) {
        return next(new ErrorResponse(`Invalid credentials`, 401));
    }
    sendTokenResponse(user, 200, res);
}));
// Get token from model , create cookie send respoinse
const sendTokenResponse = (user, statusCode, res) => {
    // create token
    const token = user.getSignedJwtToken();
    let expiration = new Date(+Date.now + +process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000);
    // Create cookie
    const options = {
        expiration: expiration,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production'
    };
    res
        .status(statusCode)
        .cookie('token', token, options)
        .json({ success: true, token });
};
// @desc Get current logged in user
// @route POST /api/auth/me
// @access Private
exports.getMe = asyncHandler((req, res, next) => __awaiter(this, void 0, void 0, function* () {
    const user = yield User.findById(req.user.id);
    res.status(200).json({
        success: true,
        data: user
    });
}));
