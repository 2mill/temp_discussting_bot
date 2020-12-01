const { Message, MessageEmbed, DiscordAPIError } = require("discord.js");

module.exports = {
    name: 'help',
    needClient: true,
    description: 'A list of all the commands that are disposable to the user',
    execute(message, args) {
        const client = message.client;
        let commands = client.commands.array();
        const prefix = client.config.get('prefix');
        const Discord = require('discord.js')
        //Generate emebbed
        let helpEmbed = new Discord.MessageEmbed()
            .setTitle(`${message.client.user.username} Help`)
            .setDescription('List of all suck it')
            .setColor('#52307C');
        //add prefix field
        helpEmbed.addField('Prefix:', prefix)
        for (x of commands) {
            helpEmbed.addField(x.name, x.description, true);
        }
        helpEmbed.setTimestamp();
        message.channel.send(helpEmbed);

        /**
         * TODO: Allow users to get server specific config
         * 
         * This will require a database to be able to work on different servers
         */

        //stealing some code from github here quickly.
        
    }
}