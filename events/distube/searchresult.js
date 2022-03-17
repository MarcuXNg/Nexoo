const client = require('../../index.js');
const Discord = require('discord.js');

client.distube
	.on('searchResult', (message, result) => {
		let i = 0;
		message.channel.send(
			{
				embeds: [
					new Discord.MessageEmbed()
						.setColor('#3C85D1')
						.setAuthor({
							name: 'Song selection. Type the song number to continue',
							iconURL: message.guild.iconURL({ dynamic: true }) || 'https://cdn.discordapp.com/attachments/765919453766352916/877787616974622770/wCfHtuoejLIbAAAAABJRU5ErkJggg.png',
						})
						.setDescription(`${result
							.map(song => `**${++i})** **[${song.name}](${song.url})** (\`${song.views}\` views) - \`${song.formattedDuration}\``)
							.join('\n')}`)
						.setThumbnail('https://i.imgur.com/FWKIR7N.png')
						.setFooter({
							text: `This timeouts in 60 seconds. Type ${client.prefix}cancel or wait to cancel.`,
							iconURL: message.author.avatarURL({ dynamic: true }),
						})],
			},
		);
	});
