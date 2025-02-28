const Bot = require('./structures/Client.js');
const { Logger } = require('./utils/Logger.js');

const client = new Bot();

async function loadModules() {
	await require('./handlers/events.js')(client);
	await require('./handlers/commands.js')(client);
	await require('./handlers/commandsSlash.js')(client);
}

loadModules()
	.then(() => {
		const logger = new Logger();
		logger.success('Modules loaded sucessfully');
		client.login();
	})
	.catch(console.error);