const Command = require('../../structures/Commands.js');
const { sendError } = require('../../utils/utils.js');
const Discord = require('discord.js');

module.exports = class Eval extends Command {
	constructor() {
      super({
            name: 'servermc',
            alias: ['minecraft-server', 'mcserver'],
            usage: ['<listening/watching/playing> <status>', '<listening/watching/playing> <estado>'],
            description: ['Minecraft server information.', 'Informacion de un servidor de minecraft.'],
            cooldown: 5,
            category: 'Info',
      });
      }
   
	async run(client, message, args, lang) {

      let text = args.join("")

      let serverURL = `http://status.mclive.eu/Server/${text}/25565/banner.png`
      if(!text) return message.channel.send("Escribe la IP de un servidor de minecraft premium.");
      
      message.channel.send({files: [serverURL]}); 
      
      
        }

};