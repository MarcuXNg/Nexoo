const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('avatar')
		.setDescription('Get the avatar URL of the selected user, or your own avatar.')
		.addUserOption(option => option.setName('target').setDescription('The user\'s avatar to show')),
	async execute(client, interaction) {
		const user = interaction.options.getUser('target');
		const embed = new MessageEmbed()
			.setTitle(user.username)
			.setImage(user.displayAvatarURL({ dynamic: true }));
		if (user) {
			return interaction.reply({
				embeds: [embed],
			});
		}

	},
};
