const { SlashCommandBuilder } = require('@discordjs/builders');
const {
	MessageEmbed,
} = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('voice')
		.setDescription('setup join to create')
		.addSubcommand(subcommand =>
			subcommand
				.setName('invite')
				.setDescription('Invite a friend to your channel')
				.addUserOption(option => option.setName('member').setDescription('Select the member.').setRequired(true)))
		.addSubcommand(subcommand =>
			subcommand
				.setName('disallow')
				.setDescription('Remove someone access to the channel.')
				.addUserOption(option => option.setName('member').setDescription('Select the member.').setRequired(true)))
		.addSubcommand(subcommand =>
			subcommand
				.setName('name')
				.setDescription('Change the name of your channel.')
				.addStringOption(option => option.setName('text').setDescription('Provide a name.').setRequired(true)))
		.addSubcommand(subcommand =>
			subcommand
				.setName('userlimit')
				.setDescription('set the limit of the user in this voice channel.')
				.addNumberOption(option => option.setName('number').setDescription('Enter a number (<=99).').setRequired(true)))
		.addSubcommand(subcommand =>
			subcommand
				.setName('public')
				.setDescription('Make your channel public to everyone.')
				.addStringOption(option => option.setName('turn').setDescription('Turn on or off.').setRequired(true).addChoice('on', 'on').addChoice('off', 'off'))),
	async execute(client, interaction) {
		try {
			const { member, guild } = interaction;

			const subcommand = interaction.options.getSubcommand();
			const voiceChannel = member.voice.channel;
			const embed = new MessageEmbed().setColor('GREEN');
			const ownedChannel = client.voiceGenerator.get(member.id);

			if (!voiceChannel) return interaction.reply({ embeds: [embed.setDescription('You\'not in a voice channel')], ephemeral: true });
			if (!ownedChannel || voiceChannel.id !== ownedChannel) return interaction.reply({ embeds: [embed.setDescription('You do not own this, or any channel.').setColor('RED')], ephemeral: true });

			if (subcommand === 'name') {
				const newName = interaction.options.getString('text');
				if (newName.length > 22 || newName.length < 1) return interaction.reply({ embeds: [embed.setDescription('Name cannot exceed the 22 character limit.').setColor('RED')], ephemeral: true });
				voiceChannel.edit({ name: newName });
				interaction.reply({ embeds: [embed.setDescription(`Channel name has been set to ${newName}.`)], ephemeral: true });
			}
			else if (subcommand === 'invite') {
				const targetMember = interaction.options.getUser('member');
				voiceChannel.permissionOverwrites.edit(targetMember, { CONNECT: true });
				await targetMember.send({ embeds: [embed.setDescription(`${member} has invited you to <#${voiceChannel.id}>`)] });
				interaction.reply({ embeds: [embed.setDescription(`${targetMember} has been invited.`)], ephemeral: true });
			}
			else if (subcommand === 'disallow') {
				const targetMember = interaction.options.getUser('member');
				voiceChannel.permissionOverwrites.edit(targetMember, { CONNECT: false });
				interaction.reply({ embeds: [embed.setDescription(`${targetMember} has been removed from this channel.`)], ephemeral: true });
			}
			else if (subcommand === 'userlimit') {
				const num = interaction.options.getNumber('number');
				voiceChannel.setUserLimit(num);
				interaction.reply({ embeds: [embed.setDescription(`Set userlimit to ${num}`)], ephemeral: true });
			}
			else if (subcommand === 'public') {
				const choice = interaction.options.getString('turn');
				if (choice === 'on') {
					voiceChannel.permissionOverwrites.edit(guild.id, { CONNECT: null });
					interaction.reply({ embeds: [embed.setDescription('The channel is now public')], ephemeral: true });
				}
				else if (choice === 'off') {
					voiceChannel.permissionOverwrites.edit(guild.id, { CONNECT: false });
					interaction.reply({ embeds: [embed.setDescription('The channel is now closed')], ephemeral: true });
				}
			}
		}
		catch (e) {
			console.log(e);
		}
	},
};
