const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const userSchema = new Schema({
	name: {
		type: String,
		required: true,
		unique: false,
		trim: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
		trim: true,
	},
	password: {
		type: String,
		required: false,
		unique: false,
		trim: true,
	},
},{
	timestamps: true,
});

module.exports = user = mongoose.model("User", userSchema);
