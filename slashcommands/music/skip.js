const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('skip')
        .setDescription('skip the current playing song'),

    async execute(client, interaction) {
        try {
            //things u can directly access in an interaction!
            const {
                member
            } = interaction;
            const {
                channel
            } = member.voice;
            if (!channel) return interaction.reply({
                embeds: [
                    new MessageEmbed().setColor("RED").setTitle(`❌ **Please join my VoiceChannel first!**`)
                ],
                ephemeral: true
            })
            if (channel.guild.me.voice.channel && channel.guild.me.voice.channel.id != channel.id) {
                return interaction.reply({
                    embeds: [new MessageEmbed()
                        .setColor("RED")
                        .setTitle(`❌ Join my Voice Channel!`)
                    ],
                    ephemeral: true
                });
            }

            let queue = client.distube.getQueue(interaction);
            if (!queue || !queue.songs || queue.songs.length == 0) {
                //Reply with a Message
                interaction.reply({
                    embeds: [new MessageEmbed()
                        .setColor("RANDOM")
                        .setTimestamp()
                        .setDescription(`❌| The bot is currently not playing right now...`)]
                })
            }
            if (queue) {
                await queue.skip()
                //Reply with a Message
                interaction.reply({
                    embeds: [new MessageEmbed()
                        .setColor("RANDOM")
                        .setTimestamp()
                        .setTitle(`⏭ **Skipped to the next Song!**`)]
                })
            }
        } catch (e) {
            console.log(e)
        }
    }
}