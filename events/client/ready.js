const config = require('../../config.json');
module.exports = {
	name: 'ready',
	once: true,
	run: async (client, message, args) => {
		try {
			const servers = await client.guilds.cache.size;
			const membercount = await client.guilds.cache.map(c => c.memberCount).reduce((a, b) => a + b);
			const statusArray = [
				{
					type: 'LISTENING',
					content: `My prefix is ${config.prefix}`,
					status: 'online',
				},
				{
					type: 'WATCHING',
					content: `${client.channels.cache.size} channels`,
					status: 'online',
				},
				{
					type: 'PLAYING',
					content: `${config.prefix}help | ${servers} servers`,
					status: 'idle',
				},
				{
					type: 'COMPETING',
					content: `Invite me now! | Watching ${membercount} members`,
					status: 'dnd',
				},
			];
			setInterval(() => {
				const option = Math.floor(Math.random() * statusArray.length);
				client.user.setPresence({
					activities: [{
						name: statusArray[option].content,
						type: statusArray[option].type,
					}],
					status: statusArray[option].status,
				});
			}, 1000);
			console.log(`${client.user.username} ready! Logged in as ${client.user.tag}`);
		}
		catch (e) {
			console.log(e);
		}
	},
};
