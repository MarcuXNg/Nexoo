const { checkSameRoom } = require('../../utils');
const Discord = require('discord.js');
const config = require('../../config.json');

module.exports = {
    name: 'skip',
    aliases: ['next'],
    category: 'music',
    description: 'skip the current playing song',
    usage: `${config.prefix}skip`,
    inVoiceChannel: true,
    run: async (client, message, args) => {
        try {
            if (checkSameRoom(message)) return;
            const queue = client.distube.getQueue(message)
            if (!queue) return message.channel.send({
                embeds: [
                    new Discord.MessageEmbed().setColor("RANDOM").setDescription("❌ |The bot is currently not playing right now...")],
            });
            if (queue) {
                try {
                    await queue.skip()
                    message.channel.send({
                        embeds: [
                            new Discord.MessageEmbed().setColor("RANDOM").setAuthor(`Skipped ♪`, config.iconURL).setDescription(`Type \`${config.prefix}previous\` to cumback!`).setFooter(`✅ The DJ has decided to skip this song.`)]
                    })
                } catch (e) {
                    message.channel.send({
                        embeds: [
                            new Discord.MessageEmbed().setColor("RANDOM").setDescription(`❌ | **${e}**`)]
                    })
                }
            }
        } catch (err) {
            console.log(err);
        }
    }
}