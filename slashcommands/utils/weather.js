const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const axios = require('axios');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('weather')
		.setDescription('weather information.')
		.addStringOption(option =>
			option.setName('query')
				.setDescription('The location')
				.setRequired(true)),
	async execute(client, interaction) {
		try {
			const query = interaction.options.getString('query');
			const key = 'FmhsMvqOisrM';

			const res = await axios(`https://api.ultrax-yt.com/v1/weather?query=${query}&key=${key}`);
			const daycheck = {
				0: 'Night',
				1: 'Day,',
			};
			const embed = new MessageEmbed()
				.setColor('RANDOM')
				.setTitle(res.data.location.name)
				.setFields(
					{
						name: 'Country',
						value: `╰ ${res.data.location.country}`,
						inline: true,
					},
					{
						name: 'Timezone',
						value: `╰ ${res.data.location.timezone}`,
						inline: true,
					},
					{
						name: 'Last update',
						value: `╰ ${res.data.weather.last_update}`,
						inline: false,
					},
					{
						name: 'Temperature C',
						value: `╰ ${res.data.weather.temperature_c}`,
						inline: true,
					},
					{
						name: 'Temperature F',
						value: `╰ ${res.data.weather.temperature_f}`,
						inline: true,
					},
					{
						name: 'Present',
						value: `╰ ${daycheck[res.data.weather.is_day]}`,
						inline: true,
					},
					{
						name: 'Cloud',
						value: `╰ ${daycheck[res.data.weather.cloud]}%`,
						inline: true,
					},
					{
						name: 'Wind Kph',
						value: `╰ ${res.data.weather.air.wind_kph}`,
						inline: true,
					},
					{
						name: 'Wind Mph',
						value: `╰ ${res.data.weather.air.wind_mph}`,
						inline: true,
					},
					{
						name: 'Wind Degree',
						value: `╰ ${res.data.weather.air.wind_degree}`,
						inline: true,
					},
					{
						name: 'Wind Direction',
						value: `╰ ${res.data.weather.air.wind_direction}`,
						inline: true,
					},
				)
				.setImage(res.data.flag);
			interaction.reply({ embeds: [embed] });
		}
		catch (err) {
			console.log(err);
		}
	},
};