const client = require('../../index');
const Discord = require('discord.js');

client.on('guildMemberAdd', (member) => {
	member.guild.channels.cache.find(c => c.name === 'welcome').send({
		embeds: [
			new Discord.MessageEmbed()
				.setColor('RANDOM')
				.setImage('https://i.pinimg.com/originals/a5/46/45/a54645c9a2150d4278619fbf1a697a91.jpg')
				.setDescription(`Hey ${member}, welcome to **${member.guild.name}!** \n Hope you have fun here ❤️`)
				.setTimestamp(),
		],
	});
	member.send('Thanks you for joining my server ❤️');
});
