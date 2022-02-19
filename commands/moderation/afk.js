const config = require('../../config.json');
const Afk = require('../../database/models/afkSchema');

module.exports = {
	name: 'afk',
	category: 'moderation',
	aliases: ['afk'],
	description: 'Set the user into AFK mode',
	usage: `${config.prefix}afk @member`,
	run: async (client, message, args) => {
		try {
			const reason = args.join(' ') || 'No reason given.';
			let afkProfile = await Afk.findOne({ userID: message.author.id });
			if (!afkProfile) {
				afkProfile = await new Afk({
					userID: message.author.id,
					reason: reason,
				});
				await afkProfile.save();
				message.channel.send('You have been set into AFK mode.');
			}
			else {return message.channel.send('You are already in AFK mode');}

		}
		catch (err) {
			console.log(err);
		}
	},
};