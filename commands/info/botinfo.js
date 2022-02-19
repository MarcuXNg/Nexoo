const { MessageEmbed } = require('discord.js');
const config = require('../../config.json');
const { version } = require('discord.js');

module.exports = {
	name: 'botinfo',
	aliases: ['i'],
	category: 'info',
	description: 'Shows an embed info of the bot',
	usage: `${config.prefix}botinfo`,
	run: (client, message) => {
		try {
			const embed = new MessageEmbed();

			embed
				.setAuthor({
					name: client.user.username,
					iconURL: client.user.displayAvatarURL({ dynamic: true }),
					url: config.invite,
				})
				.setDescription(
					`🤷‍♂️ Support me >< \n **Support Server:** [Join here](${config.serversupport})`,
				)
				.setColor('BLURPLE')
				.setThumbnail(config.botinfo)
				.setImage('https://media1.giphy.com/media/4QxQgWZHbeYwM/giphy.gif?cid=790b761172db360c0cc20df4038c645f4b53530b5b89b112&rid=giphy.gif&ct=g')
				.setTimestamp()
				.setFooter({
					text: 'Wish u have good experience with the bot',
					iconURL: message.author.avatarURL({ dynamic: true }),
				})
				.setFields(
					{
						name: '🤖 Name',
						value: `\`${client.user.username}\``,
						inline: true,
					},
					{
						name: 'License',
						value: '[MIT](https://en.wikipedia.org/wiki/MIT_License)',
						inline: true,
					},
					{
						name: 'Version',
						value: '2.0.0',
						inline: true,
					},
					{
						name: 'By',
						value: '[**MarcuX**](https://www.facebook.com/marcuxnguyen/) \n [**SPARKA**](https://www.facebook.com/ducthanhh.nguyenn)',
						inline: true,
					},
					{
						name: 'Github',
						value: `[MarcuXNg](${config.github})`,
						inline: true,
					},
					{
						name: 'Instagram',
						value: `[Follow me](${config.instagram})`,
						inline: true,
					},
					{
						name: '🔗 Node.js version',
						value: process.version,
						inline: true,
					},
					{
						name: '🔗 Discord.js Version',
						value: version,
						inline: true,
					},
					{
						name: '📂 Channels',
						value: `\`${client.channels.cache.size} Channels\``,
						inline: true,
					},
					{
						name: '👨‍👧‍👧 Users',
						value: `\`${client.users.cache.size} Users\``,
						inline: true,
					},
					{
						name: '🏓 Ping',
						value: `\`${client.ws.ping}ms\``,
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
