const Command = require('../../structures/Commands.js');
const { sendError } = require('../../utils/utils.js');
const { EmbedBuilder } = require('discord.js');

module.exports = class Eval extends Command {
	constructor() {
		super({
			name: 'c-inter',
			alias: ['listinter', 'canales-ts'],
			description: ['Muestra una lista de servidores con el canal de interchat.', 'Muestra una lista de servidores con el canal de interchat.'],
			cooldown: 5,
			category: 'Owner',
			usage: ['', ''],
			example: ['', ''],
			owner: true,
		});
	}

	async run(client, message, args, lang) {
		// Filtramos todos los canales que se llamen "ts" en los servidores del bot
		const canalesTS = client.channels.cache.filter(x => x.name === 'interchat' && x.type === 0); // type 0 asegura que sean canales de texto

		// Creamos la lista con el nombre de cada servidor y su ID
		let listaServidores = canalesTS.map(c => `• **${c.guild.name}** \`(${c.guild.id})\``).join('\n');

		// Si la lista está vacía, ponemos un mensaje por defecto
		if (!listaServidores) listaServidores = 'No hay ningún servidor con el canal `#interchat` actualmente.';

		// Si la lista es demasiado larga, la recortamos para que Discord no tire error (Máximo 2048 caracteres)
		if (listaServidores.length > 2048) {
			listaServidores = listaServidores.slice(0, 2000) + '\n...y más servidores.';
		}

		const embed = new EmbedBuilder()
			.setColor("Random")
			.setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
			.setAuthor({ 
				name: "Panel de Owner - Canales Activos", 
				iconURL: client.user.displayAvatarURL({ dynamic: true }) 
			})
			.setTitle(`Conexiones del Interchat (\`#interchat\`)`)
			.setDescription(`**Total de servidores conectados:** \`${canalesTS.size}\` servidores.\n\n${listaServidores}`)
			.setFooter({ 
				text: `Solicitado por: ${message.author.username}`, 
				iconURL: message.author.displayAvatarURL({ dynamic: true }) 
			})
			.setTimestamp();

		return message.channel.send({ embeds: [embed] }).catch((err) => console.log("Error al enviar c-inter: " + err));
	}
};