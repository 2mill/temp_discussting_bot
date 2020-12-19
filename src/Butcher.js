//At this point I am taking a lot of code from SwitchBlade, because they look like they know what they are doing.
const { Client }= require('discord.js');
const chalk = require('chalk');
const { green } = require('chalk');
require('dotenv').config();

const log = console.log;

module.exports = class Butcher extends Client {
    constructor(options) {
        super(options);
    }

    async int() {
        await this.login()
            .then(() => log(chalk.green('Discord Login Successful')))
            .catch(() => log(chalk.red('Failed to login')));
    }

    login(token = process.env.DISCORD_TOKEN) {
        return super.login(token);
    }
        


    


}


