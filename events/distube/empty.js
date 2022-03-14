const client = require('../../index.js');
const Discord = require('discord.js');

client.distube
	.on('empty', queue => queue.textChannel.send({
		embeds: [
			new Discord.MessageEmbed().setColor('RANDOM').setDescription('😢 Voice channel is empty so i left the channel...')],
	}));