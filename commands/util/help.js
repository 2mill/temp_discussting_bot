const Master = require('../Master.js');
module.exports = class help extends Master {
	constructor() {
		const info = {
			name: 'help',
			description: 'Explains a command\'s purpose and usage.',
			usage: 'help [-ac]? <command-name>',
			category: 'utility',
			arguments: [
				{
					name: 'all',
					short: 'a',
					description:'Expanded command explanation',
				},
				{
					name: 'categories',
					short: 'c',
					description: 'Lists all commands per server. Cannot be combined with [a]'
				}

			]
		}
		super(info);
	}

	run(message, args, content) {
		const Discord = require('discord.js');
		let end = 0;
		console.log(args);
		/**
		 * TODO: Figure out arg thing and make sure it routes properly.
		 */
		if (args.has('c')) {
			console.log(message.client.commandList);
		}
		// let command = message.client.commands.get(content);
		// if (command) {
		// 	console.log(command);
		// 	console.log(command.getHelp())
		// 	let embedd = new Discord.MessageEmbed() 
		// 		.setColor('#6441a5')
		// 		.setTitle(`Help: ${command.name}`)
		// 		//Calls help embedd from command,
		// 		//checks if args exists and if it has v as an arg
		// 		.addFields(...command.getHelp(args && args.has('v')));
		// 	this.actions.sendMessage(message, embedd);
		// }
		// else {
		// 	this.actions.sendMessage(message, `:no_entry_sign: command not found`);
		// }
	}


	/**TODO:
	 * - [ ] Filter categories correctly,
	 * - [ ] Generate proper embed
	 */
	_categoriesRichEmbed(commandList, content) {
		if (content) {

			//if content, filter based off commands that fit the category
			let temp = new Map();
			let category = commandList.filter(command => command.info.category === content);
			if (category) {
				for (const command of category) {
					console.log(command.info.name);
				}

			}



		} else {

		}
	}
	_commandRichEmbed(info) {

	}
}