const { checkSameRoom } = require('../../utils');
const config = require("../../config.json");
const Discord = require('discord.js');
const search = require('youtube-search');
require('dotenv').config();
const opts = {
    maxResults: 5,
    key: process.env.YOUTUBE_API,
    type: 'video'
};

module.exports = {
    name: 'play',
    aliases: ['p'],
    category: 'music',
    description: 'playing music',
    usage: `${config.prefix}play [song name/song url]`,
    inVoiceChannel: true,
    run: async (client, message, args) => {
        try {
            if (checkSameRoom(message)) return;
            const voiceChannel = message.member.voice.channel;
            if (voiceChannel.full) return message.channel.send({
                embeds: [
                    new Discord.MessageEmbed().setColor("RANDOM").setDescription(`❌ | **the channel is full!**`)]
            });
            const prefix = config.prefix;
            let SearchString = args.join(" ");
            if (!SearchString) {
                return message.reply({
                    embeds: [
                        new Discord.MessageEmbed().setColor("RANDOM").setDescription(`❌ | **No song name or url provided!** : \`${prefix}play [song]\``)],
                });
            }
            else {
                try {
                    //zingmp3
                    const zingmp3 = (str) => {
                        var regex = /(http|https):\/\/(www.zingmp3.vn|zingmp3.vn)/
                        if (!regex.test(str)) {
                            return false;
                        } else {
                            return true;
                        }
                    }
                    if (zingmp3(args[0])) {
                        try {
                            const voiceChannel = message.member.voice.channel;
                            if(!message.guild.me.voice.channel){
                                await message.channel.send(`📣 Successfully connected to channel  **${voiceChannel.name}**`);
                            }  
                            await client.distube.playVoiceChannel(message.member.voice.channel, args[0], {
                                member: message.member,
                                textChannel: message.channel,
                                message
                            })

                        } catch (e) {
                            message.channel.send({
                                embeds: [
                                    new Discord.MessageEmbed().setColor("RANDOM").setDescription(`❌ | **Please try again later!**`)],
                            });
                            console.error(e);
                        };
                        return
                    }
                    //soundcloud
                    const soundcloud = (str) => {
                        var regex = /(http|https):\/\/(www.soundcloud.com|soundcloud.com)/
                        if (!regex.test(str)) {
                            return false;
                        } else {
                            return true;
                        }
                    }
                    if (soundcloud(args[0])) {
                        try {
                            const voiceChannel = message.member.voice.channel;
                            if(!message.guild.me.voice.channel){
                                await message.channel.send(`📣 Successfully connected to channel  **${voiceChannel.name}**`);
                            }  
                            await client.distube.playVoiceChannel(message.member.voice.channel, args[0], {
                                member: message.member,
                                textChannel: message.channel,
                                message
                            })

                        } catch (e) {
                            message.channel.send({
                                embeds: [
                                    new Discord.MessageEmbed().setColor("RANDOM").setDescription(`❌ | **Please try again later!**`)],
                            });
                            console.error(e);
                        };
                        return
                    }
                    //spotify
                    const spotify = (str) => {
                        var regex = /(http|https):\/\/(www.open.spotify.com|open.spotify.com)/
                        if (!regex.test(str)) {
                            return false;
                        } else {
                            return true;
                        }
                    }
                    if (spotify(args[0])) {
                        try {
                            const voiceChannel = message.member.voice.channel;
                            if(!message.guild.me.voice.channel){
                                await message.channel.send(`📣 Successfully connected to channel  **${voiceChannel.name}**`);
                            }  
                            await client.distube.playVoiceChannel(message.member.voice.channel, args[0], {
                                member: message.member,
                                textChannel: message.channel,
                                message
                            })

                        } catch (e) {
                            message.channel.send({
                                embeds: [
                                    new Discord.MessageEmbed().setColor("RANDOM").setDescription(`❌ | **Please try again later!**`)],
                            });
                            console.error(e);
                        };
                        return
                    }
                    //youtube playlist
                    const url = (str) => {
                        var regex = /(http|https):\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/
                        if (!regex.test(str)) {
                            return false;
                        } else {
                            return true;
                        }
                    }
                    if (url(args[0])) {
                        try {
                            const voiceChannel = message.member.voice.channel;
                            if(!message.guild.me.voice.channel){
                                await message.channel.send(`📣 Successfully connected to channel  **${voiceChannel.name}**`);
                            }  
                            await client.distube.playVoiceChannel(message.member.voice.channel, args[0], {
                                member: message.member,
                                textChannel: message.channel,
                                message
                            })
                        } catch (e) {
                            message.channel.send({
                                embeds: [
                                    new Discord.MessageEmbed().setColor("RANDOM").setDescription(`❌ | **Plz try again later!**`)],
                            });
                            console.error(e);
                        };
                        return
                    }
                    //youtube link
                    const validURL = (str) => {
                        var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
                        if (!regex.test(str)) {
                            return false;
                        } else {
                            return true;
                        }
                    }
                    if (validURL(args[0])) {

                        try {
                            const voiceChannel = message.member.voice.channel;
                            if(!message.guild.me.voice.channel){
                                await message.channel.send(`📣 Successfully connected to channel  **${voiceChannel.name}**`);
                            }  
                            await client.distube.play(message.member.voice.channel, args[0], {
                                member: message.member,
                                textChannel: message.channel,
                                message
                            })
                        } catch (e) {
                            message.channel.send({
                                embeds: [
                                    new Discord.MessageEmbed().setColor("RANDOM").setDescription(`❌ | **Plz try again later!**`)],
                            });
                            console.error(e);
                        };
                        return
                    }
                } catch (e) {
                    console.log(e);
                }
                //search for songs
                let filter = m => m.author.id === message.author.id;
                let text = args.join(' ')
                let newmsg = await message.channel.send({ embeds: [new Discord.MessageEmbed().setColor("LUMINOUS_VIVID_PINK").setDescription(`🔍**Searching... \`${text}\`**`)] }).catch(e => {
                    console.log(e)
                })
                let results = await search(text, opts).catch(err => console.log(err));
                if (results) {
                    let youtubeResults = results.results;
                    let i = 0;
                    let titles = youtubeResults.map(result => {
                        i++;
                        return `**${i}**` + ") " + `**[${result.title}](${result.link})**`;
                    });
                    newmsg.edit({
                        embeds: [
                            new Discord.MessageEmbed()
                                .setColor("RANDOM")
                                .setAuthor(`Song selection. Type the song number to continue`, message.author.avatarURL({ dynamic: true }))
                                .setDescription(titles.join("\n"))
                                .setThumbnail(`https://i.imgur.com/FWKIR7N.png`)
                                .setFooter(`This timeouts in 30 seconds. Type ${prefix}cancel to cancel.`, message.author.avatarURL({ dynamic: true })),]
                    }).catch(err => { console.log(err) });

                    filter = m => {
                        return (m.author.id === message.author.id);
                    }

                    let collected = await message.channel.awaitMessages({ filter, max: 1, time: 30000 });
                    if (collected.first().content === `${prefix}cancel`) {
                        return newmsg.edit({
                            embeds: [
                                new Discord.MessageEmbed()
                                    .setColor("RANDOM")
                                    .setDescription("**Canceled!**"),]
                        });
                    }
                    if (collected.first().content.startsWith(`${prefix}`)) {
                        return newmsg.edit({
                            embeds: [
                                new Discord.MessageEmbed()
                                    .setColor("RANDOM")
                                    .setDescription("**Canceled!**"),]
                        });
                    }
                    if (collected.first().content < 1) {
                        return message.channel.send({
                            embeds: [
                                new Discord.MessageEmbed()
                                    .setColor("RANDOM")
                                    .setDescription("**plz choose again**"),]
                        });
                    }
                    if (collected.first().content > 6) {
                        return message.channel.send({
                            embeds: [
                                new Discord.MessageEmbed()
                                    .setColor("RANDOM")
                                    .setDescription("**plz choose again**"),]
                        });
                    }
                    if (isNaN(`${collected.first().content}`)) {
                        return message.channel.send({
                            embeds: [
                                new Discord.MessageEmbed()
                                    .setColor("RANDOM")
                                    .setDescription("**plz choose again**"),]
                        });
                    }
                    let selected = youtubeResults[collected.first().content - 1]; 
                    const voiceChannel = message.member.voice.channel;
                    if(!message.guild.me.voice.channel){
                        await message.channel.send(`📣 Successfully connected to channel  **${voiceChannel.name}**`);
                    }  
                    await message.react("✅");
                    await client.distube.play(message.member.voice.channel, selected.link, {
                        member: message.member,
                        textChannel: message.channel,
                        message
                    })
                    await newmsg.edit({
                        embeds: [
                            new Discord.MessageEmbed()
                                .setColor("RANDOM")
                                .setTitle("Search done!")
                                .setDescription("Hope you enjoy the music ❤️"),]
                    });
                }
            }
        } catch (err) {
            console.log(err);
        }
    }
}