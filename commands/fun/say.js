const config = require('../../config.json');
module.exports = {
	name: 'say',
	category: 'fun',
	aliases: ['say'],
	description: 'say sth',
	usage: `${config.prefix}say [sth]`,
	run: (client, message, args) => {
		try {
			if (message.deletable) message.delete();
			if (!args.length) return message.channel.send('**`😖 Nothing to say!`**');
			message.channel.send(args.join(' '));
		}
		catch (err) {
			console.log(err);
		}
	},
};
