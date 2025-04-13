const { Client, Partials, ActivityType, PresenceUpdateStatus, Collection, GatewayIntentBits } = require('discord.js');
const i18n = require('../utils/langs.js');
const config = require('../config/botConfig/config.json');
const { ChannelType } = require('discord.js');

module.exports = class extends Client {
    constructor() {
        super({
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMembers,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.MessageContent,
                GatewayIntentBits.GuildVoiceStates
            ],
            partials: [Partials.User, Partials.Channel, Partials.GuildMember, Partials.Message, Partials.Reaction],
            presence: {
                activities: [{ name: 'Saliendo del coma...', type: ActivityType.Watching }],
                status: PresenceUpdateStatus.Idle,
            }
        });

        this.commands = new Collection();
        this.slashCommands = new Collection();
        this.slashArray = new Collection();
        this.langs = i18n;
        this.emotes = config.emotes;
        this.colores = config.colores;

        // Escucha cuando el bot esté listo para empezar a actualizar presencia
        this.once('ready', async () => {
            console.log(`[✅] Bot conectado como ${this.user.tag}`);
            await this.updatePresence(); // Actualiza la presencia cuando el bot ya está listo
            this.setupPresenceInterval(); // Inicia el cambio periódico de presencia
        });

        // También actualiza presencia si se une a un nuevo servidor
        this.on('guildCreate', async () => {
            await this.updatePresence();
        });

        // Y si sale de uno también
        this.on('guildDelete', async () => {
            await this.updatePresence();
        });
    }

    async login(token = this.token) {
        return super.login(token);
    }

    // Actualiza una sola vez la presencia con datos reales
    async updatePresence() {
        const estados = [
             `Estoy en ${this.guilds.cache.size.toLocaleString()} servidores.`,
             `${this.channels.cache.size.toLocaleString()} canales.`,
             `${this.guilds.cache.reduce((a, g) => a + (g.memberCount || 0), 0).toLocaleString()} usuarios me pueden ver.`,*/
             `${this.guilds.cache.reduce((total, guild) => total + guild.channels.cache.filter(c => c.type === ChannelType.GuildVoice).size, 0)} canales de voz.`,
             'Usa g.bot-suggest para mandar tu sugerencia.',
             'Manda tu reporte del bot con g.bug-report.',
             'Comando interchat arreglado.',
             'Usa la nueva funcion interchat "g.interchat"',
             'Errores corregidos.',
             'Comandos nuevos.',
             'Establece un canal de noticias.',
             '¿Quieres ver si eres vip? pon g.vip.',
        ];

        const randomStatus = estados[Math.floor(Math.random() * estados.length)];

        this.user.setPresence({
            activities: [{
                name: randomStatus,
                type: ActivityType.Watching,
            }],
            status: 'online',
        });
    }

    // Establece el intervalo para cambiar el estado cada 10 segundos
    setupPresenceInterval() {
        setInterval(() => {
            this.updatePresence();
        }, 10000); // Cada 10 segundos
    }
};
