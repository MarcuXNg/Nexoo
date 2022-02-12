const config = require('../../config.json');
const client = require('../../index.js');
const Discord = require('discord.js');

client.on('messageCreate', async (message, member) => {
	// ko cho bot khác sử dụng bot
	if (message.author.bot) return;
	// không cho người dùng sử dụng bot trong direct message
	if (!message.guild) return member.send('Please use the bot in the servers');
	const prefix = config.prefix;
	// nếu tin nhắn không bắt đầu với prefix thì bỏ luôn
	if (!message.content.startsWith(prefix)) return;
	const args = message.content.slice(prefix.length).trim().split(/ +/g);
	const cmd = args.shift().toLowerCase();
	if (message.channel.partial) await message.channel.fetch();
	if (message.partial) await message.fetch();
	if (cmd.leength === 0) return;
	let command = client.commands.get(cmd);
	if (!command) command = client.commands.get(client.aliases.get(cmd));
	if (command) {
		if (command.category === 'music' && !message.member.voice.channel) {
			return message.channel.send({
				embeds: [
					new Discord.MessageEmbed().setColor('RANDOM').setDescription('❌ | **You must be in a voice channel to use the bot!**')],
			});
		}
		command.run(client, message, args);
	}
});
