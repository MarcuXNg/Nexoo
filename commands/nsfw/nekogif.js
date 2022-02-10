const Discord = require('discord.js');
const nekoclient = require('nekos.life');
const neko = new nekoclient();
const config = require('../../config.json')

module.exports = {
  name: "nekogif",
  aliases: ["nekogif"],
  category: "nsfw",
  description: "Shows a NSFW URL of a neko gif",
  usage: `${config.prefix}nekogif`,
  run: async (client, message, args) => {
    try {
      const GIF = await neko.nsfw.nekoGif();
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