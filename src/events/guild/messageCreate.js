const Event = require('../../structures/Event.js');
const { Collection, EmbedBuilder } = require('discord.js');
const { asegurar_todo } = require('../../utils/funcs.js');
const Schema = require('../../database/models/guild.js');
const db = require('../../database/models/prefix.js');
const config = require('../../config/botConfig/config.json');
const cooldowns = new Collection();
let usage;

module.exports = class messageCreate extends Event {
	constructor(...args) {
		super(...args);
	}

	async run(message) {
		if (!message.guild || !message.channel || message.author.bot || message.channel.type === 'dm') return;

		const [data, prefixData] = await Promise.all([
			Schema.findOne({ guildID: message.guild.id }),
			db.findOne({ guildId: message.guild.id }),
		]);
		if (!data) {
			await asegurar_todo(message.guild.id, message.author.id);
		}

		commandRun(this.client);

		async function commandRun(client) {
			if (message.author.bot) return;

			const prefix = prefixData ? prefixData.prefix : 'g.';
			client.prefix = prefix;

			if (!message.content.toLowerCase().startsWith(prefix)) return;
			const args = message.content.slice(prefix.length).trim().split(/ +/g);

			const command = args.shift()?.toLowerCase();
			if (!command) return;

			const cmd = message.client.commands.find((c) => c.name === command || (c.alias && c.alias.includes(command)));
			if (!cmd) return;

			if (cmd) {
				const hasPermission = (channel, permission) => channel.permissionsFor(message.guild.members.me).has(permission);
				if (!hasPermission(message.channel, 'ViewChannel') || !hasPermission(message.channel, 'SendMessages') || !hasPermission(message.channel, 'EmbedLinks')) {
					return message.reply({
						content: this.client.langs.__({ phrase: 'events.messageCreate.permisos.permisosEmbeds', locale: data.lang }),
					}).catch((err) =>
						console.log('Error we ' + err),
					);
				}

				if (cmd.inactive) {
					return message.reply({ content: message.client.langs.__({ phrase: 'events.messageCreate.cmds2.cmdInactive', locale: data.lang }) });
				}

				if (cmd.owner && !config.ownerIDS.includes(message.author.id)) {
					return message.reply({ content: 'Solo el creador del bot puede usar este comando' });
				}

				if (cmd.usage) {
					usage = data.lang === 'en' ? cmd.usage[0] : cmd.usage[1];
				}

				if (cmd.permisos_bot && !message.guild.me.permissions.has(cmd.permisos_bot)) {
					return message.reply({
						content: message.client.langs.__({ phrase: 'events.messageCreate.cmds2.permsBot', locale: data.lang }, { perm: cmd.permisos_bot.join(', '), no: client.emotes.no }),
					});
				}

				if (cmd.permisos && !message.member.permissions.has(cmd.permisos)) {
					return message.reply({
						content: message.client.langs.__({ phrase: 'events.messageCreate.cmds2.permsUser', locale: data.lang }, { perm: cmd.permisos.join(', ') }),
					});
				}

				if (cmd.nsfw && !message.channel.nsfw) {
					return message.reply({ content: message.client.langs.__({ phrase: 'events.messageCreate.cmds2.chatnsfw', locale: data.lang }, { no: client.emotes.no }) });
				}

				if (cmd.voice && !message.member.voice.channel) {
					return message.channel.send({ content: message.client.langs.__({ phrase: 'events.messageCreate.cmds2.voice', locale: data.lang }, { no: client.emotes.no }) });
				}
				if (cmd.subcommands && (!args[0] || !cmd.subcommands.includes(args[0]))) {
					const errorMessage = usage ? `Usaste mal \`${cmd.name}\`, Uso correcto \`${prefix}${cmd.name} ${usage}\`.` :
						`Usaste mal \`${cmd.name}\`, Usa \`${prefix}help ${cmd.name}\`.`;

					const errorembed = new EmbedBuilder()
						.setColor('Red')
						.setTitle('Error')
						.setDescription(errorMessage)
						.setFooter({ text: message.author.username, iconURL: message.author.avatarURL() });

					return message.channel.send({ embeds: [errorembed] });
				}

				if (cmd.args && !args.length) {
					let reply = message.client.langs.__({ phrase: 'events.messageCreate.cmds2.cmdArgs', locale: data.lang });
					if (usage) {
						reply += message.client.langs.__({ phrase: 'events.messageCreate.cmds2.cmdArgsUsage', locale: data.lang }, { prefix: prefix, usage: usage, example: cmd.example });
					}
					const errorembed = new EmbedBuilder()
						.setColor('Red')
						.setTitle('Error')
						.setDescription(reply)
							.setFooter({ text: message.author.username, iconURL: message.author.avatarURL() });

					return message.channel.send({ embeds: [errorembed] });
				}

				if (!cooldowns.has(cmd.name)) {
					cooldowns.set(cmd.name, new Collection());
				}
				const now = Date.now();
				const timestamps = cooldowns.get(cmd.name);
				const cooldownAmount = Math.floor(cmd.cooldown || 3) * 1000;

				if (timestamps.has(message.author.id)) {
					const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
					if (now < expirationTime) {
						const timeLeft = (expirationTime - now) / 1000;
						return message.channel.send({ content: `No puedes usar el comando durante ${Math.round(timeLeft.toFixed(1))} segundo${Math.round(timeLeft.toFixed(1)) !== 1 ? 's' : ''}` });
						// return message.channel.send(message.client.langs.__({ phrase: 'events.messageCreate.cmds2.cooldown', locale: data.lang }, { seg: Math.round(timeLeft.toFixed(1)) }));
					}
				}

				timestamps.set(message.author.id, now);
				setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

				try {
					cmd.run(client, message, args, prefix, data.lang);
				} catch (e) {
					console.error(e);
					message.reply({ content: message.client.langs.__({ phrase: 'events.antiCrash.embed.errorMsg', locale: data.lang }) });
				}
			}
		}
	}
};
