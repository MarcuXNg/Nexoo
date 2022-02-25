module.exports = {
	name: 'rmvcache',
	aliases: ['rmc'],
	category: 'giveaway',
	description: 'Remove the cache of the giveaway in this guild',
	usage: '(prefix)rmvcache <guildId>',
	run: async (client, message, args) => {
		try {
			const usage = `${client.prefix}rmvcache <guildId>`;
			if (!args[0]) return message.channel.send(`Missing guildId\n**Usage:** \`${usage}\``);
			if (args[0]) {
				await client.GiveawayClient.removeCachedGiveaways(false, args[0]);
				await message.channel.send('Successfully removed all Cache in the database of this guild');
			}
		}
		catch (error) {
			console.log(error);
		}
	},
};