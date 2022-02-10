const Discord = require('discord.js');
const nekoclient = require('nekos.life');
const neko = new nekoclient();
const config = require('../../config.json')

module.exports = {
  name: "girlsolo",
  aliases: ["girlsolo"],
  category: "nsfw",
  description: "Show a NSFW URL of a solo girl image",
  usage: `${config.prefix}girlsolo`,
  run: async (client, message, args) => {
    try {
      const GIF = await neko.nsfw.girlSolo();
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