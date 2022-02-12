// clear the console
console.clear();
require('dotenv').config();

// OAuth2
const express = require('express');
const { port } = require('./config.json');
const app = express();

app.listen(port, () => {
	console.log('Project is running!');
});

app.get('/', async (req, res) => {
	res.send('Started!');
});

// import modules
const { readdirSync } = require('fs');
const Discord = require('discord.js');

const client = new Discord.Client({
	intents: [
		'GUILDS',
		'GUILD_MESSAGES',
		'GUILD_VOICE_STATES',
		'GUILD_MEMBERS',
	],
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
	emitNewSongOnly: false,
	savePreviousSongs: true,
	leaveOnEmpty: true,
	emptyCooldown: 30,
	nsfw: false,
	leaveOnFinish: true,
	leaveOnStop: true,
	youtubeDL: false,
	emitAddSongWhenCreatingQueue: false,
	emitAddListWhenCreatingQueue: false,
	updateYouTubeDL: true,
	plugins: [
		new SpotifyPlugin({
			parallel: true,
			emitEventsAfterFetching: false,
			api: {
				clientId: process.env.SPOTIFY_CLIENTID,
				clientSecret: process.env.SPOTIFY_CLIENTSECRET,
			},
		}),
		new SoundCloudPlugin(),
		new YtDlpPlugin({
			youtubeCookie: 'AaMTSJNlGTqsYvMa',
			highWaterMark: 1024 * 1024 * 64,
			quality: 'highestaudio',
			format: 'audioonly',
			liveBuffer: 60000,
			dlChunkSize: 1024 * 1024 * 4,
		}),
	],
});

module.exports = client;

// client variables to use anywhere
client.commands = new Discord.Collection();
client.events = new Discord.Collection();
client.aliases = new Discord.Collection();
client.categories = readdirSync('./commands/');
client.cooldowns = new Discord.Collection();
client.slashCommands = new Discord.Collection();
client.maps = new Map();

// Loading files, with the client variable like Command Handler, Event Handler, ...
['command', 'event', 'slashcommand'].forEach(handler => {
	require(`./handlers/${handler}`)(client);
});

client.login(process.env.DISCORD_TOKEN);
