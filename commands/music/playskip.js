const { checkSameRoom } = require('../../utils');
const Discord = require('discord.js');
const config = require(`../../config.json`);
module.exports = {
    name: "playskip",
    aliases: ["ps"],
    category: 'music',
    description: 'playskip',
    usage: `${config.prefix}playskip [url or query]`,
    inVoiceChannel: true,
    run: async (client, message, args) => {
        try {
            if (checkSameRoom(message)) return;
            const string = args.join(" ")
            if (!string) return message.channel.send({
                embeds: [
                    new Discord.MessageEmbed().setColor("RANDOM").setDescription(`❌ | Please enter a song url or query to search.`)],
            })
            client.distube.play(message, string, { 
                member: message.member,
                textChannel: message.channel,
                message,
                skip: true })
        } catch (err) {
            console.log(err);
        }
    }
}