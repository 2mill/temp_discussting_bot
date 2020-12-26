//At this point I am taking a lot of code from SwitchBlade, because they look like they know what they are doing.
const { Client }= require('discord.js');
const chalk = require('chalk');
const { green } = require('chalk');
const fs = require('fs');
const { fileURLToPath } = require('url');
require('dotenv').config();

const log = console.log;

module.exports = class Butcher extends Client {
    constructor(options) {
        super(options);
        this.commands = [];
        this.loadCommands();

    }

    async int() {
        this.login()
            .then(() => log(chalk.green('Discord Login Successful')))
            .catch(() => log(chalk.red('Failed to login')));
    }
    async login(token = process.env.DISCORD_TOKEN) {
        return super.login(token);
    }

    loadCommands() {
        let commandFiles = fs.readdirSync('./src/commands/').filter(file => file.endsWith('.js'));

        for (const file of commandFiles) {
            const { Command } = require(`./src/commands/${file}`);
            this.commands.push(new Command());
        }
    }
}


