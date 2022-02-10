const { SlashCommandBuilder } = require('@discordjs/builders');
const {
	MessageEmbed
} = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('play a song')
		.addStringOption(option =>
			option.setName('song')
				.setDescription('Which Song do you want to play')
				.setRequired(true)),
	async execute(client, interaction) {
		try {
			//things u can directly access in an interaction!
			const { member, channelId, guildId, options } = interaction;
			const { guild } = member;
			const { channel } = member.voice;
			if (!channel) return interaction.reply({
				embeds: [
					new MessageEmbed().setColor("RED").setTitle(`❌ **Please join my VoiceChannel first!**`)
				],
				ephemeral: true
			})
			if (channel.userLimit != 0 && channel.full)
				return interaction.reply({
					embeds: [new MessageEmbed()
						.setColor("RED")
						.setTitle(`Your Voice Channel is full, I can't join!`)
					],
					ephemeral: true
				});
			if (channel.guild.me.voice.channel && channel.guild.me.voice.channel.id != channel.id) {
				return interaction.reply({
					embeds: [new MessageEmbed()
						.setColor("RED")
						.setTitle(`I am already connected somewhere else`)
					],
					ephemeral: true
				});
			}
			//let IntOption = options.getInteger("OPTIONNAME"); //same as in IntChoices //RETURNS NUMBER
			const Text = interaction.options.getString('song'); //same as in StringChoices //RETURNS STRING 
			//update it without a response!
			await interaction.reply({
				content: `🔍 Searching... \`${Text}\``
			});
			try {
				let queue = client.distube.getQueue(guildId)
				let options = {
					member: member,
				}
				if (!queue) options.textChannel = guild.channels.cache.get(channelId)
				await client.distube.playVoiceChannel(channel, Text, options)
				//Edit the reply
				interaction.editReply({
					content: `Done!`
				});
			} catch (e) {
				console.log(e)
				interaction.editReply({
					content: `❌ | Error: `,
					embeds: [
						new MessageEmbed().setColor("RED")
							.setDescription(`\`${e}\``)
					],
					ephemeral: true
				})
			}
		} catch (e) {
			console.log(e)
		}
	},
};