const Command = require('../../structures/Commands.js');
const { sendError } = require('../../utils/utils.js');
const Schema = require('../../database/models/guild');
const fs = require('node:fs');

module.exports = class Ping extends Command {
	constructor() {
		super({
			name: 'set-languaje',
			alias: ['setlang', 'set-lang'],
			description: ['Change the languaje of the bot in the server.', 'Cambia el idioma del bot en el servidor.'],
			cooldown: 5,
			category: 'Info',
			// subcommands: ['listening', 'watching', 'playing'],
			usage: ['set-languaje <languaje>', 'set-lang <idioma>'],
			example: ['set-languaje es', 'setlang en'],
			args: false,
		});
	}
	async run(client, message, args, lang) {
		try {
			const idiomas = fs.readdirSync(`${process.cwd()}/src/lang`).filter(archivo => archivo.endsWith('.json')).map(archivo => archivo.replace(/.json/, ''));
			if (!args[0]) return message.reply(client.languajes.__({ phrase: 'cmds.configuracion.lang.idioma1', locale: lang }, { idiomas: idiomas.map(idioma => idioma).join(', ') }));
			if (!idiomas.includes(args[0])) return message.reply(client.languajes.__({ phrase: 'cmds.configuracion.lang.idioma2', locale: lang }, { idiomas: idiomas.map(idioma => idioma).join(', ') }));

			await Schema.findOneAndUpdate({ guildID: message.guildId }, {
				lang: args[0],
			});
			message.reply(client.languajes.__({ phrase: 'cmds.configuracion.lang.idioma3', locale: lang }, { idioma: lang, establecido: args[0] }));
		} catch (e) {
			// console.log(e);
			sendError(e, message, client, lang);
		}
	}
};
