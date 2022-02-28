module.exports = {
	name: 'calculate',
	aliases: ['calc'],
	category: 'fun',
	description: 'calculate math',
	usage: '(config)calculate',
	run: async (client, message, args) => {
		try {
			const firstValue = Number(args[0]);
			const secondValue = Number(args[2]);

			if (!args[0]) return message.channel.send(`You have to input more arguments \`${client.prefix}calc number [+, - , x, /] number\``);
			if (!firstValue) return message.channel.send('The first value stated is not a number.');
			if (!args[1]) return message.channel.send('You need to state what you want to do with this and another number . Options: +, -, x, /');
			if (!['+', '-', 'x', '/'].includes(args[1])) return message.channel.send('You did not state a method to apply to these numbers: +, -, x, /');
			if (!secondValue) return message.channel.send('The second value stated is not a number.');

			if (args[1] == '+') {
				const result = firstValue + secondValue;
				message.channel.send(`\`${firstValue}\` + \`${secondValue}\` = \`${result}\``);
			}
			if (args[1] == '-') {
				const result = firstValue - secondValue;
				message.channel.send(`\`${firstValue}\` - \`${secondValue}\` = \`${result}\``);
			}
			if (args[1] == 'x') {
				const result = firstValue * secondValue;
				message.channel.send(`\`${firstValue}\` x \`${secondValue}\` = \`${result}\``);
			}
			if (args[1] == '/') {
				const result = firstValue / secondValue;
				message.channel.send(`\`${firstValue}\` / \`${secondValue}\` = \`${result}\``);
			}
		}
		catch (err) {
			console.log(err);
		}
	},
};

