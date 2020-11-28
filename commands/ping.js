const message = require("../events/message");

module.exports = {
    name: 'ping',
    description: 'Small ping pong to make sure that the bot is working',
    execute(message, args) {
        message.channel.send("Pong!");
        return;
    }
}