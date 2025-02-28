const Command = require('../../structures/Commands.js');
const Discord = require('discord.js');

module.exports = class Avatar extends Command {
	constructor() {
		super({
			name: 'avatar',
			alias: ['av'],
			usage: 'avatar',
			description: ['Show the avatar of a user.', 'Muestra el avatar de algun usuario.'],
			cooldown: 5,
			category: 'Info',
		});
	}
	async run(client, message, args, lang) {
		try {
			const usuario = message.mentions.members.first() || message.member;

			const embed256 = new Discord.EmbedBuilder()
				.setTitle(`Avatar de ${usuario.user.tag}`)
				.setColor('Random')
				.addFields({
					name: 'Link del Avatar: ', value: `[Click Aqui](${usuario.displayAvatarURL()})`,
				})
				.setImage(usuario.user.displayAvatarURL({ size: 256, dynamic: true }))
				.setTimestamp();

			const embed512 = new Discord.EmbedBuilder()
				.setTitle(`Avatar de ${usuario.user.tag}`)
				.setColor('Random')
				.addFields({
					name: 'Link del Avatar: ', value: `[Click Aqui](${usuario.displayAvatarURL()})`,
				})
				.setImage(usuario.user.displayAvatarURL({ size: 512, dynamic: true }))
				.setTimestamp();

			const embed1024 = new Discord.EmbedBuilder()
				.setTitle(`Avatar de ${usuario.user.tag}`)
				.setColor('Random')
				.addFields({
					name: 'Link del Avatar: ', value: `[Click Aqui](${usuario.displayAvatarURL()})`,
				})
				.setImage(usuario.user.displayAvatarURL({ size: 1024, dynamic: true }))
				.setTimestamp();

			const embed2048 = new Discord.EmbedBuilder()
				.setTitle(`Avatar de ${usuario.user.tag}`)
				.setColor('Random')
				.addFields({
					name: 'Link del Avatar: ', value: `[Click Aqui](${usuario.displayAvatarURL()})`,
				})
				.setImage(usuario.user.displayAvatarURL({ size: 2048, dynamic: true }))
				.setTimestamp();

			const row = new Discord.ActionRowBuilder().addComponents(
				[
					new Discord.ButtonBuilder()
						.setCustomId('256px')
						.setLabel('256px.')
						.setStyle('Success'),
				],
				[
					new Discord.ButtonBuilder()
						.setCustomId('512px')
						.setLabel('512px.')
						.setStyle('Success'),
				],
				[
					new Discord.ButtonBuilder()
						.setCustomId('1024px')
						.setLabel('1024px.')
						.setStyle('Success'),
				],
				[
					new Discord.ButtonBuilder()
						.setCustomId('2048px')
						.setLabel('2048px.')
						.setStyle('Success'),
				],
			);

			const m = await message.reply({ embeds: [embed256], components: [row] });

			const ifilter = (i) => i.user.id === message.author.id;

			const collector = m.createMessageComponentCollector({
				filter: ifilter,
				time: 60000,
			});

			collector.on('collect', async (i) => {
				if (i.customId === '256px') {
					await i.deferUpdate();
					i.editReply({ embeds: [embed256], components: [row] });
				}
				if (i.customId === '512px') {
					await i.deferUpdate();
					i.editReply({ embeds: [embed512], components: [row] });
				}
				if (i.customId === '1024px') {
					await i.deferUpdate();
					i.editReply({ embeds: [embed1024], components: [row] });
				}
				if (i.customId === '2048px') {
					await i.deferUpdate();
					i.editReply({ embeds: [embed2048], components: [row] });
				}
			});
		} catch (e) {
			console.log(e);
		}
	}
};
