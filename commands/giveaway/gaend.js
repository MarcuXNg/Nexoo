module.exports = {
	name: 'gaend',
	aliases: ['ge'],
	category: 'giveaway',
	description: 'End the giveaway',
	usage: '(prefix)gaend <messageId>',
	run: async (client, message, args) => {
		try {
			const usage = `${client.prefix}gaend <messageId>`;
			if (!args[0]) return message.channel.send(`Missing messageId\n**Usage:** \`${usage}\``);
			if (args[0]) {
				await client.GiveawayClient.end(args[0], true);
			}
		}
		catch (error) {
			console.log(error);
		}
	},
};