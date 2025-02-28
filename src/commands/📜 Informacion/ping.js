const Command = require('../../structures/Commands.js');
const Discord = require('discord.js');

module.exports = class Ping extends Command {
	constructor() {
		super({
			name: 'ping',
			alias: ['pong'],
			usage: 'Ping',
			description: ['Shows the real-time ping of the bot.', 'Muestra el ping en tiempo real del bot.'],
			cooldown: 5,
			category: 'Info',
		});
	}
	async run(client, message, args, lang) {
		try {
			const mongoose = require('mongoose');
			const start = Date.now();
			await mongoose.connection.db.admin().ping();
			const end = Date.now();

			const pingDataBase = end - start;

			const values = {
				high: 200,
				medium: 100,
				low: 50,
			};
			const ping = Date.now() - message.createdTimestamp;

			let colores;
			if (ping > values.high) {
				colores = 'df0101';
			} else if (ping > values.medium) {
				colores = 'df7401';
			} else {
				colores = '01df01';
			}

			const embed = new Discord.EmbedBuilder()
				.setColor(colores)
				.setTitle(client.languajes.__({ phrase: 'cmds.informacion.ping.title', locale: lang }, { client: client.user.username }))
				.setDescription(`**🤖 Bot** \`${ping}ms\`\n<:satellitesignal:1007481184357449739> **API** \`${client.ws.ping}ms\`\n<a:MongoDB:999782652729114755> **MongoDB** \`${pingDataBase}\``)
				.setFooter({ text: ` ${client.user.username} | Ping`, iconURL: client.user.avatarURL() })
				.setTimestamp();
			message.reply({ embeds: [embed] });
		} catch (e) {
			console.log(e);
		}
	}
};
