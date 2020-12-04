const fs = require('fs');
require('dotenv').config();
const Discord = require('discord.js');

const client = new Discord.Client();
client.commands = new Discord.Collection();
client.events = new Discord.Collection();
client.commands.nameList = [];

const commandFiles = fs.readdirSync('./commands').filter( file => file.endsWith('.js'));
//Loading commands here
console.log('Loading commands...');
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
    console.log(`Loaded ${command.name}`);
    client.commands.nameList.push(command.name);
}
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
console.log('Loading events');
for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    client.events.set(event.name, event);
    console.log(`Loaded ${event.name}`);
}

const config = require('./config.json');
const key = process.env.DISCORD_TOKEN;
const prefix = process.env.PREFIX;
const owner = process.env.OWNER;

client.config = new Discord.Collection();
client.config.set('prefix', prefix);
client.config.set('owner', owner);
console.log("Logging in")
client.login(key).catch(() => {
    console.error('Login Failed');
    console.log(key);
    process.exit(1);
});

client.once('ready' , () => {
    client.events.get('ready').execute();
});
client.on('message', (message) => {
    client.events.get('message').execute(client, message);
});









