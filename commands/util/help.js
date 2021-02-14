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
		/**
		 * TODO: Figure out arg thing and make sure it routes properly.
		 */
		if (args && args.has('c') && content) {
			const embed = this._categoriesRichEmbed(message.client.commands, content);
			if (embed) this.actions.sendMessage(message, embed);
			else this.actions.sendMessage(message, 'Category D.N.E');
			return;
		}

		let command = message.client.commands.get(content);
		if (!command) {
			let embed = new this.Discord.MessageEmbed()
				.setTitle('Help')
				.setColor('#6441a5');


			let cats = new Map();
			for (const command of message.client.commands) {
				if (!cats.has(command[1].info.category)) cats.set(command[1].info.category,{
					category: command[1].info.category,
					count: 1,
				});
				else {
					cats.get(command[1].info.category).count += 1;
				}
			}
			for (const category of cats) console.log(category[1].category, category[1].count);
			this.actions.sendMessage(message, embed);


			return;
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
	_categoriesRichEmbed(commands, content) {
		let list = [];
		if (content) {
			// let category = commands.values().filter(command => command.info.category === content);
			for (const command of commands) {
				const category = content;
				if (command[1].info.category === category) list.push(command[1].info.name);
			}
			if (list) {
				let embed = new this.Discord.MessageEmbed()
					.setColor('#644a5')
					.setTitle(`Help:category:${content}`);
				for (const command of list) {
					let reqPermissions = commands.get(command).info.modOnly ? ": [[Requires Permissions]]" : "";
					embed.addField(command + reqPermissions, commands.get(command).info.description, true);
				}
				return embed;
			}
			return false;
		}
	}
	_commandRichEmbed(info, all = false) {

	}
}