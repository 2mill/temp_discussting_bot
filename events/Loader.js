const fs = require('fs');
const Discord = require('discord.js');
const chalk = require('chalk');

exports.load = (client) => {
	let events = new Map();

	let folders = ['essential'];

	let eventFiles = fs.readdirSync('./events/essential').filter( file => file.endsWith('.js'));
	for (const folder of folders) {
		for (const file of eventFiles) {
			let eventt = require(`./${folder}/${file}`);
			if (eventt) {
				const temp = new eventt();
				events.set(temp.name, temp);
			}
		}
	}
	return events;
}