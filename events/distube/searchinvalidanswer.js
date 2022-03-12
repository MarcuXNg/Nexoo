const client = require('../../index.js');
const Discord = require('discord.js');

client.distube
	.on('searchInvalidAnswer', message =>
		message.channel.send({
			embeds: [
				new Discord.MessageEmbed()
					.setColor('RANDOM')
					.setTitle('🙅‍♂️ Invalid choice! You have to enter the number in the range of the results')
					.setDescription('Please choose again') ],
		},
		),
	);