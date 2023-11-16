const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const userJobs = new Schema({
	scriptSrc: {
		type: String,
		required: true,
		unique: true,
	},
    recordingSrc: {
        type: String,
        required: false,
        unique: false,
    },
    SRT: {
        type: String,
        required: false,
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
	status: {
		type: String,
		required: true,
		unique: false,
	},
    sourceLanguage: {
        type: String,
        required: true,
        unique: false,
    },
},{
	timestamps: true,
});

userJobs.index({scriptSrc: 1, email: 1, name: 1}, {unique: true});
module.exports = job = mongoose.model("Job", userJobs);
