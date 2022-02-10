const { checkSameRoom } = require('../../utils');
const Discord = require('discord.js');
const config = require('../../config.json');

module.exports = {
    name: 'move',
    aliases: ["m"],
    category: 'music',
    description: 'move a song to another position in the queue',
    usage: `${config.prefix}move [song-position] [to-move position]`,
    inVoiceChannel: true,
    run: async (client, message, args) => {
        try {
        if (checkSameRoom(message)) return;
        const queue = client.distube.getQueue(message)
        if (!queue) return message.channel.send({
            embeds: [
                new Discord.MessageEmbed().setColor("RANDOM").setDescription(`❌ | There is nothing in the queue right now!`)],
        })
        if (!args[0]) {
            return message.channel.send({
                embeds: [
                    new Discord.MessageEmbed()
                        .setColor("RED")
                        .setTitle(`❌| **Please add a Song-Position to move to!**`)
                        .setDescription(`**Usage:**\n> \`${config.prefix}move <SongPosition> <ToPosition>\``)
                ],
            });
        }
        if (!args[1]) {
            return message.channel.send({
                embeds: [
                    new Discord.MessageEmbed()
                        .setColor("RED")
                        .setTitle(`❌| **Please add a To-Move-Position!**`)
                        .setDescription(`**Usage:**\n> \`${config.prefix}move <SongPosition> <ToPosition>\``)
                ],
            });
        }
        let songIndex = Number(args[0]);
        if (!songIndex) {
            return message.channel.send({
                embeds: [
                    new Discord.MessageEmbed()
                        .setColor("RED")
                        .setTitle(`❌|**Please add a Song-Position NUMBER!**`)
                        .setDescription(`**Usage:**\n> \`${config.prefix}move <SongPosition> <ToPosition>\``)
                ],
            });
        }
        let position = Number(args[1]);
        if (!position) {
            return message.channel.send({
                embeds: [
                    new Discord.MessageEmbed()
                        .setColor("RED")
                        .setTitle(`❌| **Please add a To-Move-Position NUMBER!**`)
                        .setDescription(`**Usage:**\n> \`${config.prefix}move <SongPosition> <ToPosition>\``)
                ],
            });
        }
        if (position >= queue.songs.length || position < 0) position = -1;
        if (songIndex > queue.songs.length - 1) return message.channel.send({
            embeds: [
                new Discord.MessageEmbed().setColor("RED").setTitle(`❌| **This Song does not exist!**`)
                    .setDescription(`**The last Song in the Queue has the Index: \`${queue.songs.length}\`**`)
            ],

        })
        if (position == 0) return message.channel.send({
            embeds: [
                new Discord.MessageEmbed().setColor("RED").setTitle(`❌| **Cannot move Song before Playing Song!**`)
            ],

        })
        let song = queue.songs[songIndex];
        //remove the song
        queue.songs.splice(songIndex, 1);
        //Add it to a specific Position
        queue.addToQueue(song, position)
        message.channel.send({
            embeds: [
                new Discord.MessageEmbed()
                    .setColor("RANDOM")
                    .setTimestamp()
                    .setTitle(`📑 Moved **${song.name}** to the **\`${position}th\` place**`)
            ]
        })
        if (isNaN(args[0])) return message.channel.send({
            embeds: [
                new Discord.MessageEmbed().setColor("RED").setTitle(`❌| **The song index must be a \`number\`!**`)
            ],

        })
        if (isNaN(args[1])) return message.channel.send({
            embeds: [
                new Discord.MessageEmbed().setColor("RED").setTitle(`❌| **The Position must be a \`number\`!**`)
            ],

        })

    } catch (err) {
        console.log(err);
    }
    }
}