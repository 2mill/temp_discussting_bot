const chalk = require('chalk');
module.exports = class Ready {
    constructor() {
        this.name = 'ready'
        this.sender = false;
    }
    eventHandler() {
        return function() {
            console.log(chalk.green('Bot is Ready.'));
        }
    }
}
// module.exports = {
//     name: 'ready',
//     description: 'The reply you get back from the API when the bot is ready to serve',
//     execute() {
//         console.log("Ready to receive commands");

//     }
// }