const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('poke')
		.setDescription('Poke a person')
		.addUserOption(option => option.setName('target').setDescription('The user to be poke')),
	async execute(client, interaction) {
		const user = interaction.options.getUser('target');
		return interaction.reply({ content: `<@932199083643379742> poke ${user}` });
	},

};