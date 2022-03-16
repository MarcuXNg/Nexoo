const { MessageEmbed } = require('discord.js');
const c = require('../../index');
const Guild = require('../../database/models/guildSchema');

c.on('emojiCreate', function(emoji) {
	send_log(c,
		emoji.guild,
		'GREEN',
		'📝 Server\'s emojis updated!',
		`**Added emoji:** ${emoji}\n**Emojiname:** ${emoji.name}\n**EmojiID:** ${emoji.id}\n**EmojiURL:** ${emoji.url}`,
	);
});

async function send_log(client, guild, color, title, description, thumb) {
	const guildProfile = await Guild.findOne({ guildID: guild.id });
	if (guildProfile.eCreate == true) {
		const LogEmbed = new MessageEmbed()
			.setColor(color ? color : 'BLACK')
			.setDescription(description ? description.substr(0, 2048) : '\u200b')
			.setTitle(title ? title.substr(0, 256) : '\u200b')
			.setTimestamp()
			.setThumbnail(thumb ? thumb : guild.iconURL({ format: 'png' }))
			.setFooter({
				text: guild.name + ' | Powerd By MarcuX and SPARKA',
				iconURL: guild.iconURL({ format: 'png' }) || 'https://cdn.discordapp.com/attachments/765919453766352916/877787616974622770/wCfHtuoejLIbAAAAABJRU5ErkJggg.png',
			});

		if (!guildProfile.logChannel) return;
		const logger = await client.channels.fetch(guildProfile.logChannel);

		logger.createWebhook(guild.name, {
			avatar: guild.iconURL({ format: 'png' }) || 'https://cdn.discordapp.com/attachments/765919453766352916/877787616974622770/wCfHtuoejLIbAAAAABJRU5ErkJggg.png',
		}).then(webhook => {
			webhook.send({
				username: client.user.username,
				avatarURL: client.user.displayAvatarURL({ format: 'png' }),
				embeds: [LogEmbed],
			}).then(msg => webhook.delete().catch(e => console.log(e)))
				.catch(e => {
					console.log(e);
				});
		});
	}

}