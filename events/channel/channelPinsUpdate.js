const { MessageEmbed } = require('discord.js');
const c = require('../../index');
const Guild = require('../../database/models/guildSchema');

c.on('channelPinsUpdate', function(channel, time) {
	send_log(c,
		channel.guild,
		'YELLOW',
		'Channel PINS UPDATE',
		`ChannelName: \`${channel.name}\`\nChannelID: \`${channel.id}\`\nPinned at \`${time}\``,
		'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/samsung/320/pushpin_1f4cc.png');
});

async function send_log(client, guild, color, title, description, thumb) {
	const guildProfile = await Guild.findOne({ guildID: guild.id });
	if (guildProfile.cpinsUp == true) {
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