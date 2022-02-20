const Levels = require('discord-xp');
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'leaderboard',
	category: 'level',
	aliases: ['leaderboard'],
	description: 'Display the leaderboard of top 5 leveled users.',
	usage: '`(prefix)`leaderboard',
	run: async (client, message) => {
		try {
			const rawLeaderboard = await Levels.fetchLeaderboard(message.guild.id, 10);

			if (rawLeaderboard.length < 1) return message.channel.send('Nobody\'s in the leaderboard yet.');

			const leaderboard = await Levels.computeLeaderboard(client, rawLeaderboard, true);

			const lb = leaderboard.map(e => `**${e.position})** ${e.username}#${e.discriminator}\nLevel: ${e.level}\nXP: ${e.xp.toLocaleString()}`);

			message.channel.send({
				embeds: [
					new MessageEmbed()
						.setColor('RANDOM')
						.setAuthor({
							name: 'LeaderBoard 👑',
						})
						.setDescription(`${lb.join('\n\n')}`)
						.setTimestamp(),
				],
			},
			);

		}
		catch (err) {
			console.log(err);
		}
	},
};