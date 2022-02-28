const config = require('../../config.json');
const mongoose = require('mongoose');

const guildSchema = new mongoose.Schema({
	guildID: String,
	lastEdited: String,
	prefix: { type: String, default: config.prefix },
	memberRoleID: { type: String, required: false },
	welcomeChannel: { type: String },
	levelupChannel: { type: String },
	ticketChannel: { type: String },
	ticketCategory: { type: String },
	transcriptChannel: { type: String },
});
module.exports = new mongoose.model('Guild', guildSchema, 'guilds');
