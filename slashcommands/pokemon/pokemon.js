const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios');
const { MessageEmbed } = require('discord.js');
const Guild = require('../../database/models/guildSchema');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('pokemon')
		.setDescription('Pokemon related')
		.addSubcommand(subcommand =>
			subcommand
				.setName('search')
				.setDescription('Information about a pokemon.')
				.addStringOption(option => option.setName('pokii').setDescription('The pokemon you want to search').setRequired(true)))
		.addSubcommand(subcommand =>
			subcommand
				.setName('enable-spawn')
				.setDescription('The time for the pokemon to spawn.')
				.addStringOption(option => option.setName('enable-spawn').setDescription('Enable the pokemon spawn').addChoice('on', 'on').addChoice('off', 'off').setRequired(true)))
		.addSubcommand(subcommand =>
			subcommand
				.setName('spawn-after')
				.setDescription('The points for the pokemon to spawn.')
				.addIntegerOption(option => option.setName('integer').setDescription('Number of points').setRequired(true)))
		.addSubcommand(subcommand =>
			subcommand
				.setName('spawn-channel')
				.setDescription('The time for the pokemon to spawn.')
				.addChannelOption(option => option.setName('channel').setDescription('Select a channel').setRequired(true))),
	async execute(client, interaction) {
		const subcommand = interaction.options.getSubcommand();
		const choice = interaction.options.getString('enable-spawn');
		const points = interaction.options.getInteger('integer');
		const channels = interaction.options.getChannel('channel');
		await interaction.deferReply();
		const guildProfile = await Guild.findOne({ guildID: interaction.guild.id });
		if (subcommand == 'search') {
			const pokemon = interaction.options.getString('pokii');
			const res = await axios(`https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}`);
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
			await interaction.editReply({ embeds: [embed] });
		}
		else if (subcommand == 'enable-spawn') {
			if (choice == 'on') {
				if (guildProfile.pokemon.spawn == true) return interaction.editReply({ content: 'The pokemon spawning is already enabled' });
				await Guild.findOneAndUpdate({ guildID: interaction.guild.id }, { 'pokemon.spawn': true });
				interaction.editReply({ content: 'The pokemon spawning is enabled' });
				// console.log(guildProfile.pokemon.spawn);
			}
			if (choice == 'off') {
				if (guildProfile.pokemon.spawn == false) return interaction.editReply({ content: 'The pokemon spawning is already disabled' });
				await Guild.findOneAndUpdate({ guildID: interaction.guild.id }, { 'pokemon.spawn': false });
				interaction.editReply({ content: 'The pokemon spawning is disabled' });
				// console.log(guildProfile.pokemon.spawn);
			}
		}
		else if (subcommand == 'spawn-after') {
			if (points < 10) return interaction.editReply({ content: 'The points can\'t be below 10' });
			await Guild.findOneAndUpdate({ guildID: interaction.guild.id }, { 'pokemon.afterPoints': points });
			interaction.editReply({ content: `Pokemon spawning required points are setted to ${points}` });
		}
		else if (subcommand == 'spawn-channel') {
			// console.log(channels.id);
			await Guild.findOneAndUpdate({ guildID: interaction.guild.id }, { 'pokemon.spawnAt': channels.id });
			interaction.editReply({ content: `Now pokemons will spawn it <#${channels.id}>` });
		}
	},

};