const { EmbedBuilder, Embed } = require('discord.js');
const Command = require('../../structures/Commands.js');
const db = require('../../database/models/prefix.js'); // Prefix

module.exports = class ServerInfoCommand extends Command {
  constructor() {
    super({
      name: 'reseña',
      alias: [''],
      usage: ['reseña'],
      description: ['leave me a review.', 'Dejame una reseña.'],
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

            const reseñamx = args.join(" ")
            if(!reseñamx) return message.reply({ content: 'Debes escribirnos tu reseña.'})
            message.reply("Gracias por dejarnos tu reseña.")
            
         const embedmx = new EmbedBuilder()
            .setColor("Random")
            .setAuthor({ name: `♥ | ¡Nueva Reseña! • Prefix ${prefix}`, iconURL: `${client.user.avatarURL({ dynamic: true, size: 1024 })}` })
            .setThumbnail(message.author.displayAvatarURL())
            .addFields(
              { name: 'Usuario:', value: `\`${message.author.tag}\``, inline: false },
              { name: 'ID del usuario:', value: `\`${message.author.id}\``, inline: false },
              { name: 'Servidor:', value: `\`${message.guild.name}\``, inline: false },
              { name: 'ID del servidor:', value: `\`${message.guild.id}\``, inline: false },
              { name: 'Reseña:', value: `\`${reseñamx}\``, inline: false }
                      )
            .setTimestamp()
            .setFooter({ text: `Mandanos tu reseña con ${prefix}reseña`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
      
            client.channels.cache.get("1136069839367184424").send({ embeds: [ embedmx ]}) 
        }
};
