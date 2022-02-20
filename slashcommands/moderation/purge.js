const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions } = require('discord.js');
const ms = require('ms');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('purge')
		.setDescription('Purge up to 100 messages')
		.addNumberOption(option => option.setName('amount').setRequired(true).setDescription('The amount that is going to be deleted')),
	async execute(client, interaction) {
		if (!interaction.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return interaction.reply({ content: 'You don\'t have the permission to use the bot' });
		const amount = interaction.options.getNumber('amount');
		if (amount > 100) return interaction.reply({ content: 'The maximun amount of message u can delete is 100 messages' });
		const messages = await interaction.channel.messages.fetch({ limit: amount });
		const filtered = messages.filter((msg) => Date.now() - msg.createdTimestamp < ms('14 days'));

		interaction.channel.bulkDelete(filtered, true);
		await interaction.reply({ content: `successfully purged \`${amount}\` messages.` });
	},
};