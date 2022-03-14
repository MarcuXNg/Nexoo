const client = require('../../index.js');
client.on('warn', async (message) => {
	console.log(message.toString());
});