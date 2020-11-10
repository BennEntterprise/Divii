import Comment from '../models/Comment'
const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/asyncHandler')

// @desc Get All Comments
// @route /api/comments
// @access Public
exports.getAllComments = asyncHandler(async (req, res, next) => {
  const comments = await Comment.find()
  if (!comments) {
    next(new ErrorResponse(`There was an error accessing the comments.`, 404))
  }
  res.status(200).json(comments)
})

// @desc Get a single comment
// @route /api/comments/:id
// @access Public
exports.getSingleComment = asyncHandler(async (req, res, next) => {
  const comment = await Comment.findById(req.params.id)
  if (!comment) {
    next(
      new ErrorResponse(`Comment not found with id of ${req.params.id}`, 404)
    )
  }
  res.status(200).json(comment)
})
