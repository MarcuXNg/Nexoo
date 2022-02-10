const { checkSameRoom } = require('../../utils');
const Discord = require('discord.js');
const config = require('../../config.json');
module.exports = {
    name: "filter",
    aliases: ["f"],
    category: 'music',
    description: 'filter the current playing song',
    usage: `${config.prefix}filter`,
    inVoiceChannel: true,
    run: async (client, message, args) => {
        try {
            if (checkSameRoom(message)) return;
            const queue = client.distube.getQueue(message)
            if (!queue) return message.channel.send({
                embeds: [
                    new Discord.MessageEmbed().setColor("RANDOM").setDescription(`❌ | **There is nothing in the queue right now!**`)]
            })
            if (args[0] === "off" && queue.filters?.length) queue.setFilter(false)
            else if (Object.keys(client.distube.filters).includes(args[0])) queue.setFilter(args[0])
            else if (args[0]) return message.channel.send({
                embeds: [
                    new Discord.MessageEmbed().setColor("RANDOM").setDescription(`❌ | **Not a valid filter**`)]
            })
            message.channel.send({
                embeds: [
                    new Discord.MessageEmbed().setColor("RANDOM").setDescription(`Current Queue Filter: \`${queue.filters.join(", ") || "Off"}\``)]
            })
        } catch (err) {
            console.log(err);
        }
    }
}