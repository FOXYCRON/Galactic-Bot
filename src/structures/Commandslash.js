// const { CommandInteraction } = require('discord.js');
module.exports = class CommandSlash {
	constructor(options) {
		this.name = options.name;
		this.description = options.description;
		this.inactive = options.inactive || false;
		this.cooldown = options.cooldown || false;
		this.options = options.options || [];
		this.name_localizations = options.name_localizations || null;
		this.description_localizations = options.description_localizations || null;
		this.permisosUser = options.permisosUser || false;
		// this.permisos = {
		// 	dev: !!options.permisos?.dev,
		// 	owner: !!options.permisos?.owner,
		// 	permisos_bot: options.permisos?.permisos_bot || [],
		// 	permisosUser: options.permisos?.permisosUser || [],
		// };
	}

	// async run(interaction) {
	// 	throw new Error(`Command ${this.name} doesn't provide a run method!`);
	// }
};