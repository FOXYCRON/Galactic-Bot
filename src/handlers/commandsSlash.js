const fs = require('fs');
const path = require('path');

module.exports = (client) => {
	try {
		client.slashArray = [];
		client.slashCommands = new Map();

		const slashDir = path.join(__dirname, '../slashCommands');
		const categories = fs.readdirSync(slashDir);

		let loadedSlashCount = 0;

		for (const category of categories) {
			const categoryPath = path.join(slashDir, category);
			const commandFiles = fs.readdirSync(categoryPath).filter(file => file.endsWith('.js'));

			for (const file of commandFiles) {
				try {
					const filePath = path.join(categoryPath, file);
					delete require.cache[require.resolve(filePath)]; // Elimina el caché
					const CommandClass = require(filePath);
					const commandInstance = new CommandClass();

					if (!commandInstance?.name) {
						console.log(`❌ Error en ${file}: Falta "name"`);
						continue;
					}

					client.slashCommands.set(commandInstance.name, commandInstance);
					client.slashArray.push({
						name: commandInstance.name,
						description: commandInstance.description,
						options: commandInstance.options,
						name_localizations: commandInstance.name_localizations,
						description_localizations: commandInstance.description_localizations,
						permisosUser: commandInstance.permisosUser,
					});

					loadedSlashCount++;
				} catch (error) {
					console.error(`❌ Error al cargar el comando ${file}:`, error);
				}
			}
		}

		if (client?.application?.commands) {
			client.application.commands.set(client.slashArray);
			console.log(`(/) ${loadedSlashCount} slash Cargados`.green);
		}
	} catch (error) {
		console.error('❌ Error al leer la carpeta de slashCommands:', error);
	}
};