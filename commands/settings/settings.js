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
				const channel = message.mentions.channels.first();
				if (!channel) return message.reply('Please specify a channel!');
				if (args[0] === 'prefix') {
					await Guild.findOneAndUpdate({ guildID: message.guild.id }, { prefix: args[1], lastEdited: Date.now() });
					message.channel.send(`**Updated:** ${args[0]} to \`${args[1]}\``);
				}
				else if (args[0] === 'memberroleid') {
					await Guild.findOneAndUpdate({ guildID: message.guild.id }, { memberRoleID: args[1], lastEdited: Date.now() });
					message.channel.send(`**Updated:** ${args[0]} to \`${args[1]}\``);
				}
				else if (args[0] === 'welcomechannel') {
					await Guild.findOneAndUpdate({ guildID: message.guild.id }, { welcomeChannel: channel.id, lastEdited: Date.now() });
					message.channel.send(`**Updated:** ${args[0]} to ${channel}`);
				}
				else if (args[0] === 'levelupchannel') {
					await Guild.findOneAndUpdate({ guildID: message.guild.id }, { levelupChannel: channel.id, lastEdited: Date.now() });
					message.channel.send(`**Updated:** ${args[0]} to ${channel}`);
				}
				else if (args[0] === 'ticketchannel') {
					await Guild.findOneAndUpdate({ guildID: message.guild.id }, { ticketChannel: channel.id, lastEdited: Date.now() });
					message.channel.send(`**Updated:** ${args[0]} to ${channel}`);
				}
				else if (args[0] === 'ticketcategory') {
					await Guild.findOneAndUpdate({ guildID: message.guild.id }, { ticketCategory: channel.id, lastEdited: Date.now() });
					message.channel.send(`**Updated:** ${args[0]} to ${channel}`);
				}
				else if (args[0] === 'transcriptchannel') {
					await Guild.findOneAndUpdate({ guildID: message.guild.id }, { transcriptChannel: channel.id, lastEdited: Date.now() });
					message.channel.send(`**Updated:** ${args[0]} to ${channel}`);
				}
			}
		}
		catch (err) {
			console.log(err);
		}
	},
};
