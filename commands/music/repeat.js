const { checkSameRoom } = require('../../utils');
const Discord = require('discord.js');
const config = require('../../config.json');
module.exports = {
    name: "repeat",
    aliases: ["rp, loop"],
    category: 'music',
    description: 'repeat',
    usage: `${config.prefix}repeat`,
    inVoiceChannel: true,
    run: async (client, message, args) => {
        try {
            if (checkSameRoom(message)) return;
            const queue = client.distube.getQueue(message)
            if (!queue) return message.channel.send({
                embeds: [
                    new Discord.MessageEmbed().setColor("RANDOM").setDescription("❌| There is nothing playing!")],
            })
            let mode = null
            switch (args[0]) {
                case "off":
                    mode = 0
                    break
                case "song":
                    mode = 1
                    break
                case "queue":
                    mode = 2
                    break
            }
            mode = queue.setRepeatMode(mode)
            mode = mode ? (mode === 2 ? "Repeat queue" : "Repeat song") : "Off"
            message.channel.send({
                embeds: [
                    new Discord.MessageEmbed().setColor("RANDOM").setDescription(`✅ | Set repeat mode to \`${mode}\``)],
            })
        } catch (err) {
            console.log(err);
        }
    }
}