const { checkSameRoom } = require('../../utils');
const Discord = require('discord.js');
const config = require(`../../config.json`)

module.exports = {
    name: 'resume',
    aliases: ['r', 'unpause'],
    category: 'music',
    description: 'continue the current playing song',
    usage: `${config.prefix}resume`,
    inVoiceChannel: true,
    run: async (client, message, args) => {
        try {
            if (checkSameRoom(message)) return;
            const queue = client.distube.getQueue(message)
            if (!queue) return message.channel.send({
                embeds: [
                    new Discord.MessageEmbed().setColor("RANDOM").setDescription(`❌ | **Nothing is playing right now...**`)],
            });
            if (!queue.paused) return message.reply("❌ | **Music is already resumed**");
            queue.resume()
            message.channel.send({
                embeds: [
                    new Discord.MessageEmbed().setColor("RANDOM").setDescription("♪Resume ♪")],
            });
            await message.react("✅");
        } catch (err) {
            console.log(err);
        }
    }
}  