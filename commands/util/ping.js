const Master = require('../Master.js');
module.exports = class Ping extends Master{
    constructor() {
        super(
            'ping',
            'Time between the server & the bot',
            'p',
            false
        )

    }
    run(message) {
        const content = Math.abs(message.createdTimestamp - Date.now()) + 'ms';
        this.actions.sendMessage(message, content);
    }

}