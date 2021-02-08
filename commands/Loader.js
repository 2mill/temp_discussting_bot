
//Loads all of the commands. Can take arguments.

const fs = require('fs');
const Discord = require('discord.js');
const chalk = require('chalk')

exports.load = (client, args) => {
	//Get Util commands
	let commands = {};

	commands['iterator'] = [];

	let folders = ['util', 'gaming', 'mod'];

	for (const folder of folders) {
		let commandFiles = fs.readdirSync(`./commands/${folder}`).filter( file => file.endsWith('.js'));
		for (const file of commandFiles) {
			let command = require(`./${folder}/${file}`);
			commands[file.split('.')[0].toLowerCase()] = new command();
		}
	}
	// for (const file of commandFiles) {
	// 	let command = require(`./util/${file}`);
	// 	commands[file.split('.')[0].toLowerCase()] = new command();
	// }
	return commands;
}