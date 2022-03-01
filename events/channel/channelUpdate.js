const { MessageEmbed } = require('discord.js');
const c = require('../../index');

c.on('channelUpdate', function(oldChannel, newChannel) {
	const newCat = newChannel.parent ? newChannel.parent.name : 'NO PARENT';
	const guildChannel = newChannel.guild ? newChannel.guild : 'DM CHANNEL';
	if (!guildChannel || !guildChannel.available) return;
	const types = {
		GUILD_TEXT: 'Text Channel',
		GUILD_VOICE: 'Voice Channel',
		GUILD_NULL: 'No Type',
		GUILD_NEWS: 'News Channel',
		GUILD_STORE: 'Store Channel',
		GUILD_CATEGORY: 'Category',
	};
	if (oldChannel.name != newChannel.name) {
		send_log(c,
			oldChannel.guild,
			'YELLOW',
			'Channel UPDATED - NAME',
			`ChannelName: \`${oldChannel.name}\`\nChannelID: \`${oldChannel.id}\`\n\n` +
            `ChannelName: \`${newChannel.name}\`\nChannelID: \`${newChannel.id}\`\n`,
		);
	}
	else if (oldChannel.type != newChannel.type) {
		send_log(c,
			oldChannel.guild,
			'YELLOW',
			'Channel UPDATED - TYPE',
			`ChannelName: \`${oldChannel.name}\`\nChannelID: \`${oldChannel.id}\`\nChannelTYPE: \`${types[oldChannel.type]}\`\n\n` +
            `ChannelName: \`${newChannel.name}\`\nChannelID: \`${newChannel.id}\`\nChannelTYPE: \`${types[newChannel.type]}\``,
		);
	}
	else if (oldChannel.topic != newChannel.topic) {
		send_log(c,
			oldChannel.guild,
			'YELLOW',
			'Channel UPDATED - TOPIC',
			`ChannelName: \`${oldChannel.name}\`\nChannelID: \`${oldChannel.id}\`\nChannelTOPIC: \`${oldChannel.topic}\`\n\n` +
            `ChannelName: \`${newChannel.name}\`\nChannelID: \`${newChannel.id}\`\nChannelTOPIC: \`${newChannel.topic}\``,
		);
	}
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