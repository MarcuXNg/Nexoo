const client = require('../../index');
const { MessageEmbed } = require('discord.js');
const config = require('../../config.json');

client.on('guildDelete', async (guild) => {
	client.users.fetch(guild.ownerId).then(us => us.send({
		embeds: [
			new MessageEmbed()
				.setAuthor({
					name: 'Goodbye',
					iconURL: 'https://i.imgur.com/0vR0q5r.png',
				})
				.setTitle(`I left the ${guild.name}`)
				.setDescription(`I hope to see you again in the future \n>>> ** [Click here to invite me back](${config.invite}) **`)
				.setColor('RANDOM')
				.setTimestamp(),
		],
	}),
	);
});

