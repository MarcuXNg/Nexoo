const config = require('../../config.json');
const client = require('../../index.js');
const Discord = require('discord.js');

client.on('messageCreate', async message => {
	// getting prefix when bot mention
	if (message.author.bot) return;
	if (!message.guild) return;
	if (message.channel.partial) await message.channel.fetch();
	if (message.partial) await message.fetch();
	if (message.content.includes('@here') || message.content.includes('@everyone') || message.type == 'REPLY') return false;
	if (message.mentions.has(client.user.id)) {
		const embed = new Discord.MessageEmbed();

		embed
			.setAuthor({
				name: 'Hey, You Pinged me.. 😉',
				iconURL: config.botmention,
			})
			.setColor('RANDOM')
			.setDescription(`My prefix is **\`${config.prefix}\`**`)
			.setFooter({
				text: `Type ${config.prefix}help to see the command`,
				iconURL: message.author.avatarURL({ dynamic: true }),
			});
		message.channel.send({ embeds: [embed] });
	}
});