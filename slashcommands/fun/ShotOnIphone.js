const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('shotoniphone')
		.setDescription('Send shot on iphone clip'),
	async execute(client, interaction) {
		const key = 'FmhsMvqOisrM';
		const res = await axios(`https://api.ultrax-yt.com/v1//shot-on-iphone?key=${key}`);
		interaction.reply({ content: res.data.res });
	},

};