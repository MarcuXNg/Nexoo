const { MessageEmbed } = require('discord.js');
const config = require('../../config.json');
const axios = require('axios');

module.exports = {
	name: 'covid',
	aliases: ['covid'],
	category: 'info',
	description: 'info about covid',
	usage: `${config.prefix}covid`,
	run: (client, message) => {
		try {
			axios
				.get('https://disease.sh/v3/covid-19/all')
				.then(async (res) => {
					// console.log(res.data);
					message.channel.send({
						embeds: [ new MessageEmbed()
							.setAuthor({
								name: 'Corona tracking Worldwide',
								iconURL: 'https://raw.githubusercontent.com/MarcuXNg/Nexoo/main/assets/corona.png?token=GHSAT0AAAAAABQGIEUIFX3ADGKWVYTWH3TAYQN5FPA',
							})
							.setFooter({
								text: 'stay home stay safe',
								iconURL: client.user.displayAvatarURL({ dynamic: true }),
							})
							.setTimestamp()
							.setFields({
								name: 'Cases',
								value: `╰ ${res.data.cases}`,
								inline: true,
							},
							{
								name: 'Today cases',
								value: `╰ ${res.data.todayCases}`,
								inline: true,
							},
							{
								name: 'Deaths',
								value: `╰ ${res.data.deaths}`,
								inline: true,
							},
							{
								name: 'Recovered',
								value: `╰ ${res.data.recovered}`,
								inline: true,
							},
							{
								name: 'Today recovered',
								value: `╰ ${res.data.todayRecovered}`,
								inline: true,
							},
							{
								name: 'Critical',
								value: `╰ ${res.data.critical}`,
								inline: true,
							},
							{
								name: 'Cases per one million',
								value: `╰ ${res.data.casesPerOneMillion}`,
								inline: true,
							},
							{
								name: 'Deaths per one million',
								value: `╰ ${res.data.deathsPerOneMillion}`,
								inline: true,
							},
							{
								name: 'Test',
								value: `╰ ${res.data.tests}`,
								inline: true,
							},
							{
								name: 'Tests per one million',
								value: `╰ ${res.data.testsPerOneMillion}`,
								inline: true,
							},
							{
								name: 'Population',
								value: `╰ ${res.data.population}`,
								inline: true,
							},
							{
								name: 'Affected countries',
								value: `╰ ${res.data.affectedCountries}`,
								inline: true,
							},

							),
						] });

					console.log(res.data);
				});
		}
		catch (err) {
			console.log(err);
		}
	},

};