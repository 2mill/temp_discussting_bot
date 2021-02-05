
//Loads all of the commands. Can take arguments.

const fs = require('fs');
const Discord = require('discord.js');
const chalk = require('chalk')

function load(client, args) {
	//Get Util commands
	let commands = {};
	let commandFiles = fs.readdirSync('./commands/util').filter( file => file.endsWith('.js'));
	for (const file of commandFiles) {
		let command = require(`./util/${file}`);
		commands[file.split('.')[0]] = new command();
	}
	return commands;


}

exports.load = load;