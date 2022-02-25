const ms = require('ms');

module.exports = {
	name: 'gastart',
	aliases: ['gs'],
	category: 'giveaway',
	description: 'Start the giveaway',
	usage: '(prefix)gastart',
	run: (client, message, args) => {
		try {
			const channel = message.mentions.channels.first();
			if (!channel) return message.channel.send('Please insert a channel to send the giveaway!');
			let time = args[1];
			if (!time) return message.channel.send('Please specify a time!');
			time = ms(time);
			if (!args[2]) return message.channel.send('Please insert the number of winners!');
			if (!args[3]) return message.channel.send('Please choose the prize for the giveaway!');

			client.GiveawayClient.start({
				channel,
				time,
				hostedBy: message.author,
				description: 'A random giveaway',
				winners: parseInt(args[2]),
				prize: args.slice(3).join(' '),
			});
		}
		catch (error) {
			console.log(error);
		}
	},
};