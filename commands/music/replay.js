const { MessageEmbed } = require(`discord.js`);
const config = require(`../../config.json`);
const { checkSameRoom } = require('../../utils');
module.exports = {
    name: "replay",
    category: "music",
    usage: `${config.prefix}replay`,
    aliases: ["rpl"],
    description: "Replays the current song!",
    inVoiceChannel: true,
    run: async (client, message, args) => {
        try {
            if (checkSameRoom(message)) return;
            let queue = client.distube.getQueue(message);
            if (!queue || !queue.songs || queue.songs.length == 0) return message.channel.send({
                embeds: [
                    new MessageEmbed().setColor("RED").setDescription(`❌| **I am nothing Playing right now!**`)
                ],

            })
            let seekNumber = 0
            await queue.seek(seekNumber);
            message.channel.send({
                embeds: [new MessageEmbed()
                    .setColor("RANDOM")
                    .setTimestamp()
                    .setTitle(`🔃 Replaying the current Song!`)
                    .setDescription(`💢 Action by: ${message.author}`)
                    .setFooter(`><`, message.author.displayAvatarURL({ dynamic: true }))]
            })
        } catch (err) {
            console.log(err);
        }

    }
}

