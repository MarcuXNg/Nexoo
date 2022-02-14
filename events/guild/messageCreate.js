const config = require('../../config.json');
const client = require('../../index.js');
const Discord = require('discord.js');
const axios = require('axios');

client.on('messageCreate', async (message, member) => {
	// ko cho bot khác sử dụng bot
	if (message.author.bot) return;
	// không cho người dùng sử dụng bot trong direct message
	if (!message.guild) return member.send('Please use the bot in the servers');
	const prefix = config.prefix;
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
