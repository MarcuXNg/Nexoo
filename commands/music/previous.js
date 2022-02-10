const { checkSameRoom } = require('../../utils');
const Discord = require('discord.js');
const config = require('../../config.json');
module.exports = {
    name: "previous",
    aliases: ["pv"],
    category: 'music',
    description: 'previous song',
    usage: `${config.prefix}previous`,
    inVoiceChannel: true,
    run: async (client, message) => {
        try {
            if (checkSameRoom(message)) return;
            const queue = client.distube.getQueue(message)
            if (!queue) return message.channel.send({
                embeds: [
                    new Discord.MessageEmbed().setColor("RANDOM").setDescription(`❌ | There is nothing in the queue right now!`)],
            })
            const song = queue.previous()
            message.channel.send({
                embeds: [
                    new Discord.MessageEmbed().setColor("RANDOM").setDescription(`✅ | Now playing:\n${song.name}`)],
            })
        } catch (err) {
            console.log(err);
        }
    }
}