const CommandSlash = require('../../structures/Commandslash');

module.exports = class Ping extends CommandSlash {
	constructor() {
		super({
			name: 'ping',
			description: 'Muestra la latencia del Bot.',
			cooldown: 5,
		});
	}

	async run(client, interaction) {
		const ping = Math.abs(interaction.createdTimestamp - Date.now());
		interaction.reply(`${ping}`);
	}
};
