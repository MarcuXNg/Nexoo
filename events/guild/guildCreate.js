const client = require('../../index');
const { MessageEmbed } = require('discord.js');
const config = require('../../config.json');

client.on('guildCreate', async (guild) => {
	const servers = await client.guilds.cache.size;
	let channelToSend;
	guild.channels.cache.forEach((channel) => {
		if (
			channel.type === 'GUILD_TEXT' &&
            !channelToSend &&
            channel.permissionsFor(guild.me).has('SEND_MESSAGES')
		) channelToSend = channel;
	});

	if (!channelToSend) return;

	channelToSend.send({
		embeds: [
			new MessageEmbed()
				.setAuthor({
					name: 'Thank you !',
					iconURL: config.guildCreate,
				})
				.setTitle(`Thanks for inviting me to ${guild.name}`)
				.setDescription(`My defualt prefix is \`${client.prefix}\``)
				.setColor('RANDOM')
				.setFooter({
					text: `Watching \`${servers}\` servers`,
					iconURL:`${client.user.displayAvatarURL()}` })
				.setTimestamp(),
		],
	});
});