const Discord = require('discord.js');
const nekoclient = require('nekos.life');
const neko = new nekoclient();
const config = require('../../config.json')

module.exports = {
  name: "eroyuri",
  aliases: ["eroyuri"],
  category: "nsfw",
  description: "Show a NSFW URL of an/a image/gif ero yuri",
  usage: `${config.prefix}eroyuri`,
  run: async (client, message, args) => {
    try {
      const GIF = await neko.nsfw.eroYuri();
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