const { getAudioUrl } = require('google-tts-api');
const voice = require('@discordjs/voice');
const config = require('../../config.json');
module.exports = {
    name: 'speak',
    aliases: ['sp'],
    description: "Speaking Bot",
    category: 'fun',
    usage: `${config.prefix}speak [sth]`,
    inVoiceChannel: true,
    run: async (client, message, args) => {
        try {
            if (!args[0]) return message.channel.send('❌ **Plz type sth ><!**');
            const string = args.join(' ');
            if (string.length > 500) return message.channel.send(`❌ **too many characters** \`(<500)\` !`);
            const voiceChannel = message.member.voice.channel;
            if (!voiceChannel) return message.channel.send('❌ **You must be in a voice channel to use the bot**');

            const audioURL = await getAudioUrl(string, {
                lang: 'vi',
                slow: false,
                host: 'https://translate.google.com',
                timeout: 10000,
            });

            const connection = voice.joinVoiceChannel({
                channelId: message.member.voice.channel.id,
                guildId: message.guild.id,
                adapterCreator: message.guild.voiceAdapterCreator,
            })

            //create source
            const resource = voice.createAudioResource(audioURL)
            const player = voice.createAudioPlayer()
            try {
                //tạo âm thanh
                player.play(resource)
                connection.subscribe(player)

            } catch (e) {
                message.channel.send('Plz try again later!');
                console.error(e);
            };
            await message.react("✅");
            if (message.guild.me.voice.channel) {
                try {
                    //tạo âm thanh
                    player.play(resource)
                    connection.subscribe(player)
                } catch (e) {
                    message.channel.send('Plz try again later!');
                    console.error(e);
                };
                await message.react("✅");
            }
            //check nếu play xong thì out voice
            player.on(voice.AudioPlayerStatus.Idle, () => {
                //out kênh thoại
                connection.destroy()
            });
        } catch (err) {
            console.log(err);
        }
    },
};
