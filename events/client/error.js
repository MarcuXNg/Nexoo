const client = require('../../index.js');
client.on('error', async (error) => {
	console.log(error);
});