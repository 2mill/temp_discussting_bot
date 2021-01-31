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
// console.log(client.commands);

client.on('message', (message) => {

	console.log(message.content.startsWith(prefix));

	if (message.content.startsWith(prefix)) {

		//regex for finding the start of the line
		let command = />(\w+).?([\w\s@#<:>]*)/.exec(message.content);

		let properties = [];
		properties.push(message);

		//check if regex passed
		if (command) {
			//weird regex, check if there is text
			(!/./.test(command[2]))
				//push message contents past command
				something.push(command[2]);
		}

		//find command
		let loadedCommand = client.commands[something[0]];
		//if exists, run
		if (loadedCommand) {
			//super check master if implemented
			let action = loadedCommand.action(message);
			//if implemented, send back a message
			if (action) message.channel.send(action);
		}


	}

})
