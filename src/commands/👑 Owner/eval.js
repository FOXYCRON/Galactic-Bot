const Command = require('../../structures/Commands.js');
const { sendError } = require('../../utils/utils.js');
const Discord = require('discord.js');

module.exports = class Eval extends Command {
	constructor() {
		super({
			name: 'eval',
			alias: ['ev'],
			description: ['Evalue the code.', 'Evalua un código.'],
			cooldown: 5,
			category: 'Owner',
			// subcommands: ['listening', 'watching', 'playing'],
			usage: ['<listening/watching/playing> <status>', '<listening/watching/playing> <estado>'],
			example: ['awaxd', '<listening/watching/playing> <estado>'],
			owner: true,
		});
	}
	async run(client, message, args, lang) {
		try {
			if (!args[0]) {
				return message.reply('¡Evalua algo!').then(a => setTimeout(() => a.delete(), 5000));
			}

			message.channel.send('Evaluando...').then(async mensaje => {
				try {
					const codigo = args.join(' ');
					let evaluado = await eval(codigo);
					const tipo = typeof evaluado || 'No encontre ese tipo.';
					evaluado = require('util').inspect(evaluado, {
						depth: 0,
						maxStringLength: 2000,
					});
					const texto = '' + evaluado;

					if (texto.length >= 700) {
						create([
							{
								content: `${texto.replace(client.token, '').replace(/(bot)/g, 'bot')}`,
								language: 'javascript',
							},
						],
						{
							title: 'Codigo',
							description: 'Eval sobrepaso mas de 700 caracteres!',
						}).then(async e => {
							const emb = new Discord.EmbedBuilder()
								.setAuthor(client.user.tag, client.user.displayAvatarURL())
								.addFields([{ name: 'Lo evaluado', value: `\`\`\`js\n${codigo}\`\`\`` }])
								.addFields([{ name: 'La evaluacion', value: 'Ups... al parecer el codigo es muy largo, link: ' + e.url }])
								.addFields([{ name: 'Tipo:', value: `\`\`\`js\n${tipo}\`\`\`` }])
								.setColor('Random');
							mensaje.edit({ embeds: [emb] });
						});


					} else {
						message.react('✅');
						const emb = new Discord.EmbedBuilder()
							.setAuthor({ name: message.author.username, iconURL: message.author.displayAvatarURL() })
							.addFields([{ name: 'Lo evaluado', value: `\`\`\`js\n${codigo}\`\`\`` }])
							.addFields([{ name: 'La evaluacion', value: `\`\`\`js\n${texto.replace(client.token, 'Mi token esta bien guardado')}\`\`\`` }])
						// .addFields([ { name: '\u200B', value: '\u200B' } ])
							.addFields([{ name: 'Tipo:', value: `\`\`\`js\n${tipo}\`\`\`` }])
							.setColor('Random');
						mensaje.edit({ embeds: [emb] });
					}
				} catch (e) {
					message.react('⚠');
					const codigo = args.join(' ');
					const emb = new Discord.EmbedBuilder()
						.setAuthor({ name: message.author.username, iconURL: message.author.displayAvatarURL() })
						.addFields([{ name: 'Lo evaluado', value: `\`\`\`js\n${codigo}\`\`\`` }])
						.addFields([{ name: 'La evaluacion', value: `\`\`\`js\n${e}\`\`\`` }])
						.addFields([{ name: 'Tipo:', value: '```js\nError```' }])
						.setColor('Red')
						.setFooter({ text: 'ERROR!' });
					mensaje.edit({ embeds: [emb] });

				}
			});
		} catch (e) {
			sendError(e, message, client, lang);
		}
	}
};
