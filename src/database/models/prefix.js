const mongoose = require('mongoose');

module.exports = mongoose.model(
	'prefixs',
	new mongoose.Schema({
		guildId: String,
		prefix: String,
	}),
);