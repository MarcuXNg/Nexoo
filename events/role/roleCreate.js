const { MessageEmbed } = require('discord.js');
const c = require('../../index');
const Guild = require('../../database/models/guildSchema');

c.on('roleCreate', function(role) {
	send_log(c,
		role.guild,
		'GREEN',
		`⚔️ Role created: ${role.name}`,
		`**Role:** ${role}\n**Permission:** ${role.permissions.toArray().join(', ').toLowerCase()}`,
	);
});

async function send_log(client, guild, color, title, description, thumb) {
	const guildProfile = await Guild.findOne({ guildID: guild.id });
	const LogEmbed = new MessageEmbed()
		.setColor(color ? color : 'BLACK')
		.setDescription(description ? description.substr(0, 2048) : '\u200b')
		.setTitle(title ? title.substr(0, 256) : '\u200b')
		.setTimestamp()
		.setThumbnail(thumb ? thumb : guild.iconURL({ format: 'png' }))
		.setFooter({
			text: 'Powerd By MarcuX and SPARKA',
		});
	if (!guildProfile.logChannel) return;
	const logger = await client.channels.fetch(guildProfile.logChannel);

	logger.send({
		embeds: [LogEmbed],
	});
}