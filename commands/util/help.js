const Master = require('../Master.js');
module.exports = class help extends Master {
	constructor() {
		super(
			'help',
			'Explains a command\'s purpose and usage',
			'util',
			'help [-v] <command>',
			'v',
		)
	}

	run(message, args, content) {
		const Discord = require('discord.js');
		let command = message.client.commands.get(content);
		if (command) {
			console.log(command);
			console.log(command.getHelp())
			let embedd = new Discord.MessageEmbed() 
				.setColor('#6441a5')
				.setTitle(`Help: ${command.name}`)
				//Calls help embedd from command,
				//checks if args exists and if it has v as an arg
				.addFields(...command.getHelp(args && args.has('v')));
			this.actions.sendMessage(message, embedd);
		}
		else {
			const symbol = require('log-symbols');
			this.actions.sendMessage(message, `:no_entry_sign: command not found`);
		}
	}
}