const { readdirSync } = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
require('dotenv').config();

/**
   *
   * @param {Client} client
   */

module.exports = (client) => {
	try {
		// import env files
		const clientId = process.env.DISCORD_CLIENTID;
		const token = process.env.DISCORD_TOKEN;
		// make a variable
		const slashCommands = [];
		// read file
		readdirSync('./slashcommands').forEach(dir => {
			const slscommands = readdirSync(`./slashcommands/${dir}/`).filter((file) => file.endsWith('.js'));
			for (const file of slscommands) {
				const command = require(`../slashcommands/${dir}/${file}`);
				slashCommands.push(command.data.toJSON());
				if (command.data.name) {
					client.slashCommands.set(command.data.name, command);
					console.log(file, '- Success');
				}
				else {
					console.log(file, '- Error');
				}
			}
		});

		const rest = new REST({ version: '9' }).setToken(token);
		rest.put(
			Routes.applicationCommands(clientId),
			{
				body: slashCommands,
			},
		);
		console.log('SlashCommand is ready');
	}
	catch (e) {
		console.log(e);
	}
};
