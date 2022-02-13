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
				.setDescription(`**[${song.name}](${song.url})** \n ${status(queue)} \n **╰** 🔉**VoiceChannel**: <#${queue.voiceChannel.id}> - :hourglass: **Ping**: \`${client.ws.ping}\` ms. \n **╰** 🤨**Next Related Song**: ${song.related.map(obj => obj.name).join(', ')} `)
				.setFields(
					{
						name: '╰ 🙆‍♂️ Requested By',
						value: `${song.user}`,
						inline: true,
					},
					{
						name: '╰ ⏲️ Duration',
						value: `\`${song.formattedDuration}\``,
						inline: true,
					},
					{
						name: '╰ 👀 Views',
						value: `\`${song.views}\``,
						inline: true,
					},
					{
						name: '╰ 👍 Likes',
						value: `\`${song.likes}\``,
						inline: true,
					},
					{
						name: '╰ ⬆️ Uploader',
						value: `\`${song.uploader.name}\``,
						inline: true,
					},
					{
						name: '╰ 🤨 Source',
						value: `\`${song.source}\``,
						inline: true,
					},
				)
				.setTimestamp()
				.setFooter('><', song.user.displayAvatarURL({ dynamic: true }))],
		},
		),
	)
	.on('addSong', (queue, song) =>
		queue.textChannel.send({
			embeds: [new Discord.MessageEmbed()
				.setColor('RANDOM')
				.setThumbnail(`${song.thumbnail}`)
				.setAuthor('Added to queue ', config.iconURL)
				.setDescription(`**[${song.name}](${song.url})** \n ${status(queue)} \n **╰** 🔉**VoiceChannel**: <#${queue.voiceChannel.id}> - :hourglass: **Ping**: \`${client.ws.ping}\` ms.`)
				.setFields(
					{
						name: '╰ 🙆‍♂️ Requested By',
						value: `${song.user}`,
						inline: true,
					},
					{
						name: '╰ ⏲️ Duration',
						value: `\`${song.formattedDuration}\``,
						inline: true,
					},
					{
						name: '╰ 👀 Views',
						value: `\`${song.views}\``,
						inline: true,
					},
					{
						name: '╰ 👍 Likes',
						value: `\`${song.likes}\``,
						inline: true,
					},
					{
						name: '╰ ⬆️ Uploader',
						value: `\`${song.uploader.name}\``,
						inline: true,
					},
					{
						name: '╰ 🤨 Source',
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
						name: '╰🙆‍♂️ Requested By',
						value: `${playlist.user}`,
						inline: true,
					},
					{
						name: '╰⏲️ Duration',
						value: `\`${playlist.formattedDuration}\``,
						inline: true,
					},
				)
				.setTimestamp()
				.setFooter('><', playlist.user.displayAvatarURL({ dynamic: true }))],
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
	.on('disconnect', queue => queue.textChannel.send({
		embeds: [
			new Discord.MessageEmbed().setColor('RANDOM').setDescription('📣 I was disconnected from the voiceChannel')],
	}))
	.on('noRelated', queue => queue.textChannel.send({
		embeds: [
			new Discord.MessageEmbed().setColor('RANDOM').setDescription('📣 Can\'t find related video to play.')],
	}),
	)
	.on('initQueue', queue => {
		queue.autoplay = false;
		queue.volume = 100;
	})
	.on('searchResult', (message, result) => {
		let i = 0;
		message.channel.send(
			{
				embeds: [
					new Discord.MessageEmbed()
						.setColor('RANDOM')
						.setAuthor('Song selection. Type the song number to continue', message.author.avatarURL({ dynamic: true }))
						.setDescription(`${result
							.map(song => `**${++i})** **[${song.name}](${song.url})** (\`${song.views}\` views) - \`${song.formattedDuration}\``)
							.join('\n')}`)
						.setThumbnail('https://i.imgur.com/FWKIR7N.png')
						.setFooter(`This timeouts in 60 seconds. Type ${config.prefix}cancel or wait to cancel.`, message.author.avatarURL({ dynamic: true })) ],
			},
		);
	})
	.on('searchCancel', message => message.channel.send({
		embeds: [
			new Discord.MessageEmbed()
				.setColor('RANDOM')
				.setTitle('🤌 Searching canceled')
				.setDescription('Timeout!') ],
	}))
	.on('searchInvalidAnswer', message =>
		message.channel.send({
			embeds: [
				new Discord.MessageEmbed()
					.setColor('RANDOM')
					.setTitle('🙅‍♂️ Invalid choice! You have to enter the number in the range of the results')
					.setDescription('Please choose again') ],
		},
		),
	)
	.on('searchDone', (message) => {
		message.channel.send({
			embeds: [
				new Discord.MessageEmbed()
					.setColor('RANDOM')
					.setTitle('Search done!')
					.setDescription('Hope you enjoy the music ❤️') ],
		});
	});
