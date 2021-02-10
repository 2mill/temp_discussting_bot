const Master = require('../Master.js');
module.exports = class Ping extends Master{
    constructor() {

        const info = {
            name: 'ping',
            description: 'Delay between the bot & Discord\'s server',
            usage: 'ping',
            category: 'utility',
        }
        super(info);
    }
    run(message) {
        const content = Math.abs(message.createdTimestamp - Date.now()) + 'ms';
        this.actions.sendMessage(message, content);
    }

}