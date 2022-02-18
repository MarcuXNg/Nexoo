const client = require('../../index.js');
const Discord = require('discord.js');

client.distube
	.on('searchDone', (message) => {
		message.channel.send({
			embeds: [
				new Discord.MessageEmbed()
					.setColor('RANDOM')
					.setTitle('Search done!')
					.setDescription('Hope you enjoy the music ❤️') ],
		});
	});