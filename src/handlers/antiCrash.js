import { WebhookClient, EmbedBuilder } from 'discord.js';
import { inspect } from 'util';
const webhook = new WebhookClient({
	url: 'https://discord.com/api/webhooks/1074902049076031549/L-wvSZSxh7aS0OJsAWHR5nEJuDb1FBeB8mqTOjJzhhP9Po7GvBiMUJ0iaGe3drK8XyMv',
});
export default (client) => {
	process.removeAllListeners();
	process.on('unhandledRejection', (reason, promise) => {
		const embed = new EmbedBuilder()
			.setTitle('Unhandled Rejection')
			.setURL('https://nodejs.org/api/process.html#event-unhandledrejection')
			.addFields(
				{
					name: '<a:amarillo:1026468389675335760> Reason',
					value: `\`\`\`js\n${inspect(reason, { depth: 0 }).slice(0, 1000)}\`\`\``,
				},
				{
					name: '<a:amarillo:1026468389675335760> Promise',
					value: `\`\`\`js\n${inspect(promise, { depth: 0 }).slice(0, 1000)}\`\`\``,
				},
			)
			.setTimestamp()
			.setColor('Red');
		return webhook.send({ embeds: [embed] }).catch((err) => { console.log(err); });
	});

	process.on('uncaughtException', (err, origin) => {
		const embed = new EmbedBuilder()
			.setTitle('Uncaught Exception')
			.setURL('https://nodejs.org/api/process.html#event-uncaughtexception')
			.addFields([
				{ name: '<a:amarillo:1026468389675335760> Origen', value: `\`\`\`js\n${inspect(origin, { depth: 0 }).slice(0, 1000)}\`\`\``, inline: true },
				{ name: '<a:amarillo:1026468389675335760> Error', value: `\`\`\`js\n${inspect(err, { depth: 0 }).slice(0, 1000)}\`\`\``, inline: true },
			])
			.setTimestamp()
			.setColor('Red');
		// console.log(`${inspect(reason, { depth: 0 }).slice(0, 1000)}`);
		return webhook.send({ embeds: [embed] }).catch((err) => { console.log(err); });
	});

	process.on('uncaughtExceptionMonitor', (err, origin) => {
		const embed = new EmbedBuilder()
			.setTitle('Uncaught Exeption Monitor')
			.setURL('https://nodejs.org/api/process.html#event-uncaughtexceptionmonitor')
			.addFields([
				{ name: '<a:amarillo:1026468389675335760> Origen', value: `\`\`\`js\n${inspect(origin, { depth: 0 }).slice(0, 1000)}\`\`\``, inline: true },
				{ name: '<a:amarillo:1026468389675335760> Error', value: `\`\`\`js\n${inspect(err, { depth: 0 }).slice(0, 1000)}\`\`\``, inline: true },
			])
			.setTimestamp()
			.setColor('Red');
		return webhook.send({ embeds: [embed] }).catch((err) => { console.log(err); });
	});

	client.on('multipleResolves (no muy importante)', (type, promise, reason) => {
		const embed = new EmbedBuilder()
			.setTitle('Multiple resolves')
			.setURL('https://nodejs.org/api/process.html#event-multipleresolves')
			.addFields([
				{ name: '<a:amarillo:1026468389675335760> Tipo', value: `\`\`\`js\n${inspect(type, { depth: 0 }).slice(0, 1000)}\`\`\``, inline: false },
				{ name: '<a:amarillo:1026468389675335760> Promesa', value: `\`\`\`js\n${inspect(promise, { depth: 0 }).slice(0, 1000)}\`\`\``, inline: true },
				{ name: '<a:amarillo:1026468389675335760> Razón', value: `\`\`\`js\n${inspect(reason, { depth: 0 }).slice(0, 1000)}\`\`\``, inline: true },
			])
			.setTimestamp()
			.setColor('Red');
		return webhook.send({ embeds: [embed] }).catch((err) => { console.log(err); });
	});

	client.on('shardError', error => {
		const embed = new EmbedBuilder()
			.setTitle('<a:amarillo:1026468389675335760> shardError')
			.setURL('https://nodejs.org/api/process.html#event-sharderror')
			.setDescription(`\`\`\`js\n${inspect(error, { depth: 0 }).slice(0, 1000)}\`\`\``)
			.setColor('Red')
			.setTimestamp();
		return webhook.send({ embeds: [embed] }).catch((err) => { console.log(err); });
	});
	process.on('SIGINT', () => process.exit());
	process.on('SIGUSR1', () => process.exit());
	process.on('SIGUSR2', () => process.exit());
};