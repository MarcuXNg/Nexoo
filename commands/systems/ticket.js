const Ticket = require('../../database/models/ticketSchema');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const { createTranscript } = require('discord-html-transcripts');
const Guild = require('../../database/models/guildSchema');

module.exports = {
	name: 'ticket',
	category: 'systems',
	aliases: ['ticket'],
	description: 'Set up your ticketing message.',
	usage: '`(prefix)`ticket or `(prefix)`ticket [`add`, `remove`]',
	run: async (client, message, args) => {
		try {
			if (!args.length) {
				let guildProfile = await Guild.findOne({ guildID: message.guild.id });
				if (!guildProfile.ticketChannel && !guildProfile.ticketCategory && !guildProfile.transcriptChannel) {
					guildProfile = await new Guild({
						guildID: message.guild.id,
						ticketChannel: message.channel.id,
						ticketCategory: message.channel.parentId,
						transcriptChannel: message.channel.id,
					});
					await guildProfile.save();
				}
				const { guild } = message;
				const Embed = new MessageEmbed()
					.setAuthor({
						name: guild.name + ' | Ticketing System',
						iconURL: guild.iconURL({ dynamic: true }),
					})
					.setDescription('Open a ticket to discuss any of the issues listen on the button.')
					.setTimestamp()
					.setColor('RANDOM');
				const Buttons = new MessageActionRow();
				Buttons.addComponents(
					new MessageButton()
						.setCustomId('player')
						.setLabel('Player Report')
						.setStyle('PRIMARY')
						.setEmoji('🎟️'),
					new MessageButton()
						.setCustomId('bug')
						.setLabel('Bug Report')
						.setStyle('SECONDARY')
						.setEmoji('🪲'),
					new MessageButton()
						.setCustomId('other')
						.setLabel('Other Report')
						.setStyle('SUCCESS')
						.setEmoji('📮'),
				);
				await guild.channels.cache.get(guildProfile.ticketChannel).send({ embeds: [Embed], components: [Buttons] }).then(async (msg) => {
					const filter = (i) => i.user.id === message.author.id;
					const collector = await msg.createMessageComponentCollector({ filter: filter });
					collector.on('collect', async (i) => {
						if (i.isButton()) {
							if (i.customId === 'player' || i.customId === 'bug' || i.customId === 'other') {
								await i.deferUpdate().catch((e) => {console.log(e);});
								const ID = Math.floor(Math.random() * 90000) + 10000;
								await guild.channels.create(`${i.customId + '-' + ID}`, {
									type: 'GUILD_TEXT',
									parent: guildProfile.ticketCategory,
									permissionOverwrites: [
										{
											id: message.member.id,
											allow: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'READ_MESSAGE_HISTORY'],
										},
										{
											// eslint-disable-next-line no-inline-comments
											id: message.guild.roles.everyone.id, // get everyone roles id
											deny: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'READ_MESSAGE_HISTORY'],
										},
									],
								}).then(async (channel) => {
									const TicketProfile = await new Ticket({
										guildID: message.guild.id,
										memberID: message.member.id,
										ticketID: ID,
										channelID: channel.id,
										lastEdited: Date.now(),
										Closed: false,
										Locked: false,
										Type: i.customId,
										Claimed: false,
									});
									await TicketProfile.save();
									const embed = new MessageEmbed()
										.setAuthor({
											name: guild.name + ' | Ticketing System',
											iconURL: guild.iconURL({ dynamic: true }),
										})
										.setDescription('Please wait patiently for a response from the staff team, in mean while, describe your issue in as much details as possible.')
										.setTimestamp()
										.setFooter({
											text: 'The button below are Staff Only Buttons.',
										})
										.setColor('RANDOM');
									const Button = new MessageActionRow();
									Button.addComponents(
										new MessageButton()
											.setCustomId('close')
											.setLabel('Save & Close Ticket')
											.setStyle('PRIMARY')
											.setEmoji('💾'),
										new MessageButton()
											.setCustomId('lock')
											.setLabel('Lock')
											.setStyle('SECONDARY')
											.setEmoji('🔒'),
										new MessageButton()
											.setCustomId('unlock')
											.setLabel('Unlock')
											.setStyle('SUCCESS')
											.setEmoji('🔓'),
										new MessageButton()
											.setCustomId('claim')
											.setLabel('Claim')
											.setStyle('PRIMARY')
											.setEmoji('🗿'),
									);
									channel.send({ embeds: [embed], components: [Button] }).then(async (mess) => {
										const filters = (inter) => inter.user.id === message.guild.ownerId;
										const embeds = new MessageEmbed().setColor('BLUE');
										const collectors = await mess.createMessageComponentCollector({ filter: filters });
										collectors.on('collect', async (int) => {
											if (int.isButton()) {
												if (int.customId === 'close') {
													await int.deferUpdate().catch((e) => {console.log(e);});
													const TicketProfiles = await Ticket.findOne({ channelID: channel.id });
													if (!TicketProfiles) {
														return mess.channel.send({
															content: 'No data was found related to this ticket, please delete manual.',
														});
													}
													if (TicketProfiles.Closed == true) {return mess.channel.send({ content: 'The ticket is already closed, please wait for it to get deleted' });}
													await Ticket.findOneAndUpdate({ channelID: channel.id }, { Closed: false });
													const attachment = await createTranscript(channel, {
														limit: -1,
														returnBuffer: false,
														fileName: `${TicketProfiles.Type} - ${TicketProfiles.ticketID}.html`,
													});
													const MEMBER = guild.members.cache.get(TicketProfiles.memberID);
													const messages = await guild.channels.cache.get(guildProfile.transcriptChannel).send({
														embeds: [
															embeds.setAuthor({
																name: MEMBER.user.tag,
																iconURL: MEMBER.user.displayAvatarURL({ dynamic: true }),
															}).setTitle(`Transcipt Type: ${TicketProfiles.Type}`).setDescription(`${TicketProfiles.ticketID}`),
														],
														files: [attachment],
													});
													await mess.channel.send({ embeds: [embeds.setDescription(`The transcript is now saved [TRANSCRIPT](${messages.url})`)] });
													setTimeout(() => {
														channel.delete();
													}, 10 * 1000);
													await Ticket.deleteOne({ ticketID: ID });
												}
												if (int.customId === 'lock') {
													await int.deferUpdate().catch((e) => {console.log(e);});
													const TicketProfiles = await Ticket.findOne({ channelID: channel.id });
													if (!TicketProfiles) {
														return mess.channel.send({
															content: 'No data was found related to this ticket, please delete manual.',
														});
													}
													if (TicketProfiles.Locked == true) {return mess.channel.send({ content: 'The ticket is already locked.' });}
													await Ticket.findOneAndUpdate({ channelID: channel.id }, { Locked: true });
													embeds.setDescription('The ticket is now locked for reviewwing');
													channel.permissionOverwrites.edit(TicketProfiles.memberID[0].toString(), {
														SEND_MESSAGES: false,
													});
													mess.channel.send({ embeds: [embeds] });
												}
												if (int.customId === 'unlock') {
													await int.deferUpdate().catch((e) => {console.log(e);});
													const TicketProfiles = await Ticket.findOne({ channelID: channel.id });
													if (!TicketProfiles) {
														return mess.channel.send({
															content: 'No data was found related to this ticket, please delete manual.',
														});
													}
													if (TicketProfiles.Locked == false) {return mess.channel.send({ content: 'The ticket is already unlocked.' });}
													await Ticket.findOneAndUpdate({ channelID: channel.id }, { Locked: false });
													embeds.setDescription('The ticket is now unlocked.');
													channel.permissionOverwrites.edit(TicketProfiles.memberID[0].toString(), {
														SEND_MESSAGES: true,
													});
													mess.channel.send({ embeds: [embeds] });
												}
												if (int.customId === 'claim') {
													await int.deferUpdate().catch((e) => {console.log(e);});
													const TicketProfiles = await Ticket.findOne({ channelID: channel.id });
													if (!TicketProfiles) {
														return mess.channel.send({
															content: 'No data was found related to this ticket, please delete manual.',
														});
													}
													if (TicketProfiles.Claimed == true) {return mess.channel.send({ content: `The ticket has already claimed by <@${TicketProfiles.ClaimedBy}>.` });}
													await Ticket.findOneAndUpdate({ channelID: channel.id }, { Claimed: true, ClaimedBy: message.member.id });
													embeds.setDescription(`The ticket is now claimed by ${message.member}.`);
													mess.channel.send({ embeds: [embeds] });
												}
											}
										});
									});
									await channel.send({ content: `${message.member} here is your ticket.` }).then((m) => {
										setTimeout(() => {
											m.delete().catch();
										}, 1 * 5000);
									});
									msg.channel.send({ content: `${message.member} your ticket has been created: ${channel}.` }).then((m) => {
										setTimeout(() => {
											m.delete().catch();
										}, 1 * 5000);
									});
								});
							}
						}
					});
				});
			}
			else {
				if (!['add', 'remove'].includes(args[0])) {return message.channel.send('Invalid option.');}
				if (!args[1]) return message.channel.send('You did not state a member to add or remove.');
				const member = message.mentions.members.first();
				const embeds = new MessageEmbed().setColor('GREEN');
				// console.log(member.id);
				if (args[0] === 'add') {
					const Tickets = await Ticket.findOne({ guildID: message.guild.id, channelID: message.channelId });
					if (!Tickets) {
						return message.reply({ embeds: [
							new MessageEmbed()
								.setDescription('🛑 | This channel is not tied with a ticket')
								.setColor('RED'),
						] });
					}
					if (Tickets.memberID.includes(member.id)) {
						return message.reply({ embeds: [
							new MessageEmbed()
								.setDescription('🛑 | This member is already added to this ticket.')
								.setColor('RED'),
						] });
					}
					// console.log(Tickets.memberID.split(' '));
					Tickets.memberID.push(member.id);
					message.channel.permissionOverwrites.edit(member.id, {
						SEND_MESSAGES: true,
						VIEW_CHANNEL: true,
						READ_MESSAGE_HISTORY: true,
					});
					message.channel.send({ embeds: [embeds.setDescription(`✅ | ${member} has been added to this ticket`)] });
					Tickets.save();
				}
				else if (args[0] === 'remove') {
					const Tickets = await Ticket.findOne({ guildID: message.guild.id, channelID: message.channelId });
					if (!Tickets) {
						return message.reply({ embeds: [
							new MessageEmbed()
								.setDescription('🛑 | This channel is not tied with a ticket')
								.setColor('RED'),
						] });
					}
					if (!Tickets.memberID.includes(member.id)) {
						return message.reply({ embeds: [
							new MessageEmbed()
								.setDescription('🛑 | This member is not in this ticket.')
								.setColor('RED'),
						] });
					}
					Tickets.memberID.remove(member.id);
					message.channel.permissionOverwrites.edit(member.id, {
						VIEW_CHANNEL: false,
					});
					message.channel.send({ embeds: [embeds.setDescription(`✅ | ${member} has been removed from this ticket`)] });
					Tickets.save();
				}
			}
		}
		catch (err) {
			console.log(err);
		}
	},
};