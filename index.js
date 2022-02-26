// clear the console
console.clear();

// import env file (secret environments)
require('dotenv').config();

// OAuth2
const express = require('express');
const app = express();

app.listen(process.env.PORT, () => {
	console.log(`App listening at http://localhost:${process.env.PORT}`);
});

app.get('/', async (req, res) => {
	res.sendFile('index.html', { root: '.' });
});

// import modules
const { readdirSync } = require('fs');
const Discord = require('discord.js');
const config = require('./config.json');
const mongoose = require('./database/mongoose');

const client = new Discord.Client({
	// import all intents
	intents: 32767,
	// disable replied user
	allowedMentions: { repliedUser: false },
	partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
	messageCacheMaxSize: 10,
	messageCacheLifetime: 60,
	fetchAllMembers: false,
	restTimeOffset: 0,
	restWsBridgetimeout: 100,
	disableEveryone: true,
});

// distube modules
const { SpotifyPlugin } = require('@distube/spotify');
const { SoundCloudPlugin } = require('@distube/soundcloud');
const { YtDlpPlugin } = require('@distube/yt-dlp');
const { DisTube } = require('distube');

client.distube = new DisTube(client, {
	// the amount of songs to be search in search results
	searchSongs: 5,
	// emit replayed song
	emitNewSongOnly: false,
	// save the song which are played previously
	savePreviousSongs: true,
	// leave the channel if it is empty
	leaveOnEmpty: true,
	emptyCooldown: 30,
	// play nsfw content
	nsfw: true,
	// leave the channel when finish
	leaveOnFinish: true,
	// leave the channel when there are nothing in the queue
	leaveOnStop: true,
	// ytdl = false
	youtubeDL: false,
	// disable addsong event
	emitAddSongWhenCreatingQueue: false,
	// enable addlist event
	emitAddListWhenCreatingQueue: true,
	// update ytdl
	updateYouTubeDL: true,
	// yt cookie (for nsfw)
	youtubeCookie: process.env.YOUTUBECOOKIE,
	// plugin
	plugins: [
		// spotify
		new SpotifyPlugin({
			parallel: true,
			emitEventsAfterFetching: true,
			api: {
				// spotify client id
				clientId: process.env.SPOTIFY_CLIENTID,
				// spotify client secret
				clientSecret: process.env.SPOTIFY_CLIENTSECRET,
			},
		}),
		// soundcloud
		new SoundCloudPlugin(),
		// ytdl
		new YtDlpPlugin({
			highWaterMark: 1024 * 1024 * 64,
			quality: 'highestaudio',
			format: 'audioonly',
			liveBuffer: 60000,
			dlChunkSize: 1024 * 1024 * 4,
		}),
	],
});

// for events file
module.exports = client;

// client variables to use anywhere
client.commands = new Discord.Collection();
client.events = new Discord.Collection();
client.aliases = new Discord.Collection();
client.categories = readdirSync('./commands/');
client.slashCategories = readdirSync('./slashcommands/');
client.cooldowns = new Discord.Collection();
client.slashCommands = new Discord.Collection();
client.maps = new Map();

// reconlx giveaway
const { GiveawayClient } = require('reconlx');
const giveaway = new GiveawayClient({
	client,
	mongooseConnectionString: process.env.dbToken,
	emoji: '🎉',
	defaultColor: '00FFF9',
});
client.GiveawayClient = giveaway;

// Discord-xp
const Levels = require('discord-xp');
Levels.setURL(process.env.dbToken);

// Loading files, with the client variable like Command Handler, Event Handler, ...
['command', 'event', 'slashcommand', config.antiCrash ? 'antiCrash' : null].filter(Boolean).forEach(handler => {
	require(`./handlers/${handler}`)(client);
});

mongoose.init();
client.login(process.env.DISCORD_TOKEN);
