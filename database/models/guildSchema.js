const config = require('../../config.json');
const mongoose = require('mongoose');

const guildSchema = new mongoose.Schema({
	guildID: String,
	lastEdited: String,
	prefix: { type: String, default: config.prefix },
	memberRoleID: { type: String, required: false },
});
module.exports = new mongoose.model('Guild', guildSchema, 'guilds');