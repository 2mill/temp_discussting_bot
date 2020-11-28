const fs = require('fs');
const Discord = require('discord.js');

const client = new Discord.Client();
client.commands = new Discord.Collection();
client.events = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter( file => file.endsWith('.js'));
//Loading commands here
console.log('Loading commands');
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
    console.log(`Loaded ${command.event}`);
}
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
console.log('Loading events');
for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    client.events.set(event.name, event);
    console.log(`Loaded ${event.name}`);
}

const config = require('./config.json');
const key = require('./key.json');
const prefix = config.prefix;
const owner = config.owner;

client.config = new Discord.Collection();
client.config.set('prefix', prefix);
client.config.set('owner', owner);

client.login(key.token);

client.once('ready' , () => {
    client.events.get('ready').execute();
});
client.on('message', (message) => {
    client.events.get('message').execute(client, message);
});









