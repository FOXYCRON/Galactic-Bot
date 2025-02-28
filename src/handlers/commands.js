const { readdirSync, readdir } = require('fs');

module.exports = client => {
	const categories = readdirSync('./src/commands');
	const loadCommands = categories.map(category => {
		return new Promise((resolve, reject) => {
			readdir(`./src/commands/${category}`, (err, files) => {
				if (err) {
					console.error(err);
					return reject(err);
				}
				const commandFiles = files.filter(file => file.endsWith('.js'));
				for (const file of commandFiles) {
					const filePath = `../commands/${category}/${file}`;
					delete require.cache[require.resolve(filePath)];
					const Command = require(filePath);
					const command = new Command(client);
					client.commands.set(command.name.toLowerCase(), command);
					if (command.aliases && Array.isArray(command.aliases)) {
						command.aliases.forEach(alias => {
							client.aliases.set(alias, command);
						});
					}
				}
				resolve();
			});
		});
	});

	Promise.all(loadCommands)
		.then(() => {
			console.log(`(!i) ${client.commands.size} Comandos Cargados`.green);
		})
		.catch(console.error);
};
