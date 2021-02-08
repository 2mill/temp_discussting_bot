//Master Commad

module.exports = class Master {
	constructor(name, help, short, args) {
		this.name = name;
		this.help = help;
		this.short = short;
		this.args = args;
		this.actions = require('../actions/Actions');
	}

	back() {
		return this.name;
	}

	help(option = false) {
		let helpInfo = [];
		helpInfo.push(this.help);
		helpInfo.push(option ? this.verbose : false);
	}

	/** Super action, there for unimplemented actions
	 * @return false, to indicate that nothing has been implemented
	 */
	run() {
		return false;
	}
}
