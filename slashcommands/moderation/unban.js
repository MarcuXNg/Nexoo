const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unban')
        .setDescription('Select an id to unban them')
        .addUserOption(option => option.setName('target').setDescription('The member to unban')),
    async execute(client, interaction) {
      if (!interaction.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) return interaction.reply({ content: `You don't have the permission to use the bot` })
        const id = interaction.options.get('target')?.value;
            interaction.guild.members.unban(id);
        interaction.reply({ content: `${id} was unbanned from the server.` });
    },
};