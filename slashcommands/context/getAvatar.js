const { ContextMenuCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new ContextMenuCommandBuilder()
		.setName('Get Avatar')
		.setType(2),
	async execute(client, interaction) {
		const user = await interaction.guild.members.fetch(interaction.targetId);
		const embed = new MessageEmbed()
			.setTitle(user.user.username)
			.setImage(user.user.displayAvatarURL({ size: 2048, dynamic: true }));

		interaction.reply({
			embeds: [embed],
		});

	},
};