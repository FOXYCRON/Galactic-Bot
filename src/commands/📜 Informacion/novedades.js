const { EmbedBuilder, Embed } = require('discord.js');
const Command = require('../../structures/Commands.js');
const db = require('../../database/models/prefix.js'); // Prefix

module.exports = class ServerInfoCommand extends Command {
  constructor() {
    super({
      name: 'novedades',
      alias: ['actualizaciones'],
      usage: ['novedades'],
      description: ['Get to know all our new news.', 'Conoce todas nuestras nuevas novedades.'],
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

            const embed = new EmbedBuilder()
                .setColor("Random")
                .setThumbnail(client.user.displayAvatarURL())
                .setAuthor({ name: `¡Ultimas Novedades! • Prefix ${prefix}`, iconURL: `${client.user.avatarURL({ dynamic: true, size: 1024 })}` })
                .setDescription('Tenemos nuevas novedades.')
                .addFields(
                  { name: `**${prefix}clyde**`, value: "```Comando clyde agregado y funcionando correctamente```", inline: false },
                  { name: `**${prefix}slashcommands**`, value: "```Se agregaron los comandos de barra a galactic bot, por ahora solo tiene 3```", inline: false },
                  { name: `**${prefix}confesion**`, value: "```Nuevo comando de barra para mandar una confesion a un canal, esta puede ser anónima o no```", inline: false },
                  { name: `**${prefix}setup-confesion**`, value: "```Comando de barra para definir el canal de confesiones```", inline: false },
                  { name: `**${prefix}nuke**`, value: "```Borra todo un canal completo con este comando.```", inline: false },
                  { name: `**${prefix}invite**`, value: "```Invita al bot a tu servidor.```", inline: false },
                  { name: "Invítame a tu servidor", value: "[Galactic Bot](https://discordapp.com/oauth2/authorize?client_id=639207679616614412&scope=bot&permissions=2146958847)", inline: true }
                         )                
                .setTimestamp()
                .setFooter({ text: `Mandanos tu reseña con ${prefix}reseña`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
                message.channel.send({ embeds: [ embed] })
              }
};
