const { checkSameRoom } = require('../../utils');
const Discord = require('discord.js');
const config = require('../../config.json')

module.exports = {
    name: "addend",
    aliases: ['ae'],
    category: 'music',
    description: 'Adds this Song back to the end of the Queue!',
    usage: `${config.prefix}addend`,
    inVoiceChannel: true,
    run: async (client, message, args) => {
        try {
            if (checkSameRoom(message)) return;
            const queue = client.distube.getQueue(message)
            try {
                if (!queue || !queue.songs || queue.songs.length == 0) return message.channel.send({
                    embeds: [
                        new Discord.MessageEmbed().setColor("RANDOM").setDescription(`❌ | There is nothing in the queue right now!`)],
                })
                await client.distube.playVoiceChannel(message.member.voice.channel, queue.songs[0].url)
            } catch (err) {
                console.log(err);
            }

        } catch (err) {
            console.log(err);
        }
    }
}