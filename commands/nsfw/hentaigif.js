const Discord = require('discord.js');
const nekoclient = require('nekos.life');
const neko = new nekoclient();
const config = require('../../config.json')

module.exports = {
  name: "hentaigif",
  aliases: ["h"],
  category: "nsfw",
  description: "Shows a random hentai gif",
  usage: `${config.prefix}hentaigif`,
  run: async (client, message, args) => {
    try {
      const GIF = await neko.nsfw.randomHentaiGif();
      message.channel.send({
        embeds: [
          new Discord.MessageEmbed().setColor("RANDOM").setImage(GIF.url),
        ],
      });
    } catch (e) {
      console.log(e);
    }
  },
};