const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('word')
		.setDescription('Random word'),
	async execute(client, interaction) {
		const key = 'FmhsMvqOisrM';
		const res = await axios(`https://api.ultrax-yt.com/v1/random/word?key=${key}`);
		interaction.reply({ content: res.data.word });
	},

};