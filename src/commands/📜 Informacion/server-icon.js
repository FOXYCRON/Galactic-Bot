const { EmbedBuilder } = require('discord.js');
const Command = require('../../structures/Commands.js');
const db = require('../../database/models/prefix.js'); // Prefix

module.exports = class ServerInfoCommand extends Command {
  constructor() {
    super({
      name: 'server-icon',
      alias: ['icono-servidor', 'servericon'],
      usage: ['server-info'],
      description: ['Show the icon of this or another server.', 'Muestra el icono de este u otro servidor.'],
      cooldown: 5,
      category: 'Info',
    });
  }

  async run(client, message, args) {
    // Verificamos si se pasó un ID de servidor
    let servidorID = args.slice(0).join(" ");

    // Si no se especifica un ID de servidor, usamos el ID del servidor donde se ejecuta el comando
    if (!servidorID) {
      servidorID = message.guild.id;
    }

    // Obtenemos el servidor con el ID proporcionado
    const guild = client.guilds.cache.get(servidorID);
    
    // Si no encontramos el servidor, enviamos un mensaje de error
    if (!guild) {
      return message.channel.send("❌ `|` No puedo encontrar el servidor. ¿Asegúrate de que esté en la lista de servidores del bot?");
    }

    // Obtenemos el icono del servidor
    let img = guild.iconURL({ dynamic: true, size: 1024, format: "jpg" });

    // Si el servidor no tiene icono, enviamos un mensaje de error
    if (!img) {
      return message.channel.send("❌ `|` Este servidor no tiene un icono.");
    }

    // Creamos el embed para mostrar el icono del servidor
    const imgembed = new EmbedBuilder()
      .setTitle("Icono del servidor: " + guild.name)
      .setDescription(`[Click para descargar](${img})`)
      .setColor("Random")
      .setImage(img)
      .setTimestamp()
      .setFooter({ text: `${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) });

    // Enviamos el embed con el icono
    message.reply({ embeds: [imgembed] });
  }
};
