const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios');
const { MessageAttachment } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('meme')
		.setDescription('Random meme'),
	async execute(client, interaction) {
		const key = 'FmhsMvqOisrM';
		const res = await axios(`https://api.ultrax-yt.com/v1/random/meme?key=${key}`);
		const attachment = new MessageAttachment(res.data.image);
		interaction.reply({ files: [attachment] });
	},

};