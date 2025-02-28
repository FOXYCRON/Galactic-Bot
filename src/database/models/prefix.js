const mongoose = require('mongoose');

module.exports = mongoose.model(
	'prefixes',
	new mongoose.Schema({
		guildId: String,
		prefix: String,
	}),
);