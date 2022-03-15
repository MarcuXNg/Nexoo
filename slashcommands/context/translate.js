const { ContextMenuCommandBuilder } = require('@discordjs/builders');
// const { MessageEmbed } = require('discord.js');
const translate = require('@iamtraction/google-translate');

module.exports = {
	data: new ContextMenuCommandBuilder()
		.setName('Translate')
		.setType(3),
	async execute(client, interaction) {
		const msg = await interaction.channel.messages.fetch(interaction.targetId);
		const query = msg.content;

		const translated = await translate(query, { to: 'en' });

		interaction.reply(translated.text);
	},
};