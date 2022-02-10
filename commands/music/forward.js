const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");
const { checkSameRoom } = require('../../utils');

module.exports = {
	name: "forward",
	category: "music",
	usage: "forward <TimeinSec>",
	aliases: ["fwd", "fd"],
	description: "Forward for X Seconds",
	usage: `${config.prefix}forward`,
	inVoiceChannel: true,
	run: async (client, message, args) => {
		try {
			if (checkSameRoom(message)) return;
			let queue = client.distube.getQueue(message);
			if (!queue || !queue.songs || queue.songs.length == 0) return message.channel.send({
				embeds: [
					new MessageEmbed().setColor("RED").setDescription(`❌ | **I am nothing playing right now!**`)
				],

			})

			if (!args[0]) {
				return message.channel.send({
					embeds: [
						new MessageEmbed()
							.setColor("RED")
							.setTitle(`❌Please add a forwarding duration!`)
							.setDescription(`**Usage:** \`${config.prefix}forward <Duration_in_Sec>\``)
					],
				})
			}
			let seekNumber = Number(args[0])
			let seektime = queue.currentTime + seekNumber;
			if (seektime >= queue.songs[0].duration) seektime = queue.songs[0].duration - 1;
			await queue.seek(seektime);
			message.channel.send({
				embeds: [new MessageEmbed()
					.setColor("RANDOM")
					.setTimestamp()
					.setTitle(`⏩ Forwarded the song for \`${seekNumber} Seconds\`!`)
					.setDescription(`💢 Action by: ${message.author}\n Type \`${config.prefix}rewind to roll back!`)
					.setFooter(`><`, message.author.displayAvatarURL({ dynamic: true }))]
			})
		} catch (err) {
			console.log(err);
		}
	}
}