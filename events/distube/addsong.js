const client = require('../../index.js');
const Discord = require('discord.js');
const config = require('../../config.json');

// distube events
const status = queue =>
	`**Volume:** \`${queue.volume}%\` | **Filter:** \`${queue.filters.join(', ') || 'Off'}\` | **Loop:** \`${queue.repeatMode ? (queue.repeatMode === 2 ? 'All Queue' : 'This Song') : 'Off'
	}\` | **Autoplay:** \`${queue.autoplay ? 'On' : 'Off'}\``;
client.distube
	.on('addSong', (queue, song) =>
		queue.textChannel.send({
			embeds: [new Discord.MessageEmbed()
				.setColor('RANDOM')
				.setThumbnail(song.thumbnail)
				.setAuthor({
					name: 'Added to queue',
					iconURL: config.iconURL,
				})
				.setDescription(`**[${song.name}](${song.url})** \n ${status(queue)}`)
				.setFields(
					{
						name: '🔉VoiceChannel',
						value: `╰ <#${queue.voiceChannel.id}>`,
						inline: true,
					},
					{
						name: ':hourglass: Ping',
						value: `╰ \`${client.ws.ping}\` ms.`,
						inline: true,
					},
					{
						name: '🤨 Next Related Song',
						value: `╰ ${song.related.map(obj => `[${obj.name}](${obj.url})`)[0]}`,
						inline: false,
					},
					{
						name: '🙆‍♂️ Requested By',
						value: `╰ ${song.user}`,
						inline: true,
					},
					{
						name: '⏲️ Duration',
						value: `╰ \`${song.formattedDuration}\``,
						inline: true,
					},
					{
						name: '👀 Views',
						value: `╰ \`${song.views}\``,
						inline: true,
					},
					{
						name: '👍 Likes',
						value: `╰ \`${song.likes}\``,
						inline: true,
					},
					{
						name: '⬆️ Uploader',
						value: `╰ \`${song.uploader.name}\``,
						inline: true,
					},
					{
						name: '🤨 Source',
						value: `╰ \`${song.source}\``,
						inline: true,
					},
				)
				.setTimestamp()
				.setFooter({
					text: `Type ${client.prefix}p [songname or url] to play music`,
					iconURL: song.user.displayAvatarURL({ dynamic: true }),
				})],
		},
		),
	);