const fs = require('fs');

/**
   *
   * @param {Client} client
   */

module.exports = (client) => {
	try {
		fs.readdirSync('./events/').forEach((dir) => {
			const events = fs.readdirSync(`./events/${dir}/`).filter(file => file.endsWith('.js'));

			for (const file of events) {
				const pull = require(`../events/${dir}/${file}`);
				if (pull.name) {
					client.events.set(pull.name, pull);
				}
				else {
					continue;
				}
				if (pull.once) {
					client.once(pull.name, (...args) => pull.run(...args));
				}
				else {
					client.on(pull.name, (...args) => pull.run(...args));
				}
			}
		});
		console.log('Events Handler is ready');
	}
	catch (e) {
		console.log(e);
	}
};
