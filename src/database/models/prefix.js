const mongoose = require('mongoose');

module.exports = mongoose.model(
	'prefixes',
	new mongoose.Schema({
		guildId: String,
        guildName: String,
		prefix: String,
	}),
);