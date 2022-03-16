const Guild = require('../../database/models/guildSchema');
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'settings',
	category: 'settings',
	aliases: ['settings'],
	description: 'Allow the owner to change the guild settings',
	usage: '`(prefix)`settings [prefix, memberRoleID, welcomechannel, levelupchannel]',
	run: async (client, message, args) => {
		try {
			// server owner permission
			if (message.author.id !== message.guild.ownerId) return message.channel.send('You do not have permission to use this command because you are not the server owner.');
			// settings
			const guildProfile = await Guild.findOne({ guildID: message.guild.id });
			const options = {
				true: 'On',
				false: 'Off',
			};
			if (!args.length) {
				const embed = new MessageEmbed();
				embed
					.setAuthor({
						name: message.guild.name,
						iconURL: message.guild.iconURL({ dynamic: true }) || 'https://cdn.discordapp.com/attachments/765919453766352916/877787616974622770/wCfHtuoejLIbAAAAABJRU5ErkJggg.png',
					})
					.setTitle('⚙️ Settings')
					.setDescription('If you are seeing no fields below it is because there is nothing assinged for the property\n\n**Properties:** `prefix`, `memberRoleID`, `welcomechannel`, `levelupchannel`, `ticketchannel`, `ticketcategory`, `transcriptchannel`, `jointocreate`, `logchannel`, `leavechannel`')
					.setColor('#C88484')
					.setFields(
						{
							name: '<:warning:953612891616051240> Notice',
							value: `>>> <:diamond:953608874487857213> **Remove Channel:** \`${client.prefix}settings (properties) remove\`\n<:diamond:953608874487857213> **Turn settings (on/off):** \`${client.prefix}settings (properties) [on/off]\``,
							inline: false,
						},
					)
					.setFooter({
						text: 'Contact MarcuX#7941 for more information',
						iconURL: message.author.displayAvatarURL({ dynamic: true }),
					});
				if (guildProfile.prefix) embed.addFields({ name: '<:prefix:953605494264696902> Prefix', value: `**╰** ${guildProfile.prefix}`, inline: true });
				if (guildProfile.memberRoleID) embed.addFields({ name: 'Member Role ID', value: guildProfile.memberRoleID, inline: true });
				if (guildProfile.welcomeChannel) embed.addFields({ name: 'Welcome Channel', value: `**╰** <#${guildProfile.welcomeChannel}>`, inline: true });
				if (guildProfile.levelupChannel) embed.addFields({ name: 'Level up Channel', value: `**╰** <#${guildProfile.levelupChannel}>`, inline: true });
				if (guildProfile.ticketChannel) embed.addFields({ name: 'Ticket Channel', value: `**╰** <#${guildProfile.ticketChannel}>`, inline: true });
				if (guildProfile.ticketCategory) embed.addFields({ name: 'Ticket Category', value: `**╰** <#${guildProfile.ticketCategory}>`, inline: true });
				if (guildProfile.transcriptChannel) embed.addFields({ name: 'Transcript Channel', value: `**╰** <#${guildProfile.transcriptChannel}>`, inline: true });
				if (guildProfile.joinToCreate) embed.addFields({ name: 'Join-to-Create Channel', value: `**╰** <#${guildProfile.joinToCreate}>`, inline: true });
				if (guildProfile.logChannel) embed.addFields({ name: 'Log Channel', value: `**╰** <#${guildProfile.logChannel}>`, inline: true });
				if (guildProfile.leaveChannel) embed.addFields({ name: 'Leave Channel', value: `**╰** <#${guildProfile.leaveChannel}>`, inline: true });

				const levelembed = guildProfile.levelupChannel && guildProfile.level;
				const logembed = guildProfile.logChannel && guildProfile.log;

				if (levelembed) {
					embed.addFields(
						{
							name: 'Level',
							value: `**╰** ${options[guildProfile.level]}`,
							inline: true,
						},
					);
				}
				if (logembed) {
					embed.addFields(
						{
							name: 'Log',
							value: `**╰** ${options[guildProfile.log]}`,
							inline: true,
						},
					);
				}
				embed.addFields({
					name: '<:tips:953610039795523624> Tips',
					value: '- To mention category please use <#categoryId>',
					inline: false,
				}),
				message.channel.send({ embeds : [embed] });

			}
			else {
				if (!['prefix',
					'memberroleid',
					'welcomechannel',
					'levelupchannel',
					'ticketchannel',
					'ticketcategory',
					'transcriptchannel',
					'jointocreate',
					'logchannel',
					'leavechannel']
					.includes(args[0])) {return message.channel.send('You need a valid property to update.');}
				if (!args[1]) return message.channel.send('You did not state a value to update the property to.');
				if (args[0] === 'prefix') {
					await Guild.findOneAndUpdate({ guildID: message.guild.id }, { prefix: args[1], lastEdited: Date.now() });
					message.channel.send(`**Updated:** ${args[0]} to \`${args[1]}\``);
				}
				else if (args[0] === 'memberroleid') {
					await Guild.findOneAndUpdate({ guildID: message.guild.id }, { memberRoleID: args[1], lastEdited: Date.now() });
					message.channel.send(`**Updated:** ${args[0]} to \`${args[1]}\``);
				}
				else if (args[0] === 'welcomechannel') {
					const channel = message.mentions.channels.first();
					if (args[1] === `${channel}`) {
						await Guild.findOneAndUpdate({ guildID: message.guild.id }, { welcomeChannel: channel.id, lastEdited: Date.now() });
						message.channel.send(`**Updated:** Welcome Channel to ${channel}`);
					}
					else if (args[1] == 'remove') {
						await Guild.findOneAndUpdate({ guildID: message.guild.id }, { welcomeChannel: null, lastEdited: Date.now() });
						message.reply('**Updated:** Remove Welcome Channel ');
					}
					else {return message.reply('Please specify a channel!');}
				}
				else if (args[0] === 'levelupchannel') {
					const channel = message.mentions.channels.first();
					if (args[1] === `${channel}`) {
						await Guild.findOneAndUpdate({ guildID: message.guild.id }, { levelupChannel: channel.id, lastEdited: Date.now() });
						message.channel.send(`**Updated:** Level up Channel to ${channel}`);
					}
					else if (args[1] == 'remove') {
						await Guild.findOneAndUpdate({ guildID: message.guild.id }, { levelupChannel: null, lastEdited: Date.now() });
						message.reply('**Updated:** Remove Level up Channel ');
					}
					else if (args[1] == 'on') {
						await Guild.findOneAndUpdate({ guildID: message.guild.id }, { level: true, lastEdited: Date.now() });
						message.reply('**Updated:** Level `on` ');
					}
					else if (args[1] == 'off') {
						await Guild.findOneAndUpdate({ guildID: message.guild.id }, { level: false, lastEdited: Date.now() });
						message.reply('**Updated:** Level `off` ');
					}
					else {return message.reply('Please specify a channel!');}
				}
				else if (args[0] === 'ticketchannel') {
					const channel = message.mentions.channels.first();
					if (args[1] === `${channel}`) {
						await Guild.findOneAndUpdate({ guildID: message.guild.id }, { ticketChannel: channel.id, lastEdited: Date.now() });
						message.channel.send(`**Updated:** Ticket Channel to ${channel}`);
					}
					else if (args[1] == 'remove') {
						await Guild.findOneAndUpdate({ guildID: message.guild.id }, { ticketChannel: null, lastEdited: Date.now() });
						message.reply('**Updated:** Remove Ticket Channel ');
					}
					else {return message.reply('Please specify a channel!');}
				}
				else if (args[0] === 'ticketcategory') {
					const channel = message.mentions.channels.first();
					if (args[1] === `${channel}`) {
						await Guild.findOneAndUpdate({ guildID: message.guild.id }, { ticketCategory: channel.id, lastEdited: Date.now() });
						message.channel.send(`**Updated:** Ticket Category to ${channel}`);
					}
					else if (args[1] == 'remove') {
						await Guild.findOneAndUpdate({ guildID: message.guild.id }, { ticketCategory: null, lastEdited: Date.now() });
						message.reply('**Updated:** Remove Ticket Category ');
					}
					else {return message.reply('Please specify a channel!');}
				}
				else if (args[0] === 'transcriptchannel') {
					const channel = message.mentions.channels.first();
					if (args[1] === `${channel}`) {
						await Guild.findOneAndUpdate({ guildID: message.guild.id }, { transcriptChannel: channel.id, lastEdited: Date.now() });
						message.channel.send(`**Updated:** Transcript Channel to ${channel}`);
					}
					else if (args[1] == 'remove') {
						await Guild.findOneAndUpdate({ guildID: message.guild.id }, { transcriptChannel: null, lastEdited: Date.now() });
						message.reply('**Updated:** Remove Transcript Channel ');
					}
					else {return message.reply('Please specify a channel!');}
				}
				else if (args[0] === 'jointocreate') {
					const channel = message.mentions.channels.first();
					if (args[1] === `${channel}`) {
						await Guild.findOneAndUpdate({ guildID: message.guild.id }, { joinToCreate: channel.id, lastEdited: Date.now() });
						message.channel.send(`**Updated:** Join-to-Create Channel to ${channel}`);
					}
					else if (args[1] == 'remove') {
						await Guild.findOneAndUpdate({ guildID: message.guild.id }, { joinToCreate: null, lastEdited: Date.now() });
						message.reply('**Updated:** Remove Join-to-create Channel ');
					}
					else {return message.reply('Please specify a channel!');}
				}
				else if (args[0] === 'logchannel') {
					const channel = message.mentions.channels.first();
					if (args[1] === `${channel}`) {
						await Guild.findOneAndUpdate({ guildID: message.guild.id }, { logChannel: channel.id, lastEdited: Date.now() });
						message.channel.send(`**Updated:** Log Channel to ${channel}`);
					}
					else if (args[1] == 'remove') {
						await Guild.findOneAndUpdate({ guildID: message.guild.id }, { logChannel: null, lastEdited: Date.now() });
						message.reply('**Updated:** Remove Log Channel ');
					}
					else if (args[1] == 'on') {
						await Guild.findOneAndUpdate({ guildID: message.guild.id }, { log: true, lastEdited: Date.now() });
						message.reply('**Updated:** Log `on` ');
					}
					else if (args[1] == 'off') {
						await Guild.findOneAndUpdate({ guildID: message.guild.id }, { log: false, lastEdited: Date.now() });
						message.reply('**Updated:** Log `off` ');
					}
					else {return message.reply('Please specify a channel!');}
				}
				else if (args[0] === 'leavechannel') {
					const channel = message.mentions.channels.first();
					if (args[1] === `${channel}`) {
						await Guild.findOneAndUpdate({ guildID: message.guild.id }, { leaveChannel: channel.id, lastEdited: Date.now() });
						message.channel.send(`**Updated:** Log Channel to ${channel}`);
					}
					else if (args[1] == 'remove') {
						await Guild.findOneAndUpdate({ guildID: message.guild.id }, { leaveChannel: null, lastEdited: Date.now() });
						message.reply('**Updated:** Remove Leave Channel ');
					}
					else {return message.reply('Please specify a channel!');}
				}
			}
		}
		catch (err) {
			console.log(err);
		}
	},
};
