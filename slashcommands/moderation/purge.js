const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('purge')
		.setDescription('Purge messages')
		.addNumberOption(option => option.setName('amount').setRequired(true).setDescription('The amount that is going to be deleted')),
	async execute(client, interaction) {
		if (!interaction.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return interaction.reply({ content: 'You don\'t have the permission to use the bot' });
		const amount = interaction.options.getNumber('amount');
		interaction.channel.bulkDelete(amount, true);
		return await interaction.reply({ content: `successfully purged \`${amount}\` messages.` });
	},
};