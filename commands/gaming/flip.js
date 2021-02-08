const Master = require('../Master.js');
module.exports = class Flip extends Master {
    constructor() {
        super(
            'flip',
            'Flips a two sided coin',
            'fl',
            'n'
        )
    }

    run(message) {
        const result = Math.floor(Math.random() * 2) + 1;


        let output = result == 1 ? "Heads" : "Tails";
        this.actions.sendMessage(message, output);

    }
}