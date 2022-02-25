const { MessageEmbed, MessageActionRow, MessageSelectMenu, MessageButton } = require('discord.js');
const config = require('../../config.json');


module.exports = {
	name: 'help',
	aliases: ['h'],
	category: 'info',
	description: 'Information about the bot',
	usage: '(prefix)help [command]',
	run: async (client, message, args) => {
		try {
			// if there is args[0] return each cmd help message else will return homepage
			if (!args[0]) return getAll(client, message);
			else return getCMD(client, message, args[0]);
		}
		catch (err) {
			console.log(err);
		}
	},
};
// home
function getAll(client, message) {
	// the emoji for the categories
	const emoji = {
		economy : '💵',
		fun : '🤡',
		info : 'ℹ️',
		level : '🧪',
		moderation : '🔨',
		music : '🎵',
		nsfw : '🔞',
		giveaway: '🎉',
	};
	// map the categories (chữ cái đầu categories viết hoa)
	const cate = client.categories
		.map(cat => cat[0].toUpperCase() + cat.slice(1));
	const info = `There are \`${client.commands.size}\` commands \n\n My **prefix** is \`${client.prefix}\``;
	const embed = new MessageEmbed()
		.setAuthor({
			name: client.user.username,
			iconURL: client.user.displayAvatarURL({ dynamic: true }),
		})
		.setTitle('Home')
		.setFooter({
			text: `To get info of each command type ${client.prefix}help [Command] | Have a nice day!`,
			iconURL: message.author.displayAvatarURL({ dynamic: true }),
		})
		.setColor('RANDOM')
		.setDescription(`${info}\n\n**⚙️By:**\nMarcuX\n**Notification:**\n- The bot is in beta so there are many bugs that appear suddenly\n- Please DM me as early as possible\n- Sorry for this bothering`)
		.setTimestamp();
	embed.addFields(cate.map(data => {
		const i = data.toUpperCase().slice(0, 1) + data.slice(1);
		return {
			name: `${emoji[data.toLowerCase().slice(0, 1) + data.slice(1)]} ${i}`,
			value: `${client.commands
				.filter(cmd => cmd.category.toLowerCase() === i.toLowerCase()).size} commands `,
			inline: true,
		};
	},
	));
	embed.addFields({
		name: 'Slash Commands',
		value: `${client.slashCommands.size} commands `,
		inline: true,
	});

	const raw = new MessageActionRow().addComponents([
		new MessageSelectMenu()
			.setCustomId('Help Menu')
			.setPlaceholder('Click here to see each category')
			.addOptions([
				client.categories.map(cat => {
					return {
						label: `${cat[0].toUpperCase() + cat.slice(1)}`,
						value: cat,
						emoji: emoji[cat],
						description: `${client.commands.filter(cmd => cmd.category === cat).size} commands`,
					};
				}),
			]),
	]);
	const raw2 = new MessageActionRow().addComponents([
		new MessageButton()
			.setCustomId('Home')
			.setLabel('Home')
			.setStyle('PRIMARY')
			.setEmoji('🏡'),
		new MessageButton()
			.setCustomId('Delete')
			.setStyle('DANGER')
			.setEmoji('💀'),
		new MessageButton()
			.setLabel('Invite')
			.setStyle('LINK')
			.setURL(config.invite),
		new MessageButton()
			.setLabel('Github')
			.setStyle('LINK')
			.setURL(config.github),
		new MessageButton()
			.setLabel('Support server')
			.setStyle('LINK')
			.setURL(config.serversupport),
	]);
	message.channel.send({ embeds : [embed], components: [raw, raw2] }).then(async (msg) => {
		const filter = (i) => i.user.id === message.author.id;
		const collector = await msg.createMessageComponentCollector({ filter: filter });
		collector.on('collect', async (i) => {
			if (i.isSelectMenu()) {
				if (i.customId === 'Help Menu') {
					await i.deferUpdate().catch((e) => {console.log(e);});
					const [ directory ] = i.values;
					const helpembed = new MessageEmbed()
						.setColor('RANDOM')
						.setTitle(`${directory} - Total commands: \`${client.commands.filter(cmd => cmd.category === directory).size}\``)
						.setDescription(`${client.commands.filter(cmd => cmd.category === directory).map(cmd => {
							return [
								`\`${client.prefix}${cmd.name}\`- ${cmd.description}`,
							].join('\n');
						}).join('\n')}\n\n- If there are any bugs please DM me [\`MarcuX#7941\`]\n- 🛠️ The bot is still in developed process so there are many **bugs**\n- Sincere apologies from \`MarcuX\` and \`SPARKA\``);
					msg.edit({ embeds : [helpembed] });
				}
			}
			if (i.isButton()) {
				if (i.customId === 'Home') {
					await i.deferUpdate().catch((e) => {console.log(e);});
					msg.edit({ embeds: [embed] }).catch(e => { console.log(e);});
				}
				if (i.customId === 'Delete') {
					await i.deferUpdate().catch((e) => {console.log(e);});
					msg.delete().catch(e => { console.log(e);});
				}
			}
		});
	});
	message.react('🍀');
}
// each cmd
function getCMD(client, message, input) {
	const prefix = client.prefix;
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
			.setFooter({
				text: `To get info of each command type ${prefix}help [Command] | Have a nice day!`,
			})
			.setColor('GREEN')
			.setDescription(info);
	}

	return message.channel.send({ embeds: [embed] });
}
