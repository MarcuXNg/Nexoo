const Discord = require('discord.js');
const nekoclient = require('nekos.life');
const neko = new nekoclient();
const config = require('../../config.json')

module.exports = {
  name: "cumsluts",
  aliases: ["cumsluts"],
  category: "nsfw",
  description: "Show a NSFW URL of a cumslut image/gif",
  usage: `${config.prefix}cumsluts`,
  run: async (client, message, args) => {
    try {
      const GIF = await neko.nsfw.cumsluts();
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