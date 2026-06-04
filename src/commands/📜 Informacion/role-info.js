const { EmbedBuilder } = require('discord.js');
const Command = require('../../structures/Commands.js');
const db = require('../../database/models/prefix.js'); // Prefix

module.exports = class ServerInfoCommand extends Command {
  constructor() {
    super({
      name: 'role-info',
      alias: ['roleinfo', 'RoleInfo'],
      usage: ['role-info'],
      description: ['Shows information about a role.', 'Muestra la informacion de un rol.'],
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

      const role = message.guild.roles.cache.get(args[0]) || message.mentions.roles.first();

      if (!args[0]) return message.reply(`<a:cat_no:1344572996391665728> | Debes **especificar un rol** para ver su información`);

      if (!role) return message.reply(`<a:cat_no:1344572996391665728> | El rol no es válido`);
                        
      const embed = new EmbedBuilder()
            .setAuthor({ name: `Información del rol ${role.name} • Prefix ${prefix}`, iconURL: `${client.user.avatarURL({ dynamic: true, size: 1024 })}` })
            .addFields(
              { name: 'Nombre', value: `<@&${role.id}>`, inline: true },
              { name: 'ID', value: `${role.id}`, inline: true },
              { name: 'Color hex', value: `${role.hexColor}`, inline: true },
              { name: 'Creación', value: `<t:${parseInt(role.createdTimestamp / 1000)}:f> (<t:${parseInt(role.createdTimestamp / 1000)}:R>)`, inline: true },
              { name: 'Usuarios con este rol', value: `${role.members.size} usuario(s)`, inline: true },
              { name: '¿Mencionable?', value: `${role.mentionable ? "✅ Si" : "❌ No"}`, inline: true }
            )
            .setColor("Random")
            .setTimestamp()
            .setFooter({ text: `${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })

          message.reply({embeds: [embed], allowedMentions: { repliedUser: false }})
      }

};
