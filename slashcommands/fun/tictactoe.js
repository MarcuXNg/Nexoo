const { SlashCommandBuilder } = require('@discordjs/builders');
const Tictactoe = require('discord-tictactoe');

const game = new Tictactoe({
	languague: 'en',
});

module.exports = {
	data: new SlashCommandBuilder()
		.setName('tictactoe')
		.setDescription('play tictactoe with a person'),
	async execute(client, interaction) {
		game.handleInteraction(interaction);
	},

};