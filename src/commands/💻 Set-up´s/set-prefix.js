const Discord = require('discord.js');
const megadb = require("megadb")
const db = require("../../database/models/prefix.js")
const Command = require('../../structures/Commands.js');

module.exports = class Avatar extends Command {
	constructor() {
		super({
			name: 'setprefix',
			alias: ['establecer-prefix', 'set-prefix'],
			usage: 'change-prefix',
			description: ['Change the bot prefix for this server.', 'Cambia el prefix del bot para este servidor.'],
			cooldown: 5,
			category: 'Set-ups',
		});
	}
	async run(client, message, args, lang) {

		const prefixdatabase = await db.findOne({ guildId: message.guild.id })
		if (!args[0]) return message.reply("Escribe un prefix.")
		const nuevoprefix = args.join(" ");

		if (nuevoprefix.length > 4) return message.reply("El prefix es demasiado largo, intenta poner uno menor a 4 caracteres")

		if (args[0] === "!w") return message.reply("Si quieres volver a mi prefix original usa `resetprefix`")
		if (args[0] === "!W") return message.reply("Si quieres volver a mi prefix original usa `resetprefix`")

		if (!prefixdatabase) {
			const nuevadb = await db.create({ guildId: message.guild.id, prefix: `${nuevoprefix}` })
			nuevadb.save()
		}
		if (prefixdatabase) {
			await db.findOneAndUpdate({ guildId: message.guild.id, prefix: `${nuevoprefix}` })
		}

		const embed = new Discord.EmbedBuilder()
			.setTitle("Cambiando prefix")
			.setDescription(`Prefix cambiado a ${args[0]}`)
			.setColor("Random")
			.setTimestamp()

		message.channel.send({ embeds: [embed] })
	}
};
