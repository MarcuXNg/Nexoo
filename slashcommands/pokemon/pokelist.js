const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const userConfig = require('../../database/models/userSchema');
const pokecord = require('pokecord');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('pokelist')
		.setDescription('List pokemon that belongs to a person')
		.addUserOption(option => option.setName('user').setDescription('The user you want to get their pokemons')),
	async execute(client, interaction) {
		const user = interaction.options.getUser('user') || interaction.user;
		if (user.bot) return interaction.reply({ content: 'You cannot get the pokemon list of a bot', ephemeral: true });
		const data = await userConfig.findOne({ user: user.id }) || await userConfig.create({ user: user.id });
		let pokemons = '';

		for (let i = 0; i < data.pokemons.length; i++) {
			const v = data.pokemons[i];
			pokemons += `${i}. ${(await pokecord.Spawn(v)).name}\n`;
		}
		interaction.reply({ embeds: [
			new MessageEmbed()
				.setTitle(`${user.username}'s Pokemon's`)
				.setDescription(pokemons),
		],
		});
	},
};