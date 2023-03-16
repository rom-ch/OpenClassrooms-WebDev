const mongoose = require('mongoose');

const sauceSchema = mongoose.Schema({
	userId: {
		type: String,
		required: [true, 'Veuillez indiquer votre userId'],
	},
	name: {
		type: String,
		required: true,
		trim: true,
	},
	manufacturer: {
		type: String,
		required: true,
		trim: true,
	},
	description: {
		type: String,
		required: true,
		trim: true,
	},
	mainPepper: {
		type: String,
		required: true,
		trim: true,
	},
	imageUrl: {
		type: String,
		required: true,
	},
	heat: {
		type: Number,
		required: true,
		min: 0,
	},
	likes: {
		type: Number,
	},
	dislikes: {
		type: Number,
	},
	usersLiked: {
		type: Array,
	},
	usersDisliked: {
		type: Array,
	},
});

const Sauce = mongoose.model('Sauce', sauceSchema);
module.exports = Sauce;
