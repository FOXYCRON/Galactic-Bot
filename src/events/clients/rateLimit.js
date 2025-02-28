const Event = require('../../structures/Event.js');

module.exports = class RateLimit extends Event {
	constructor(...args) {
		super(...args);
	}

	async run(rateLimitInfo) {
		console.log(`El bot ha sido limitado. Tiempo de espera: ${rateLimitInfo.timeout}ms, Límite: ${rateLimitInfo.limit}, Método: ${rateLimitInfo.method}, Ruta: ${rateLimitInfo.route}`);
	}
};