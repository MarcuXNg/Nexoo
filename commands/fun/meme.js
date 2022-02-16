const got = require('got');
const config = require('../../config.json');
const { MessageEmbed } = require('discord.js');
module.exports = {
	name: 'meme',
	category: 'fun',
	aliases: ['meme'],
	description: 'Show a random meme',
	usage: `${config.prefix}meme`,
	run : async (client, message) => {
		got('https://www.reddit.com/r/memes/random/.json').then(res => {
			const content = JSON.parse(res.body);
			message.channel.send({
				embeds: [
					new MessageEmbed()
						.setColor('RANDOM')
						.setTitle(content[0].data.children[0].data.title)
						.setImage(content[0].data.children[0].data.url)
						.setFooter(`👍 ${content[0].data.children[0].data.ups} 👎 ${content[0].data.children[0].data.downs} | Comments : ${content[0].data.children[0].data.num_comments}`),
				],
			},
			);
		});
	},
};