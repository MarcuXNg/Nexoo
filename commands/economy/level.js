const config = require('../../config.json');
const Levels = require('discord-xp');

module.exports = {
	name: 'level',
	category: 'economy',
	aliases: ['level'],
	description: 'Show the level of the user',
	usage: `${config.prefix}level`,
	run: async (client, message, args) => {
		try {
			const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
			const target = await Levels.fetch(mentionedMember.user.id, message.guild.id);
			if (!target) return message.channel.send('The member stated does not have any levels within the server.');
			try {
				message.channel.send(`${mentionedMember.user.tag} is level ${target.level} and has ${target.xp}/${Levels.xpFor(target.level + 1)}`);
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