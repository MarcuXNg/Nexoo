const Discord = require('discord.js');
const nekoclient = require('nekos.life');
const neko = new nekoclient();
const config = require('../../config.json')

module.exports = {
  name: "tits",
  aliases: ["tits"],
  category: "nsfw",
  description: "Show a NSFW URL of an/a image/gif containing tits",
  usage: `${config.prefix}tits`,
  run: async (client, message, args) => {
    try {
      const GIF = await neko.nsfw.tits();
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