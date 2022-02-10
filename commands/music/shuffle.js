const { checkSameRoom } = require('../../utils');
const Discord = require('discord.js');
const config = require(`../../config.json`)

module.exports = {
    name: 'shuffle',
    aliases: ["sh"],
    category: 'music',
    description: 'shuffle the songs in the queue',
    usage: `${config.prefix}shuffle`,
    inVoiceChannel: true,
    run: async (client, message) => {
        try {
            if (checkSameRoom(message)) return;
            const queue = client.distube.getQueue(message)
            if (!queue || !queue.songs || queue.songs.length == 0) return message.channel.send({
                embeds: [
                    new Discord.MessageEmbed().setColor("RANDOM").setDescription(`❌ | There is nothing in the queue right now!`)],
            })
            client.maps.set(`beforeshuffle-${queue.id}`, queue.songs.map(track => track).slice(1));
            await queue.shuffle()
            message.channel.send({
                embeds: [
                    new Discord.MessageEmbed().setColor("RANDOM").setDescription(`**Shuffled!**`)],
            })
        } catch (err) {
            console.log(err);
        }
    }
}