const Balance = require('../../database/models/balanceSchema');

module.exports = {
	name: 'beg',
	category: 'economy',
	aliases: ['beg'],
	description: 'Has a chance of giving coins to users.',
	usage: '`(prefix)`leaderboard',
	run: async (client, message) => {
		try {
			const chance = Math.floor(Math.random() * 10) + 1;
			if (chance >= 1 && chance <= 3) {
				const array = [
					'Fine take my money..',
					'Take it, this is all i have',
					'Here is the money',
					'Hãy chiếm lấy em đi',
				];
				const coinsToGive = Math.floor(Math.random() * 7) + 2;
				const balanceProfile = await Balance.findOne({ UserID: message.author.id, guildID: message.guild.id }) || await new Balance({ userID: message.author.id, guildID: message.guild.id, lastEdited: Date.now() });
				await balanceProfile.save().catch(err => console.log(err));
				message.channel.send(`${array[Math.floor(Math.random() * 2)]} | You were given $${coinsToGive}.`);
				await Balance.findOneAndUpdate({ UserID: message.author.id, guildID: message.guild.id }, { balance: balanceProfile.balance + coinsToGive, lastEdited: Date.now() });
			}
			else {
				const array = [
					'No.',
					'I do not feel like it',
					'ihi, hong bé ơi',
				];
				message.channel.send(array[Math.floor(Math.random())]);
			}
		}
		catch (err) {
			console.log(err);
		}
	},
};