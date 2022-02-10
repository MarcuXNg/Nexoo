const Discord = require('discord.js');
const nekoclient = require('nekos.life');
const neko = new nekoclient();
const config = require('../../config.json')

module.exports = {
  name: "anal",
  aliases: ["anal"],
  category: "nsfw",
  description: "Shows a NSFW URL of anal image/gif",
  usage: `${config.prefix}anal`,
  run: async (client, message, args) => {
    try {
      const GIF = await neko.nsfw.anal();
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