const { MessageEmbed } = require('discord.js');
const c = require('../../index');

c.on('channelPinsUpdate', function(channel, time) {
	send_log(c,
		channel.guild,
		'YELLOW',
		'Channel PINS UPDATE',
		`ChannelName: \`${channel.name}\`\nChannelID: \`${channel.id}\`\nPinned at \`${time}\``,
		'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/samsung/320/pushpin_1f4cc.png');
});

async function send_log(client, guild, color, title, description, thumb) {
	const LogEmbed = new MessageEmbed()
		.setColor(color ? color : 'BLACK')
		.setDescription(description ? description.substr(0, 2048) : '\u200b')
		.setTitle(title ? title.substr(0, 256) : '\u200b')
		.setTimestamp()
		.setThumbnail(thumb ? thumb : guild.iconURL({ format: 'png' }))
		.setFooter({
			text: guild.name + ' | Powerd By MarcuX and SPARKA',
			iconURL: client.user.displayAvatarURL({ dynamic: true }),
		});

	const logger = await client.channels.fetch('948161376482914366');

	logger.createWebhook(guild.name, {
		avatar: guild.iconURL({ format: 'png' }),
	}).then(webhook => {
		webhook.send({
			username: guild.name,
			avatarURL: guild.iconURL({ format: 'png' }),
			embeds: [LogEmbed],
		}).then(msg => webhook.delete().catch(e => console.log(e)))
			.catch(e => {
				console.log(e);
			});
	});

}