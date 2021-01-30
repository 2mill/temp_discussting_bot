require('dotenv').config();
const Discord = require('discord.js');
const chalk = require('chalk');
const load = require('./commands/Loader.js').load();

const client = new Discord.Client();
const config = require('./config.json');
const key = process.env.DISCORD_TOKEN;
const prefix = process.env.PREFIX;
const owner = process.env.OWNER;
client.login(key).catch(() => {
	console.error('Login Failed');
	process.exit(1);
});
client.once('ready', () => {
	console.log(chalk.greenBright('Bot Ready to Server'));


});

client.commands = load;
console.log(client.commands);

client.on('message', (message) => {

	console.log(message.content.startsWith(prefix));
	let reg = new RegExp('^>');

	if (message.content.startsWith(prefix)) {
		command = /^>\w+/.exec(message.content);
		let commandName = command[0].split(prefix)[1];
		let loadedCommand = client.commands[commandName];

		console.log(loadedCommand.back());


	}

	if (!message.author.bot)
		message.channel.send('Bot is currently under construction :construction:');
})
