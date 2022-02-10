const { checkSameRoom } = require('../../utils');
const Discord = require('discord.js');
const config = require('../../config.json');

module.exports = {
    name: "remove",
    aliases: ["rm"],
    category: 'music',
    description: 'remove a song in the queue',
    usage: `${config.prefix}remove [song-position]`,
    inVoiceChannel: true,
    run: async (client, message, args) => {
        try {
            if (checkSameRoom(message)) return;
            const queue = client.distube.getQueue(message)
            if (!queue) return message.channel.send({
                embeds: [
                    new Discord.MessageEmbed().setColor("RANDOM").setDescription("❌ | **There is nothing playing right now!**")],
            })
            if (!args[0]) {
                return message.channel.send({
                    embeds: [
                        new Discord.MessageEmbed()
                            .setColor("RED")
                            .setTitle(`❌| Please add a Song-Position to remove!`)
                            .setDescription(`**Usage:**\n> \`${config.prefix}remove <SongPosition> [Amount]\``)
                    ],
                });
            }
            let songIndex = Number(args[0]);
            if (!songIndex) {
                return message.channel.send({
                    embeds: [
                        new Discord.MessageEmbed()
                            .setColor("RED")
                            .setTitle(`❌| Please add a Song-Position NUMBER!`)
                            .setDescription(`**Usage:**\n> \`${config.prefix}remove <SongPosition> [Amount]\``)
                    ],
                });
            }
            let amount = Number(args[1] ? args[1] : "1");
				if (!amount) amount = 1;
				if (songIndex > queue.songs.length - 1) return message.channel.send({
					embeds: [
						new Discord.MessageEmbed().setColor("RED").setTitle(`❌| **This Song does not exist!**`)
						.setDescription(`**The last Song in the Queue has the Index: \`${queue.songs.length}\`**`)
					],

				})
				if (songIndex <= 0) return message.channel.send({
					embeds: [
						new Discord.MessageEmbed().setColor("RED").setTitle(`❌| **You can't remove the current Song (0)!**`)
						.setDescription(`**Use the \`${config.prefix}skip\` (Slash)Command instead!**`)
					],

				})
				if (amount <= 0) return message.channel.send({
					embeds: [
						new Discord.MessageEmbed().setColor("RED").setTitle(`❌| **You need to at least remove 1 Song!**`)
					],

				})
				queue.songs.splice(songIndex, amount);
				message.channel.send({
					embeds: [new Discord.MessageEmbed()
					  .setColor("RED")
					  .setTimestamp()
					  .setTitle(`🗑 **Removed ${amount} Song${amount > 1 ?"s": ""} out of the Queue!**`)]
				})
        } catch (err) {
            console.log(err);
        }
    }
}