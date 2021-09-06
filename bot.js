require('dotenv').config();
const Discord = require('discord.js');
const chalk = require('chalk');
const symbol = require('log-symbols');
const commandLoad = require('./commands/Loader').load();
const eventLoad = require('./events/Loader').load();



const client = new Discord.Client({
	intents: [
		Discord.Intents.FLAGS.GUILDS,
		Discord.Intents.FLAGS.GUILD_MEMBERS,
		Discord.Intents.FLAGS.GUILD_MESSAGES,
		Discord.Intents.FLAGS.GUILD_PRESENCES,

	]
});
const config = require('./config.json');
const key = process.env.DISCORD_TOKEN;
client.keychain = {
	'token' : key,
	'prefix': process.env.PREFIX,
}
client.prefix = process.env.PREFIX;
//Load events
client.events = eventLoad;

const SPACER = '=-=-=-=';

console.log(SPACER, 'EVENTS LOADED',SPACER);
client.events.forEach(event => {
	client.on(event.name, event.eventHandler());
	console.log(symbol.success, event.name);
});

client.on('channelUpdate', (oldchan, newchan) => {
	console.log("channel update");
})


//load commands
client.commands = commandLoad;


console.log(SPACER, 'COMMANDS LOADED',SPACER);
client.commands.forEach(command => {
	console.log(symbol.success, command.info.name);
	if (!command.documented) {
		console.log(`\t${symbol.warning} no documentation`);
	}

})


//Login
client.login(client.keychain['token']).catch(error => {
	console.error(`${symbol.error}Login Failed, Reason: ${error}`);
	process.exit(1);
});



