const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('quotes')
		.setDescription('Random word')
		.addSubcommand(subcommand =>
			subcommand
				.setName('confidence')
				.setDescription('return a random quote of confidence'))
		.addSubcommand(subcommand =>
			subcommand
				.setName('depression')
				.setDescription('return a random quote of depression'))
		.addSubcommand(subcommand =>
			subcommand
				.setName('facts')
				.setDescription('return a random quote of facts'))
		.addSubcommand(subcommand =>
			subcommand
				.setName('love')
				.setDescription('return a random quote of love'))
		.addSubcommand(subcommand =>
			subcommand
				.setName('motivation')
				.setDescription('return a random quote of motivation'))
		.addSubcommand(subcommand =>
			subcommand
				.setName('random')
				.setDescription('return a random quote')),
	async execute(client, interaction) {
		const key = 'FmhsMvqOisrM';
		const type = interaction.options.getSubcommand();
		const res = await axios(`https://api.ultrax-yt.com/v1/quotes/${type}?key=${key}`);
		interaction.reply({ content: res.data.quote });
	},

};