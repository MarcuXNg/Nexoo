const mongoose = require('mongoose');

const balanceSchema = new mongoose.Schema({
	userID: String,
	guildID: String,
	lastEdited: String,
	balance: { type: Number, default: 0 },
});
module.exports = new mongoose.model('Balance', balanceSchema, 'balances');