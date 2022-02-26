const axios = require('axios').default;
module.exports = {
	name: 'djs',
	category: 'discordjs',
	aliases: ['djs'],
	description: 'Show documents about discord.js.',
	usage: '(prefix)djs [document]',
	run : async (client, message, args) => {
		if (!args[0]) return;
		const url = `https://sagiri-fansub.tk/api/v1/djsdoc/${encodeURIComponent(args.join(' '))}`;
		const res = await axios.get(url).catch(e => console.log(e.message));
		if (!res) {return message.reply('API error, please try again later.');}
		else {
			message.reply({
				embeds: [res.data.data],
			});
		}
	},
};