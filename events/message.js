module.exports = {
    name: 'message',
    description: 'Message parse, handler',
    execute(client, message) {

        prefix = client.config.get('prefix');
        if (message.author.bot) return;
        if (message.content.indexOf(prefix) !== 0) return;
        // const args = message.content.slice(prefix.length).trim(split(/ +g/));
        const args = message.content.slice(prefix.length).trim().split(/ +/g);



        const commandName = args.shift().toLowerCase();
        if (!client.commands.has(commandName)) return;
        const command = client.commands.get(commandName);

        command.execute(message, args);
    }
}