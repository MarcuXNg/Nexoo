const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");
const { checkSameRoom } = require('../../utils');

module.exports = {
	name: "rewind", 
	category: "music",
	usage: "rewind <TimeinSec>",
	aliases: ["rwd", "rd"],
	description: "Rewind for X Seconds",
	usage: `${config.prefix}rewind`,
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
							.setTitle(`❌Please add a rewinding duration!`)
							.setDescription(`**Usage:** \`${config.prefix}rewind <Duration_in_Sec>\``)
					],
				})
			}
			let seekNumber = Number(args[0])
			let seektime = queue.currentTime - seekNumber;
            if (seektime < 0) seektime = 0;
            if (seektime >= queue.songs[0].duration - queue.currentTime) seektime = 0;
			await queue.seek(seektime);
			message.channel.send({
				embeds: [new MessageEmbed()
					.setColor("RANDOM")
					.setTimestamp()
					.setTitle(`⏩ Rewinded the song for \`${seekNumber} Seconds\`!`)
					.setDescription(`💢 Action by: ${message.author}\n Type \`${config.prefix}foward to roll ahead!`)
					.setFooter(`><`, message.author.displayAvatarURL({ dynamic: true }))]
			})
		} catch (err) {
			console.log(err);
		}
	}
}