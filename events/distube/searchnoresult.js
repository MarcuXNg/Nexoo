const client = require('../../index.js');
const Discord = require('discord.js');

client.distube
	.on('searchNoResult', (message, query) =>
		message.channel.send({
			embeds: [
				new Discord.MessageEmbed().setColor('RANDOM').setTitle(`No result found for \`${query}\`!`).setDescription('❌ | Please insert an valid url or song name')],
		}),
	);