const config = require('../../config.json');
module.exports = {
	name: 'cancel',
	aliases: ['cancel'],
	category: 'moderation',
	description: 'cancel',
	usage: `${config.prefix}cancel`,
	inVoiceChannel: true,
	run: async (client, message, args) => {
		try {
			client.destroy();
		}
		catch (err) {
			console.log(err);
		}
	},
};