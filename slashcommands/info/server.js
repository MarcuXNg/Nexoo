const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('server')
		.setDescription('Display info about this server.'),
	async execute(client, interaction) {
		return interaction.reply({
			embeds: [new MessageEmbed()
				.setColor("RED")
				.setTitle(`Server name: ${interaction.guild.name}`)
				.setDescription(`Total members: ${interaction.guild.memberCount}`)
			]
		});
	},
};