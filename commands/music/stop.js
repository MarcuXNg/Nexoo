const { checkSameRoom } = require('../../utils');
const Discord = require('discord.js');
const config = require(`../../config.json`)

module.exports = {
    name: 'stop',
    aliases: ['s'],
    category: 'music',
    description: 'stop the current playing song',
    usage: `${config.prefix}stop`,
    inVoiceChannel: true,
    run: async (client, message, args) => {
        try {
            if (checkSameRoom(message)) return;
            const queue = client.distube.getQueue(message)
            if (!queue) return message.channel.send({
                embeds: [
                    new Discord.MessageEmbed().setColor("RANDOM").setDescription("❌| The bot is currently not playing right now...")],
            });
            queue.stop()
            message.channel.send({
                embeds: [
                    new Discord.MessageEmbed().setColor("RANDOM").setDescription(`**♪ Stopped ♪**`).setFooter(`✅ The DJ has decided to stop the current queue.`)],
            })
            await message.react("✅");
        } catch (err) {
            console.log(err);
        }
    }
}