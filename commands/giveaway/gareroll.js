module.exports = {
	name: 'gareroll',
	aliases: ['gr'],
	category: 'giveaway',
	description: 'Reroll the giveaway',
	usage: '(prefix)gareroll <messageId>',
	run: async (client, message, args) => {
		try {
			const usage = `${client.prefix}gareroll <messageId>`;
			if (!args[0]) return message.channel.send(`Missing messageId\n**Usage:** \`${usage}\``);
			if (args[0]) {
				await client.GiveawayClient.reroll(args[0]);
			}
		}
		catch (error) {
			console.log(error);
		}
	},
};