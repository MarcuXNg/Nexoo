const voice = require('@discordjs/voice');

module.exports = {
	name: 'leave',
	aliases: ['dis', 'l', 'disconnect'],
	category: 'music',
	description: 'leave the voice channel',
	usage: '(prefix)leave',
	inVoiceChannel: true,
	run: async (client, message) => {
		try {
			if (!message.guild.me.voice.channel) {
				return message.channel.send('❌ I\'m not in the voicechannel!');
			}
			// check if the bot is in the voicechannel or not
			const connection = voice.joinVoiceChannel({
				channelId: message.member.voice.channel.id,
				guildId: message.guild.id,
				adapterCreator: message.guild.voiceAdapterCreator,
			});
			connection.destroy();
			await message.channel.send('I left the voice.');
			await message.react('✅');
		}
		catch (err) {
			console.log(err);
		}
	},
};
