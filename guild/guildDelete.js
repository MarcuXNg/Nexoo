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
				.setTitle(`I left the server ${guild.name}`)
				.setDescription(`I hope to see you again in the future \n\n>>> ** [Click here to invite me back](${config.invite}) **\nThanks for being supported to us`)
				.setColor('RANDOM')
				.setFooter({
					text: `${guild.name}`,
					iconURL: guild.iconURL({ dynamic: true }) || 'https://cdn.discordapp.com/attachments/765919453766352916/877787616974622770/wCfHtuoejLIbAAAAABJRU5ErkJggg.png',
				})
				.setTimestamp(),
		],
	}),
	);
});

