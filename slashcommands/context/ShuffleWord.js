const { ContextMenuCommandBuilder } = require('@discordjs/builders');
const axios = require('axios');

module.exports = {
	data: new ContextMenuCommandBuilder()
		.setName('ShuffleWord')
		.setType(3),
	async execute(client, interaction) {
		try {
			const msg = await interaction.channel.messages.fetch(interaction.targetId);
			const query = msg.content;
			const key = 'FmhsMvqOisrM';

			const res = await axios(`https://api.ultrax-yt.com/v1/shuffle?query=${query}&key=${key}`);
			interaction.reply({ content: res.data.res });
		}
		catch (err) {
			console.log(err);
		}
	},
};