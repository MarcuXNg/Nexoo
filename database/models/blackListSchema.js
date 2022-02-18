const mongoose = require('mongoose');

const blackListSchema = new mongoose.Schema({
	userID: String,
	reason: String,
});
module.exports = new mongoose.model('Blacklist', blackListSchema, 'blacklists');