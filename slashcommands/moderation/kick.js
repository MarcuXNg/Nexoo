const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('kick')
		.setDescription('Select a member and kick them')
		.addUserOption(option => option.setName('target').setDescription('The member to kick')),
	async execute(client, interaction) {
		if (!interaction.member.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) return interaction.reply({ content: `You don't have the permission to use the bot` })
		const member = interaction.options.getMember('target');
		member.kick();
		interaction.reply({ content: `${member} was kicked from the server.` });
	},
};