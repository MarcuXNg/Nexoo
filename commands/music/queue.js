const {
	MessageEmbed,
	MessageSelectMenu,
	MessageActionRow,
} = require('discord.js');
const { checkSameRoom } = require('../../utils');
const Discord = require('discord.js');
const config = require('../../config.json');


module.exports = {
	name: 'queue',
	aliases: ['q'],
	category: 'music',
	description: 'show the list of songs in the queue',
	usage: `${config.prefix}queue`,
	inVoiceChannel: true,
	run: async (client, message) => {
		try {
			if (checkSameRoom(message)) return;
			const queue = client.distube.getQueue(message);
			if (!queue) {
				return message.channel.send({
					embeds: [
						new Discord.MessageEmbed().setColor('RANDOM').setDescription('❌ | **There is nothing playing right now!**')],
				});
			}
			const embeds = [];
			let k = 20;
			const theSongs = queue.songs;
			for (let i = 0; i < theSongs.length; i += 20) {
				const qus = theSongs;
				const current = qus.slice(i, k);
				let j = i;
				const info = current.map((track) => `**${j++} )** [\`${String(track.name).replace(/\[/igu, '{').replace(/\]/igu, '}').substr(0, 10000)}\`](${track.url}) - \`${track.formattedDuration}\``).join('\n');
				const embed = new MessageEmbed()
					.setColor('RANDOM')
					.setDescription(`${info}`);
				if (i < 20) {
					embed.setAuthor('Queue', config.iconURL);
					embed.setTitle(`📑 **${theSongs.length > 10000 ? 10000 : theSongs.length} songs **`);
					embed.setDescription(`✨**Now playing**✨ **[${theSongs[0].name}](${theSongs[0].url})** - \`${theSongs[0].formattedDuration}\`\n\n${info}`);
				}
				embeds.push(embed);
				k += 20;
			}
			embeds[embeds.length - 1] = embeds[embeds.length - 1]
				.setFooter(`\n${theSongs.length} Songs in the Queue | Duration: ${queue.formattedDuration}`);
			let pages = [];
			for (let i = 0; i < embeds.length; i += 1) {
				pages.push(embeds.slice(i, i + 1));
			}
			pages = pages.slice(0, 24);
			const Menu = new MessageSelectMenu()
				.setCustomId('QUEUEPAGES')
				.setPlaceholder('Select a page')
				.addOptions([
					pages.map((page, index) => {
						const Obj = {};
						Obj.label = `Page ${index + 1}`;
						Obj.value = `${index}`;
						Obj.description = `Page ${index + 1}/${pages.length}`;
						return Obj;
					}),
				]);
			const row = new MessageActionRow().addComponents([Menu]);
			message.channel.send({
				embeds: [embeds[0]],
				components: [row],
			});
			// Event
			client.on('interactionCreate', (i) => {
				if (!i.isSelectMenu()) return;
				if (i.customId === 'QUEUEPAGES' && i.applicationId == client.user.id) {
					i.channel.send({
						embeds: pages[Number(i.values[0])],
					}).catch(e => {
						console.log(e);
					});
				}
			});

		}
		catch (err) {
			console.log(err);
		}
	},
};
