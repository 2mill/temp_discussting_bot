const message = require("../events/message");

module.exports = {
    name: 'ping',
    description: 'Latency of the bot to respond',
    args: false,
    execute(message) {
        const ping = Math.abs(message.createdTimestamp- Date.now());

        console.log(message.creatTimeStamp);
        message.channel.send('Bot Latency: ' + ping + 'ms');
        return;
    }
}