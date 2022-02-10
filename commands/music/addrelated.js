const { MessageEmbed } = require(`discord.js`);
const config = require(`../../config.json`);
const { checkSameRoom } = require('../../utils');
const Discord = require('discord.js');
module.exports = {
    name: "addrelated",
    category: "music",
    usage: `${config.prefix}addrelated`,
    aliases: ["ar"],
    description: "Add a similar/related song to the current Song!",
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
            let thenewmsg = await message.channel.send({
                embeds: [new Discord.MessageEmbed()
                    .setColor("RANDOM")
                    .setDescription(`🔍 Searching Related Song for... **${queue.songs[0].name}**`)
                ]
            }).catch(e => {
                console.log(e)
            })
            await queue.addRelatedSong();
            const status = queue =>
                `**Volume:** \`${queue.volume}%\` | **Filter:** \`${queue.filters.join(", ") || "Off"}\` | **Loop:** \`${queue.repeatMode ? (queue.repeatMode === 2 ? "All Queue" : "This Song") : "Off"
                }\` | **Autoplay:** \`${queue.autoplay ? "On" : "Off"}\``
            await thenewmsg.edit({
                embeds: [new Discord.MessageEmbed()
                    .setColor("RANDOM")
                    .setThumbnail(`${queue.songs[queue.songs.length - 1].thumbnail}`)
                    .setAuthor(`Added to queue `, config.iconURL)
                    .setDescription(`**[${queue.songs[queue.songs.length - 1].name}](${queue.songs[queue.songs.length - 1].url})** \n ${status(queue)} `)
                    .setFields(
                        {
                            name: "Requested By",
                            value: `${queue.songs[queue.songs.length - 1].user}`,
                            inline: true
                        },
                        {
                            name: "Duration",
                            value: `\`${queue.songs[queue.songs.length - 1].formattedDuration}\``,
                            inline: true
                        }
                    )
                    .setTimestamp()
                    .setFooter(`><`, message.author.displayAvatarURL({ dynamic: true }))]
            }).catch(e => {
                console.log(e)
            })
        } catch (err) {
            console.log(err);
        }

    }
}

