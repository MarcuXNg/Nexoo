const client = require('../../index.js');

client.distube
	.on('initQueue', queue => {
		queue.autoplay = false;
		queue.volume = 100;
	});