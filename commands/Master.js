//Master Commad

module.exports = class Master {
	constructor(name, help, category, usage, args) {
		this.name = name;
		this.help = help;
		this.category = category;
		this.args = args;
		this.usage = usage;
		this.actions = require('../actions/Actions');
	}

	back() {
		return this.name;
	}


	/** Super action, there for unimplemented actions
	 * @return false, to indicate that nothing has been implemented
	 */
	run() {
		return false;
	}

	getHelp(verbose = false) {
		let embedd =[
			{
				name: 'Description',
				value: this.help ? this.help : 'Missing Doc',
				inline:true,
			},
			{
				name: 'Usage',
				value: this.usage ? this.usage : 'Missing Doc',
				inline: true,
			}
		]
		if (this.args) {
			embedd.push( {
				name: 'Arguments',
				value: this.args,
				inline: true,
			});
		}

		if (verbose) {
			new Set(this.args).forEach(arg => {
				if (arg === 'v') embedd.push({
					name: 'v',
					value: 'Excutes command verbosely',
					inline: true,
				})
			})
		}
		return embedd;
	}
}
