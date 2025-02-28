module.exports = class Commando {
	constructor(opciones) {
		// # Configuración básica.
		this.name = opciones.name;
		this.alias = opciones.alias;
		this.description = opciones.description;
		this.category = opciones.category;
		// # Configuración adicional
		this.args = opciones.args || false;
		this.inactive = opciones.inactive || false;
		this.usage = opciones.usage; // Pruebas después
		this.options = opciones.options || false; // Comprobar
		// # Otras configuraciones
		this.subcommands = opciones.subcommands; /* Comprobar */
		this.cooldown = opciones.cooldown || false;
		this.permisos = opciones.permisos || false;
		this.permisos_bot = opciones.permisos_bot || false;
		this.owner = opciones.owner || false;
		this.nsfw = opciones.nsfw || false;
		this.voice = opciones.voice || false;
	}
}
