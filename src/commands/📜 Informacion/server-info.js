const { EmbedBuilder } = require('discord.js');
const Command = require('../../structures/Commands.js');
const db = require('../../database/models/prefix.js'); // Prefix

module.exports = class ServerInfoCommand extends Command {
	constructor() {
		super({
			name: 'server-info',
			alias: ['guild-info', 'serverinfo'],
			usage: ['server-info'],
			description: ['Show server information.', 'Muestra la información del servidor.'],
			cooldown: 5,
			category: 'Info',
		});
	}

	async run(client, message, args) {

		// Obtener el prefix del servidor
		const guildId = message.guild.id; // ID del servidor
		const prefixData = await db.findOne({ guildId });

		// Si no hay datos de prefix en la base de datos, asignar un prefix por defecto
		const prefix = prefixData ? prefixData.prefix : 'g.'; // Asignar el prefix desde la base de datos o por defecto

		// Crear el embed con la información del servidor
		const embed = new EmbedBuilder()
			.setColor("Random")
			.setTitle(`${message.guild.name}`)
			.setThumbnail(message.guild.iconURL({ dynamic: true, size: 1024 })) // Foto del servidor
			.addFields(
				{name: "Owner: ", value: `${await message.guild.fetchOwner()}` + "`", inline: true},
				{ name: "**Nombre del servidor:**", value: "`" + `${message.guild.name}` + "`", inline: true},
				{ name: "**ID del servidor:**", value: "`" + `${message.guild.id}` + "`", inline: true},
				{ name: "**Prefix configurado:**", value: "`" + `${prefix}` + "`", inline: true},
				{ name: "**Miembros:**", value: "`" + `${message.guild.memberCount.toString()}` + "`", inline: true},
				{name: "**Numero de Roles:**", value: "`" + `${message.guild.roles.cache.size}` + "`", inline: true},
				{name: "**Numero de canales:**", value: "`" + `${message.guild.channels.cache.size}` + "`", inline: true},
				{name: "**Emojis:**", value: "`" + `${message.guild.emojis.cache.size}` + "`", inline: true},
				{name: "**Bots:**", value: "`" + `${message.guild.members.cache.filter(m => m.user.bot).size}` + "`", inline: true},
				{name: "**Boost:**", value: "`" + `${message.guild.premiumSubscriptionCount.toString()}` + "`", inline: true},
				{name: "**Nivel de verificacion:** ", value: "`" + `${message.guild.verificacionLevel}` + "`", inline: true},
				{name: "Fecha de creacion: ", value: "`" + `${message.guild.createdAt.toDateString()}` + "`", inline: true},
			)
			.setFooter({ text: `Solicitado por: ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) });

		// Enviar el embed
		message.channel.send({ embeds: [embed] });
	}
};
