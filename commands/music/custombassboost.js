const { MessageEmbed } = require("discord.js");
const config = require('../../config.json')
const FiltersSettings = require("../../filters.json");
const { checkSameRoom } = require('../../utils');

module.exports = {
    name: "custombassboost",
    category: "music",
    usage: `${config.prefix}bassboost <Gain (0-20)>`,
    aliases: ["bassboost", "b", "bass", "custombass", "cbassboost", "cbass", "cbb", "custombb"],
    inVoiceChannel: true,
    description: "Sets a custom Bassboost with Gain!",
    run: async (client, message, args) => {
        try {
            if (checkSameRoom(message)) return;
            let queue = client.distube.getQueue(message);
            if (!queue || !queue.songs || queue.songs.length == 0) return message.channel.send({
                embeds: [
                    new MessageEmbed().setColor("RED").setDescription(`❌| I am nothing Playing right now!`)
                ],

            })
            if (!args[0]) {
                return message.channel.send({
                    embeds: [
                        new MessageEmbed()
                            .setColor("RED")
                            .setDescription(`❌| **Please add a Bassboost-Gain between 0 and 20!**`)
                    ],
                })
            }
            if (isNaN(args[0])) {
                return message.channel.send({
                    embeds: [
                        new MessageEmbed()
                            .setColor("RANDOM")
                            .setDescription("**please choose a number**"),]
                });
            }
            let bass_gain = parseInt(args[0])
            if (bass_gain > 20 || bass_gain < 0) {
                return message.channel.send({
                    embeds: [
                        new MessageEmbed()
                            .setColor("RED")
                            .setTitle(`${client.allEmojis.x} **The Bassboost Gain must be between 0 and 20!**`)
                    ],
                })
            }
            FiltersSettings.custombassboost = `bass=g=${bass_gain},dynaudnorm=f=200`;
            client.distube.filters = FiltersSettings;
            //add old filters so that they get removed 	
            //if it was enabled before then add it
            if (queue.filters.includes("custombassboost")) {
                await queue.setFilter(["custombassboost"]);
            }
            await queue.setFilter(["custombassboost"]);
            message.channel.send({
                embeds: [
                    new MessageEmbed()
                        .setColor("RANDOM")
                        .setTimestamp()
                        .setTitle(`♨️ **Set a Bassboost to ${bass_gain}!**`)
                ]
            })
        } catch (err) {
            console.log(err);
        }
    }
}