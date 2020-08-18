const Comment = require('../models/Comment')
const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/asyncHandler')


// @desc Get a single comment
// @route /api/comments/:id
// @access Public
exports.getSingleComment = asyncHandler(async (req, res, next) => {
    const comments = await Comment.findById(req.params.id)
    res.status(200).json(comments)
    if (!comments) {
        next(new ErrorResponse(`Comment not found with id of ${req.params.id}`, 404))
    }
})

