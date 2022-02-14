const { MessageEmbed } = require('discord.js');
const config = require('../../config.json');
const fetch = require('node-fetch');

module.exports = {
	name: 'userinfo',
	aliases: ['userinfo'],
	category: 'info',
	description: 'Shows info of the user',
	usage: `${config.prefix}userinfo`,
	run: async (client, message, args) => {
		try {
			const { file } = await fetch('http://www.sagiri-fansub.tk/api/v1/endpoint').then(response => response.json());
			const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
			const embed = new MessageEmbed()
				.setAuthor(
					'User Info',
				)
				.setTitle(`${member.user.tag}`)
				.setColor('PURPLE')
				.setThumbnail(member.user.displayAvatarURL({ dynamic:true }))
				.setTimestamp()
				.setFields(
					{
						name: 'UserID',
						value: `${member.user.id}`,
						inline: true,
					},
					{
						name: 'Tag',
						value: `${member}`,
						inline: true,
					},

					{
						name: 'Avatar',
						value: `**[Download Here](${member.user.displayAvatarURL({ dynamic:true })})**`,
						inline: true,
					},
					{
						name: 'Status',
						value: `${member.presence?.status}`,
						inline: true,
					},
					{
						name: 'HypeSquad',
						value: `${member.user.flags.toArray()}`,
						inline: true,
					},
					{
						name: 'Acc created at',
						value: `${member.user.createdAt}`,
						inline: true,
					},
					{
						name: 'Joined at',
						value: `${member.joinedAt}`,
						inline: true,
					},
					{
						name: 'Roles',
						value: `${member.roles.cache.map(r => r).join(', ')}`,
						inline: true,
					},
					{
						name: 'Currently Doing',
						value: `${member.presence?.activities}`,
						inline: true,
					},
				);
			message.channel.send({ embeds: [embed] });
		}
		catch (err) {
			console.log(err);
		}
	},

};
