const fs = require('fs');
const Discord = require('discord.js');
const chalk = require('chalk');

exports.load = (client) => {
	let events = new Map();

	let folders = ['essential', 'user_status'];

	//TODO: MAKE THIS COHESIVE WITH LOADER IN COMMNADS
	// CODE SMELL
	// let eventFiles = fs.readdirSync('./events/essential').filter( file => file.endsWith('.js'));
	for (const folder of folders) {
		let eventFiles = fs.readdirSync(`./events/${folder}`).filter(
			file => file.endsWith('.js')
		);
		for (const file of eventFiles) {
			const eventt = require(`./${folder}/${file}`);
			if (eventt) {
				const temp = new eventt()
				events.set(temp.name, temp);
			}
		} 
	}
	// for (const folder of folders) {
	// 	for (const file of eventFiles) {
	// 		let eventt = require(`./${folder}/${file}`);
	// 		if (eventt) {
	// 			const temp = new eventt();
	// 			console.log(temp.name)
	// 			events.set(temp.name, temp);
	// 		}
	// 	}
	// }
	return events;
}