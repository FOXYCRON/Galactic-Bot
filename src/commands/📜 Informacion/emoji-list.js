const { EmbedBuilder, Embed } = require('discord.js');
const Command = require('../../structures/Commands.js');
const db = require('../../database/models/prefix.js'); // Prefix

module.exports = class ServerInfoCommand extends Command {
  constructor() {
    super({
      name: 'emoji-list',
      alias: ['lista-emoji'],
      usage: ['emojilist'],
      description: ['Shows the list of emojis on the server.', 'Muestra la lista de emojis del servidor.'],
      cooldown: 5,
      category: 'Info',
    });
  }

    async run(client, message, args) {
  
            // Obtener el prefix del servido
            const guildId = message.guild.id; // ID del servidor
            const prefixData = await db.findOne({ guildId });
        
            // Si no hay datos de prefix en la base de datos, asignar un prefix por defecto
            const prefix = prefixData ? prefixData.prefix : 'g.'; // Asignar el prefix desde la base de datos o por defecto

            let user = message.mentions.users.first() || message.author
            let invites = await message.guild.invites.fetch();//message.guild.invites.fetch(...)
            let userInv = invites.filter(u => u.inviter.id === user.id)
    
            if(message.guild.emojis.cache.size < 1) return message.channel.send('¡Este servidor no tiene emojis!')

              let Emojis = "";
              let EmojisAnimated = "";
              let EmojiCount = 0;
              let Animated = 0;
              let OverallEmojis = 0;
        
              function Emoji(id) {
                  return client.emojis.cache.get(id).toString();
              }
        
              message.guild.emojis.cache.forEach((emoji) => {
                OverallEmojis++;
                 if (emoji.animated) {
                  Animated++;
                  EmojisAnimated += Emoji(emoji.id);
                 } else {
                  EmojiCount++;
                  Emojis += Emoji(emoji.id)
                 }
             });
        
             const embed = new EmbedBuilder()
                .setTitle(`Lista de emojis del servidor: ` + "`" + `${message.guild.name}` + "`" + `\nCantidad de emojis: ` + "`" + `${OverallEmojis}` + "`")
                .setDescription(`Emojis Animados:  **${Animated}**\n${EmojisAnimated}\n\n Emojis Estaticos: **${EmojiCount}**\n${Emojis}`)
                .setColor('Yellow')
        
                if (embed.length > 2000) {
                   return message.channel.send("El limite de caracteres es de: 2000")
                } else {
                  message.channel.send({ embeds: [ embed ] })
                }
              
      }};
