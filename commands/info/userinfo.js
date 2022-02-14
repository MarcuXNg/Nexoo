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
				.then((res) => {
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
							{
								name: 'Facebook',
								value: `╰ ${res.data.data.connected_accounts.map(fb => fb.name)[0]}`,
								inline: true,
							},
							{
								name: 'GitHub',
								value: `╰ ${res.data.data.connected_accounts.map(gh => gh.name)[1]}`,
								inline: true,
							},
							{
								name: 'Reddit',
								value: `╰ ${res.data.data.connected_accounts.map(rd => rd.name)[2]}`,
								inline: true,
							},
							{
								name: 'Steam',
								value: `╰ ${res.data.data.connected_accounts.map(st => st.name)[3]}`,
								inline: true,
							},
							{
								name: 'Twitch',
								value: `╰ ${res.data.data.connected_accounts.map(tc => tc.name)[4]}`,
								inline: true,
							},
							{
								name: 'Twitter',
								value: `╰ ${res.data.data.connected_accounts.map(tw => tw.name)[5]}`,
								inline: true,
							},
							{
								name: 'Youtube',
								value: `╰ ${res.data.data.connected_accounts.map(yt => yt.name)[6]}`,
								inline: true,
							},
						);
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
