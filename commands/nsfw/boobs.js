const Discord = require('discord.js');
const nekoclient = require('nekos.life');
const neko = new nekoclient();
const config = require('../../config.json')

module.exports = {
  name: "boobs",
  aliases: ["boobs"],
  category: "nsfw",
  description: "Show a NSFW URL of boobs image/gif",
  usage: `${config.prefix}boobs`,
  run: async (client, message, args) => {
    try {
      const GIF = await neko.nsfw.boobs();
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