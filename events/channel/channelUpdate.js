const { MessageEmbed } = require('discord.js');
const c = require('../../index');
const Guild = require('../../database/models/guildSchema');

c.on('channelUpdate', async function(oldChannel, newChannel) {
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
			'ORANGE',
			`📝 Text channel updated: ${oldChannel.name}`,
			`**Renamed**\n\`${oldChannel.name}\` -> \`${newChannel.name}\`\n\n` +
				`**ChannelID:** \`${oldChannel.id}\` -> \`${newChannel.id}\``,
		);
	}
	else if (oldChannel.type != newChannel.type) {
		send_log(c,
			oldChannel.guild,
			'YELLOW',
			`📝 Text channel updated: ${oldChannel.name}`,
			`**Type**\n\`${types[oldChannel.type]}\`->\`${types[newChannel.type]}\`\n\n` +
				`**ChannelID:** \`${oldChannel.id}\` -> \`${newChannel.id}\``,
		);
	}
	else if (oldChannel.topic != newChannel.topic) {
		send_log(c,
			oldChannel.guild,
			'BLUE',
			'Channel UPDATED - TOPIC',
			`ChannelName: \`${oldChannel.name}\`\nChannelID: \`${oldChannel.id}\`\nChannelTOPIC: \`${oldChannel.topic}\`\n\n` +
				`ChannelName: \`${newChannel.name}\`\nChannelID: \`${newChannel.id}\`\nChannelTOPIC: \`${newChannel.topic}\``,
		);
	}
});

async function send_log(client, guild, color, title, description, thumb) {
	const guildProfile = await Guild.findOne({ guildID: guild.id });
	if (guildProfile.cUp == true) {
		const LogEmbed = new MessageEmbed()
			.setColor(color ? color : 'BLACK')
			.setDescription(description ? description.substr(0, 2048) : '\u200b')
			.setTitle(title ? title.substr(0, 256) : '\u200b')
			.setTimestamp()
			.setThumbnail(thumb ? thumb : guild.iconURL({ format: 'png' }))
			.setFooter({
				text: `${guild.name} | Powerd By MarcuX and SPARKA`,
				iconURL: guild.iconURL({ dynamic: true }) || 'https://cdn.discordapp.com/attachments/765919453766352916/877787616974622770/wCfHtuoejLIbAAAAABJRU5ErkJggg.png',
			});
		if (!guildProfile.logChannel) return;
		const logger = await client.channels.fetch(guildProfile.logChannel);

		logger.send({
			embeds: [LogEmbed],
		});
	}
}