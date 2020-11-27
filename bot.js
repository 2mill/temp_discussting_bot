const fs = require('fs');
const Discord = require('discord.js');

const client = new Discord.Client();
client.commands = new Discord.Collection();
client.events = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter( file => file.endsWith('.js'));


console.log('Loading commands');
for (const file of commandFiles) {
    const command = rqeuire(`./commands/${file}`);
    client.commands.set(command.name, command);
    console.log(`Loaded ${command.event}`);
}

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
console.log('Loading possible events to receive');
for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    client.events.set(event.name, event);
    console.log(`Loaded ${event.name}`);
}

const config = require('./config.json');
const prefix = config.prefix;
const ownerID = config.ownerID;
client.login(config.token);







