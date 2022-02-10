const { MessageEmbed } = require(`discord.js`);
const config = require(`../../config.json`);
const lyricsFinder = require('@sujalgoel/lyrics-finder')

module.exports = {
    name: "lyrics",
    aliases: ["ly"],
    category: 'music',
    description: 'show the lyric of a song',
    usage: `${config.prefix}lyrics`,
    run: async (client, message, args) => {
        try {
            const messageFilter = m => {
                return (m.author.id === message.author.id);
            };

            await message.channel.send({
                embeds: [
                    new MessageEmbed().setColor("RANDOM").setDescription(`Please enter the artist name and the song \`${config.prefix}lyrics <Artist Name> <Song Name>\``)]
            });
            await message.channel.awaitMessages({ messageFilter, max: 1, time: 15000 }).then(async collected => {
                songName = await collected.first().content;    
            })
            await lyricsFinder.LyricsFinder(songName).then(data => {
                for (let i = 0; i < data.length; i += 2048) {
                const toSend = data.substring(i, Math.min(data.length, i + 2048));
                const embed = new MessageEmbed()
                    .setAuthor(`Lyrics 📝`, config.iconURL)
                    .setTitle(`${songName}`)
                    .setColor("RANDOM")
                    .setDescription(toSend)
                    .setTimestamp()
                    .setFooter(`><`, message.author.avatarURL({ dynamic: true }))
            message.channel.send({embeds: [embed]})
            }});

        } catch (err) {
            console.log(err);
        }
    }
}
