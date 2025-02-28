const config = require('../../config/botConfig/config.json');
const Event = require('../../structures/Event.js');

module.exports = class Interaction extends Event {
	constructor(...args) {
		super(...args);
	}

	async run(interaction) {
		if (!interaction.guild || !interaction.channel) return;

		// await asegurar_todo(interaction.guild.id, interaction.author.id);
		// const data = await Schema.findOne({ guildID: interaction.guild.id });

		commandRunInte(this.client);

		async function commandRunInte(client) {

			// const args = message.content.slice(prefix.length).trim().split(/ +/g);

			// const command = args.shift().toLowerCase();
			// if (client.slashCommands.get(interaction?.commandName)) {
			const cmd = client.slashCommands.get(interaction?.commandName);
			if (cmd) {
				if (cmd.inactive) return interaction.reply({ content: 'Este comando esta inactivo' });
				if (cmd.owner) {
					if (!config.ownerIDS.includes(interaction.member.id)) return;
				}
				// if (cmd.permisos) {
					if (cmd.permisos_bot && !interaction.guild.members.me.permissions.has(cmd.permisos_bot)) {
						return interaction.reply({ content: 'No tengo los suficientes permisos para ejecutar este comando' });
					}
					if (cmd.permisosUser && !interaction.member.permissions.has(cmd.permisosUser)) {
						return interaction.reply({ content: 'No tienes los suficientes permisos para ejecutar este comando' });
					}
				// }
				if (cmd.nsfw) {
					if (!interaction.channel.nsfw) return interaction.reply({ content: 'Este comando es NSFW' });
				}
				if (cmd.voice) {
					if (!interaction.member.voice.channel) return interaction.channel.send({ content: 'No estas en un canal de voz' });
				}
				try {
					cmd.run(client, interaction, '/');
				} catch (e) {
					interaction.reply({ content: 'Ha ocurrido un error al ejecutar este comando' });
					console.log(e);
				}
			}
			// }
		}
	}
};
