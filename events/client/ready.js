const config = require('../../config.json');
module.exports = {
	name: 'ready',
	once: true,
	run: async (client, message, args) => {
		console.log(`${client.user.username} ready! Logged in as ${client.user.tag}`);
		const servers = await client.guilds.cache.size;
		const membercount = await client.guilds.cache.map(c => c.memberCount).reduce((a, b) => a + b);
		const activities = [
			`${config.prefix}help | ${servers} servers`,
			`Invite me now! | Watching ${membercount} members`,
			`${client.channels.cache.size} channels`,
			`My prefix is ${config.prefix}`,
		];
		setInterval(() => {
			const status = activities[Math.floor(Math.random() * activities.length)];
			client.user.setPresence({
				activities: [{
					name: `${status}`,
					type: 'LISTENING',
				}],
				status: 'online',
			});
		}, 5000);
	},
};