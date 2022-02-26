const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios').default;
module.exports = {
	data: new SlashCommandBuilder()
		.setName('djs')
		.setDescription('Show documents about discord.js.')
		.addStringOption(option => option.setName('keyword').setDescription('The keyword for the title of the category in the document').setRequired(true)),
	async execute(client, interaction) {
		const keyword = interaction.options.getString('duration');
		const url = `https://sagiri-fansub.tk/api/v1/djsdoc/${encodeURIComponent(keyword)}`;
		const res = await axios.get(url).catch(e => console.log(e.message));
		if (!res) {return interaction.reply('API error, please try again later.');}
		else {
			interaction.reply({
				embeds: [res.data.data],
			});
		}
	},
};