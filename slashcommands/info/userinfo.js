const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('userinfo')
		.setDescription('Display info about yourself.'),
	async execute(client, interaction) {
		return interaction.reply({
			embeds: [new MessageEmbed()
				.setColor("RED")
				.setTitle(`Your username: ${interaction.user.username}`)
				.setDescription(`Your ID: ${interaction.user.id}`)
			]
		});
	},
};