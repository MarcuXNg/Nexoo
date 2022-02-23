const { ContextMenuCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
	data: new ContextMenuCommandBuilder()
		.setName('Definition')
		.setType(3),
	async execute(client, interaction) {
		const msg = await interaction.channel.messages.fetch(interaction.targetId);
		const word = msg.content;
		const datas = await fetch(
			`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`,
		).catch((e) => {
			console.log(e);
			interaction.reply(`\`${word}\` Not Found`);
		});
		const res = await datas.json();
		const result = res[0];
		const fields = await result.meanings.map((data, index) => {
			return {
				name: data.partOfSpeech.toUpperCase(),
				value: `\`\`\` Definition : ${data.definitions[0].definition} \n Example : ${data.definitions[0].example} \`\`\``,
			};
		});
		interaction.reply({
			embeds: [new MessageEmbed()
				.setColor('RED')
				.setDescription(`>>> **Word** : __${result.word}__`)
				.setTitle(`Full Defination of \`${word}\``)
				.addFields(fields),
			],
		});
	},
};