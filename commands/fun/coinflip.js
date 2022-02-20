const { MessageEmbed } = require('discord.js');
module.exports = {
	name: 'coinflip',
	category: 'fun',
	aliases: ['coinflip'],
	description: 'flip a coin',
	usage: '(prefix)coinflip',
	run : async (client, message) => {
		try {
			const outcomesIndex = Math.round(Math.random());
			if (outcomesIndex === 0) {
				message.channel.send({
					embeds: [
						new MessageEmbed()
							.setTitle('Heads!')
							.setImage('https://static.ayana.io/commands/flipcoin/heads.png'),
					],
				});
			}
			if (outcomesIndex === 1) {
				message.channel.send({
					embeds: [
						new MessageEmbed()
							.setTitle('Tails!')
							.setImage('https://static.ayana.io/commands/flipcoin/tails.png'),
					],
				});
			}
		}
		catch (e) {
			console.log(e);
		}
	},
};