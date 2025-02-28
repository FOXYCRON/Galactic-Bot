const { EmbedBuilder, WebhookClient } = require('discord.js');
const config = require('../config/botConfig/config.json');
const { inspect } = require('util');
let webhookClient;
try {
	webhookClient = new WebhookClient({
		url: config.bot.webhook,
	});
} catch (err) {
	console.log(err);
}

function formatBytes(bytes) {
	if (bytes === 0) return '0 Bytes';
	const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
	const i = Math.floor(Math.log(bytes) / Math.log(1024));
	return `${parseFloat((bytes / Math.pow(1024, i)).toFixed(2))} ${sizes[i]}`;
}
/**
 * Report error
 * @param {any} error
 * @param {import('discord.js').Message} [message]
 */
function sendError(e, message, client, lang) {
	try {
		message?.channel
			.send?.({
				embeds: [
					new EmbedBuilder()
						.setColor('Red')
						.setTitle('Error')
						.setDescription(client.languajes.__({ phrase: 'cmds.antiCrash.embed.errorMsg', locale: lang }))
						.setFooter({ text: message.author.username, iconURL: message.author.avatarURL() }),
				],
			})
			.catch((err) =>
				console.log('Error we' + err),
				/* message?.author.send?.(
					'Oops... Ha ocurrido un eror con el comando ejecutado. Aunque ya he notificado a mis desarrolladores del problema, ¿te importaría ir a discord y dar más información?',
				), */
			);
		webhookClient?.send(
			`<@821258555180318720>\nHa habido un error en **${message.guild.name} [ID Server: ${message.guild.id}] [ID Usuario: ${message.author.id}] [Owner: ${message.guild.ownerId}]**. Numero de usuarios: **${message.guild.memberCount}**\nMensaje: ${message.content}\n\nError: ${inspect(e, { depth: 0 }).slice(0, 1000)}\n\n**------------------------------------**`,
			// `Ha habido un error en **${message.guild.name} [ID Server: ${message.guild.id}] [ID Usuario: ${message.author.id}] [Owner: ${message.guild.ownerId}]**. Numero de usuarios: **${message.guild.memberCount}**\nMensaje: ${message.content}\n\nError: ${e}\n\n**------------------------------------**`,
		);
	} catch (err) {
		console.log('Perros errores xd' + err);
	}
}
module.exports = { formatBytes, sendError };
