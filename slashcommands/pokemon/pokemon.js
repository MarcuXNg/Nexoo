const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('pokemon')
		.setDescription('Pokemon ability')
		.addStringOption(option => option.setName('pokii').setDescription('The pokemon you want to search').setRequired(true)),
	async execute(client, interaction) {
		const pokemon = interaction.options.getString('pokii');
		const res = await axios(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
		const embed = new MessageEmbed();
		embed.setThumbnail(res.data.sprites.front_default);
		embed.setTitle(`${res.data.name.charAt(0).toUpperCase() + res.data.name.slice(1)} #${res.data.id}`);
		embed.addFields({
			name: 'Weight',
			value: `╰ ${res.data.weight}`,
			inline: false,
		});
		embed.addFields({
			name: 'Base Experience',
			value: `╰ ${res.data.base_experience}`,
			inline: false,
		});
		await res.data.stats.map((stat) => {
			// console.log(stat);
			embed.addFields({
				name: `${stat.stat.name.toUpperCase().slice(0, 1) + stat.stat.name.slice(1)}`,
				value: `╰ ${stat.base_stat}`,
				inline: true,
			});
		});
		await res.data.types.map((type) => {
			// console.log(type);
			embed.addFields({
				name: 'Type',
				value: `╰ ${type.type.name}`,
				inline: true,
			});
		});
		await interaction.reply({ embeds: [embed] });
	},

};