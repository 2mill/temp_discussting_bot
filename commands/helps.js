const { Message, MessageEmbed } = require("discord.js");

module.exports = {
    name: 'help',
    needClient: true,
    description: 'A list of all the commands that are disposable to the user',
    execute(message, args) {
        const client = message.client;
        let commands = client.commands.array();
        const prefix = client.config.get('prefix');

        let helpEmbed = new MessageEmbed()
            .setTitle(`${message.client.user.username} Help`)
            .setDescription('List of all commands')
            .setColor('$F8AA2A');

        console.log('Got past the embedd');

        for (x of commands) {
            console.log(x.name);
        }

        helpEmbed.setTimestamp();
        message.channel.send(helpEmbed).catch(console.error);

        //stealing some code from github here quickly.

        
    }
}