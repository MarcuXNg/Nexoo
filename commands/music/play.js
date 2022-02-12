const { checkSameRoom } = require('../../utils');
const config = require('../../config.json');
const Discord = require('discord.js');


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
						new Discord.MessageEmbed().setColor('RANDOM').setDescription('❌ | **the channel is full!**')],
				});
			}
			const SearchString = args.join(' ');
			if (!SearchString) {
				return message.reply({
					embeds: [
						new Discord.MessageEmbed().setColor('RANDOM').setDescription(`❌ | **No song name or url provided!** : \`${config.prefix}play [song]\``)],
				});
			}
			else {
				try {
					// zingmp3
					const zingmp3 = (str) => {
						const regex = /(http|https):\/\/(www.zingmp3.vn|zingmp3.vn)/;
						if (!regex.test(str)) {
							return false;
						}
						else {
							return true;
						}
					};
					if (zingmp3(args[0])) {
						try {
							if (!message.guild.me.voice.channel) {
								await message.channel.send(`📣 Successfully connected to channel  **${voiceChannel.name}**`);
							}
							await message.react('✅');
							await client.distube.playVoiceChannel(message.member.voice.channel, args[0], {
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
					// soundcloud
					const soundcloud = (str) => {
						const regex = /(http|https):\/\/(www.soundcloud.com|soundcloud.com)/;
						if (!regex.test(str)) {
							return false;
						}
						else {
							return true;
						}
					};
					if (soundcloud(args[0])) {
						try {
							if (!message.guild.me.voice.channel) {
								await message.channel.send(`📣 Successfully connected to channel  **${voiceChannel.name}**`);
							}
							await message.react('✅');
							await client.distube.playVoiceChannel(message.member.voice.channel, args[0], {
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
					// spotify
					const spotify = (str) => {
						const regex = /(http|https):\/\/(www.open.spotify.com|open.spotify.com)/;
						if (!regex.test(str)) {
							return false;
						}
						else {
							return true;
						}
					};
					if (spotify(args[0])) {
						try {
							if (!message.guild.me.voice.channel) {
								await message.channel.send(`📣 Successfully connected to channel  **${voiceChannel.name}**`);
							}
							await message.react('✅');
							await client.distube.playVoiceChannel(message.member.voice.channel, args[0], {
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
					// youtube playlist
					const url = (str) => {
						const regex = /(http|https):\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/;
						if (!regex.test(str)) {
							return false;
						}
						else {
							return true;
						}
					};
					if (url(args[0])) {
						try {

							if (!message.guild.me.voice.channel) {
								await message.channel.send(`📣 Successfully connected to channel  **${voiceChannel.name}**`);
							}
							await message.react('✅');
							await client.distube.playVoiceChannel(message.member.voice.channel, args[0], {
								member: message.member,
								textChannel: message.channel,
								message,
							});
						}
						catch (e) {
							message.channel.send({
								embeds: [
									new Discord.MessageEmbed().setColor('RANDOM').setDescription('❌ | **Plz try again later!**')],
							});
							console.error(e);
						}
						return;
					}
					// youtube link
					const validURL = (str) => {
						const regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-/]))?/;
						if (!regex.test(str)) {
							return false;
						}
						else {
							return true;
						}
					};
					if (validURL(args[0])) {

						try {
							if (!message.guild.me.voice.channel) {
								await message.channel.send(`📣 Successfully connected to channel  **${voiceChannel.name}**`);
							}
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
				}
				catch (e) {
					console.log(e);
				}
				await message.react('✅');
				await client.distube.play(message.member.voice.channel, SearchString, {
					member: message.member,
					textChannel: message.channel,
					message,
				});

			}
		}
		catch (err) {
			console.log(err);
		}
	},
};
