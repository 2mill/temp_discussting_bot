const Master = require('../Master.js');
module.exports = class ping extends Master{
    constructor() {
        super(
            'ping',
            'Time between the server & the bot',
            'p',
            false
        )

    }
    action(message) {
        return Math.abs(message.createdTimestamp - Date.now()) + 'ms';
    }

}