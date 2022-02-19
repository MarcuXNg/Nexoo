const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions, MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('timeout')
		.setDescription('Select a member to timeout them')
		.addUserOption(option => option.setName('target').setRequired(true).setDescription('The user you\'d like to time out'))
		.addStringOption(option => option.setName('duration').setRequired(true).setDescription('The duration of time out. (IN MINUTES)'))
		.addStringOption(option => option.setName('reason').setDescription('The reason for putting the user in time out.')),
	async execute(client, interaction) {
		if (!interaction.member.permissions.has(Permissions.FLAGS.MODERATE_MEMBERS)) return interaction.reply({ content: 'You don\'t have the permission to use the bot' });
		const user = interaction.options.getUser('target');
		const duration = interaction.options.getString('duration');
		const reason = interaction.options.getString('reason') || 'No reason provided';
		const member = await interaction.guild.members.fetch(user.id);
		if (!member) return await interaction.reply({ content: 'The user mentioned is not within the server.' });
		if (!duration) return await interaction.reply({ content: 'The duration provided is not a valid number.' });

		const embed = new MessageEmbed()
			.setTitle('You have been put in timeout.')
			.setFields({
				name: 'Duration of timeout',
				value: `${duration} minutes`,
				inline: true,
			});
		try {
			await member.send({ embeds: [embed] });
		}
		catch (e) {
			console.log('The user\'s DM\'s are off.');
		}

		try {
			await member.timeout(duration * 1000, reason);
			interaction.channel.send({ content: `${user} has been put in timeout (${duration} minute(s)) for ${reason}` });
		}
		catch (e) {
			console.log(e);
		}
	},
};
