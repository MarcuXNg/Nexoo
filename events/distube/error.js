const client = require('../../index.js');
const Discord = require('discord.js');

client.distube
	.on('error', (channel, e) => {
		channel.send({
			embeds: [
				new Discord.MessageEmbed().setColor('RANDOM').setDescription(`❌ | An error encountered: ${e.toString().slice(0, 1974)}`)],
		});
		console.error(e);
	});