const Master = require('../Master.js');
module.exports = class Flip extends Master {
    constructor() {
        const info = {
            name: 'flip',
            description: 'Flips a two sided coin',
            usage: 'flip',
            category: 'gaming',
        }
        super(
            info
        )
    }

    run(message) {
        const result = Math.floor(Math.random() * 2) + 1;


        let output = result == 1 ? "Heads" : "Tails";
        this.actions.sendMessage(message, output);

    }
}