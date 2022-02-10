const { checkSameRoom } = require('../../utils');
const Discord = require('discord.js');
const config = require("../../config.json");

module.exports = {
    name: 'pause',
    aliases: ['pa'],
    category: 'music',
    description: 'pause the current playing song',
    usage: `${config.prefix}pause`,
    inVoiceChannel: true,
    run: async (client, message, args) => {
        try {
            if (checkSameRoom(message)) return;
            const queue = client.distube.getQueue(message)
            if (!queue) return message.channel.send({
                embeds: [
                    new Discord.MessageEmbed().setColor("RANDOM").setDescription("❌ | The bot is currently not playing right now...")],
            });
            if (!queue.playing) return;
            if (queue.paused) return message.channel.send("❌ | **the bot is paused**");
            queue.pause()
            message.channel.send({
                embeds: [
                    new Discord.MessageEmbed()
                        .setAuthor(`Pause ♪`, config.iconURL)
                        .setColor("RANDOM")
                        .setDescription(`Type \`${config.prefix}resume\` to continue playing!`)
                        .setFooter(`✅ The DJ has decided to pause this song.`)
                        .setTimestamp(message.createdTimestamp - 36000),]
            });
            message.react("✅");
        } catch (err) {
            console.log(err);
        }
    }
}   