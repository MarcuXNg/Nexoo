const { MessageEmbed } = require('discord.js');
const c = require('../../index');
const Guild = require('../../database/models/guildSchema');

c.on('roleDelete', async function(role) {
	if (role.name == 'Nexoo') return;
	send_log(c,
		role.guild,
		'RED',
		`🗑 Role deleted: ${role.name}`,
		`**RoleID:** ${role.id}\n**Hexcolor:** ${role.hexColor}\n**Mentionable:** ${role.mentionable}\n**Hoisted:** ${role.hoist}`,
	);
});

async function send_log(client, guild, color, title, description, thumb) {
	const guildProfile = await Guild.findOne({ guildID: guild.id });
	if (guildProfile.rDelete == true) {
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