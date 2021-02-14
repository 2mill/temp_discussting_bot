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

		if (content) {
			//sends message
			//second arg sends the command's info if it exists.
			//second second arg checks if args exists to make sure it's a set, and then it will try and see
			//if a is in the args

			const tempInfo = message.client.commands.get(content);
			if (!tempInfo) return;
			this.actions.sendMessage(message, this._commandRichEmbed(message.client.commands.get(content).info, args && args.has('a')));
			return;
			
		}

		/**
		 * - [x] Wrap up this categories thing please.
		 */
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
			let someEmbed = new this.Discord.MessageEmbed()
				.setTitle('Help')
				.setColor('#6441a5');


			someEmbed.addField('Usage', 'Use help -c +category_name for command list in that category. Use help +command_name for command information');

			let comp = '';
			for (const gory of cats) {
				comp += `${gory[1].category}: +${gory[1].count} commands\n`;
			}

			someEmbed.addField('Categories', comp);
			this.actions.sendMessage(message, someEmbed);
			return;
		}
	}


	/**TODO:
	 * - [x] Filter categories correctly,
	 * - [x] Generate proper embed
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
		if (!info) return false;

		let embed = new this.Discord.MessageEmbed()
			.setColor('#644a5')
			.setTitle(`Help`);
		embed.addField(info.name,info.description);
		//a section for listing role permissions here
		if (info.permissions) {
			embed.addField('Required permissions: ', info.permissions);
		}
		embed.addField('Category: ', info.category);
		embed.addField('Usage: ', info.usage);

		if (all) {
			//if all true, goes in loop and adds fields to the embed
			if (info.arguments) {
				embed.addField('Arguments', '---');
				for (const arg of info.arguments) {
					embed.addFields({
						name: `${arg.name}:${arg.short}`,
						value: arg.description,
						inline:true,
					});
				}
			}
		}

		return embed;
	}

}