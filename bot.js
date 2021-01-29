require('dotenv').config();
const Discord = require('discord.js');
const chalk = require('chalk');
const load = require('./commands/Loader.js');

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

client.on('message', (message) => {

	if (!message.author.bot)
		message.channel.send('Bot is currently under construction :construction:');
})
