const Event = require('../../structures/Event.js');
const { WebhookClient } = require('discord.js');
const config = require('../../config/botConfig/config.json');
let webhookClient;
try {
	webhookClient = new WebhookClient({
		url: config.bot.webhook,
	});
} catch (err) {
	console.log(err);
}
module.exports = class guildCreate extends Event {
	constructor(...args) {
		super(...args);
	}
	async run(guild) {
		if (!webhookClient) return;
		if (guild.memberCount > 10000) {
			webhookClient.send(
				`Se ha añadido una nueva Guild: **${guild.name}**. Numero de usuarios: **${guild.memberCount}**`,
			);
		} else if (guild.memberCount > 500) {
			webhookClient.send(
				`Se ha añadido una nueva Guild: **${guild.name}**. Numero de usuarios: **${guild.memberCount}**`,
			);
		}
	}
};
