const Command = require('../../structures/Commands.js');
const { sendError } = require('../../utils/utils.js');
const Discord = require('discord.js');

module.exports = class Eval extends Command {
    constructor() {
        super({
            name: 'servers',
            alias: ['servidores'],
            description: ['Displays the server list with the bot.', 'Muestra la lista de servidores con el bot.'],
            cooldown: 5,
            category: 'Owner',
            usage: ['<listening/watching/playing> <status>', '<listening/watching/playing> <estado>'],
            example: ['awaxd', '<listening/watching/playing> <estado>'],
            owner: true,
        });
    }

    async run(client, message, args, lang) {
        // Mapeamos los servidores con su información
        let guildList = client.guilds.cache.map(g => `${g.name} | (${g.id}) | (${g.memberCount})`).join("\n");

        // Cortar el texto si supera el límite de caracteres de un embed para evitar errores
        if (guildList.length > 3900) {
            guildList = guildList.substring(0, 3900) + "\n...y más servidores.";
        }

        let embed = new Discord.EmbedBuilder()
            .setColor("Random")
            .setTimestamp()
            // 🛠️ SE AGREGO () AL METODO DEL AVATAR
            .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
            // 🛠️ SE REESTRUCTURÓ COMO OBJETO REQUERIDO POR DISCORD.JS V14
            .setAuthor({ 
                name: "Servers.", 
                iconURL: client.user.displayAvatarURL({ dynamic: true }) 
            })
            .setDescription(
                '**Estoy en estos servidores.**\n' +
                "```text\n" + guildList + "\n```" +
                "\nServers en total: " + "`" + `${client.guilds.cache.size}` + "`" +
                "\nMiembros totales: " + "`" + `${client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)}` + "`"
            )
            .setFooter({ 
                text: `${message.author.tag}`, 
                iconURL: message.author.displayAvatarURL({ dynamic: true }) 
            });

        return message.channel.send({ embeds: [embed] });
    }
};