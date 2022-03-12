const client = require('../../index.js');
const Discord = require('discord.js');
const config = require('../../config.json');

client.distube
	.on('searchResult', (message, result) => {
		let i = 0;
		message.channel.send(
			{
				embeds: [
					new Discord.MessageEmbed()
						.setColor('RANDOM')
						.setAuthor({
							name: 'Song selection. Type the song number to continue',
							iconURL: message.author.avatarURL({ dynamic: true }),
						})
						.setDescription(`${result
							.map(song => `**${++i})** **[${song.name}](${song.url})** (\`${song.views}\` views) - \`${song.formattedDuration}\``)
							.join('\n')}`)
						.setThumbnail('https://i.imgur.com/FWKIR7N.png')
						.setFooter({
							text: `This timeouts in 60 seconds. Type ${config.prefix}cancel or wait to cancel.`,
							iconURL: message.author.avatarURL({ dynamic: true }),
						})],
			},
		);
	});