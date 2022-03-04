const { checkSameRoom } = require('../../utils');
const Discord = require('discord.js');
const config = require(`../../config.json`)
const {MessageEmbed} = require("discord.js");
module.exports = {
	name: "unshuffle",
	category: "music",
	aliases: ["unsh"],
	usage: `${config.prefix}unshuffle`,
	inVoiceChannel: true,
	description: "Un-Shuffles the queue", 
	run: async (client, message, args) => {
		try {
            if (checkSameRoom(message)) return;
            const queue = client.distube.getQueue(message)
            if (!queue || !queue.songs || queue.songs.length == 0) return message.channel.send({
                embeds: [
                    new Discord.MessageEmbed().setColor("RANDOM").setDescription(`❌ | There is nothing in the queue right now!`)],
            })
            if(!client.maps.has(`beforeshuffle-${queue.id}`)) {
                return message.channel.send({
                    embeds: [
                        new MessageEmbed().setColor("RED").setDescription(`❌| **There was no shuffle before!**`)
                    ],
                })
            }
            queue.songs = [queue.songs[0], ...client.maps.get(`beforeshuffle-${queue.id}`)]
            client.maps.delete(`beforeshuffle-${queue.id}`);
            message.channel.send({
                embeds: [
                    new Discord.MessageEmbed().setColor("RANDOM").setDescription(`**Unshuffled!**`)],
            })
        } catch (e) {
			console.log(String(e.stack).bgRed)
		}
	}
}
