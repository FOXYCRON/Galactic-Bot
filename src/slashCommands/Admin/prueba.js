const CommandSlash = require('../../structures/Commandslash');

module.exports = class Prueba extends CommandSlash {
	constructor() {
		super({
			name: 'prueba',
			description: 'Prueba pa ver si ya.',
			description_localizations: {
				'es-ES': 'Pregunta a 8ball una pregunta',
				'en-US': 'Ask 8ball a question',
			},
			cooldown: 5,
			options: [
				{
					type: 6,
					name: 'user',
					description: 'The question to ask',
					name_localizations: {
						'es-ES': 'usuario',
					},
					description_localizations: {
						'es-ES': 'un usuario',
					},
					required: true,
				},
			],
			permisosUser: ["Administrator"],
		});
	}

	async run(client, interaction) {
		interaction.reply('olaolaolaola');
		// interaction.reply(`olaolaolaola ${(interaction.options.getUser('user') ?? interaction.user).tag} `);
	}
};