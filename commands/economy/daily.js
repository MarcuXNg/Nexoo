const Balance = require('../../database/models/balanceSchema');
const ms = require('parse-ms');

module.exports = {
	name: 'daily',
	category: 'economy',
	aliases: ['daily'],
	description: 'Has a chance of giving coins to users.',
	usage: '`(prefix)`daily',
	run: async (client, message) => {
		try {
			const data = await Balance.findOne({ UserID: message.author.id, guildID: message.guild.id }) || await new Balance({ userID: message.author.id, guildID: message.guild.id, lastEdited: Date.now(), daily: Date.now() });
			await data.save().catch(err => console.log(err));

			const timeout = 86400000;
			const randomAmount = Math.floor(Math.random() * 4000) + 1000;
			if (data.daily !== null && timeout - (Date.now() - data.daily) > 0) {
				const timeleft = ms(timeout - (Date.now() - data.daily));
				return message.channel.send(`You already claimed your daily gift, try again later:\n${timeleft.hours} hours, ${timeleft.minutes} minutes and ${timeleft.seconds} seconds.`);
			}

			message.channel.send(`You've successfully claimed your daily gift with the worth of $${randomAmount}`);
			await Balance.findOneAndUpdate({ UserID: message.author.id, guildID: message.guild.id }, { balance: data.balance + randomAmount, lastEdited: Date.now(), daily: Date.now() });

		}
		catch (err) {
			console.log(err);
		}
	},
};