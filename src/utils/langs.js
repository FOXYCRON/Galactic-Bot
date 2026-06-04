const { join } = require('node:path');

const i18n = require('i18n');

i18n.configure({
	locales: ['en', 'es'],
	directory: join(__dirname, '..', 'langs'),
	defaultLocale: 'es',
	retryInDefaultLocale: true,
	objectNotation: true,
	register: global,
	autoReload: true,

	logWarnFn: function(msg) {
		console.log(`warn: ${msg}`);
	},
	logErrorFn: function(msg) {
		console.log(`peligro ${msg}`);
	},
	missingKeyFn: function(locale, value) {
		return value;
	},
	mustacheConfig: {
		tags: ['{', '}'],
		disable: false,
	},
});
i18n.setLocale('en');

module.exports = i18n;