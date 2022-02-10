const { checkSameRoom } = require('../../utils');
const Discord = require('discord.js');
const config = require('../../config.json')
const { MessageEmbed, MessageSelectMenu, MessageActionRow, MessageButton } = require(`discord.js`);
module.exports = {
    name: "nowplaying",
    aliases: ["n"],
    category: 'music',
    description: 'show the current playing song',
    usage: `${config.prefix}nowplaying`,
    inVoiceChannel: true,
    run: async (client, message, args) => {
        try {
            if (checkSameRoom(message)) return;
            const queue = client.distube.getQueue(message)
            if (!queue) return message.channel.send({
                embeds: [
                    new Discord.MessageEmbed().setColor("RANDOM").setDescription(`❌ | **There is nothing in the queue right now!**`)]
            })
            const components = [
                new MessageActionRow().addComponents([
                    new MessageButton().setStyle('PRIMARY').setCustomId('Skip').setEmoji(`⏭`).setLabel(`Skip`),
                    new MessageButton().setStyle('DANGER').setCustomId('Stop').setEmoji(`🏠`).setLabel(`Stop`),
                    new MessageButton().setStyle('SECONDARY').setCustomId('Pause').setEmoji('⏸').setLabel(`Pause`),
                    new MessageButton().setStyle('SUCCESS').setCustomId('Autoplay').setEmoji('🔁').setLabel(`Autoplay`),
                    new MessageButton().setStyle('PRIMARY').setCustomId('Shuffle').setEmoji('🔀').setLabel(`Shuffle`),
                ]),
                new MessageActionRow().addComponents([
                    new MessageButton().setStyle('SUCCESS').setCustomId('Resume').setEmoji(`🔁`).setLabel(`Resume`),
                    new MessageButton().setStyle('SUCCESS').setCustomId('Queue').setEmoji(`🔂`).setLabel(`Queue`),
                    new MessageButton().setStyle('PRIMARY').setCustomId('Forward').setEmoji('⏩').setLabel(`+10 Sec`),
                    new MessageButton().setStyle('PRIMARY').setCustomId('Rewind').setEmoji('⏪').setLabel(`-10 Sec`),
                    new MessageButton().setStyle('SUCCESS').setCustomId('Addend').setEmoji('👌').setLabel(`Addend`),
                ]),
            ]
            const filter = (interaction) => {
                if (interaction.user.id === message.author.id) return true;
                return interaction.send({ content: ` you can't use this button` });
            }

            const collector = message.channel.createMessageComponentCollector({ filter });
            collector.on("collect", (ButtonInteraction) => {
                const id = ButtonInteraction.customId;

                if (id === 'Skip') {
                    queue.skip()
                    message.channel.send({
                        embeds: [
                            new Discord.MessageEmbed().setColor("RANDOM").setTitle(`**♪ Skipped ♪**`).setDescription(`Type \`${config.prefix}previous\` to cumback!`).setFooter(`✅ The DJ has decided to skip this song.`)]
                    })
                }
                if (id === 'Rewind') {
                    let seektime = queue.currentTime - 10;
                    if (seektime < 0) seektime = 0;
                    if (seektime >= queue.songs[0].duration - queue.currentTime) seektime = 0;
                    queue.seek(seektime);
                    message.channel.send({
                        embeds: [new MessageEmbed()
                            .setColor("RANDOM")
                            .setTimestamp()
                            .setTitle(`⏩ Rewinded the song for \`10 Seconds\`!`)
                            .setDescription(`💢 Action by: ${message.author} \n Click ⏩ button to foward 10s!`)
                            .setFooter(`><`, message.author.displayAvatarURL({ dynamic: true }))]
                    })
                }
                if (id === 'Forward') {

                    let seektime = queue.currentTime + 10;
                    if (seektime >= queue.songs[0].duration) seektime = queue.songs[0].duration - 1;
                    queue.seek(seektime);
                    message.channel.send({
                        embeds: [new MessageEmbed()
                            .setColor("RANDOM")
                            .setTimestamp()
                            .setTitle(`⏩ Forwarded the song for \`10 Seconds\`!`)
                            .setDescription(`💢 Action by: ${message.author} \n Click ⏪ button to rewind 10s!`)
                            .setFooter(`><`, message.author.displayAvatarURL({ dynamic: true }))]
                    })
                }

                if (id === 'Addend') {
                    client.distube.playVoiceChannel(message.member.voice.channel, queue.songs[0].url)
                }
                if (id === 'Autoplay') {
                    const autoplay = queue.toggleAutoplay()
                    message.channel.send({
                        embeds: [
                            new Discord.MessageEmbed().setColor("RANDOM").setDescription(`✅ | AutoPlay: \`${autoplay ? "On" : "Off"}\``)],
                    })
                }
                if (id === 'Shuffle') {
                    queue.shuffle()
                    message.channel.send({
                        embeds: [
                            new Discord.MessageEmbed().setColor("RANDOM").setDescription(`**Shuffled!**`)],
                    })
                }
                if (id === 'Resume') {
                    if (!queue.paused) return message.reply("❌ | **Music is already resumed**");
                    queue.resume()
                    message.channel.send({
                        embeds: [
                            new Discord.MessageEmbed().setColor("RANDOM").setDescription("♪Resume ♪")],
                    });
                }
                if (id === 'Pause') {
                    if (!queue.playing) return;
                    if (queue.paused) return message.channel.send("❌ | **the bot is paused**");
                    queue.pause()
                    message.channel.send({
                        embeds: [
                            new Discord.MessageEmbed()
                                .setAuthor(`Pause ♪`, config.iconURL)
                                .setColor("RANDOM")
                                .setFooter(`✅ The DJ has decided to pause the song.`)
                                .setDescription(`Type \`${config.prefix}resume\` to continue playing!`)
                                .setTimestamp(message.createdTimestamp - 36000),]
                    });
                }
                if (id === 'Stop') {
                    queue.stop()
                    message.channel.send({
                        embeds: [
                            new Discord.MessageEmbed().setColor("RANDOM").setDescription(`**♪ Stopped ♪**`).setFooter(`✅ The DJ has decided to stop the current queue.`)],
                    })
                }
                if (id === 'Queue') {
                    let embeds = [];
                    let k = 20;
                    let theSongs = queue.songs;
                    for (let i = 0; i < theSongs.length; i += 20) {
                        let qus = theSongs;
                        const current = qus.slice(i, k)
                        let j = i;
                        const info = current.map((track) => `**${j++} )** [\`${String(track.name).replace(/\[/igu, "{").replace(/\]/igu, "}").substr(0, 10000)}\`](${track.url}) - \`${track.formattedDuration}\``).join("\n")
                        const embed = new MessageEmbed()
                            .setColor("RANDOM")
                            .setDescription(`${info}`)
                        if (i < 20) {
                            embed.setAuthor(`Queue`, config.iconURL)
                            embed.setTitle(`📑 **${theSongs.length > 10000 ? 10000 : theSongs.length}songs **`)
                            embed.setDescription(`✨**Now playing**✨ **[${theSongs[0].name}](${theSongs[0].url})** - \`${theSongs[0].formattedDuration}\`\n\n${info}`)
                        }
                        embeds.push(embed);
                        k += 20; //Raise k to 10
                    }
                    embeds[embeds.length - 1] = embeds[embeds.length - 1]
                        .setFooter(`\n${theSongs.length} Songs in the Queue | Duration: ${queue.formattedDuration}`)
                    let pages = []
                    for (let i = 0; i < embeds.length; i += 1) {
                        pages.push(embeds.slice(i, i + 1));
                    }
                    pages = pages.slice(0, 24)
                    const Menu = new MessageSelectMenu()
                        .setCustomId("QUEUEPAGES")
                        .setPlaceholder("Select a page")
                        .addOptions([
                            pages.map((page, index) => {
                                let Obj = {};
                                Obj.label = `Page ${index}`
                                Obj.value = `${index}`;
                                Obj.description = `Page ${index}/${pages.length - 1}`
                                return Obj;
                            })
                        ])
                    const row = new MessageActionRow().addComponents([Menu])
                    message.channel.send({
                        embeds: [embeds[0]],
                        components: [row],
                    });
                    //Event
                    client.on('interactionCreate', (i) => {
                        if (!i.isSelectMenu()) return;
                        if (i.customId === "QUEUEPAGES" && i.applicationId == client.user.id) {
                            i.channel.send({
                                embeds: pages[Number(i.values[0])],
                            }).catch(e => { })
                        }
                    });
                }
            })
            const song = queue.songs[0]
            const status = queue =>
                `**Volume:** \`${queue.volume}%\` | **Filter:** \`${queue.filters.join(", ") || "Off"}\` | **Loop:** \`${queue.repeatMode ? (queue.repeatMode === 2 ? "All Queue" : "This Song") : "Off"
                }\` | **Autoplay:** \`${queue.autoplay ? "On" : "Off"}\``
            message.channel.send({
                embeds: [
                    new Discord.MessageEmbed()
                        .setColor("RANDOM")
                        .setThumbnail(`${song.thumbnail}`).setThumbnail(`${song.thumbnail}`)
                        .setAuthor(`Now playing`, config.iconURL)
                        .setDescription(`**[${song.name}](${song.url})** \n ${status(queue)}`)
                        .setFields(
                            {
                                name: "Requested By",
                                value: `${song.user}`,
                                inline: true
                            },
                            {
                                name: "Duration",
                                value: `\`${song.formattedDuration}\``,
                                inline: true
                            }
                        )
                        .setFooter(`><`, song.user.displayAvatarURL({ dynamic: true }))
                        .setTimestamp()], components
            })
        } catch (err) {
            console.log(err);
        }
    }
}
