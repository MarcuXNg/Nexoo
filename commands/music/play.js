const { checkSameRoom } = require('../../utils');
const config = require('../../config.json');
const Discord = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice');

module.exports = {
	name: 'play',
	aliases: ['p'],
	category: 'music',
	description: 'playing music from youtube, soundcloud, spotify, zingmp3',
	usage: `${config.prefix}play [song name/song url]`,
	inVoiceChannel: true,
	run: async (client, message, args) => {
		try {
			if (checkSameRoom(message)) return;
			const voiceChannel = message.member.voice.channel;
			if (voiceChannel.full) {
				return message.channel.send({
					embeds: [
						new Discord.MessageEmbed().setColor('RANDOM').setDescription('❌ | **The channel is already full!**')],
				});
			}
			const SearchString = args.join(' ');
			if (!SearchString) {
				return message.channel.send({
					embeds: [
						new Discord.MessageEmbed().setColor('RANDOM').setDescription(`❌ | **No song name or url provided!** : \`${config.prefix}play [song name/song url]\``)],
				});
			}
			else {
				try {
					// Deezer
					const Deezer = (str) => {
						const regex = /(http|https):\/\/(www.deezer.com|deezer.com)/;
						if (!regex.test(str)) {
							return false;
						}
						else {
							return true;
						}
					};
					if (Deezer(args[0])) {
						try {
							if (!message.guild.me.voice.channel) {
								await message.channel.send(`📣 Successfully connected to channel  **${voiceChannel.name}**`);
							}
							joinVoiceChannel({
								channelId: message.member.voice.channel.id,
								guildId: message.guild.id,
								adapterCreator: message.guild.voiceAdapterCreator,
							});
							await message.react('✅');
							await client.distube.play(message.member.voice.channel, args[0], {
								member: message.member,
								textChannel: message.channel,
								message,
							});

						}
						catch (e) {
							message.channel.send({
								embeds: [
									new Discord.MessageEmbed().setColor('RANDOM').setDescription('❌ | **Please try again later!**')],
							});
							console.error(e);
						}
						return;
					}
					joinVoiceChannel({
						channelId: message.member.voice.channel.id,
						guildId: message.guild.id,
						adapterCreator: message.guild.voiceAdapterCreator,
					});
					if (!message.guild.me.voice.channel) {
						await message.channel.send(`📣 Successfully connected to channel  **${voiceChannel.name}**`);
					}
					await client.distube.play(message.member.voice.channel, SearchString, {
						member: message.member,
						textChannel: message.channel,
						message,
					});
				}
				catch (err) {
					console.log(err);
				}
			}
		}
		catch (err) {
			console.log(err);
		}
	},
};
