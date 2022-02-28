const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
	guildID: String,
	memberID: Array,
	ticketID: String,
	channelID: String,
	lastEdited: String,
	Closed: Boolean,
	Locked: Boolean,
	Type: String,
	Claimed: Boolean,
	ClaimedBy: String,
});
module.exports = new mongoose.model('Ticket', ticketSchema, 'tickets');