const { MessageEmbed } = require('discord.js');
const config = require('../../config.json');
const axios = require('axios');

module.exports = {
	name: 'userinfo',
	aliases: ['userinfo'],
	category: 'info',
	description: 'Shows info of the user',
	usage: `${config.prefix}userinfo`,
	run: async (client, message, args) => {
		const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
		try {
			axios
				.get(`https://sagiri-fansub.tk/api/v1/userinfo/${member.user.id}`)
				.then(async (res) => {
					// console.log(res.data.data);
					const embed = new MessageEmbed()
						.setAuthor({
							name: 'User Info',
						},
						)
						.setTitle(`${member.user.tag}`)
						.setColor('PURPLE')
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
								name: 'Avatar',
								value: `**[Download Here](${member.user.displayAvatarURL({ dynamic: true })})**`,
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
								value: `╰ ${member.user.createdAt}`,
								inline: true,
							},
							{
								name: 'Joined at',
								value: `╰ ${member.joinedAt}`,
								inline: true,
							},
							{
								name: 'Roles',
								value: `╰ ${member.roles.cache.map(r => r).join(', ')}`,
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
		catch (err) {
			console.log(err);
		}
	},

};
