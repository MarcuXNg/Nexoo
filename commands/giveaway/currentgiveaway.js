module.exports = {
	name: 'currentgiveaway',
	aliases: ['cga'],
	category: 'giveaway',
	description: 'Get the current giveaway',
	devOnly: true,
	usage: '(prefix)currentgiveaway <messageId>',
	run: async (client, message) => {
		try {
			const data = await client.GiveawayClient.getCurrentGiveaways(true, false, message);
			console.log(data);
		}
		catch (error) {
			console.log(error);
		}
	},
};