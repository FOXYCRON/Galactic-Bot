require('dotenv').config();
const express = require('express');
const mineflayer = require('mineflayer');
const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const { ShardingManager, DiscordAPIError } = require('discord.js');
const { MongoClient } = require('mongodb');
require('./utils/Logger.js');

// Inicializar el bot de Discord
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

// Inicializar el ShardingManager para Discord
const manager = new ShardingManager('./src/bot.js', {
  token: process.env.DISCORD_TOKEN,
  totalShards: 1,
  shardList: 'auto',
  mode: 'process',
  respawn: true,
  timeout: 87398,
});

// Manejar errores de promesas no manejadas
process.on('unhandledRejection', (reason) => {
  if (reason instanceof DiscordAPIError) return;
  console.error(reason);
});

// Manejo de eventos de shards de Discord
manager.on('shardCreate', (shard) => {
  console.log(`Iniciando Shard ${shard.id}`);

  shard.on('ready', () => {
    console.log(`Shard [${shard.id}] conectada a la Gateway de Discord.`);
  });
});

// Iniciar el ShardingManager
manager.spawn().catch((error) => console.error(`Error al iniciar la shard: ${error.message}`));

// Inicializar el bot de Minecraft usando mineflayer
const bot = mineflayer.createBot({
  host: 'FOXYCRONYT.aternos.me',
  port: 41403,
  username: 'Galactic_Bot_MC',
  password: 'tu_contraseña',
  version: '1.16.5',
});

// Mostrar el estado de conexión del bot de Minecraft
bot.on('spawn', () => {
  console.log('El bot de Minecraft se ha conectado al servidor');
});

// Movimiento anti-AFK
setInterval(() => {
  const actions = ['forward', 'back', 'jump', 'stop'];
  const action = actions[Math.floor(Math.random() * actions.length)];

  switch (action) {
    case 'forward':
      bot.setControlState('forward', true);
      setTimeout(() => bot.setControlState('forward', false), 1000);
      break;
    case 'back':
      bot.setControlState('back', true);
      setTimeout(() => bot.setControlState('back', false), 1000);
      break;
    case 'jump':
      bot.setControlState('jump', true);
      setTimeout(() => bot.setControlState('jump', false), 500);
      break;
    case 'stop':
      bot.clearControlStates();
      break;
  }
}, 10000);

// Rotación de cámara
setInterval(() => {
  const yaw = Math.random() * Math.PI * 2;
  const pitch = (Math.random() - 0.5) * Math.PI / 4;
  bot.look(yaw, pitch, true);
}, 30000);

// Interconectar Discord y Minecraft
client.on('messageCreate', async (message) => {
  if (!message.guild || message.author.bot) return;

  // Manejo del canal de interchat
  if (message.channel.name === "interchat") {
    const interchatChannels = client.channels.cache.filter(x => x.name === 'interchat');
    const embed = new EmbedBuilder()
      .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL() })
      .setFooter({ text: `Servidor: ${message.guild.name}`, iconURL: client.user.displayAvatarURL() })
      .setDescription(message.content)
      .setColor("Random");

    if (message.attachments.size > 0) embed.setImage(message.attachments.first().proxyURL);

    interchatChannels.forEach(channel => {
      client.channels.cache.get(channel.id)?.send({ embeds: [embed] });
    });

    message.delete().catch(() => {}); // Eliminar mensaje original si es posible
    return;
  }

  // Prefijo y comandos normales
  const prefix = "g."; // Puedes cambiarlo o hacer que se obtenga dinámicamente
  if (!message.content.startsWith(prefix)) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if (command === "join") {
    // Comando para conectar el bot de Minecraft al servidor
    if (bot) {
      message.channel.send("El bot de Minecraft ya está conectado.");
    } else {
      bot = mineflayer.createBot({
        host: 'FOXYCRONYT.aternos.me',
        port: 41403,
        username: 'Galactic_Bot_MC',
        password: 'tu_contraseña',
        version: '1.16.5',
      });

      bot.once('spawn', () => {
        message.channel.send("✅ Bot de Minecraft conectado al servidor.");
      });

      bot.once('end', () => {
        message.channel.send("❌ Bot de Minecraft desconectado.");
      });

      bot.once('error', (err) => {
        message.channel.send(`⚠️ Error en el bot de Minecraft: ${err.message}`);
      });
    }
    return;
  }

  // Enviar mensajes de Discord a Minecraft
  if (message.channel.id === '1107763094714859671') {
    bot.chat(`(${message.author.username}) dice: ${message.content}`);
    message.delete().catch(() => {});
  }
});

// Escuchar mensajes de Minecraft y enviarlos a Discord
bot.on('message', (jsonMsg) => {
  const chatMessage = jsonMsg.toString();
  const discordChannel = client.channels.cache.get('1107763094714859671');

  if (discordChannel && !chatMessage.includes('Galactic_Bot_MC')) {
    const embed = new EmbedBuilder()
      .setColor('#00FF00')
      .setTitle('Mensaje de Minecraft')
      .setDescription(chatMessage)
      .setFooter({ text: "Desde el servidor de Minecraft" })
      .setTimestamp();

    discordChannel.send({ embeds: [embed] });
  }
});

// Evento cuando el bot de Discord se conecta
client.once('ready', () => {
  console.log('Bot de Discord conectado y listo.');
});

// Iniciar el bot de Discord
client.login(process.env.DISCORD_TOKEN);

// Configuración del servidor web con Express
const app = express();

app.get('/', (req, res) => {
  res.send('Servidor web activo');
});

app.listen(3000, () => {
  console.log('Servidor web corriendo en http://localhost:3000');
});
