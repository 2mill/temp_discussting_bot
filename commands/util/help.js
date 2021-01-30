// class Help extends Master {
// 	constructor() {
// 		super(
// 			'help',
// 			'Explains a command\'s usage',
// 			'h',
// 			'v',
// 		)
// 	}
// }
const Master = require('../Master.js');
module.exports = class help extends Master {
	constructor() {
		super(
			'help',
			'Explains a command\'s usage',
			'h',
			'v',
		)
	}
}