const { Schema, model } = require('mongoose');

const guilds = new Schema({
	guildID: String,
	prefix: String,
	lang: { type: String, default: 'es' },
	blacklisteado: Boolean,
	// cmds: { type: Array, default: [] },
	theme: { type: String, default: 'default' },
});

const modelo = new model('servidores', guilds);

module.exports = modelo;