const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const axios = require('axios');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('country')
		.setDescription('get the country flags.')
		.addStringOption(option =>
			option.setName('query')
				.setDescription('The country you want to get the flag')
				.setRequired(true)),
	async execute(client, interaction) {
		try {
			const query = interaction.options.getString('query');
			const key = 'FmhsMvqOisrM';

			const res = await axios(`https://api.ultrax-yt.com/v1/country?query=${query}&key=${key}`);
			const embed = new MessageEmbed()
				.setColor('RANDOM')
				.setTitle(res.data.country)
				.setImage(res.data.flag);
			interaction.reply({ embeds: [embed] });
		}
		catch (err) {
			console.log(err);
		}
	},
};