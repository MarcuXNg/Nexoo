const config = require('../../config.json');
const Blacklist = require('../../database/models/blackListSchema');

module.exports = {
	name: 'blacklist',
	category: 'moderation',
	aliases: ['blacklist'],
	description: 'Ban an user from using the bot',
	devOnly: true,
	usage: `${config.prefix}blacklist @member`,
	run: async (client, message, args) => {
		try {
			// blacklist @member reason
			const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
			const reason = args.slice(1).join(' ') || 'No reason given.';

			if (!args[0]) return message.channel.send('You need to provide a member to blacklist along with why you ban them.');
			if (!mentionedMember) return message.channel.send('The member stated is not in the server');

			let profile = await Blacklist.findOne({
				userID: mentionedMember.user.id,
			});

			if (profile) return message.channel.send('This member is already ban from using the bot.');
			profile = await new Blacklist({
				userID: mentionedMember.user.id,
				reason: reason,
			});
			try {
				await profile.save();
				message.channel.send(`Banned ${mentionedMember} from using the bot.`);
			}
			catch (e) {
				console.log(e);
			}
		}
		catch (err) {
			console.log(err);
		}
	},
};
