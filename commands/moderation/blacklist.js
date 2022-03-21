const config = require('../../config.json');
const Blacklist = require('../../database/models/blackListSchema');

module.exports = {
	name: 'deblacklist',
	category: 'moderation',
	aliases: ['deblacklist'],
	description: 'Unban an user from using the bot',
	devOnly: true,
	usage: `${config.prefix}blacklist @member`,
	run: async (client, message, args) => {
		try {
			// blacklist @member reason
			const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

			if (!args[0]) return message.channel.send('You need to provide a member to blacklist along with why you ban them.');
			if (!mentionedMember) return message.channel.send('The member stated is not in the server');

			const profile = await Blacklist.findOne({
				userID: mentionedMember.user.id,
			});

			if (!profile) return message.channel.send('This member is not banned from using the bot.');
			try {
				await Blacklist.findOneAndDelete({ userID: mentionedMember.user.id });
				message.channel.send(`Banned ${mentionedMember.user.tag} from using the bot.`);
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
