const { checkSameRoom } = require('../../utils');
const Discord = require('discord.js');
const config = require('../../config.json');

module.exports = {
    name: 'setvolume',
    aliases: ['sv'],
    category: 'music',
    description: 'set volume the current playing song',
    usage: `${config.prefix}setvolme [number]`,
    inVoiceChannel: true,
    run: async (client, message, args) => {
        try {
        if (checkSameRoom(message)) return;
        const queue = client.distube.getQueue(message)
        if (!queue) return message.channel.send({
            embeds: [
                new Discord.MessageEmbed().setColor("RANDOM").setDescription("**The bot is currently not playing right now...**")],
        });
        const volume = parseInt(args[0])
        if (isNaN(volume)) return message.channel.send({
            embeds: [
                new Discord.MessageEmbed().setColor("RANDOM").setDescription(`❌| **Please enter a valid number!**`)],
        })
        queue.setVolume(volume);
        message.channel.send({
            embeds: [
                new Discord.MessageEmbed().setColor("RANDOM").setDescription(`✅ | **Volume set to \`${volume}\`**`)],
        })
        await message.react("✅");
        } catch (err) {
            console.log(err);
        }
    }
}