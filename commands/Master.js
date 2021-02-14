//Master Commad

module.exports = class Master {
	constructor(info) {
		this.Discord = require('discord.js');
		this.info = info;
		this.documented = info.description && info.usage && info.category ? true : false;
		this.actions = require('../actions/Actions');
	}
	/** Super action, there for unimplemented actions
	 * @return false, to indicate that nothing has been implemented
	 */
	run() {
		return false;
	}
}
