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
	emitAddSongWhenCreatingQueue: true,
	emitAddListWhenCreatingQueue: true,
	updateYouTubeDL: true,
	youtubeCookie: 'VISITOR_INFO1_LIVE=o_UFlrL8LuI; LOGIN_INFO=AFmmF2swRAIgWxkpYLeeVW5Om-nQRYt1_63-Q-adkihAnZxnuusfQdcCICOKoF0v_cr_r7kAuO7nvtfNyTaS6rJpJjLz_eX8O97e:QUQ3MjNmeGJDSjFmS25PbjZ3aWtZRXZZRXFyT1A4T1BDNGJuUmZBT1N5NjlQekcyOWYxNEpwU1pqaGotQlpWMmJJTVpGLUUtZEhUN1BvSWlTbEdwVnB3bGJvS0RKTWFIbi1hZmlOdnlTUkF1VUx2Zno5QkZyMTc3ZndkYURjbWQxd25MNVlvR0c3aTZMNXk3ckhMZ01KbFhCVVVhUnpIOXdXeGFXUDdfT1ljSE4wZXpOa3d5UzFiZkMwcDZ0eUtqckpuUElROHl2Z3BmSlpYeEpvRU5pazhsS1BXemFuRjJHUQ==; HSID=AaMTSJNlGTqsYvMaO; SSID=AXwA400TeBpyJw0VF; APISID=-3e8o4gYZt8BhMK_/ApwB0adqReqtVlrG8; SAPISID=GP4MSIm469YWkkaP/AaSw_M-WrCr9lhQSG; __Secure-1PAPISID=GP4MSIm469YWkkaP/AaSw_M-WrCr9lhQSG; __Secure-3PAPISID=GP4MSIm469YWkkaP/AaSw_M-WrCr9lhQSG; SID=GgjBo5_RNpuUHU2gzIwSOAy-lsCrg3KTpenbit874pAPXQABk2Lri7kMeWYj0ZKz6LiK9g.; __Secure-1PSID=GgjBo5_RNpuUHU2gzIwSOAy-lsCrg3KTpenbit874pAPXQAB6YxmOpWV_udLzF9tD8JGDA.; __Secure-3PSID=GgjBo5_RNpuUHU2gzIwSOAy-lsCrg3KTpenbit874pAPXQABu9idS-oFKayUO2t89-jb1Q.; PREF=tz=Asia.Bangkok&f6=40000000&f5=20000&f4=4000000; YSC=9a_P9XCjYMA; SIDCC=AJi4QfEmDGkM_qN4R8u6KToQDRJz7tz1nKfp-mPrsz-vFghzd8OrynjAqfY5QaU9lQ1FaLdPnasq; __Secure-3PSIDCC=AJi4QfGSwCGDFkwc7V-AQKw4s2-aUblFt2B5zCwhjybusUIH19KEpXIR-axrIBJGS5L-5oTJ7_g',
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
