const Discord = require('discord.js');
const nekoclient = require('nekos.life');
const neko = new nekoclient();
const config = require('../../config.json')

module.exports = {
  name: "classic",
  aliases: ["classic"],
  category: "nsfw",
  description: "Shows a NSFW URL of the classic endpoint image/gif",
  usage: `${config.prefix}classic`,
  run: async (client, message, args) => {
    try {
      const GIF = await neko.nsfw.classic();
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