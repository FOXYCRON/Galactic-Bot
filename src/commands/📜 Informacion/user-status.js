const Command = require('../../structures/Commands.js');
const { sendError } = require('../../utils/utils.js');
const Discord = require('discord.js');

module.exports = class Eval extends Command {
	constructor() {
		super({
			name: 'user-status',
			alias: ['userstatus'],
			usage: ['<listening/watching/playing> <status>', '<listening/watching/playing> <estado>'],
			description: ['See the status of any user.', 'Ver el estado de algun usuario.'],
			cooldown: 5,
			category: 'Info',
		});
	}
	async run(client, message, args, lang) {

        let estadouser = {


            "online":"🟢", 
            "idle":"🟡",
            "dnd":"🔴",
            "Sin conexion":"⚪"
          } 
         
          const embed = new Discord.EmbedBuilder()
          .setColor("Random")
          .setThumbnail(client.user.displayAvatarURL())
          .setAuthor({ name: 'Estado de los usuarios del servidor.', iconURL: `${client.user.avatarURL({ forceStatic: true, size: 1024 })}` })
          .setTimestamp()
          .addFields(
              { name: '👥 Miembros', value: `**${message.guild.memberCount}** Miembros en Total`, inline: true },
              { 
                  name: 'Estados de miembros', 
                  value: `**${message.guild.members.cache.filter(m => m.presence?.status === 'online').size || 0}** Online 🟢\n` +
                  `**${message.guild.members.cache.filter(m => m.presence?.status === 'idle').size || 0}** Ausente 🟡\n` +
                  `**${message.guild.members.cache.filter(m => m.presence?.status === 'dnd').size || 0}** No molestar 🔴\n` +
                  `**${message.guild.members.cache.filter(m => !m.presence || m.presence.status === 'offline').size || 0}** Sin conexion ⚪\n`,
                  inline: false
                })
           .setFooter({ text: `Solicitado por ${message.author.username}`, iconURL: `${message.author.avatarURL()}` })
                
                message.channel.send({ embeds: [embed] });
    
      }

};