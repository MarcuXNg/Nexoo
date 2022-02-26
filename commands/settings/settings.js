const Guild = require('../../database/models/guildSchema');
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'settings',
	category: 'settings',
	aliases: ['settings'],
	description: 'Allow the owner to change the guild settings',
	usage: '`(prefix)`settings [prefix, memberRoleID, welcomechannel]',
	run: async (client, message, args) => {
		try {
			// server owner permission
			if (message.author.id !== message.guild.ownerId) return message.channel.send('You do not have permission to use this command because you are not the server owner.');
			// settings
			const guildProfile = await Guild.findOne({ guildID: message.guild.id });
			if (!args.length) {
				const embed = new MessageEmbed();
				embed
					.setTitle(`**\`${message.guild.name}\`**'s Settings:`)
					.setDescription('If you are seeing no fields below it is because there is nothing assinged for the property\n**Properties:** `prefix`, `memberRoleID`, `welcomechannel`')
					.setColor('RANDOM');
				if (guildProfile.prefix) embed.addFields({ name: 'Prefix', value: guildProfile.prefix });
				if (guildProfile.memberRoleID) embed.addFields({ name: 'Member Role ID', value: guildProfile.memberRoleID });
				if (guildProfile.welcomeChannel) embed.addFields({ name: 'Welcome Channel', value: `<#${guildProfile.welcomeChannel}>` });
				message.channel.send({ embeds : [embed] });

			}
			else {
				if (!['prefix', 'memberRoleID', 'welcomechannel'].includes(args[0])) {return message.channel.send('You need a valid property to update.');}
				if (!args[1]) return message.channel.send('You did not state a value to update the property to.');
				const channel = message.mentions.channels.first();
				if (!channel) return message.reply('Please specify a channel you would like to be your welcome channel!');
				if (args[0] === 'prefix') {
					await Guild.findOneAndUpdate({ guildID: message.guild.id }, { prefix: args[1], lastEdited: Date.now() });
					message.channel.send(`**Updated:** ${args[0]} to \`${args[1]}\``);
				}
				else if (args[0] === 'memberRoleID') {
					await Guild.findOneAndUpdate({ guildID: message.guild.id }, { memberRoleID: args[1], lastEdited: Date.now() });
					message.channel.send(`**Updated:** ${args[0]} to \`${args[1]}\``);
				}
				else if (args[0] === 'welcomechannel') {
					await Guild.findOneAndUpdate({ guildID: message.guild.id }, { welcomeChannel: channel.id, lastEdited: Date.now() });
					message.channel.send(`**Updated:** ${args[0]} to ${channel}`);
				}
			}
		}
		catch (err) {
			console.log(err);
		}
	},
};