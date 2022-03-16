const Tictactoe = require('discord-tictactoe');

const game = new Tictactoe({
	languague: 'en',
});

module.exports = {
	name: 'tictactoe',
	aliases: ['ttt'],
	description: 'Tictactoe game',
	category: 'fun',
	usage: '(prefix)tictactoe',
	run: async (client, message, args) => {
		try {
			const people = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message;
			game.handleMessage(people);
		}
		catch (err) {
			console.log(err);
		}
	},
};
