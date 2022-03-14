const Discord = require('discord.js');
const Guild = require('../../database/models/guildSchema');
const client = require('../../index');

client.on('guildMemberRemove', async (member) => {
	const guildProfile = await Guild.findOne({ guildID: member.guild.id });
	if (!guildProfile) return;
	if (!guildProfile.leaveChannel) return;
	if (member.user.id != process.env.DISCORD_CLIENTID && guildProfile.leaveChannel) {
		const channel = member.guild.channels.cache.get(guildProfile.leaveChannel);
		channel.send({
			embeds: [
				new Discord.MessageEmbed()
					.setColor('RANDOM')
					.setImage('https://i.imgur.com/8LX5ET3.jpg')
					.setDescription(`${member} left **${member.guild.name}!** \n We hope to see you again 😔`)
					.setTimestamp(),
			],
		});

	}
});
