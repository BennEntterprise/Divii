const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
	date: {
		type: Date,
		required: true,
		default: Date.now()
	},
	text: {
		type: String,
		required: true
	},
});

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;
