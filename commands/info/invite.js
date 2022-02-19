const config = require('../../config.json');
const { MessageEmbed } = require('discord.js');
const ee = require('../../settings/embeds.json');

module.exports = {
	name: 'invite',
	aliases: ['invite'],
	category: 'info',
	description: 'Gets the invite link of the bot',
	usage: `${config.prefix}invite`,
	run: (client, message) => {
		try {
			message.channel.send({ embeds : [
				new MessageEmbed()
					.setColor(ee.color)
					.setTitle('💌 Thanks for Inviting me..')
					.setDescription('>>> ** [Click here to Invite](https://dsc.gg/nexoo) **')
					.setFooter({ text : ee.footertext }),
			] });
		}
		catch (err) {
			console.log(err);
		}
	},
};
