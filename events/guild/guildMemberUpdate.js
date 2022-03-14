const c = require('../../index');
const { MessageEmbed } = require('discord.js');
const Guild = require('../../database/models/guildSchema');

c.on('guildMemberUpdate', async (oldMember, newMember) => {
	if (newMember.nickname != oldMember.nickname) {
		const oldnickname = oldMember.nickname || oldMember.user.username;
		const newnickname = newMember.nickname || newMember.user.username;
		send_log(c,
			newMember.guild,
			'ORANGE',
			'Nickname Change',
			`**Renamed**\n\`${oldnickname}\` -> \`${newnickname}\``,
			newMember.user.displayAvatarURL({ dynamic: true }),
		);
	}
	// if (oldMember.user.username !== newMember.user.username) {
	// 	send_log(c,
	// 		newMember.guild,
	// 		'ORANGE',
	// 		'Username Change',
	// 		`**Renamed**\n\`${oldMember.user.username}\` -> \`${newMember.user.username}\``,
	// 		newMember.user.displayAvatarURL({ dynamic: true }),
	// 	);
	// }
	// if (oldMember.avatarURL !== newMember.avatarURL) {
	// 	send_log(c,
	// 		newMember.guild,
	// 		'ORANGE',
	// 		'Avatar Update',
	// 		`${oldMember} updated their profile!\n
	// 			[[Before]](${oldMember.displayAvatarURL({ dynamic: true })}) -> [[After]](${newMember.displayAvatarURL({ dynamic: true })})`,
	// 		newMember.user.displayAvatarURL({ dynamic: true }),
	// 	);
	// }
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
			iconURL: client.user.displayAvatarURL({ dynamic: true }),
		});
	if (!guildProfile.logChannel) return;
	const logger = await client.channels.fetch(guildProfile.logChannel);

	logger.send({
		embeds: [LogEmbed],
	});
}