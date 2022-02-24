const { MessageEmbed } = require('discord.js');
const ee = require('../settings/embeds.json');
/**
   *
   * @param {Client} client
   */

module.exports = (client) => {
	try {
		const report = '635358046733729792';
		process.on('unhandledRejection', (reason, p) => {
			console.log('Unhandled Rejection Error');
			console.log(reason, p);
			client.users.cache.get(report).send({
				embeds: [
					new MessageEmbed()
						.setColor(ee.wrongcolor)
						.setTitle('Error')
						.setDescription('An Error just occured in the bot console!\n\nError\n\n** ```' + reason + '\n\n' + p + '```')
						.setFooter({
							text: 'Anti-Crash System',
						})
						.setTimestamp(),
				],
			});
		});
		process.on('uncaughtException', (error, origin) => {
			console.log('Uncaught Exception Error');
			console.log(error, origin);
			client.users.cache.get(report).send({
				embeds: [
					new MessageEmbed()
						.setColor(ee.wrongcolor)
						.setTitle('Error')
						.setDescription('An Error just occured in the bot console!\n\nError\n\n** ```' + error + '\n\n' + origin + '```')
						.setFooter({
							text: 'Anti-Crash System',
						})
						.setTimestamp(),
				],
			});
		});
		process.on('uncaughtExceptionMonitor', (error, origin) => {
			console.log('Uncaught Exception Error');
			console.log(error, origin);
			client.users.cache.get(report).send({
				embeds: [
					new MessageEmbed()
						.setColor(ee.wrongcolor)
						.setTitle('Error')
						.setDescription('An Error just occured in the bot console!\n\nError\n\n** ```' + error + '\n\n' + origin + '```')
						.setFooter({
							text: 'Anti-Crash System',
						})
						.setTimestamp(),
				],
			});
		});
		process.on('multipleResolves', (type, promise, reason) => {
			console.log('Multiple Resolves Error');
			console.log(type, promise, reason);
			client.users.cache.get(report).send({
				embeds: [
					new MessageEmbed()
						.setColor(ee.wrongcolor)
						.setTitle('Error')
						.setDescription('An Error just occured in the bot console!\n\nError\n\n** ```' + type + '\n\n' + reason + '\n\n' + promise + '```')
						.setFooter({
							text: 'Anti-Crash System',
						})
						.setTimestamp(),
				],
			});
		});
	}
	catch (error) {
		console.log(error);
	}
};