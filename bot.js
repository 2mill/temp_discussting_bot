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
}
const prefix = process.env.PREFIX;
const owner = process.env.OWNER;



client.events = eventLoad;
for (const event in client.events) {
	console.log(client.events[event].name);
}
console.log(client.events);
client.login(client.keychain['token']).catch(() => {
	console.error('Login Failed');
	process.exit(1);
});


for (const event in client.events) {
	client.on(event, client.events[event].eventHandler());
}


client.commands = commandLoad;
// console.log(client.commands);

client.on('message', (message) => {
	if (message.content.startsWith(prefix)) {

		//regex for finding the start of the line
		let command = />(\w+).?([\w\s@#<:>]*)/.exec(message.content);

		let properties = [];


		//check if regex passed
		if (command) {
			properties.push(message);
			properties.push(command[1]);
			//weird regex, check if there is text
			(!/./.test(command[2]))
				//push message contents past command
				properties.push(command[2]);
		}

		//find command

		let loadedCommand = client.commands[properties[1]];
		//if exists, run
		if (loadedCommand) {
			//super check master if implemented
			let action = loadedCommand.action(...properties);
			//if implemented, send back a message
			if (action) message.channel.send(action);
		}


	}

})
