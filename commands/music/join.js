const { Constants } = require('discord.js');
const { checkSameRoom } = require('../../utils');

module.exports = {
	name: 'join',
	aliases: ['j', 'enter'],
	category: 'music',
	description: 'join the voice channel',
	usage: '(prefix)join',
	inVoiceChannel: true,
	run: async (client, message, args) => {
		try {
			if (checkSameRoom(message)) return;
			// check if the bot is in the voicechannel or not
			if (message.guild.me.voice.channel) return message.channel.send('❌ I\'m already in the voicechannel!');
			const voiceChannel = message.member.voice.channel;
			if (args[0]) {
				voiceChannel = await client.channels.fetch(args[0]);
				if (!Constants.VoiceBasedChannelTypes.includes(voiceChannel?.type)) {
					return message.channel.send(`${client.emotes.error} | ${args[0]} is not a valid voice channel!`);
				}
			}
			client.distube.voices.join(voiceChannel);
			await message.channel.send(`✅ Successfully connected to channel **${voiceChannel.name}**`);
			await message.react('✅');
		}
		catch (err) {
			console.log(err);
		}
	},
};
