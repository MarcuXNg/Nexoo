const { ContextMenuCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new ContextMenuCommandBuilder()
		.setName('User Info')
		.setType(2),
	async execute(client, interaction) {
		const user = await interaction.guild.members.fetch(interaction.targetId);
		interaction.reply({
			embeds: [new MessageEmbed()
				.setColor('RED')
				.setTitle(`Your username: ${user.user.username}`)
				.setDescription(`Your ID: ${user.id}`),
			],
		});
	},
};