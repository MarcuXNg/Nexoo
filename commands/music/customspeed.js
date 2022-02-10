const { MessageEmbed } = require("discord.js");
const config = require('../../config.json');
const FiltersSettings = require("../../filters.json");
const { checkSameRoom } = require('../../utils');

module.exports = {
    name: "customspeed",
    category: "music",
    usage: `${config.prefix}speed <speedamount (0 - 20)>`,
    aliases: ["customspeed", "changespeed", "speed"],
    inVoiceChannel: true,
    description: "Changes the Speed of the Song!",
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
                            .setDescription(`❌| **Please add a speed amount between 0 and 2!**`)
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
            let speed_amount = parseInt(args[0])
            if (speed_amount <= 0 || speed_amount > 2) {
                return message.channel.send({
                    embeds: [
                        new MessageEmbed()
                            .setColor("RED")
                            .setDescription(`❌| **Please add a Speed Amount between 0 and 2!**`)
                    ],
                })
            }
            FiltersSettings.customspeed = `atempo=${speed_amount}`;
            client.distube.filters = FiltersSettings;
            //add old filters so that they get removed 	
            //if it was enabled before then add it
            if (queue.filters.includes("customspeed")) {
                await queue.setFilter(["customspeed"]);
            }
            await queue.setFilter(["customspeed"]);
            message.channel.send({
                embeds: [
                    new MessageEmbed()
                        .setColor("RANDOM")
                        .setTimestamp()
                        .setDescription(`♨️ **Set the Speed to ${speed_amount}!**`)
                ]
            })
        } catch (err) {
            console.log(err);
        }
    }
}