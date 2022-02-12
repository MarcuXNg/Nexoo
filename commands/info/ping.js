const Discord = require('discord.js');
const config = require('../../config.json');
module.exports = {
	name: 'ping',
	aliases: ['ping'],
	category: 'info',
	description: 'show ping in ms',
	usage: `${config.prefix}ping`,
	run: (client, message, args) => {
		try {
			const embed = new Discord.MessageEmbed();

			embed
				.setTitle('`Pong`! :ping_pong:')
				.setDescription(`:hourglass: **Ping**: \`${client.ws.ping}\` ms.`)
				.setColor('RANDOM')
				.setTimestamp();
			message.channel.send({ embeds: [embed] });
		}
		catch (err) {
			console.log(err);
		}
	},
};
