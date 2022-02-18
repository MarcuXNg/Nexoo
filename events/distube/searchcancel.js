const client = require('../../index.js');
const Discord = require('discord.js');

client.distube
	.on('searchCancel', message => message.channel.send({
		embeds: [
			new Discord.MessageEmbed()
				.setColor('RANDOM')
				.setTitle('🤌 Searching canceled')
				.setDescription('Timeout!') ],
	}));