const client = require('../../index.js');
client.on('debug', async (message) => {
	console.log(message.toString());
});