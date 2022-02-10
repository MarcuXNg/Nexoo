const { checkSameRoom } = require('../../utils');
const Discord = require('discord.js');
const config = require(`../../config.json`)

module.exports = {
    name: "autoplay",
    aliases: ['a', 'ap'],
    category: 'music',
    description: 'autoplay music',
    usage: `${config.prefix}autoplay`,
    inVoiceChannel: true,
    run: async (client, message) => {
        try {
            if (checkSameRoom(message)) return;
            const queue = client.distube.getQueue(message)
            if (!queue) return message.channel.send({
                embeds: [
                    new Discord.MessageEmbed().setColor("RANDOM").setDescription(`❌ | There is nothing in the queue right now!`)],
            })
            const autoplay = queue.toggleAutoplay()
            message.channel.send({
                embeds: [
                    new Discord.MessageEmbed().setColor("RANDOM").setDescription(`✅ | AutoPlay: \`${autoplay ? "On" : "Off"}\``)],
            })
        } catch (err) {
            console.log(err);
        }
    }
}