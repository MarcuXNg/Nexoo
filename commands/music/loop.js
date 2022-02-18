const { checkSameRoom } = require('../../utils');
const Discord = require('discord.js');
const config = require('../../config.json');
module.exports = {
	name: 'loop',
	aliases: ['rp, loop'],
	category: 'music',
	description: 'repeat',
	usage: `${config.prefix}loop <song/queue/off>`,
	inVoiceChannel: true,
	run: async (client, message, args) => {
		try {
			if (checkSameRoom(message)) return;
			const queue = client.distube.getQueue(message);
			if (!queue || !queue.songs || queue.songs.length == 0) {
				return message.channel.send({
					embeds: [
						new Discord.MessageEmbed().setColor('RANDOM').setDescription('❌| There is nothing playing!')],
				});
			}
			if (!args[0]) {
				return message.channel.send({
					embeds: [new Discord.MessageEmbed()
						.setColor('RED')
						.setTitle('❌ | **Please add valid Options!**')
						.setDescription(`**Usage:** \`${config.prefix}loop <song/queue/off>\``),
					],
				});
			}
			let loop = String(args[0]);
			if (!['off', 'song', 'queue'].includes(loop.toLowerCase())) {
				return message.channel.send({
					embeds: [new Discord.MessageEmbed()
						.setColor('RED')
						.setTitle('❌ | **Please add valid Options!**')
						.setDescription(`**Usage:** \`${config.prefix}loop <song/queue/off>\``),
					],
				});
			}
			if (loop.toLowerCase() == 'off') loop = 0;
			else if (loop.toLowerCase() == 'song') loop = 1;
			else if (loop.toLowerCase() == 'queue') loop = 2;
			await queue.setRepeatMode(loop);
			if (queue.repeatMode == 0) {
				message.channel.send({
					embeds: [new Discord.MessageEmbed()
						.setColor('RANDOM')
						.setTimestamp()
						.setTitle('❌ | **Disabled the Loop Mode!**'),
					],
				});
			}
			else if (queue.repeatMode == 1) {
				message.channel.send({
					embeds: [new Discord.MessageEmbed()
						.setColor('RANDOM')
						.setTimestamp()
						.setTitle('🔁 **Enabled the __Song__-Loop** ||(Disabled the **Queue-Loop**)||'),
					],
				});
			}
			else {
				message.channel.send({
					embeds: [new Discord.MessageEmbed()
						.setColor('RANDOM')
						.setTimestamp()
						.setTitle('🔂 **Enabled the __Queue__-Loop!** ||(Disabled the **Song-Loop**)||'),
					],
				});
			}
		}
		catch (err) {
			console.log(err);
		}
	},
};
