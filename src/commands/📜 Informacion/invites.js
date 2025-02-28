const { EmbedBuilder, Embed } = require('discord.js');
const Command = require('../../structures/Commands.js');
const db = require('../../database/models/prefix.js'); // Prefix

module.exports = class ServerInfoCommand extends Command {
  constructor() {
    super({
      name: 'invites',
      alias: ['invitaciones'],
      usage: ['invites'],
      description: ['See how many invitations a server user has.', 'Mira cuantas invitaciones tiene un usuario del servidor.'],
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

            let user = message.mentions.users.first() || message.author
            let invites = await message.guild.invites.fetch();//message.guild.invites.fetch(...)
            let userInv = invites.filter(u => u.inviter.id === user.id)
    
            if(userInv.size <= 0) {
                return message.channel.send(`${user.username} no has invitado a nadie al servidor.`)
            }
    
            let invCodes = userInv.map(x => x.code).join('\n')
            let i = 0;
            userInv.forEach (inv => i += inv.uses)
    
            const embed = new EmbedBuilder()
                .setTitle(`${user.username} invites`)
                .addField('User Invites', `${i}`)
                .addField(`Invites Codes`, invCodes)
                .setColor("BLURPLE")
                .setTimestamp()
            message.channel.send({ embeds: [ embed ]})
      }};
