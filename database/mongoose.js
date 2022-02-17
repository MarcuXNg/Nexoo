const mongoose = require('mongoose');
require('dotenv').config();

module.exports = {
	init: () => {
		// mongoose database
		mongoose.connect(process.env.dbToken, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		// mongoose events
		mongoose.connection.on('connected', () => {
			console.log('Connected to database.');
		});
		mongoose.connection.on('disconnected', () => {
			console.log('Disconnected from database.');
		});
		mongoose.connection.on('err', (err) => {
			console.log('There was an error with the connection to database.' + err);
		});
	},
};