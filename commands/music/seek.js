const { checkSameRoom } = require('../../utils');
const Discord = require('discord.js');
const config = require('../../config.json');
module.exports = {
    name: "seek",
    aliases: ["se"],
    category: 'music',
    description: 'seek where the bot begin to play',
    usage: `${config.prefix}seek`,
    inVoiceChannel: true,
    run: async (client, message, args) => {
        try {
            if (checkSameRoom(message)) return;
            const queue = client.distube.getQueue(message)
            if (!queue) return message.channel.send({
                embeds: [
                    new Discord.MessageEmbed().setColor("RANDOM").setDescription("❌| There is nothing in the queue right now!")],
            })
            if (!args[0]) {
                return message.channel.send({
                    embeds: [
                        new Discord.MessageEmbed().setColor("RANDOM").setDescription(`❌ | Please provide position (in seconds) to seek!`)],
                })
            }
            const time = Number(args[0])
            if (isNaN(time)) return message.channel.send({
                embeds: [
                    new Discord.MessageEmbed().setColor("RANDOM").setDescription(`❌ | Please enter a valid number!`)],
            })
            queue.seek(time)
            message.channel.send(`Seeked to ${time}!`)
        } catch (err) {
            console.log(err);
        }
    }
}