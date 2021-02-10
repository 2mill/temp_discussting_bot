//Master Commad

module.exports = class Master {
	constructor(info) {
		this.info = info;
		this.documented = info.description && info.usage && info.category ? true : false;
	}
	/** Super action, there for unimplemented actions
	 * @return false, to indicate that nothing has been implemented
	 */
	run() {
		return false;
	}
}
