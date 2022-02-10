const { MessageEmbed } = require('discord.js');
const config = require(`../../config.json`)

module.exports = {
    name: "botinfo",
    aliases: ["i"],
    category: 'info',
    description: "Shows an embed info of the bot",
    usage: `${config.prefix}botinfo`,
    run: (client, message, args) => {
        try {
            const embed = new MessageEmbed();

            embed
                .setAuthor(
                    message.author.username,
                    message.author.avatarURL({ dynamic: true }),
                    "https://www.facebook.com/marcuxnguyen/"
                )
                .setDescription(
                    `Support me >< \n **Contact:** \n [**MarcuX**](https://www.facebook.com/marcuxnguyen/)**,** [**SPARKA**](https://www.facebook.com/ducthanhh.nguyenn)`
                )
                .setColor("BLURPLE")
                .setThumbnail("https://dankmemer.lol/gif/pepe-dancing.gif")
                .setTimestamp(message.createdTimestamp - 36000)
                .setFields(
                    {
                        name: "Name",
                        value: `[*${client.user.username}*](https://discord.com/oauth2/authorize?client_id=932199083643379742&scope=bot&permissions=1099511627775)`,
                        inline: true
                    },
                    {
                        name: "Version",
                        value: "1.0.0",
                        inline: true
                    },

                    {
                        name: "By",
                        value: "[*MarcuX*](https://www.facebook.com/marcuxnguyen/) \n [*SPARKA*](https://www.facebook.com/ducthanhh.nguyenn)",
                        inline: true
                    }
                );
            message.channel.send({ embeds: [embed] });
        } catch (err) {
            console.log(err);
        }
    }

}
