const config = require('../../config.json');
const { MessageEmbed } = require('discord.js');
const ee = require('../../settings/embeds.json');

module.exports = {
	name: 'invite',
	aliases: ['invite'],
	category: 'info',
	description: 'Gets the invite link of the bot',
	usage: '(prefix)invite',
	run: (client, message) => {
		try {
			message.reply({ embeds : [
				new MessageEmbed()
					.setColor(ee.color)
					.setTitle('💌 An Invite has been Requested')
					.setDescription('>>> ** [Invite Nexoo Here](https://dsc.gg/nexoo) **')
					.setFooter({ text : ee.footerinvite }),
			] });
		}
		catch (err) {
			console.log(err);
		}
	},
};
