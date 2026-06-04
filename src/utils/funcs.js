const serverSchema = require('../database/models/guild.js');
const setupSchema = require('../database/models/setups.js');
const Discord = require('discord.js');

module.exports = {
	asegurar_todo,
	paginacion,
};

async function asegurar_todo(guildid, userid) {
	if (guildid) {
		let serverdata = await serverSchema.findOne({ guildID: guildid });
		if (!serverdata) {
			console.log('Asegurado: Config de Server');
			serverdata = await new serverSchema({
				guildID: guildid,
			});
			await serverdata.save();
		}
		let setupsdata = await setupSchema.findOne({ guildID: guildid });
		if (!setupsdata) {
			console.log('Asegurado: Setups');
			setupsdata = await new setupSchema({
				guildID: guildid,
				reaccion_roles: [],
			});
			await setupsdata.save();
		}
	}
}

async function paginacion(client, message, texto, titulo = 'Paginación', elementos_por_pagina = 5) {

	const embeds = [];
	const dividido = elementos_por_pagina;
	for (let i = 0; i < texto.length; i += dividido) {
		const desc = texto.slice(i, elementos_por_pagina);
		elementos_por_pagina += dividido;
		const embed = new Discord.EmbedBuilder()
			.setTitle(titulo.toString())
			.setDescription(desc.join(' '))
			.setColor('Random')
			.setThumbnail(message.guild.iconURL({ dynamic: true }));
		embeds.push(embed);
	}

	let paginaActual = 0;
	if (embeds.length === 1) return message.channel.send({ embeds: [embeds[0]] }).catch((err) => { console.log(err); });
	const boton_atras = new Discord.ButtonBuilder().setStyle('Success').setCustomId('Atrás').setEmoji('999190068042403960').setLabel('Atrás');
	const boton_inicio = new Discord.ButtonBuilder().setStyle('Danger').setCustomId('Inicio').setEmoji('🏠').setLabel('Inicio');
	const boton_avanzar = new Discord.ButtonBuilder().setStyle('Success').setCustomId('Avanzar').setEmoji('999190066813481011').setLabel('Avanzar');
	const embedpaginas = await message.channel.send({
		content: '**Haz click en los __Botones__ para cambiar de páginas**',
		embeds: [embeds[0].setFooter({ text: `Pagina ${paginaActual + 1} / ${embeds.length}` })],
		components: [new Discord.ActionRowBuilder().addComponents([boton_atras, boton_inicio, boton_avanzar])],
	});
	const collector = embedpaginas.createMessageComponentCollector({ filter: i => i?.isButton() && i?.user && i?.user.id == message.author.id && i?.message.author.id == client.user.id, time: 180e3 });
	collector.on('collect', async b => {
		if (b?.user.id !== message.author.id) return b?.reply({ content: `❌ **Solo la persona que ha escrito \`${prefix}queue\` puede cambiar de páginas!` });

		switch (b?.customId) {
		case 'Atrás': {
			collector.resetTimer();
			if (paginaActual !== 0) {
				paginaActual -= 1;
				await embedpaginas.edit({ embeds: [embeds[paginaActual].setFooter({ text: `Pagina ${paginaActual + 1} / ${embeds.length}` })], components: [embedpaginas.components[0]] }).catch((err) => { console.log(err); });
				await b?.deferUpdate();
			} else {
				paginaActual = embeds.length - 1;
				await embedpaginas.edit({ embeds: [embeds[paginaActual].setFooter({ text: `Pagina ${paginaActual + 1} / ${embeds.length}` })], components: [embedpaginas.components[0]] }).catch((err) => { console.log(err); });
				await b?.deferUpdate();
			}
		}
			break;

		case 'Inicio': {
			collector.resetTimer();
			paginaActual = 0;
			await embedpaginas.edit({ embeds: [embeds[paginaActual].setFooter({ text: `Pagina ${paginaActual + 1} / ${embeds.length}` })], components: [embedpaginas.components[0]] }).catch((err) => { console.log(err); });
			await b?.deferUpdate();
		}
			break;

		case 'Avanzar': {
			collector.resetTimer();
			if (paginaActual < embeds.length - 1) {
				paginaActual++;
				await embedpaginas.edit({ embeds: [embeds[paginaActual].setFooter({ text: `Pagina ${paginaActual + 1} / ${embeds.length}` })], components: [embedpaginas.components[0]] }).catch((err) => { console.log(err); });
				await b?.deferUpdate();
			} else {
				paginaActual = 0;
				await embedpaginas.edit({ embeds: [embeds[paginaActual].setFooter({ text: `Pagina ${paginaActual + 1} / ${embeds.length}` })], components: [embedpaginas.components[0]] }).catch((err) => { console.log(err); });
				await b?.deferUpdate();
			}
		}
			break;

		default:
			break;
		}
	});
	collector.on('end', () => {
		embedpaginas.components[0].components.map(boton => boton.disabled = true);
		embedpaginas.edit({ content: 'El tiempo ha expirado!', embeds: [embeds[paginaActual].setFooter({ text: `Pagina ${paginaActual + 1} / ${embeds.length}` })], components: [embedpaginas.components[0]] }).catch((err) => { console.log(err); });
	});
}