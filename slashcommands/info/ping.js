const { SlashCommandBuilder } = require("@discordjs/builders");
const Discord = require(`discord.js`)

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("show ping"),

    async execute(client, interaction) {
        const embed = new Discord.MessageEmbed();

        embed
            .setTitle(`\`Pong\`! :ping_pong:`)
            .setDescription(`:hourglass: **Ping**: \`${client.ws.ping}\` ms.`)
            .setColor("RANDOM")
            .setTimestamp();
        interaction.reply({ embeds: [embed] })
    }
}