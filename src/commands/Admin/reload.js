const Command = require('../../structures/Commands.js');
const { EmbedBuilder } = require('discord.js');

module.exports = class Reload extends Command {
	constructor() {
		super({
			name: 'reload',
			description: 'Muestra la latencia del Bot.',
			cooldown: 5,
			owner: true,
		});
	}

	async run(client, message, args) {
		// await require('./handlers/extenders.js')(client);
		let opcion = 'Comandos, Slash';
		try {
			switch (args[0]?.toLowerCase()) {
			case 'commands':
			case 'comandos': {
				opcion = 'Comandos';
				await require('../../handlers/commands.js')(client);
				// await client.loadCommands();
			}
				break;

			case 'slash':
			case 'slashcommands': {
				opcion = 'Comandos Slash';
				await require('../../handlers/commandsSlash.js')(client);
				// await client.loadSlashCommands();

			}
				break;

				// case 'eventos':
				// case 'events': {
				// 	opcion = 'Eventos';
				// 	await require('../../handlers/events.js')(client);
				// 	// await client.loadEvents();
				// }
				// break;
			default:{
				await require('../../handlers/commands.js')(client);
				await require('../../handlers/commandsSlash.js')(client);
				// await require('../../handlers/events.js')(client);
			}
				break;
			}

			message.reply({
				embeds: [
					new EmbedBuilder()
						.addFields([
							{ name: `✅ ${opcion} Recargados`, value: '> *Okay!*' },
						])
						.setColor('Random'),
				],
			});
		} catch (e) {
			message.reply('**Ha ocurrido un error a al recargar el bot!**\n*Mira la consola para más detalles.*');
			console.log(e);
			return;
		}
	}
};
