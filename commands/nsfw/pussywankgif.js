const Discord = require('discord.js');
const nekoclient = require('nekos.life');
const neko = new nekoclient();
const config = require('../../config.json')

module.exports = {
  name: "pussywankgif",
  aliases: ["pussywankgif"],
  category: "nsfw",
  description: "Show a NSFW URL of a gif of pussy masterbation",
  usage: `${config.prefix}pussywankgif`,
  run: async (client, message, args) => {
    try {
      const GIF = await neko.nsfw.pussyWankGif();
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