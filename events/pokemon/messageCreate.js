const client = require('../../index.js');
const { MessageEmbed } = require('discord.js');
const Guild = require('../../database/models/guildSchema');
const users = require('../../database/models/userSchema');
const pokecord = require('pokecord');

client.on('messageCreate', async (message) => {
	// ko cho bot khác sử dụng bot`
	if (message.author.bot) return;
	// không cho người dùng sử dụng bot trong direct message
	if (!message.guild) return;
	const guildProfile = await Guild.findOne({ guildID: message.guild.id });
	if (!guildProfile || !guildProfile.pokemon.spawn || guildProfile.pokemon.spawn == false) return;
	guildProfile.pokemon.points += Math.floor(Math.random() * 3) + 1;
	if (guildProfile.pokemon.points < guildProfile.pokemon.afterPoints) return Guild.findOneAndUpdate({ guildID: message.guild.id }, { 'pokemon.points': guildProfile.pokemon.points });
	await Guild.findOneAndUpdate({ guildID: message.guild.id }, { 'pokemon.points': 0 });

	const channel = await message.guild.channels.fetch(guildProfile.pokemon.spawnAt) || message.channel;
	const pokemon = await pokecord.Spawn();
	// console.log(pokemon);
	const embed = new MessageEmbed()
		.setTitle('A Wild Pokémon has Appeared')
		.setColor('RANDOM')
		.setImage(pokemon.imageURL)
		.setDescription(`Use \`${client.prefix}catch <pokemon name>\` to catch it or \`${client.prefix}hint\` to get the hint`)
		.setFooter({
			text: 'The next Pokémon will replace this one.',
		});
	const msg = await channel.send({ embeds: [embed] });

	let catched = false;

	msg.channel.awaitMessages({
		time: 60000,
		errors: ['time'],
		filter: (m) => m.content.toLowerCase() === `${client.prefix}catch ${pokemon.name.toLowerCase()}`,
		max: 1,
	}).then(async col => {
		catched = true;
		const msg = col.first();

		await users.findOneAndUpdate({ user: msg.author.id }, { $push: { pokemons: pokemon.id } }) || await users.create({
			user: msg.author.id,
			pokemons: [pokemon.id],
		});

		msg.reply({ embeds: [
			new MessageEmbed()
				.setTitle('A Pokémon has been Caught')
				.setDescription(`**Name**: ${pokemon.name}`),
		] });
	}).catch(() => {
		msg.edit({ embeds: [
			new MessageEmbed()
				.setDescription('Pokemon has ran away'),
		] });
	});

	const filter = m => m.content.toLowerCase() === `${client.prefix}hint`;
	const col = msg.channel.createMessageCollector({ filter, time: 105000 });

	let t = 0;
	col.on('collect', async (mess) => {
		if (catched) {return col.stop();}

		if (Date.now() - t < 10000) return mess.reply('You are on a timeout to use the hint command');
		t = Date.now();

		let hint = pokemon.name, i = pokemon.name.length / 2;

		while (--i >= 0) {
			const p = Math.floor(Math.random() * pokemon.length);

			hint = hint.replace(hint[p], '_');
		}
		const messages = await mess.reply({
			embeds: [
				new MessageEmbed()
					.setTitle('A Hint has been Requested')
					.setDescription('Please confirm you want to purchase a Pokémon hint.\n\nReact with ✅ to confirm or ❎ to cancel.'),
			],
		});
		await messages.react('✅');
		await messages.react('❎');
		const f = (reaction, user) => {
			return reaction.emoji.name === '✅' && user.id === mess.author.id || reaction.emoji.name === '❎' && user.id === mess.author.id;
		};

		const collector = messages.createReactionCollector({ f, time: 55000 });

		collector.on('collect', async (reaction, user) => {
			if (reaction.emoji.name === '✅') {
				messages.reply({
					embeds: [
						new MessageEmbed()
							.setTitle('A Hint has been Generated')
							.setDescription('The hint has been sent to your DMs.'),
					],
				});
				user.send({
					embeds: [
						new MessageEmbed()
							.setTitle('Pokémon Hint')
							.setDescription(`\`${hint}\``),
					],
				});
				messages.reactions.removeAll()
					.catch(error => console.error('Failed to clear reactions:', error));
			}
			else if (reaction.emoji.name === '❎') {
				messages.reply({
					embeds: [
						new MessageEmbed()
							.setTitle('A Hint has been Cancelled')
							.setDescription('Your Pokémon hint request was cancelled.'),
					],
				});
				messages.reactions.removeAll()
					.catch(error => console.error('Failed to clear reactions:', error));
			}
		});
		collector.on('end', async collected => {
			if (collected.size === 0) {
				messages.edit({
					embeds: [
						new MessageEmbed()
							.setDescription('You did not react in time.'),
					],
				});
			}
		});
	});
});

