const client = require('../../index.js');

client.on('interactionCreate', async interaction => {
	if (interaction.isCommand()) {
		const slashCommand = client.slashCommands.get(interaction.commandName);
		if (!slashCommand) return;
		try {
			await slashCommand.execute(client, interaction);
		}
		catch (e) {
			console.error(e);
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
	if (interaction.isContextMenu()) {
		const slashCommand = client.slashCommands.get(interaction.commandName);
		if (!slashCommand) return;
		try {
			await slashCommand.execute(client, interaction);
		}
		catch (e) {
			console.error(e);
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
});
