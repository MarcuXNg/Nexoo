const client = require('../../index');
const Discord = require('discord.js');

client.on('guildMemberAdd', async (member) => {
	const servers = await client.guilds.cache.size;
	let channelToSend;
	member.guild.channels.cache.forEach((channel) => {
		if (
			channel.type === 'GUILD_TEXT' &&
            !channelToSend &&
            channel.permissionsFor(member.guild.me).has('SEND_MESSAGES')
		) channelToSend = channel;
	});

	if (!channelToSend) return;
	channelToSend.send({
		embeds: [
			new Discord.MessageEmbed()
				.setColor('RANDOM')
				.setImage('https://i.pinimg.com/originals/a5/46/45/a54645c9a2150d4278619fbf1a697a91.jpg')
				.setDescription(`Hey ${member}, welcome to **${member.guild.name}!** \n Hope you have fun here ❤️`)
				.setFooter({
					text: `Watching ${servers} servers`,
				})
				.setTimestamp(),
		],
	});
	member.send('Thanks you for joining my server ❤️');
});
