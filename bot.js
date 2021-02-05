require('dotenv').config();
const Discord = require('discord.js');
const chalk = require('chalk');
const commandLoad = require('./commands/Loader.js').load();
const eventLoad = require('./events/Loader.js').load();


const client = new Discord.Client();
const config = require('./config.json');
const key = process.env.DISCORD_TOKEN;

client.keychain = {
	'token' : key,
	'prefix': process.env.PREFIX,
}
client.prefix = process.env.PREFIX;



client.events = eventLoad;
client.commands = commandLoad;




client.login(client.keychain['token']).catch(() => {
	console.error('Login Failed');
	process.exit(1);
});


for (const event in client.events) {
	client.on(event, client.events[event].eventHandler());
}


