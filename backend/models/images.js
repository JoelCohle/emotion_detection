const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const userImages = new Schema({
	src: {
		type: String,
		required: true,
		unique: false,
	},
	email: {
		type: String,
		required: true,
		unique: false,
		trim: true,
	},
	name: {
		type: String,
		required: false,
		unique: false,
		trim: true,
	},
	category: {
		type: String,
		required: true,
		unique: false,
		trim: true,
	},
},{
	timestamps: true,
});

userImages.index({src: 1, email: 1, name: 1}, {unique: true});
module.exports = image = mongoose.model("Image", userImages);
