module.exports = {
	name: 'hug',
	category: 'fun',
	aliases: ['hug'],
	description: 'Give user a hug',
	usage: '(prefix)hug',
	run : async (client, message, args) => {
		try {
			const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.author;
			message.channel.send(`<@932199083643379742> gave ${mentionedMember} a hug 🙆‍♂️`);
		}
		catch (e) {
			console.log(e);
		}
	},
};