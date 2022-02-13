const client = require('../../index.js');

client.on('voiceStateUpdate', (message) => {
	const voiceChannel = message.member.voice.channel;
	if (voiceChannel.size === 0) message.channel.send('The channel is empty. I will leave the channel in 2 minutes');
});