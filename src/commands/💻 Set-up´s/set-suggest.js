const Command = require('../../structures/Commands.js');
const Discord = require('discord.js');
const db = require("megadb")
const suggest = new db.crearDB("sugerencias")

module.exports = class Avatar extends Command {
	constructor() {
		super({
			name: 'setsuggest',
			alias: ['establecer-sugerencias', 'set-suggest', 'set-sugerir'],
			usage: 'Sugerencia',
			description: ['Establish a suggestion channel for your server.', 'Establece un canal de sugerencias para tu servidor.'],
			cooldown: 5,
			category: 'Set-ups',
		});
	}
	async run(client, message, args, lang) {

		const id = args[0]
		if(!id) return message.reply("❌ `|` Esto no es un canal valido o esta fuera de este servidor.")
		const canal = message.mentions.channels.first() || client.channels.cache.get(id)
		if(!canal) return message.reply("❌ `|` Esto no es un canal valido.")
		let canalservidor = message.guild.channels.resolve(canal.id)
		if(!canalservidor) return message.reply("❌ `|` Debes mencionar un canal en este servidor.")
   
		suggest.establecer(message.guild.id, canal.id)
   
		message.reply(`El canal de sugerencias es ahora en **${canal.name}**!`)
	 }

};
