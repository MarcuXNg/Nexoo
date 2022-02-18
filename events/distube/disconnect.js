const client = require('../../index.js');

client.distube
	.on('disconnect', queue => queue.textChannel.send('📣 I was disconnected from the voiceChannel'));