const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'girl',
	aliases: ['girl'],
	category: 'fun',
	description: 'random girls pic',
	usage: '(prefix)girl',
	run: async (client, message) => {
		try {
			fetch(
				'https://www.sagiri-fansub.tk/api/v1/girl',
			).then(res => {
				res.json().then(result => {
					message.channel.send({ embeds: [
						new MessageEmbed()
							.setColor('RANDOM')
							.setImage(result.data.proxyUrl),
					],
					});
				}).catch(err => {
					console.log(err);
				});
			});
		}
		catch (err) {
			console.log(err);
		}
	},
};

