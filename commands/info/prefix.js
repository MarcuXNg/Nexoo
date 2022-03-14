module.exports = {
	name: 'prefix',
	aliases: ['prefix'],
	category: 'info',
	description: 'Gets the prefix of the bot',
	usage: '(prefix)prefix',
	run: (client, message) => {
		try {
			message.channel.send(`Prefix on this server is **\`${client.prefix}\`**`);
		}
		catch (err) {
			console.log(err);
		}
	},
};
