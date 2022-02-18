const config = require('../../config.json');
const client = require('../../index.js');
const Discord = require('discord.js');
const axios = require('axios');
const Levels = require('discord-xp');
const Blacklist = require('../../database/models/blackListSchema');

client.on('messageCreate', async (message, member) => {
	// ko cho bot khác sử dụng bot
	if (message.author.bot) return;
	// không cho người dùng sử dụng bot trong direct message
	if (!message.guild) return member.send('Please use the bot in the servers');
	// const prefix from config.json
	const prefix = config.prefix;
	// discord-xp
	const randomXP = Math.floor(Math.random() * 29) + 1;
	const hasLeveledUP = await Levels.appendXp(message.author.id, message.guild.id, randomXP);
	if (hasLeveledUP) {
		const user = await Levels.fetch(message.author.id, message.guild.id);
		message.channel.send(`GG ${message.member}, you just advanced to level ${user.level}!🎉. Continue your work within the server.`);
	}
	// nếu tin nhắn không bắt đầu với prefix thì chạy function
	if (!message.content.startsWith(prefix)) return await chatbot(message);
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
		if (command.devOnly == true && message.author.id !== '635358046733729792') return message.channel.send('You don\'t have the permission to use this command.');
		const profile = await Blacklist.findOne({
			userID: message.author.id,
		});
		if (profile) return message.channel.send('You cannot use the command as you are banned from using the bot');
		command.run(client, message, args);
	}
});

async function chatbot(message) {
	// không có tin nhắn thì ko chạy
	if (!message.content || message.mentions.repliedUser?.id !== message.client.user.id) return;
	message.channel.sendTyping();
	const res = await axios.get(`https://api.simsimi.net/v2/?text=${encodeURIComponent(message.content)}&lc=vn`).catch(console.log);
	if (!res) return false;
	else return message.reply(`${res.data.success}`);
}
