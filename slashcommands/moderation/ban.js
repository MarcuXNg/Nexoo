const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Select a member and ban them')
        .addUserOption(option => option.setName('target').setDescription('The member to ban')),
    async execute(client, interaction) {
      if (!interaction.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) return interaction.reply({ content: `You don't have the permission to use the bot` })
        const user = interaction.options.getUser('target');
            interaction.guild.members.ban(user);
        interaction.reply({ content: `${user} was banned from the server.` });
    },
};