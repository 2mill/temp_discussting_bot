
//Loads all of the commands. Can take arguments.

const fs = require('fs');
const Discord = require('discord.js');
const chalk = require('chalk')

function load(client, args) {
	//Get Util commands
	commands = {};
	let commandFiles = fs.readdirSync('./util').filter( file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const command = require(`./util/${file}`);
		commands[file.split('.')[0]] = new command();
	}
}

module.exports = load;