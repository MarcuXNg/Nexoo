const client = require('../../index.js');
const Discord = require('discord.js');

client.distube
	.on('noRelated', queue => queue.textChannel.send({
		embeds: [
			new Discord.MessageEmbed().setColor('RANDOM').setTitle('📣 Can\'t find related video to play.').setDescription('Please try again later')],
	}),
	);