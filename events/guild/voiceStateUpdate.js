const client = require('../../index');

client.on('voiceStateUpdate', async (oldState, newState) => {
	if (!newState.guild || newState.member.user.bot) return;
	// auto speak in stage channel
	if (newState.channelId && newState.channel.type === 'GUILD_STAGE_VOICE' && newState.guild.me.voice.suppress) {
		if (newState.guild.me.permissions.has('SPEAK') || (newState.channel && newState.channel.permissionsFor(newState.guild.me).has('SPEAK'))) {
			newState.guild.me.voice.setSuppressed(false).catch((e) => {
				console.log(e);
			});
		}
	}
});
