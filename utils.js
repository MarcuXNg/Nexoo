const Discord = require('discord.js');
const checkSameRoom = (message) => {
	// send error if member is Deafed
	if (message.member.voice.selfDeaf) {
		return message.channel.send({
			embeds: [new Discord.MessageEmbed().setColor('RANDOM').setDescription('❌| **You cannot run this command while deafened**')],
		});
	}
	// check if the voicechannel is full or not
	const voiceChannel = message.member.voice.channel;
	if (voiceChannel.full) {
		return message.channel.send({
			embeds: [
				new Discord.MessageEmbed().setColor('RANDOM').setDescription('❌ | the channel is full!')],
		});
	}
	if (!message.member.voice.channel) {
		return message.channel.send({
			embeds: [new Discord.MessageEmbed().setColor('RANDOM').setDescription('You need to be in a voice channel to use the bot!')],
		});
	}
	if (!message.guild.me.voice.channel || message.guild.me.voice.channel.id == message.member.voice.channel.id) return;
	return message.channel.send({
		embeds: [new Discord.MessageEmbed().setColor('RANDOM').setTitle('🤷‍♂️I\'m connected to somewhere else').setDescription('You need to be in the same voice channel with the me to use the command!')],
	});
};

module.exports = {
	checkSameRoom,
};
