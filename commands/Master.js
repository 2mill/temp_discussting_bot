//Master Commad

class Master {
	constructor(name, help, short, args) {
		this.name = name;
		this.help = help;
		this.short = short;
		this.args = args;
	}

	get help() {
		return this.help;
	}
	get args() {
		return this.args;
	}
}