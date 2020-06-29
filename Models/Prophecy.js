const mongoose = require("mongoose");

const ProphecySchema = new mongoose.Schema({
	title: String,
	description: String,
	predictionDate: Date,
	reckoningDate: Date,
	hasStockTicker: Boolean,
	stockTicker: String,
	user: String,
	comments: [String],
});

const Prophecy = mongoose.Model("Prophecy", ProphecySchema);

export default Prophecy;
