const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('joke')
		.setDescription('Random joke'),
	async execute(client, interaction) {
		const key = 'FmhsMvqOisrM';
		const res = await axios(`https://api.ultrax-yt.com/v1/random/joke?key=${key}`);
		interaction.reply({ content: res.data.joke });
	},

};