const { Client, Partials, ActivityType, PresenceUpdateStatus, Collection, GatewayIntentBits } = require('discord.js');
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
                GatewayIntentBits.GuildVoiceStates       // Necesario para los canales de voz
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

        this.updatePresence();  // Llamamos a la función para actualizar el estado
    }


    async login(token = this.token) {
        super.login(token);
    }

    // Función para actualizar el estado periódicamente
	async updatePresence() {
		const estados = [
			`Estoy en ${this.guilds.cache.size.toLocaleString()} servidores.`,
			`${this.channels.cache.size.toLocaleString()} canales.`,
			`${this.guilds.cache.reduce((a, g) => a + g.memberCount, 0)+1} usuarios me pueden ver.`,
			'Usa g.bot-suggest para mandar tu sugerencia.',
			'Manda tu reporte del bot con g.bug-report.',
			'Comando interchat arreglado.',
			'Usa la nueva funcion interchat "g.interchat"',
			'Errores corregidos.',
			'Comandos nuevos.',
			'Establece un canal de noticias.',
			'¿Quieres ver si eres vip? pon g.vip.',
			`${this.guilds.cache.reduce((total, guild) => total + guild.channels.cache.filter(c => c.type === 'GUILD_VOICE').size, 0)} canales de voz.`
		];
	
		setInterval(() => {
			this.user.setPresence({
				activities: [{
					name: estados[Math.floor(Math.random() * estados.length)],
					type: ActivityType.Watching, // Puedes cambiarlo por Listening, Streaming, etc.
				}],
				status: 'online', // Puedes cambiar el estado a 'dnd', 'idle', 'invisible'
			});
		}, 10000); // Actualiza cada 10 segundos
	}
};
