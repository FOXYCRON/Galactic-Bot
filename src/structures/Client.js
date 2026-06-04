const { Client, Partials, ActivityType, PresenceUpdateStatus, Collection, GatewayIntentBits, ChannelType } = require('discord.js');
const i18n = require('../utils/langs.js');
const config = require('../config/botConfig/config.json');

module.exports = class extends Client {
    constructor() {
        super({
            intents: [
                GatewayIntentBits.Guilds,                 // Necesario para los servidores
                GatewayIntentBits.GuildMembers,           // Necesario para los miembros
                GatewayIntentBits.GuildMessages,          // Necesario para leer mensajes
                GatewayIntentBits.MessageContent,         // Necesario para contenido de mensajes
                GatewayIntentBits.GuildVoiceStates        // Necesario para los canales de voz
            ],
            partials: [Partials.User, Partials.Channel, Partials.GuildMember, Partials.Message, Partials.Reaction],
            presence: {
                activities: [{ name: 'Saliendo del coma...', type: ActivityType.Watching }],
                status: PresenceUpdateStatus.Idle,
            },
            messageCacheMaxSize: 50,
            messageCacheLifetime: 60,
            messageSweepInterval: 60,
            retryLimit: 2,
            restGlobalRateLimit: 50,
            messageEditHistoryMaxSize: 100,
            messageEditHistoryLifetime: 600,
        });
        this.commands = new Collection();
        this.slashCommands = new Collection();
        this.slashArray = new Collection();
        this.langs = i18n;
        this.emotes = config.emotes;
        this.colores = config.colores;

        // 🌟 SOLUCIÓN 1: Esperamos a que el bot esté listo ('ready') para iniciar los estados
        this.once('ready', () => {
            console.log(`🤖 Logueado como ${this.user.tag}! Iniciando rotación de estados...`);
            this.updatePresence();
        });
    }

    async login(token = this.token) {
        super.login(token);
    }

    // Función para actualizar el estado periódicamente
    async updatePresence() {
        setInterval(() => {
            // 2. Calculamos cuántos servidores tienen el canal del interchat activo ("interchat")
            const servidoresInterchat = this.channels.cache.filter(c => c.name === 'interchat' && c.type === ChannelType.GuildText).size;
            
            // Calculamos los canales de voz totales usando ChannelType.GuildVoice
            const canalesVozTotales = this.channels.cache.filter(c => c.type === ChannelType.GuildVoice).size;

            const estados = [
                `Estoy en ${this.guilds.cache.size.toLocaleString()} servidores.`,
                `${this.channels.cache.size.toLocaleString()} canales totales.`,
                `${this.guilds.cache.reduce((a, g) => a + (g.memberCount || 0), 0).toLocaleString()} usuarios me pueden ver.`,
                `¡${servidoresInterchat} servidores conectados al Interchat!`,
                /*'Usa g.bot-suggest para mandar tu sugerencia.',
                'Manda tu reporte del bot con g.bug-report.',
                'Comando interchat arreglado.',
                'Usa la nueva funcion interchat "g.interchat"',g
                'Errores corregidos.',
                'Comandos nuevos.',
                'Establece un canal de noticias.',
                '¿Quieres ver si eres vip? pon g.vip.',*/
                `${canalesVozTotales.toLocaleString()} canales de voz.`
            ];
    
            // Elegimos un estado al azar
            const estadoRandom = estados[Math.floor(Math.random() * estados.length)];

            this.user.setPresence({
                activities: [{
                    name: estadoRandom,
                    type: ActivityType.Watching,
                }],
                status: 'online',
            });
        }, 10000); // Actualiza cada 10 segundos
    }
};