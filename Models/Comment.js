const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
	date: Date,
	text: String,
});

const Comment = mongoose.model("Comment", CommentSchema);

export default Comment;
