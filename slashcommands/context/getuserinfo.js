const { ContextMenuCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new ContextMenuCommandBuilder()
		.setName('userinfo')
		.setType(3),
};