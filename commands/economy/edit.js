const config = require('../../config.json');
const Levels = require('discord-xp');

module.exports = {
	name: 'edit',
	category: 'economy',
	aliases: ['edit'],
	description: 'Edit a user level or xp',
	usage: `${config.prefix}edit @member [xp, level] [add, set, remove] <number>`,
	run: async (client, message, args) => {
		try {
			const usage = `${config.prefix}edit @member [xp, level] [add, set, remove] <number>`;
			const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
			// @member section
			if (!args[0]) return message.channel.send(`You need to state more arguments \`${usage}\``);
			if (!mentionedMember) return message.channel.send('The member stated is not in the server');
			// xp or level section
			if (!args[1]) return message.channel.send(`You must state if you are editing the members level or xp: \`${usage}\``);
			if (!['xp', 'level'].includes(args[1])) return message.channel.send('Your second argument was not xp or level.' + usage);
			// [add, set, remove] <number> section
			if (args[1] == 'xp') {
				if (!['add', 'set', 'remove'].includes(args[2])) return message.channel.send('You have to state if you are adding, setting or removing xp from the member.' + usage);
				const value = Number(args[3]);
				const LevelUser = await Levels.fetch(mentionedMember.user.id, message.guild.id);
				if (!LevelUser) return message.channel.send('That member is not registered within the database yet.');
				if (args[2] == 'add') {
					if (!value) return message.channel.send('The number stated is not a valid number');
					try {
						await Levels.appendXp(mentionedMember.user.id, message.guild.id, value);
						message.channel.send(`Added: ${value} xp to ${mentionedMember}`);
					}
					catch (e) {
						console.log(e);
					}
				}
				else if (args[2] == 'remove') {
					if (!value) return message.channel.send('The number stated is not a valid number');
					try {
						await Levels.subtractXp(mentionedMember.user.id, message.guild.id, value);
						message.channel.send(`Remove: ${value} xp from ${mentionedMember}`);
					}
					catch (e) {
						console.log(e);
					}
				}
				else if (args[2] == 'set') {
					if (!value) return message.channel.send('The number stated is not a valid number');
					try {
						await Levels.setXp(mentionedMember.user.id, message.guild.id, value);
						message.channel.send(`Set: ${value} xp for ${mentionedMember}`);
					}
					catch (e) {
						console.log(e);
					}
				}
			}
			else if (args[1] == 'level') {
				if (!['add', 'set', 'remove'].includes(args[2])) return message.channel.send('You have to state if you are adding, setting or removing levels from the member.' + usage);
				const value = Number(args[3]);
				const LevelUser = await Levels.fetch(mentionedMember.user.id, message.guild.id);
				if (!LevelUser) return message.channel.send('That member is not registered within the database yet.');
				if (args[2] == 'add') {
					if (!value) return message.channel.send('The number stated is not a valid number');
					try {
						await Levels.appendLevel(mentionedMember.user.id, message.guild.id, value);
						message.channel.send(`Added: ${value} level(s) to ${mentionedMember}`);
					}
					catch (e) {
						console.log(e);
					}
				}
				else if (args[2] == 'remove') {
					if (!value) return message.channel.send('The number stated is not a valid number');
					try {
						await Levels.subtractLevel(mentionedMember.user.id, message.guild.id, value);
						message.channel.send(`Remove: ${value} level(s) from ${mentionedMember}`);
					}
					catch (e) {
						console.log(e);
					}
				}
				else if (args[2] == 'set') {
					if (!value) return message.channel.send('The number stated is not a valid number');
					try {
						await Levels.setLevel(mentionedMember.user.id, message.guild.id, value);
						message.channel.send(`Set: ${value} level(s) for ${mentionedMember}`);
					}
					catch (e) {
						console.log(e);
					}
				}
			}
		}
		catch (err) {
			console.log(err);
		}
	},
};