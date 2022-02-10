const voice = require('@discordjs/voice');
const Discord = require("discord.js");
const config = require('../../config.json');

module.exports = {
    name: 'leave',
    aliases: ['dis', 'l','disconnect'],
    category: 'music',
    description: 'leave the voice channel',
    usage: `${config.prefix}leave`,
    inVoiceChannel: true,
    run: async (client, message, args) => {
        try {
            if (!message.guild.me.voice.channel) return message.channel.send({
                embeds: [
                    new Discord.MessageEmbed().setColor("RANDOM").setDescription(`❌ | **I'm not in the voicechannel!**`)]
            }) //check if the bot is in the voicechannel or not
            const connection = voice.joinVoiceChannel({
                channelId: message.member.voice.channel.id,
                guildId: message.guild.id,
                adapterCreator: message.guild.voiceAdapterCreator,
            })
            connection.destroy();
            await message.channel.send({
                embeds: [
                    new Discord.MessageEmbed().setColor("RANDOM").setDescription(`✅ | **Disconnected**`)]
            });
            await message.react("✅");
        } catch (err) {
            console.log(err);
        }
    }
}