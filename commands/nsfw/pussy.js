const Discord = require('discord.js');
const nekoclient = require('nekos.life');
const neko = new nekoclient();
const config = require('../../config.json')

module.exports = {
  name: "pussy",
  aliases: ["pussy"],
  category: "nsfw",
  description: "Shows a NSFW URL of a pussy image/gif ",
  usage: `${config.prefix}pussy`,
  run: async (client, message, args) => {
    try {
      const GIF = await neko.nsfw.pussy();
      message.channel.send({
        embeds: [
          new Discord.MessageEmbed().setColor("RANDOM").setImage(GIF.url).setTitle(`That's what ${message.author.username} want`),
        ],
      });
    } catch (e) {
      console.log(e);
    }
  },
};