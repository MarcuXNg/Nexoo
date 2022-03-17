const { MessageEmbed } = require('discord.js');
const Guild = require('../../database/models/guildSchema');

module.exports = {
	name: 'chatbot',
	category: 'settings',
	aliases: ['cb'],
	description: 'Turn chat bot on or off',
	usage: '`(prefix)`chatbot [on/off]',
	run: async (client, message, args) => {
		try {
			// server owner permission
			if (message.author.id !== message.guild.ownerId) return message.channel.send('You do not have permission to use this command because you are not the server owner.');
			if (!args.length) {
				const embed = new MessageEmbed();
				embed
					.setColor('AQUA')
					.setDescription('chatbot settings');
				message.channel.send({ embeds: [embed] });
			}
			else {
				if (!['on',
					'off',
					'chatbotchannel',
					'language',
				].includes(args[0])) {return message.channel.send('You need a valid property to update.');}
				if (args[0] == 'on') {
					await Guild.findOneAndUpdate({ guildID: message.guild.id }, { chatbot: true, lastEdited: Date.now() });
					await message.reply('**ChatBot:** `On`');
				}
				if (args[0] == 'off') {
					await Guild.findOneAndUpdate({ guildID: message.guild.id }, { chatbot: false, lastEdited: Date.now() });
					await message.reply('**ChatBot:** `Off`');
				}
				if (args[0] == 'chatbotchannel') {
					const channel = message.mentions.channels.first();
					if (args[1] == `${channel}`) {
						await Guild.findOneAndUpdate({ guildID: message.guild.id }, { chatbotChannel: channel.id, lastEdited: Date.now() });
						await message.reply(`**Updated:** Chatbot Channel to ${channel}`);
					}
					else {return message.channel.send('Please specify a channel');}
				}
				if (args[0] == 'language') {
					if (!['vn',
						'en',
						'ph',
						'zh',
						'ch',
						'ru',
						'id',
						'ko',
						'ar',
						'ms',
						'fr',
						'ja',
						'es',
						'de',
						'pt',
						'ml',
						'si',
						'tr',
					].includes(args[1])) {return message.channel.send('You need a valid property to update.');}
					await Guild.findOneAndUpdate({ guildID: message.guild.id }, { chatbotlang: args[1], lastEdited: Date.now() });
					await message.reply(`**Updated:** Chatbot Channel to \`${args[1]}\``);
				}
			}
		}
		catch (err) {
			console.log(err);
		}
	},
};