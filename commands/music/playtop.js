const { MessageEmbed } = require("discord.js");
const config = require('../../config.json');
const { checkSameRoom } = require('../../utils');

module.exports = {
    name: "playtop",
    category: "music",
    usage: `${config.prefix}playtop <Search/link>`,
    aliases: ["pt"],
    inVoiceChannel: true,
    description: "Plays a Song/Playlist and adds it to the Top!",
    run: async (client, message, args) => {
        try {
            if (checkSameRoom(message)) return;
            if (!args[0]) {
                return message.channel.send({
                    embeds: [
                        new MessageEmbed()
                            .setColor("RED")
                            .setTitle(`❌| Please add a Search Query!`)
                            .setDescription(`**Usage:** \`${config.prefix}playtop <Search/Link>\``)
                    ],
                })
            }
			//let IntOption = options.getInteger("OPTIONNAME"); //same as in IntChoices //RETURNS NUMBER
			const Text = args.join(" "); //same as in StringChoices //RETURNS STRING 
			//update it without a response!
			let newmsg = await message.channel.send({
				embeds: [
                    new MessageEmbed()
                        .setColor("RANDOM")
                        .setDescription(`🔍 Searching... \`\`\`${Text}\`\`\``),]
			}).catch(e => {
				console.log(e)
			})
			try {
				let queue = client.distube.getQueue(message)
				let options = {
					message: message,
					unshift: true
				}
				if (!queue) return message.channel.send({
                    embeds: [
                        new MessageEmbed().setColor("RANDOM").setDescription("❌ | The bot is currently not playing right now...")],
                });
				await client.distube.playVoiceChannel(message.member.voice.channel, Text, options)
				//Edit the reply
				newmsg.edit({
                    embeds: [
                        new MessageEmbed()
                            .setColor("RANDOM")
                            .setDescription(`👍 Added to the Top of the Queue`),]
				}).catch(e => {
					console.log(e)
				})           

        } catch (err) {
            console.log(err);
        }
    }catch (err) {
        console.log(err);
    }
}
}