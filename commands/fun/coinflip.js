const { MessageEmbed } = require('discord.js');
module.exports = {
	name: 'coinflip',
	category: 'fun',
	aliases: ['coinflip'],
	description: 'flip a coin',
	usage: '(prefix)coinflip',
	run : async (client, message) => {
		const outcomesIndex = Math.floor(Math.random() * 2);
		message.channel.send({
			embeds: [
				new MessageEmbed()
					.setTitle(outcomesIndex == 0 ? 'Head' : 'Tail')
					.setImage(`https://static.ayana.io/commands/flipcoin/${outcomesIndex == 0 ? 'heads' : 'tails'}.png`),
			],
		});
	},
};
