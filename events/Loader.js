const fs = require('fs');
const Discord = require('discord.js');
const chalk = require('chalk');

function load(client) {
	events = {};
	let eventFiles = fs.readdirSync('./events/essential').filter( file => file.endsWith('.js'));
	for (const file of eventFiles) {
		let eventt = require(`./essential/${file}`);
		events[file.split('.')[0]] = new eventt();
	}
	return events;
}

exports.load = load;