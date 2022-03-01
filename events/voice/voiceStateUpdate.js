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
	const { member, guild } = newState;
	const oldChannel = oldState.channel;
	const newChannel = newState.channel;
	const joinToCreate = '947913008544358410';

	if (oldChannel !== newChannel && newChannel && newChannel.id === joinToCreate) {
		const voiceChannel = await guild.channels.create(member.user.tag, {
			type: 'GUILD_VOICE',
			parent: newChannel.parent,
			permissionOverwrites: [
				{ id: member.id, allow: ['CONNECT'] },
				{ id: guild.id, deny: ['CONNECT'] },
			],
		});

		client.voiceGenerator.set(member.id, voiceChannel.id);
		await newChannel.permissionOverwrites.edit(member, { CONNECT: false });
		setTimeout(() => newChannel.permissionOverwrites.delete(member), 30 * 1000);

		return setTimeout(() => member.voice.setChannel(voiceChannel), 500);
	}
	const ownedChannel = client.voiceGenerator.get(member.id);
	if (ownedChannel && oldChannel.id === ownedChannel && (!newChannel || newChannel.id !== ownedChannel)) {
		client.voiceGenerator.set(member.id, null);
		oldChannel.delete().catch((e) => {console.log(e); });
	}
});