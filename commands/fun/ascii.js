const figlet = require('figlet');
const config = require('../../config.json');
const { MessageEmbed } = require('discord.js');
const ee = require('../../settings/embeds.json');

module.exports = {
	name: 'ascii',
	category: 'fun',
	aliases: ['ascii'],
	description: 'Show a random meme',
	usage: '(prefix)ascii `<text>` `<font>`',
	run : async (client, message, args) => {
		try {
			const text = args[0];
			const font = args[1];
			const usage = `\`${config.prefix}ascii <text> <font>\``;
			const embed = new MessageEmbed();

			embed
				.setAuthor({
					name: client.user.username,
					iconURL: client.user.displayAvatarURL({ dynamic: true }),
				})
				.setDescription(
					`\`${config.prefix}ascii\`\n
                Converts text into ASCII. A list of fonts can be found at
                https://github.com/patorjk/figlet.js/tree/master/fonts.\n\n
                Examples:
                \`${config.prefix}ascii ghost beep\` - Shows \`beep\` in the \`ghost\` font`,
				)
				.setColor(ee.color)
				.setFields(
					{
						name: 'Usage',
						value: usage,
						inline: true,
					},
					{
						name: 'Permission Node',
						value: 'fun.ascii',
						inline: true,
					},
				);
			if (!text) return message.channel.send({ embeds: [embed] });
			if (!font) return message.channel.send({ embeds: [embed] });
			figlet.text(text, {
				font: font,
				horizontalLayout: 'default',
				verticalLayout: 'default',
				width: 80,
				whitespaceBreak: true,
			}, function(err, data) {
				if (err) {
					console.log('Something went wrong...');
					console.dir(err);
					return;
				}
				message.channel.send(`\`\`\` ${data} \`\`\``);
			});
		}
		catch (e) {
			console.log(e);
		}
	},
};
