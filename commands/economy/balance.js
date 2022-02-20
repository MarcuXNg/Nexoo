const Balance = require('../../database/models/balanceSchema');

module.exports = {
	name: 'balance',
	category: 'economy',
	aliases: ['balance'],
	description: 'Check the balance of a member mentioned.',
	usage: '`(prefix)`leaderboard',
	run: async (client, message, args) => {
		try {
			const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

			const balanceProfile = await Balance.findOne({ userID: mentionedMember.id, guildID: message.guild.id }) || await new Balance({ userID: mentionedMember.id, guildID: message.guild.id, lastEdited: Date.now() });
			await balanceProfile.save().catch(err => console.log(err));
			message.channel.send(`${mentionedMember} has $${balanceProfile.balance}.`);
		}
		catch (err) {
			console.log(err);
		}
	},
};