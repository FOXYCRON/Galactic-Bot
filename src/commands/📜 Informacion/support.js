const Command = require('../../structures/Commands.js');
const { sendError } = require('../../utils/utils.js');
const Discord = require('discord.js');

module.exports = class Eval extends Command {
	constructor() {
		super({
			name: 'support',
			alias: ['soporte'],
			usage: ['<listening/watching/playing> <status>', '<listening/watching/playing> <estado>'],
			description: ['Official bot support server.', 'Servidor de soporte oficial del bot.'],
			cooldown: 5,
			category: 'Info',
		});
	}
	async run(client, message, args, lang) {

    const embed = new Discord.EmbedBuilder()
    .setColor("Yellow")
    .setTitle('Unete al server de soporte.')
    .setThumbnail(client.user.displayAvatarURL())
    .setAuthor({ name: `Support`, iconURL: `${client.user.avatarURL({ dynamic: true, size: 1024 })}` })
    .setDescription('En este servidor puedes avisar sobre cualquier error y/o alguna sugerencia para el bot.')
    .addFields(
                { name: "Link del servidor: ", value: "[support](https://discord.gg/vAK8nJUBG4)", inline: true },
                { name: "<a:ds:724743848269709393> Invitame a tu servidor <a:ds:724743848269709393>", value: `[Galactic Bot](https://discordapp.com/oauth2/authorize?client_id=639207679616614412&scope=bot&permissions=2146958847)`, inline: true },
              )
    .setTimestamp()
    .setFooter({ text: `${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
    message.channel.send({ embeds: [ embed] })

  } 

};