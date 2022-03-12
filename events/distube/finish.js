const client = require('../../index.js');

client.distube
	.on('finish', queue => queue.textChannel.send('📣 Finished playing current queue! I hope you enjoyed it :heart:'),
	);