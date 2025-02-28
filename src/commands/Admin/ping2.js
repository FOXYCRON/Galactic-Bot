const Command = require('../../structures/Commands.js');
const { sendError } = require('../../utils/utils.js');

module.exports = class Ping extends Command {
	constructor() {
		super({
			name: 'prueba',
			alias: ['pong'],
			description: ['Shows the real-time ping of the bot.', 'Muestra el ping en tiempo real del bot.'],
			cooldown: 5,
			category: 'Info',
			// subcommands: ['listening', 'watching', 'playing'],
			usage: ['<listening/watching/playing> <status>', '<listening/watching/playing> <estado>'],
			example: ['awaxd', '<listening/watching/playing> <estado>'],
			// args: true,
		});
	}
	async run(client, message, args, lang) {
		try {
			// const ping = Math.abs(message.createdTimestamp - Date.now());
			// message.reply(`${pings}`);
			message.reply({
				content: client.languajes.__({ phrase: 'cmds.messageCreate.mencionbot.title', locale: lang }),
			});
			return;
		} catch (e) {
			sendError(e, message, client, lang);
		}
	}
};
