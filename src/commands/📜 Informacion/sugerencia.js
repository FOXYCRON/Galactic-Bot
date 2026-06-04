const Command = require('../../structures/Commands.js');
const { sendError } = require('../../utils/utils.js');
const Discord = require('discord.js');
const db = require("megadb")
const suggest = new db.crearDB("sugerencias")

module.exports = class Eval extends Command {
	constructor() {
		super({
			name: 'suggest',
			alias: ['sugerir', 'sugerencia'],
			usage: ['<listening/watching/playing> <status>', '<listening/watching/playing> <estado>'],
			description: ['Leave us your suggestion for the server.', 'Dejanos tu sugerencia para el servidor.'],
			cooldown: 5,
			category: 'Info',
		});
	}
  
	async run(client, message, args, lang) {


    const suge = args.slice(0).join(' ')
    let canal = await suggest.obtener(message.guild.id)
    let channel = client.channels.cache.get(canal)
 
 if(!channel) return message.reply("No hay ningun canal de sugerencias establecido.")
 if(!suge) return message.reply("Escribe tu sugerencia")
 
 const embed = new Discord.EmbedBuilder()
     .setAuthor({ name: `Nueva Sugerencia`, iconURL: `${client.user.avatarURL({ dynamic: true, size: 1024 })}`})
     .setDescription(`\`\`\`${suge}\`\`\``)
     .setThumbnail(client.user.displayAvatarURL())
     .setTimestamp()
     .setFooter({ text: `${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })

    channel.send({ embeds: [ embed ]}).then(m => {
       m.react('👍')
       m.react('❓')
       m.react('👎')
    })
      
   message.reply(`Se envio correctamente tu sugerencia, Puedes mirarla en ${channel}`)
   }

};