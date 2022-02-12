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
						new Discord.MessageEmbed().setColor('RANDOM').setDescription('❌ | **The channel is already full!**')],
				});
			}
			const SearchString = args.join(' ');
			if (!SearchString) {
				return message.reply({
					embeds: [
						new Discord.MessageEmbed().setColor('RANDOM').setDescription(`❌ | **No song name or url provided!** : \`${config.prefix}play [song name/song url]\``)],
				});
			}
			else {
				try {
					await client.distube.play(message.member.voice.channel, SearchString, {
						member: message.member,
						textChannel: message.channel,
						message,
					});
					// voiceconnection
					if (!message.guild.me.voice.channel) {
						message.channel.send(`📣 Successfully connected to channel  **${voiceChannel.name}**`);
					}
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
