const config = require('../../config.json');

module.exports = {
	name: 'prefix',
	aliases: ['prefix'],
	category: 'info',
	description: 'Gets the prefix of the bot',
	usage: `${config.prefix}prefix`,
	run: (client, message) => {
		try {
			message.channel.send(`Prefix on this server is **\`${config.prefix}\`**`);
		}
		catch (err) {
			console.log(err);
		}
	},
};
