const { MessageEmbed } = require('discord.js');
const c = require('../../index');
const Guild = require('../../database/models/guildSchema');

c.on('roleUpdate', async function(oldRole, newRole) {
	if (oldRole.name !== newRole.name) {
		send_log(c,
			oldRole.guild,
			'ORANGE',
			`📝 Role updated ${oldRole.name}`,
			`**ROLE:** ${oldRole}\n\n**Name:**\`${oldRole.name}\`->\`${newRole.name}\``);
	}
	else if (oldRole.color !== newRole.color) {
		send_log(c,
			oldRole.guild,
			'ORANGE',
			`📝 Role updated ${newRole.name}`,
			`**Role**\n\`${oldRole.color.toString(16)}\`->\`${newRole.color.toString(16)}\``);
	}
	else {
		send_log(c,
			oldRole.guild,
			'RED',
			`📝 Role updated ${newRole.name}`,
			`**ROLE**\n╰ ${newRole} \n
**⚡ THE PERMISSIONS CHANGED PLEASE CHECK!!! ⚡**\n
**OLD PERMISSIONS**: ${oldRole.permissions.toArray().join(', ').toLowerCase()}\n
**NEW PERMISSIONS**: ${newRole.permissions.toArray().join(', ').toLowerCase()}\n
**Role ID:** \`${newRole.id}\``);
	}
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