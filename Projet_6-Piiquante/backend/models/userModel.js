const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const validator = require('validator');

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		required: [true, 'Veuillez indiquer votre email!'],
		unique: true,
		lowercase: true,
		validate: [validator.isEmail, 'Merci de renseigner un email valide!'],
	},
	password: {
		type: String,
		required: [true, 'Veuiller indiquer votre mot de passe!'],
	},
});

userSchema.plugin(uniqueValidator);

const User = mongoose.model('User', userSchema);
module.exports = User;
