const { MessageEmbed } = require('discord.js');
const axios = require('axios');
const moment = require('moment');
const { Permissions } = require('discord.js');

module.exports = {
	name: 'userinfo',
	aliases: ['userinfo'],
	category: 'info',
	description: 'Shows info of the user',
	usage: '(client)userinfo [@member]',
	run: async (client, message, args) => {
		try {
			if (message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
				const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
				axios
					.get(`https://sagiri-fansub.tk/api/v1/userinfo/${member.user.id}`, { headers: { Authorization: 'NjM1MzU4MDQ2NzMzNzI5ODAw.MTY0Njk4MzI5ODE3Mw==' } })
					.then(async (res) => {
						const embed = new MessageEmbed()
							.setAuthor({
								name: 'User Info',
							},
							)
							.setTitle(`${member.user.tag}`)
							.setColor('NOT_QUITE_BLACK')
							.setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
							.setTimestamp()
							.setFields(
								{
									name: 'UserID',
									value: `╰ ${member.user.id}`,
									inline: true,
								},
								{
									name: 'Tag',
									value: `╰ ${member}`,
									inline: true,
								},
								{
									name: 'Discriminator',
									value: `╰ ${member.user.discriminator}`,
									inline: true,
								},
								{
									name: 'nickname',
									value: `╰ ${member.nickname
									}`,
									inline: true,
								},
								{
									name: 'Avatar',
									value: `**[Click here to download](${member.user.displayAvatarURL({ dynamic: true })})**`,
									inline: true,
								},
								{
									name: 'Status',
									value: `╰ ${member.presence?.status}`,
									inline: true,
								},
								{
									name: 'HypeSquad',
									value: `╰ ${member.user.flags.toArray()}`,
									inline: true,
								},
								{
									name: 'Acc created at',
									value: `╰ ${moment(member.user.createdAt).format('MMMM Do YYYY, h:mm:ss a')}\n**-** ${moment(member.user.createdAt).startOf('day').fromNow()}`,
									inline: true,
								},
								{
									name: 'Joined at',
									value: `╰ ${moment(member.joinedAt).format('MMMM Do YYYY, h:mm:ss a')}\n**-** ${moment(member.joinedAt).startOf('day').fromNow()}`,
									inline: true,
								},
								{
									name: 'Roles',
									value: `╰ ${member.roles.cache.map(r => r).join(', ')}`,
									inline: true,
								},
								{
									name: 'Permissions',
									value: `╰ ${member.permissions.toArray().join(', ')}`,
									inline: true,
								},
								{
									name: 'Last Boosting on this server',
									value: `╰ ${member.premiumSinceTimestamp}`,
									inline: true,
								},
								{
									name: 'Currently',
									value: `╰ ${member.presence?.activities}`,
									inline: true,
								},
							);
						await res.data.data.connected_accounts.map((data_) => {
							embed.addFields({
								name: `${data_.type.toUpperCase().slice(0, 1) + data_.type.slice(1)}`,
								value: `╰ ${data_.name}`,
								inline: true,
							});
						});
						message.channel.send({ embeds: [embed] });
					})
					.catch((err) => {
						console.error('ERR:', err);
					});
			}
			else { return message.channel.send('You don\'t have permission to use this command');}
		}
		catch (err) {
			console.log(err);
		}
	},

};
