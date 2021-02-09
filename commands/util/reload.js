const Master = require('../Master.js');

module.exports = class Reload extends Master {
	constructor() {
		super(
			'reload',
			'Reloads all of the commands',
			'util',
			false
		)
	}

	run(message, content) {
		message.client.commands = require('../Loader').load();
		console.log('Bot Commands Reloaded');
	}
}