const { EmbedBuilder } = require('discord.js');
const Command = require('../../structures/Commands.js');
const db = require('../../database/models/prefix.js'); // Prefix

module.exports = class ServerInfoCommand extends Command {
  constructor() {
    super({
      name: 'seguridad',
      alias: [''],
      usage: ['server-info'],
      description: ['Shows the security level of the server.', 'Muestra el nivel de seguridad del servidor.'],
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
    
      const humanLevels = {
          0: 'Ninguno',
          1: 'Bajo',
          2: 'Medio',
          3: 'Alto',
          4: 'Muy protegido'
      };

        let seguridad = humanLevels[message.guild.verificationLevel];
        var server = message.guild;
        const embed = new EmbedBuilder()
        .setAuthor({ name: `Seguridad • Prefix ${prefix}`, iconURL: `${client.user.avatarURL({ dynamic: true, size: 1024 })}` })
        .addFields(
          { name: "**SISTEMA DE SEGURIDAD**", value: `El nivel de seguridad de este servidor es de nivel ➮ ${seguridad}`, inline: true }
        )
        .setColor("Random")
        .setTimestamp()
        .setFooter({ text: `${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
      
     message.channel.send({ embeds: [ embed ]});

    }

};
