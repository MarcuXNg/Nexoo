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
			if (!args.length) {
				const embed = new MessageEmbed();
				embed
					.setAuthor({
						name: 'Settings',
						iconURL: client.user.displayAvatarURL({ dynamic: true }),
					})
					.setTitle(`Server: **${message.guild.name}**`)
					.setDescription('If you are seeing no fields below it is because there is nothing assinged for the property\n**Properties:** `prefix`, `memberRoleID`, `welcomechannel`, `levelupchannel`, `ticketchannel`, `ticketcategory`, `transcriptchannel`')
					.setColor('RANDOM')
					.setFooter({
						text: 'To mention category please use <#categoryId>',
						iconURL: message.author.displayAvatarURL({ dynamic: true }),
					});
				if (guildProfile.prefix) embed.addFields({ name: 'Prefix', value: guildProfile.prefix, inline: true });
				if (guildProfile.memberRoleID) embed.addFields({ name: 'Member Role ID', value: guildProfile.memberRoleID, inline: true });
				if (guildProfile.welcomeChannel) embed.addFields({ name: 'Welcome Channel', value: `<#${guildProfile.welcomeChannel}>`, inline: true });
				if (guildProfile.levelupChannel) embed.addFields({ name: 'Level up Channel', value: `<#${guildProfile.levelupChannel}>`, inline: true });
				if (guildProfile.ticketChannel) embed.addFields({ name: 'Ticket Channel', value: `<#${guildProfile.ticketChannel}>`, inline: true });
				if (guildProfile.ticketCategory) embed.addFields({ name: 'Ticket Category', value: `<#${guildProfile.ticketCategory}>`, inline: true });
				if (guildProfile.transcriptChannel) embed.addFields({ name: 'Transcript Channel', value: `<#${guildProfile.transcriptChannel}>`, inline: true });
				message.channel.send({ embeds : [embed] });

			}
			else {
				if (!['prefix', 'memberroleid', 'welcomechannel', 'levelupchannel', 'ticketchannel', 'ticketcategory', 'transcriptchannel'].includes(args[0])) {return message.channel.send('You need a valid property to update.');}
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
					else {return message.reply('Please specify a channel!');}
				}
				else if (args[0] === 'levelupchannel') {
					const channel = message.mentions.channels.first();
					if (args[1] === `${channel}`) {
						await Guild.findOneAndUpdate({ guildID: message.guild.id }, { levelupChannel: channel.id, lastEdited: Date.now() });
						message.channel.send(`**Updated:** Level up Channel to ${channel}`);
					}
					else {return message.reply('Please specify a channel!');}
				}
				else if (args[0] === 'ticketchannel') {
					const channel = message.mentions.channels.first();
					if (args[1] === `${channel}`) {
						await Guild.findOneAndUpdate({ guildID: message.guild.id }, { ticketChannel: channel.id, lastEdited: Date.now() });
						message.channel.send(`**Updated:** Ticket Channel to ${channel}`);
					}
					else {return message.reply('Please specify a channel!');}
				}
				else if (args[0] === 'ticketcategory') {
					const channel = message.mentions.channels.first();
					if (args[1] === `${channel}`) {
						await Guild.findOneAndUpdate({ guildID: message.guild.id }, { ticketCategory: channel.id, lastEdited: Date.now() });
						message.channel.send(`**Updated:** Ticket Category to ${channel}`);
					}
					else {return message.reply('Please specify a channel!');}
				}
				else if (args[0] === 'transcriptchannel') {
					const channel = message.mentions.channels.first();
					if (args[1] === `${channel}`) {
						await Guild.findOneAndUpdate({ guildID: message.guild.id }, { transcriptChannel: channel.id, lastEdited: Date.now() });
						message.channel.send(`**Updated:** Transcript Channel to ${channel}`);
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
