
//Loads all of the commands. Can take arguments.

const fs = require('fs');
const Discord = require('discord.js');
const chalk = require('chalk')

exports.load = (client, args) => {
	//Get Util commands
	let commands = new Map();


	let folders = ['util', 'gaming', 'mod'];

	for (const folder of folders) {
		let commandFiles = fs.readdirSync(`./commands/${folder}`).filter( file => file.endsWith('.js'));
		for (const file of commandFiles) {
			const command = require(`./${folder}/${file}`);

			if (command) {
				const temp = new command();
				if (!commands.get(temp.name)) {
					commands.set(temp.name, temp);
				}
			}
			// commands[file.split('.')[0].toLowerCase()] = new command();
		}
	}
	// for (const file of commandFiles) {
	// 	let command = require(`./util/${file}`);
	// 	commands[file.split('.')[0].toLowerCase()] = new command();
	// }
	return commands;
}