const client = require('../../index.js');
const Discord = require('discord.js');
const config = require('../../config.json');

// distube events
const status = queue =>
	`**Volume:** \`${queue.volume}%\` | **Filter:** \`${queue.filters.join(', ') || 'Off'}\` | **Loop:** \`${queue.repeatMode ? (queue.repeatMode === 2 ? 'All Queue' : 'This Song') : 'Off'
	}\` | **Autoplay:** \`${queue.autoplay ? 'On' : 'Off'}\``;
client.distube
	.on('addList', (queue, playlist) =>
		queue.textChannel.send({
			embeds: [new Discord.MessageEmbed()
				.setColor('RANDOM')
				.setThumbnail(`${playlist.thumbnail}`)
				.setAuthor({
					name: 'Added to queue',
					iconURL: config.iconURL,
				})
				.setDescription(`**[${playlist.name}](${playlist.url})** playlist \`(${playlist.songs.length} songs)\` \n ${status(queue)}`)
				.setFields(
					{
						name: '🙆‍♂️ Requested By',
						value: `╰ ${playlist.user}`,
						inline: true,
					},
					{
						name: '⏲️ Duration',
						value: `╰ \`${playlist.formattedDuration}\``,
						inline: true,
					},
				)
				.setTimestamp()
				.setFooter({
					text: `Type ${config.prefix}p [songname or url] to play music`,
					iconURL: playlist.user.displayAvatarURL({ dynamic: true }),
				}),
			],
		},
		),
	);
