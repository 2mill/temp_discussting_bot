const fs = require('fs');
const Discord = require('discord.js');
const chalk = require('chalk');

function load(client) {
	let events = {};
	let eventFiles = fs.readdirSync('./events/essential').filter( file => file.endsWith('.js'));
	for (const file of eventFiles) {
		let eventt = require(`./essential/${file}`);
		if (eventt)
			events[file.split('.')[0].toLowerCase()] = new eventt();
	}
	return events;
}

exports.load = load;