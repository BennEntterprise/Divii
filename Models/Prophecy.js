const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProphecySchema = new mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	description: {
		type: String,
	},
	predictionDate: {
		type: Date,
		required: true,
		default: Date.now()
	},
	reckoningDate: {
		required: true,
		type: Date,
		default: Date.now() + 1000 * 60 * 60 * 24 * 7
	},
	stockTicker: {
		type: String,
		required: false,
		default: ''
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: false,
	},
	comments: {
		type: [Schema.Types.ObjectId],
		ref: 'Comment'
	},
});

const Prophecy = mongoose.model("Prophecy", ProphecySchema);

module.exports = Prophecy;
