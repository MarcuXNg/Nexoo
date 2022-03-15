const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const axios = require('axios');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('translate')
		.setDescription('translate a message.')
		.addStringOption(option =>
			option.setName('from')
				.setDescription('The language you want to translate')
				.setRequired(true))
		.addStringOption(option =>
			option.setName('to')
				.setDescription('The language you want to translate to')
				.setRequired(true))
		.addStringOption(option =>
			option.setName('query')
				.setDescription('The word tou want to translate')
				.setRequired(true)),
	async execute(client, interaction) {
		try {
			const from = interaction.options.getString('from');
			const to = interaction.options.getString('to');
			const query = interaction.options.getString('query');
			const key = 'FmhsMvqOisrM';

			const res = await axios(`https://api.ultrax-yt.com/v1/translate?from=${from}&to=${to}&query=${query}&key=${key}`);
			const embed = new MessageEmbed()
				.setColor('RANDOM')
				.setTitle('Translation')
				.setDescription(`${res.data.translation}\n\n**Supported languages:** [here](https://api.ultrax-yt.com/v1/details/supported-translate-languages)`)
				.setFooter({
					text: `${from} -> ${to}`,
					iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
				});
			interaction.reply({ embeds: [embed] });
		}
		catch (err) {
			console.log(err);
		}
	},
};