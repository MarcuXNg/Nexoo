const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	user: String,
	pokemons: [String],
});

module.exports = new mongoose.model('UserConfig', userSchema, 'userconfig');