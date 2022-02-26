const client = require('../../index.js');
const Discord = require('discord.js');
const axios = require('axios');
const Levels = require('discord-xp');
const Blacklist = require('../../database/models/blackListSchema');
const Afk = require('../../database/models/afkSchema');
const Guild = require('../../database/models/guildSchema');
const Balance = require('../../database/models/balanceSchema');

client.on('messageCreate', async (message) => {
	// ko cho bot khác sử dụng bot
	if (message.author.bot) return;
	// không cho người dùng sử dụng bot trong direct message
	if (!message.guild) return;
	// const prefix from client default prefix
	const prefix = client.prefix;
	// discord-xp
	const randomXP = Math.floor(Math.random() * 29) + 1;
	const hasLeveledUP = await Levels.appendXp(message.author.id, message.guild.id, randomXP);
	if (hasLeveledUP) {
		const user = await Levels.fetch(message.author.id, message.guild.id);
		const guildProfile = await Guild.findOne({ guildID: message.guild.id });
		if (guildProfile.levelupChannel) {
			const channel = message.guild.channels.cache.get(guildProfile.levelupChannel);
			channel.send(`GG ${message.member}, you just advanced to level ${user.level}!🎉. Continue your work within the server.`);
		}
		else {message.channel.send(`GG ${message.member}, you just advanced to level ${user.level}!🎉. Continue your work within the server.`);}
	}
	// settings
	const guildProfile = await Guild.findOne({ guildID: message.guild.id }) || await new Guild({ guildID: message.guild.id });
	await guildProfile.save().catch(err => console.log(err));
	client.prefix = guildProfile.prefix;
	// balance
	// eslint-disable-next-line no-inline-comments
	const RandomAmountOfCoins = Math.floor(Math.random() * 10) + 5; // 5-15
	// eslint-disable-next-line no-inline-comments
	const messageGive = Math.floor(Math.random() * 10) + 1; // 1-10
	if (messageGive >= 2 && messageGive <= 5) {
		const balanceProfile = await Balance.findOne({ userID: message.author.id, guildID: message.guild.id }) || await new Balance({ userID: message.author.id, guildID: message.guild.id, lastEdited: Date.now() });
		await balanceProfile.save().catch(err => console.log(err));
		await Balance.findOneAndUpdate({ userID: message.author.id, guildID: message.guild.id }, { balance: balanceProfile.balance + RandomAmountOfCoins, lastEdited: Date.now() });
	}
	// afk
	if (await Afk.findOne({ userID: message.author.id })) {
		const afkProfile = await Afk.findOne({ userID: message.author.id });
		if (afkProfile.messagesLeft == 0) {
			await Afk.findOneAndDelete({ userID: message.author.id });
			message.channel.send('You have been taken out of AFK mode');
		}
		else {
			await Afk.findOneAndUpdate({ userID: message.author.id }, { messagesLeft: afkProfile.messagesLeft - 1 });
		}
	}
	if (message.mentions.members.first()) {
		message.mentions.members.forEach(async member => {
			const afkProfile = await Afk.findOne({ userID: message.author.id });
			if (afkProfile) message.channel.send(`${member} is in AFK mode for \`${afkProfile.reason}\``);
		});
	}
	// nếu tin nhắn không bắt đầu với prefix thì chạy function
	if (!message.content.startsWith(prefix)) return await chatbot(message);
	const args = message.content.slice(prefix.length).trim().split(/ +/g);
	const cmd = args.shift().toLowerCase();
	if (message.channel.partial) await message.channel.fetch();
	if (message.partial) await message.fetch();
	if (cmd.length === 0) return;
	let command = client.commands.get(cmd);
	if (!command) command = client.commands.get(client.aliases.get(cmd));
	if (command) {
		// music join channel to use command message create
		if (command.category === 'music' && !message.member.voice.channel) {
			return message.channel.send({
				embeds: [
					new Discord.MessageEmbed().setColor('RANDOM').setDescription('❌ | **You must be in a voice channel to use the bot!**')],
			});
		}
		// dev-only permission
		if (command.devOnly == true && message.author.id !== '635358046733729792') return message.channel.send('You don\'t have the permission to use this command.');
		// blacklist
		const profile = await Blacklist.findOne({
			userID: message.author.id,
		});
		if (profile) return message.channel.send('You cannot use the command as you are banned from using the bot');
		// run the command
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
