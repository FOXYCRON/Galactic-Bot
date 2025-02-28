const Event = require('../../structures/Event.js');
const { mongoose } = require('mongoose');

module.exports = class Ready extends Event {
	constructor(...args) {
		super(...args);
	}

	async run() {
		console.log(`Sesión iniciada como ${this.client.user.tag}`);
		if (this.client?.application?.commands) {
			await this.client.application.commands.set(this.client.slashArray);
			console.log(`(/) ${this.client.slashCommands.size} Comandos Publicados!`.green);
		}
		mongoose.set('strictQuery', false);
		await mongoose.connect('mongodb+srv://dashboard:Irvinadrian5@cluster0.6k029.mongodb.net/').then(() => {
			console.log('☁ Conectado a la base de datos de MongoDB');
		}).catch((err) => {
			console.log('☁ ERROR AL CONECTAR A LA BASE DE DATOS DE MONGODB');
			console.log(err);
		});
	}
};