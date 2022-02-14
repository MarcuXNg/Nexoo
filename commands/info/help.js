const { MessageEmbed } = require('discord.js');
const { stripIndent } = require('common-tags');
const config = require('../../config.json');


module.exports = {
	name: 'help',
	aliases: ['h'],
	category: 'info',
	description: 'Information about the bot',
	usage: `${config.prefix}help [command]`,
	run: async (client, message, args) => {
		try {
			if (!args[0]) return getAll(client, message);
			return getCMD(client, message, args[0]);
		}
		catch (err) {
			console.log(err);
		}
	},
};

function getAll(client, message) {
	const prefix = config.prefix;
	const commands = (category) => {
		return client.commands
			.filter(cmd => cmd.category === category)
			.map(cmd => `\`${prefix}${cmd.name}\` - ${cmd.description}`)
			.join('\n');
	};
	const info = `There are ${client.commands.size} commands\n\n My prefix is ${config.prefix} \n`
	+ client.categories
		.map(cat => stripIndent`**${cat[0].toUpperCase() + cat.slice(1)}** [\`${client.commands
			.filter(cmd => cmd.category === cat).size}\`] commands \n${commands(cat)}`)
		.reduce((string, category) => string + '\n' + category);

	const embed = new MessageEmbed()
		.setColor('RANDOM')
		.setAuthor({
			name: `${client.user.username}'s command`,
			iconURL: config.iconURL,
		})
		.setFields(
			{
				name: '✨ Support',
				value: '[GitHub](https://github.com/MarcuXNg)',
				inline: true,
			},
			{
				name: '🙏 By',
				value: '[MarcuX](https://www.facebook.com/marcuxnguyen/)',
				inline: true,
			})
		.setFooter({
			text: `To get info of each command type ${prefix}help [Command] | Have a nice day!`,
		})
		.setDescription(info);

	return message.channel.send({ embeds: [embed] });
}

function getCMD(client, message, input) {
	const prefix = config.prefix;
	const embed = new MessageEmbed();
	const cmd = client.commands.get(input.toLowerCase()) || client.commands.get(client.aliases.get(input.toLowerCase()));
	let info = `❌ | Unable to find that command **${input.toLowerCase()}**.`;
	embed
		.setColor('RED')
		.setDescription(info);
	if (!cmd) return message.channel.send({ embeds: [embed] });

	if (cmd.name) info = `**Command**: ${cmd.name}`;
	if (cmd.aliases) info += `\n**Alias**: ${cmd.aliases.map(a => `\`${a}\``).join(', ')}`;
	if (cmd.description) info += `\n** About**: ${cmd.description}`;
	if (cmd.usage) {
		info += `\n**Usage**:${cmd.usage}`;
		embed
			.setFooter(`To get info of each command type ${prefix}help [Command] | Have a nice day!`)
			.setColor('GREEN')
			.setDescription(info);
	}

	return message.channel.send({ embeds: [embed] });
}
