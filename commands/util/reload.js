const Master = require('../Master.js');

module.exports = class Reload extends Master {
	constructor() {
		const info = {
			name: 'reload',
			description: 'Reloads the bot\'s commands',
			usage: 'reload',
			category:'utility',
			ownerOnly: true,
		}
		super(info);
	}

	run(message, content) {
		message.client.commands = require('../Loader').load();
		console.log('Bot Commands Reloaded');
	}
}