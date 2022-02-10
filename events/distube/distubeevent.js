const client = require('../../index.js');
const Discord = require('discord.js');
const config = require('../../config.json');

// distube events
const status = queue =>
	`**Volume:** \`${queue.volume}%\` | **Filter:** \`${queue.filters.join(', ') || 'Off'}\` | **Loop:** \`${queue.repeatMode ? (queue.repeatMode === 2 ? 'All Queue' : 'This Song') : 'Off'
	}\` | **Autoplay:** \`${queue.autoplay ? 'On' : 'Off'}\``;
client.distube
	.on('playSong', (queue, song) =>
		queue.textChannel.send({
			embeds: [new Discord.MessageEmbed()
				.setColor('RANDOM')
				.setThumbnail(`${song.thumbnail}`)
				.setAuthor('Now playing', config.iconURL)
				.setDescription(`**[${song.name}](${song.url})** \n ${status(queue)}`)
				.setFields(
					{
						name: '💤 Requested By',
						value: `${song.user}`,
						inline: true,
					},
					{
						name: '⏲️ Duration',
						value: `\`${song.formattedDuration}\``,
						inline: true,
					},
					{
						name: '👀 Views',
						value: `\`${song.views}\``,
						inline: true,
					},
					{
						name: '👍 Likes',
						value: `\`${song.likes}\``,
						inline: true,
					},
					{
						name: '⬆️ Uploader',
						value: `\`${song.uploader.name}\``,
						inline: true,
					},
					{
						name: '🤨 Source',
						value: `\`${song.source}\``,
						inline: true,
					},
				)
				.setTimestamp()
				.setFooter('><', song.user.displayAvatarURL({ dynamic: true })) ],
		},
		),
	)
	.on('addSong', (queue, song) =>
		queue.textChannel.send({
			embeds: [new Discord.MessageEmbed()
				.setColor('RANDOM')
				.setThumbnail(`${song.thumbnail}`)
				.setAuthor('Added to queue ', config.iconURL)
				.setDescription(`**[${song.name}](${song.url})** \n ${status(queue)}`)
				.setFields(
					{
						name: '💤 Requested By',
						value: `${song.user}`,
						inline: true,
					},
					{
						name: '⏲️ Duration',
						value: `\`${song.formattedDuration}\``,
						inline: true,
					},
					{
						name: '👀 Views',
						value: `\`${song.views}\``,
						inline: true,
					},
					{
						name: '👍 Likes',
						value: `\`${song.likes}\``,
						inline: true,
					},
					{
						name: '⬆️ Uploader',
						value: `\`${song.uploader}\``,
						inline: true,
					},
					{
						name: '🤨 Source',
						value: `\`${song.source}\``,
						inline: true,
					},
				)
				.setTimestamp()
				.setFooter('><', song.user.displayAvatarURL({ dynamic: true }))],
		},
		),
	)
	.on('addList', (queue, playlist) =>
		queue.textChannel.send({
			embeds: [new Discord.MessageEmbed()
				.setColor('RANDOM')
				.setThumbnail(`${playlist.thumbnail}`)
				.setAuthor('Added to queue', config.iconURL)
				.setDescription(`**[${playlist.name}](${playlist.url})** playlist \`(${playlist.songs.length
				} songs)\` \n ${status(queue)}`)
				.setFields(
					{
						name: 'Requested By',
						value: `${playlist.user}`,
						inline: true,
					},
					{
						name: 'Duration',
						value: `\`${playlist.formattedDuration}\``,
						inline: true,
					},
				)
				.setTimestamp()
				.setFooter('><', playlist.user.displayAvatarURL({ dynamic: true })) ],
		},
		),
	)
	.on('error', (channel, e) => {
		channel.send({
			embeds: [
				new Discord.MessageEmbed().setColor('RANDOM').setDescription(`❌ | An error encountered: ${e.toString().slice(0, 1974)}`)],
		});
		console.error(e);
	})
	.on('empty', queue => queue.textChannel.send({
		embeds: [
			new Discord.MessageEmbed().setColor('RANDOM').setDescription('😢 Voice channel is empty so i left the channel...')],
	}))
	.on('searchNoResult', (message, query) =>
		message.channel.send({
			embeds: [
				new Discord.MessageEmbed().setColor('RANDOM').setDescription(`❌ | No result found for \`${query}\`!`)],
		}),
	)
	.on('finish', queue => queue.textChannel.send({
		embeds: [
			new Discord.MessageEmbed().setColor('RANDOM').setDescription('📣 Finished playing current queue! I hope you enjoyed it :heart:')],
	}))
	.on('noRelated', queue => queue.textChannel.send({
		embeds: [
			new Discord.MessageEmbed().setColor('RANDOM').setDescription('📣 Can\'t find related video to play.')],
	}),
	)
	.on('initQueue', queue => {
		queue.autoplay = false;
		queue.volume = 100;
	});
