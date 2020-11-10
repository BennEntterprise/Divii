"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Comment_1 = require("../models/Comment");
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/asyncHandler');
// @desc Get All Comments
// @route /api/comments
// @access Public
exports.getAllComments = asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const comments = yield Comment_1.default.find();
    if (!comments) {
        next(new ErrorResponse(`There was an error accessing the comments.`, 404));
    }
    res.status(200).json(comments);
}));
// @desc Get a single comment
// @route /api/comments/:id
// @access Public
exports.getSingleComment = asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const comment = yield Comment_1.default.findById(req.params.id);
    if (!comment) {
        next(new ErrorResponse(`Comment not found with id of ${req.params.id}`, 404));
    }
    res.status(200).json(comment);
}));
