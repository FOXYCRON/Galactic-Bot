const Command = require('../../structures/Commands.js');
const { sendError } = require('../../utils/utils.js');
const db = require('../../database/models/prefix.js'); // Prefix
const Discord = require('discord.js');
const moment = require('moment');
require('moment-duration-format');

module.exports = class Eval extends Command {
	constructor() {
		super({
			name: 'ubot',
			alias: ['ubot'],
			description: ['uBot Command (Creator Command)', 'Comando uBot (Comando del creador)'],
			cooldown: 5,
			category: 'Owner',
			// subcommands: ['listening', 'watching', 'playing'],
			usage: ['<listening/watching/playing> <status>', '<listening/watching/playing> <estado>'],
			example: ['awaxd', '<listening/watching/playing> <estado>'],
			owner: true,
		});
	}
	async run(client, message, args, lang) {

        // Obtener el prefix del servidor
        const guildId = message.guild.id; // ID del servidor
        const prefixData = await db.findOne({ guildId });
    
        // Si no hay datos de prefix en la base de datos, asignar un prefix por defecto
        const prefix = prefixData ? prefixData.prefix : 'g.'; // Asignar el prefix desde la base de datos o por defecto

        message.channel.sendTyping();
    
        const actividad = moment.duration(client.uptime).format(' D[d], H[h], m[m], s[s]');
    
        let embed = new Discord.EmbedBuilder()
          .setColor("Random")
          //.setThumbnail(message.author.displayAvatarURL)
          .setAuthor({ name: `uBot • Prefix ${prefix}`, iconURL: `${client.user.avatarURL({ dynamic: true, size: 1024 })}` })
    
          .setDescription("Esta es una pequeña informacion mia.")
          .addFields(
            { name: "Dueño: ", value: "\`\`\`FOXYCRON#3885\`\`\`", inline: true },
            { name: "Servidores: ", value: `\`\`\`${client.guilds.cache.size.toLocaleString()}\`\`\``, inline: true },
            { name: "Canales: ", value: `\`\`\`${client.channels.cache.size.toLocaleString()}\`\`\``, inline: true },
            { name: "Canales de voz: ", value: `\`\`\`${client.channels.cache.filter((c) => c.type === 2 || c.type === "GUILD_STAGE_VOICE").size}\`\`\``, inline: true },
            { name: "Usuarios: ", value: `\`\`\`${client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)+1}\`\`\``, inline: true },
            { name: "Version: ", value: `\`\`\`0.1.9\`\`\``, inline: true },
            { name: "Memoria: ", value: `\`\`\`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB\`\`\``, inline: true },
            { name: "Libreria: ", value: `\`\`\`${Discord.version}\`\`\``, inline: true },
            { name: "Tiempo activo: ", value: `\`\`\`${actividad}\`\`\``, inline: true },
          )
          // .addField(`Dueño: `, "```" + `FOXYCRON#3885` + "```", true)
          // .addField(`Servidores: `, "```" + `${client.guilds.cache.size.toLocaleString()}` + "```", true)
          // .addField(`Canales: `, "```" + `${client.channels.cache.size.toLocaleString()}` + "```", true)
          // .addField(`Canales de voz`, "```" + `${client.channels.cache.filter(c => c.isVoice()).size}` + "```", true)
          // .addField(`Usuarios: `, "```" + `${client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)+1}` + "```", true)
          // .addField(`Version: `, "```" + `0.1.9` + "```", true)
          // .addField(`Memoria: `, "```" + `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB` + "```", true)
          // .addField(`Libreria: `, "```" + `${Discord.version}` + "```", true)
          // .addField(`Tiempo activo: `, "```" + `${actividad}` + "```")
    
          .setTimestamp()
          .setFooter({ text: `${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
    
        message.channel.send({ embeds: [ embed ] })
    }

};