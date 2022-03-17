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
			const xpsettings = `\`${client.prefix}settings levelupchannel (xp / xprate)\``;
			if (!args.length) {
				const embed = new MessageEmbed();
				embed
					.setAuthor({
						name: message.guild.name,
						iconURL: message.guild.iconURL({ dynamic: true }) || 'https://cdn.discordapp.com/attachments/765919453766352916/877787616974622770/wCfHtuoejLIbAAAAABJRU5ErkJggg.png',
					})
					.setTitle('⚙️ Settings')
					.setDescription('If you are seeing no fields below it is because there is nothing assinged for the property\n\n**Properties:** `prefix`, `memberRoleID`, `welcomechannel`, `levelupchannel`, `ticketchannel`, `ticketcategory`, `transcriptchannel`, `jointocreate`, `logchannel`, `leavechannel`\n**Settings:** `memberup`, `memberban`, `memberunban`, `channelcreate`, `channeldelete`, `channelpins`, `channelupdate`, `emojicreate`, `emojidelete`, `emojiupdate`,`rolecreate`, `roledelete`, `roleupdate`')
					.setColor('#C70039')
					.setFields(
						{
							name: '<:warning:953612891616051240> Notice',
							value: `>>> <:diamond:953608874487857213> **Remove Channel:** \`${client.prefix}settings (properties) remove\`\n<:diamond:953608874487857213> **Turn properties (on/off):** \`${client.prefix}settings (properties) [on/off]\`\n<:diamond:953608874487857213> **Turn settings (on/off):** \`${client.prefix}settings logchannel (settings) [on/off]\`\n<:diamond:953608874487857213> **Change settings:** ${xpsettings}`,
							inline: false,
						},
					)
					.setFooter({
						text: 'Contact MarcuX#7941 for more information',
						iconURL: message.author.displayAvatarURL({ dynamic: true }),
					});
				if (guildProfile.prefix) embed.addFields({ name: '<:prefix:953605494264696902> Prefix', value: `**╰** \`${guildProfile.prefix}\``, inline: true });
				if (guildProfile.memberRoleID) embed.addFields({ name: 'Member Role ID', value: guildProfile.memberRoleID, inline: true });
				if (guildProfile.welcomeChannel) embed.addFields({ name: 'Welcome Channel', value: `**╰** <#${guildProfile.welcomeChannel}>`, inline: true });
				if (guildProfile.levelupChannel) embed.addFields({ name: 'Level up Channel', value: `**╰** <#${guildProfile.levelupChannel}>`, inline: true });
				if (guildProfile.ticketChannel) embed.addFields({ name: 'Ticket Channel', value: `**╰** <#${guildProfile.ticketChannel}>`, inline: true });
				if (guildProfile.ticketCategory) embed.addFields({ name: 'Ticket Category', value: `**╰** <#${guildProfile.ticketCategory}>`, inline: true });
				if (guildProfile.transcriptChannel) embed.addFields({ name: 'Transcript Channel', value: `**╰** <#${guildProfile.transcriptChannel}>`, inline: true });
				if (guildProfile.joinToCreate) embed.addFields({ name: 'Join-to-Create Channel', value: `**╰** <#${guildProfile.joinToCreate}>`, inline: true });
				if (guildProfile.logChannel) embed.addFields({ name: 'Log Channel', value: `**╰** <#${guildProfile.logChannel}>`, inline: true });
				if (guildProfile.leaveChannel) embed.addFields({ name: 'Leave Channel', value: `**╰** <#${guildProfile.leaveChannel}>`, inline: true });
				if (guildProfile.chatbotChannel) embed.addFields({ name: 'Chatbot Channel', value: `**╰** <#${guildProfile.chatbotChannel}>`, inline: true });

				const levelembed = guildProfile.levelupChannel;
				const logembed = guildProfile.logChannel;
				const welcomeembed = guildProfile.welcomeChannel;
				const leaveembed = guildProfile.leaveChannel;
				const guildmemberupdateEmbed = guildProfile.logChannel;
				const guildbanremoveEmbed = guildProfile.logChannel;
				const guildbanaddEmbed = guildProfile.logChannel;
				const cCreateEmbed = guildProfile.logChannel;
				const cDeleteEmbed = guildProfile.logChannel;
				const cpinsUpEmbed = guildProfile.logChannel;
				const cUpEmbed = guildProfile.logChannel;
				const eCreateEmbed = guildProfile.logChannel;
				const eDeleteEmbed = guildProfile.logChannel;
				const eUpdateEmbed = guildProfile.logChannel;
				const rCreateEmbed = guildProfile.logChannel;
				const rDeleteEmbed = guildProfile.logChannel;
				const rUpdateEmbed = guildProfile.logChannel;
				const chatbotEmbed = guildProfile.chatbotChannel;

				if (levelembed) {
					embed.addFields(
						{
							name: 'Level',
							value: `**╰** \`${options[guildProfile.level]}\``,
							inline: true,
						},
					);
				}
				if (guildProfile.xp) {
					embed.addFields(
						{
							name: 'Xp',
							value: `**╰** \`${guildProfile.xp}\``,
							inline: true,
						},
					);
				}
				if (guildProfile.chatbotlang) {
					embed.addFields(
						{
							name: 'ChatBot Language',
							value: `**╰** \`${guildProfile.chatbotlang}\``,
							inline: true,
						},
					);
				}
				if (chatbotEmbed) {
					embed.addFields(
						{
							name: 'Chat Bot',
							value: `**╰** \`${options[guildProfile.chatbot]}\``,
							inline: true,
						},
					);
				}
				if (logembed) {
					embed.addFields(
						{
							name: 'Log',
							value: `**╰** \`${options[guildProfile.log]}\``,
							inline: true,
						},
					);
				}
				if (welcomeembed) {
					embed.addFields(
						{
							name: 'Welcome',
							value: `**╰** \`${options[guildProfile.welcome]}\``,
							inline: true,
						},
					);
				}
				if (leaveembed) {
					embed.addFields(
						{
							name: 'Leave',
							value: `**╰** \`${options[guildProfile.leave]}\``,
							inline: true,
						},
					);
				}
				if (guildmemberupdateEmbed) {
					embed.addFields(
						{
							name: 'GuildMemberUpdate',
							value: `**╰** \`${options[guildProfile.memberup]}\``,
							inline: true,
						},
					);
				}
				if (guildbanremoveEmbed) {
					embed.addFields(
						{
							name: 'Member Unban',
							value: `**╰** \`${options[guildProfile.banremove]}\``,
							inline: true,
						},
					);
				}
				if (guildbanaddEmbed) {
					embed.addFields(
						{
							name: 'Member Ban',
							value: `**╰** \`${options[guildProfile.banadd]}\``,
							inline: true,
						},
					);
				}
				if (cCreateEmbed) {
					embed.addFields(
						{
							name: 'Channel Create',
							value: `**╰** \`${options[guildProfile.cCreate]}\``,
							inline: true,
						},
					);
				}
				if (cDeleteEmbed) {
					embed.addFields(
						{
							name: 'Channel Delete',
							value: `**╰** \`${options[guildProfile.cDelete]}\``,
							inline: true,
						},
					);
				}
				if (cpinsUpEmbed) {
					embed.addFields(
						{
							name: 'Channel Pins Update',
							value: `**╰** \`${options[guildProfile.cpinsUp]}\``,
							inline: true,
						},
					);
				}
				if (cUpEmbed) {
					embed.addFields(
						{
							name: 'Channel Update',
							value: `**╰** \`${options[guildProfile.cUp]}\``,
							inline: true,
						},
					);
				}
				if (eCreateEmbed) {
					embed.addFields(
						{
							name: 'Emoji Create',
							value: `**╰** \`${options[guildProfile.eCreate]}\``,
							inline: true,
						},
					);
				}
				if (eDeleteEmbed) {
					embed.addFields(
						{
							name: 'Emoji Delete',
							value: `**╰** \`${options[guildProfile.eDelete]}\``,
							inline: true,
						},
					);
				}
				if (eUpdateEmbed) {
					embed.addFields(
						{
							name: 'Emoji Update',
							value: `**╰** \`${options[guildProfile.eUpdate]}\``,
							inline: true,
						},
					);
				}
				if (rCreateEmbed) {
					embed.addFields(
						{
							name: 'Role Create',
							value: `**╰** \`${options[guildProfile.rCreate]}\``,
							inline: true,
						},
					);
				}
				if (rDeleteEmbed) {
					embed.addFields(
						{
							name: 'Role Delete',
							value: `**╰** \`${options[guildProfile.rDelete]}\``,
							inline: true,
						},
					);
				}
				if (rUpdateEmbed) {
					embed.addFields(
						{
							name: 'Role Update',
							value: `**╰** \`${options[guildProfile.rUpdate]}\``,
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
					else if (args[1] == 'on') {
						await Guild.findOneAndUpdate({ guildID: message.guild.id }, { level: true, lastEdited: Date.now() });
						message.reply('**Updated:** Welcome `on` ');
					}
					else if (args[1] == 'off') {
						await Guild.findOneAndUpdate({ guildID: message.guild.id }, { level: false, lastEdited: Date.now() });
						message.reply('**Updated:** Welcome `off` ');
					}
					else {return message.reply('Please specify a channel!');}
				}
				// level up channel
				else if (args[0] === 'levelupchannel') {
					const channel = message.mentions.channels.first();
					// choose the channel to send level up message
					if (args[1] == `${channel}`) {
						await Guild.findOneAndUpdate({ guildID: message.guild.id }, { levelupChannel: channel.id, lastEdited: Date.now() });
						message.channel.send(`**Updated:** Level up Channel to ${channel}`);
					}
					// change the xp
					if (args[1] == 'xp') {
						if (isNaN(args[2])) return message.channel.send('Please choose a `number`');
						if (args[2] <= 0) return message.channel.send('Please choose `integer >= 1`');
						await Guild.findOneAndUpdate({ guildID: message.guild.id }, { xp: args[2], lastEdited: Date.now() });
						await message.channel.send(`**Updated:** Set xp to \`${parseInt(args[2])}\``);
					}
					if (args[1] == 'xprate') {
						if (!['x3', 'x1'].includes(args[2])) return message.reply(`**Usage:** ${xpsettings}`);
						if (args[2] == 'x3') {
							await Guild.findOneAndUpdate({ guildID: message.guild.id }, { xp: 300, lastEdited: Date.now() });
							await message.channel.send(`**Updated:** Set xp to \`${args[2]}\``);
						}
					}
					// remove the level up channel
					else if (args[1] == 'remove') {
						await Guild.findOneAndUpdate({ guildID: message.guild.id }, { levelupChannel: null, lastEdited: Date.now() });
						message.reply('**Updated:** Remove Level up Channel ');
					}
					// turn level on
					else if (args[1] == 'on') {
						await Guild.findOneAndUpdate({ guildID: message.guild.id }, { level: true, lastEdited: Date.now() });
						message.reply('**Updated:** Level `on` ');
					}
					// turn level off
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
					// choose the channel to send audit log
					if (args[1] === `${channel}`) {
						await Guild.findOneAndUpdate({ guildID: message.guild.id }, { logChannel: channel.id, lastEdited: Date.now() });
						message.channel.send(`**Updated:** Log Channel to ${channel}`);
					}
					// remove audit log channel
					else if (args[1] == 'remove') {
						await Guild.findOneAndUpdate({ guildID: message.guild.id }, { logChannel: null, lastEdited: Date.now() });
						message.reply('**Updated:** Remove Log Channel ');
					}
					// turn audit log on
					else if (args[1] == 'on') {
						await Guild.findOneAndUpdate({ guildID: message.guild.id }, { log: true, lastEdited: Date.now() });
						message.reply('**Updated:** Log `on` ');
					}
					// turn audit log off
					else if (args[1] == 'off') {
						await Guild.findOneAndUpdate({ guildID: message.guild.id }, { log: false, lastEdited: Date.now() });
						message.reply('**Updated:** Log `off` ');
					}
					// Member Update
					else if (args[1] == 'memberup') {
						if (args[2] == 'on') {
							await Guild.findOneAndUpdate({ guildID: message.guild.id }, { memberup: true, lastEdited: Date.now() });
							message.reply('**Updated:** GuildMemberUpdate `on` ');
						}
						else if (args[2] == 'off') {
							await Guild.findOneAndUpdate({ guildID: message.guild.id }, { memberup: false, lastEdited: Date.now() });
							message.reply('**Updated:** GuildMemberUpdate `off` ');
						}
					}
					// Member Unban
					else if (args[1] == 'memberunban') {
						if (args[2] == 'on') {
							await Guild.findOneAndUpdate({ guildID: message.guild.id }, { banremove: true, lastEdited: Date.now() });
							message.reply('**Updated:** Member Unban `on` ');
						}
						else if (args[2] == 'off') {
							await Guild.findOneAndUpdate({ guildID: message.guild.id }, { banremove: false, lastEdited: Date.now() });
							message.reply('**Updated:** Member Unban `off` ');
						}
					}
					// Member Ban
					else if (args[1] == 'memberban') {
						if (args[2] == 'on') {
							await Guild.findOneAndUpdate({ guildID: message.guild.id }, { banadd: true, lastEdited: Date.now() });
							message.reply('**Updated:** Member Ban `on` ');
						}
						else if (args[2] == 'off') {
							await Guild.findOneAndUpdate({ guildID: message.guild.id }, { banadd: false, lastEdited: Date.now() });
							message.reply('**Updated:** Member Ban `off` ');
						}
					}
					// Channel Create
					else if (args[1] == 'channelcreate') {
						if (args[2] == 'on') {
							await Guild.findOneAndUpdate({ guildID: message.guild.id }, { cCreate: true, lastEdited: Date.now() });
							message.reply('**Updated:** Channel Create `on` ');
						}
						else if (args[2] == 'off') {
							await Guild.findOneAndUpdate({ guildID: message.guild.id }, { cCreate: false, lastEdited: Date.now() });
							message.reply('**Updated:** Channel Create `off` ');
						}
					}
					// Channel Delete
					else if (args[1] == 'channeldelete') {
						if (args[2] == 'on') {
							await Guild.findOneAndUpdate({ guildID: message.guild.id }, { cDelete: true, lastEdited: Date.now() });
							message.reply('**Updated:** Channel Delete `on` ');
						}
						else if (args[2] == 'off') {
							await Guild.findOneAndUpdate({ guildID: message.guild.id }, { cDelete: false, lastEdited: Date.now() });
							message.reply('**Updated:** Channel Delete `off` ');
						}
					}
					// Channel Pins Update
					else if (args[1] == 'channelpins') {
						if (args[2] == 'on') {
							await Guild.findOneAndUpdate({ guildID: message.guild.id }, { cpinsUp: true, lastEdited: Date.now() });
							message.reply('**Updated:** Channel Pins Update `on` ');
						}
						else if (args[2] == 'off') {
							await Guild.findOneAndUpdate({ guildID: message.guild.id }, { cpinsUp: false, lastEdited: Date.now() });
							message.reply('**Updated:** Channel Pins Update `off` ');
						}
					}
					// Channel Update
					else if (args[1] == 'channelupdate') {
						if (args[2] == 'on') {
							await Guild.findOneAndUpdate({ guildID: message.guild.id }, { cUp: true, lastEdited: Date.now() });
							message.reply('**Updated:** Channel Update `on` ');
						}
						else if (args[2] == 'off') {
							await Guild.findOneAndUpdate({ guildID: message.guild.id }, { cUp: false, lastEdited: Date.now() });
							message.reply('**Updated:** Channel Update `off` ');
						}
					}
					// Emoji Create
					else if (args[1] == 'emojicreate') {
						if (args[2] == 'on') {
							await Guild.findOneAndUpdate({ guildID: message.guild.id }, { eCreate: true, lastEdited: Date.now() });
							message.reply('**Updated:** Emoji Create `on` ');
						}
						else if (args[2] == 'off') {
							await Guild.findOneAndUpdate({ guildID: message.guild.id }, { eCreate: false, lastEdited: Date.now() });
							message.reply('**Updated:** Emoji Create `off` ');
						}
					}
					// Emoji Delete
					else if (args[1] == 'emojidelte') {
						if (args[2] == 'on') {
							await Guild.findOneAndUpdate({ guildID: message.guild.id }, { eDelete: true, lastEdited: Date.now() });
							message.reply('**Updated:** Emoji Delete `on` ');
						}
						else if (args[2] == 'off') {
							await Guild.findOneAndUpdate({ guildID: message.guild.id }, { eDelete: false, lastEdited: Date.now() });
							message.reply('**Updated:** Emoji Delete `off` ');
						}
					}
					// Emoji Update
					else if (args[1] == 'emojiupdate') {
						if (args[2] == 'on') {
							await Guild.findOneAndUpdate({ guildID: message.guild.id }, { eUpdate: true, lastEdited: Date.now() });
							message.reply('**Updated:** Emoji Update `on` ');
						}
						else if (args[2] == 'off') {
							await Guild.findOneAndUpdate({ guildID: message.guild.id }, { eUpdate: false, lastEdited: Date.now() });
							message.reply('**Updated:** Emoji Update `off` ');
						}
					}
					// Role Create
					else if (args[1] == 'rolecreate') {
						if (args[2] == 'on') {
							await Guild.findOneAndUpdate({ guildID: message.guild.id }, { rCreate: true, lastEdited: Date.now() });
							message.reply('**Updated:** Role Create `on` ');
						}
						else if (args[2] == 'off') {
							await Guild.findOneAndUpdate({ guildID: message.guild.id }, { rCreate: false, lastEdited: Date.now() });
							message.reply('**Updated:** Role Create `off` ');
						}
					}
					// Role Delete
					else if (args[1] == 'roledelete') {
						if (args[2] == 'on') {
							await Guild.findOneAndUpdate({ guildID: message.guild.id }, { rDelete: true, lastEdited: Date.now() });
							message.reply('**Updated:** Role Delete `on` ');
						}
						else if (args[2] == 'off') {
							await Guild.findOneAndUpdate({ guildID: message.guild.id }, { rDelete: false, lastEdited: Date.now() });
							message.reply('**Updated:** Role Delete `off` ');
						}
					}
					// Role Update
					else if (args[1] == 'roleupdate') {
						if (args[2] == 'on') {
							await Guild.findOneAndUpdate({ guildID: message.guild.id }, { rUpdate: true, lastEdited: Date.now() });
							message.reply('**Updated:** Role Update `on` ');
						}
						else if (args[2] == 'off') {
							await Guild.findOneAndUpdate({ guildID: message.guild.id }, { rUpdate: false, lastEdited: Date.now() });
							message.reply('**Updated:** Role Update `off` ');
						}
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
					else if (args[1] == 'on') {
						await Guild.findOneAndUpdate({ guildID: message.guild.id }, { leave: true, lastEdited: Date.now() });
						message.reply('**Updated:** Leave `on` ');
					}
					else if (args[1] == 'off') {
						await Guild.findOneAndUpdate({ guildID: message.guild.id }, { leave: false, lastEdited: Date.now() });
						message.reply('**Updated:** Leave `off` ');
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
