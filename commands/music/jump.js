const { checkSameRoom } = require('../../utils');
const Discord = require('discord.js');
const config = require('../../config.json');

module.exports = {
    name: 'jump',
    aliases: ["jp"],
    category: 'music',
    description: 'jump to a song in the queue',
    usage: `${config.prefix}jump [position]`,
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
                            .setTitle(`❌| **Please add a Position to jump to!**`)
                            .setDescription(`**Usage:**\n> \`${config.prefix}jump <position>\``)
                    ],
                });
            }
            let Position = Number(args[0])
            if (Position > queue.songs.length - 1 || Position < 0) return message.channel.send({
                embeds: [
                    new Discord.MessageEmbed().setColor("RED").setTitle(`❌ **The Position must be between \`0\` and \`${queue.songs.length - 1}\`!**`)
                ],

            })
            if (Position < 1) return message.channel.send({
                embeds: [
                    new Discord.MessageEmbed().setColor("RED").setTitle(`❌| **The Position must be between \`0\` and \`${queue.songs.length - 1}\`!**`)
                ],

            })
            if (isNaN(args[0])) return message.channel.send({
                embeds: [
                    new Discord.MessageEmbed().setColor("RED").setTitle(`❌| **The Position must be between \`0\` and \`${queue.songs.length - 1}\`!**`)
                ],

            })
            await queue.jump(Position);
            message.channel.send({
                embeds: [
                    new Discord.MessageEmbed().setColor("RANDOM").setTimestamp().setDescription(`👌 **Jumped to the \`${Position}th\` Song in the Queue!**`)],
            })
        } catch (err) {
            console.log(err);
        }
    }
}