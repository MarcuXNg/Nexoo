// const client = require('../../index');
// const { MessageEmbed } = require('discord.js');
// const Guild = require('../../database/models/guildSchema');

// client.on('userUpdate', async function(oldUser, newUser) {
// 	const userID = newUser.id;
// 	const guilds = client.guilds.cache.filter((guild) => guild.members.cache.has(userID)).map(g => g.id);
// 	console.log(guilds);
// 	const guildProfile = await Guild.find({ guildID: guilds });
// 	const channel = guildProfile.map(g => g.logChannel);
// 	if (!channel) return;
// 	const channels = channel.filter(checkundef);
// 	console.log(channels);
// 	const logger = await client.channels.cache.get(channel);
// 	if (oldUser.username !== newUser.username) {
// 		logger.send({ embeds: [
// 			new MessageEmbed()
// 				.setColor('ORANGE')
// 				.setTitle('Username Change')
// 				.setTimestamp()
// 				.setThumbnail(newUser.displayAvatarURL({ dynamic: true }))
// 				.setDescription(`**Renamed**\n\`${oldUser.username}\` -> \`${newUser.username}\``),
// 		] });
// 	}
// 	if (oldUser.avatarURL !== newUser.avatarURL) {
// 		logger.send({ embeds: [
// 			new MessageEmbed()
// 				.setColor('DARK_BUT_NOT_BLACK')
// 				.setTitle('Avatar Update')
// 				.setTimestamp()
// 				.setThumbnail(newUser.displayAvatarURL({ dynamic: true }))
// 				.setDescription(`${oldUser} updated their profile!\n
// 				[[Before]](${oldUser.displayAvatarURL({ dynamic: true })}) -> [[After]](${newUser.displayAvatarURL({ dynamic: true })})`),
// 		] });
// 	}
// });

// function checkundef(chan) {
// 	return chan != null;
// }
