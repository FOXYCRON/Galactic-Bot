const Command = require('../../structures/Commands.js');
const { sendError } = require('../../utils/utils.js');
const Discord = require('discord.js');

module.exports = class UserInfoCommand extends Command {
	constructor() {
		super({
			name: 'user-info',
			alias: ['userinfo'],
			usage: ['<listening/watching/playing> <status>', '<listening/watching/playing> <estado>'],
			description: ['View a user information.', 'Ver la informacion de un usuario'],
			cooldown: 5,
			category: 'Info',
		});
	}

	async run(client, message, args, lang) {
		// Obtener el usuario mencionado o el autor del mensaje si no se menciona a nadie
		let usuario = message.mentions.users.first() || message.author;

		// Intentar obtener el banner del usuario
		let bannerUrl = usuario.bannerURL({ size: 1024, dynamic: true });

		// Si no tiene banner, asignar una imagen de fallback
		if (!bannerUrl) {
			bannerUrl = "https://via.placeholder.com/1024x512?text=No+Banner"; // Imagen de fallback si no tiene banner
		}

		// Crear el embed con la información del usuario
		const embed = new Discord.EmbedBuilder()
			.setColor("Random")
			.setAuthor({ name: `User Info`, iconURL: `${client.user.avatarURL({ dynamic: true, size: 1024 })}` })
			.setThumbnail(usuario.displayAvatarURL({ dynamic: true, size: 1024 })) // Foto de perfil del usuario
			.setImage(bannerUrl) // Mostrar el banner del usuario o la imagen de fallback
			.setTimestamp()
			.addFields(
				{ name: "**Nombre de usuario:**", value: `${usuario.tag}`, inline: true },
				{ name: "**ID:**", value: `${usuario.id}`, inline: true },
				{ name: "**Tag:**", value: `${usuario.discriminator}`, inline: true },
				{ name: "**Genero (Bot/User):**", value: `${usuario.bot ? 'Bot' : 'Usuario'}`, inline: true },
				{ name: "**Fecha de creacion de la cuenta:**", value: `${usuario.createdAt}`, inline: false }
			)
			.setFooter({ text: `${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) });

		// Enviar el embed con la información
		message.channel.send({ embeds: [embed] });
	}
};
