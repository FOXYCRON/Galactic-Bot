require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const { ShardingManager, DiscordAPIError } = require('discord.js');
require('./utils/Logger.js');


const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const manager = new ShardingManager('./src/bot.js', {
	token: process.env.DISCORD_TOKEN,
	totalShards: 1,
	shardList: 'auto',
	mode: 'process',
	respawn: true,
	timeout: 87398,
});

process.on('unhandledRejection', (reason) => {
	if (reason instanceof DiscordAPIError) return;
	console.error(reason);
});

manager.on('shardCreate', (shard) => {
	console.log(`Iniciando Shard ${shard.id}`.yellow);

	shard.on('ready', () => {
		console.log(`Shard [${shard.id}] conectada a la Gateway de Discord.`.yellow);
	});
});

manager.spawn().catch((error) => console.error(`Error al iniciar la shard: ${error.message}`.red));
