const { checkSameRoom } = require('../../utils');
const Discord = require('discord.js');
const config = require('../../config.json');

module.exports = {
    name: 'clear',
    aliases: ["c"],
    category: 'music',
    description: 'clear the queue',
    usage: `${config.prefix}clear`,
    inVoiceChannel: true,
    run: async (client, message, args) => {
        try{
        if (checkSameRoom(message)) return;
        const queue = client.distube.getQueue(message)
        if (!queue) return message.channel.send({
            embeds: [
                new Discord.MessageEmbed().setColor("RANDOM").setDescription(`❌ | There is nothing in the queue right now!`)],
        })
        let amount = queue.songs.length - 2;
        queue.songs = [queue.songs[0]];
        message.channel.send({
            embeds: [
                new Discord.MessageEmbed()
              .setColor("GREEN")
              .setTimestamp()
              .setTitle(`🗑 **Cleared the Queue and deleted ${amount} Songs!**`)]
        })
    } catch (err) {
        console.log(err);
    }
    }
}