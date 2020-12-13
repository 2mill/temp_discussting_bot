module.exports = {
    name: 'message',
    description: 'Message parse, handler',
    execute(client, message) {


        // if (message.author.id === '92061468450643968') client.commands.get('monka').execute(message);

        prefix = client.config.get('prefix');
        if (message.author.bot) return;
        if (message.content.indexOf(prefix) !== 0) return;
        // const args = message.content.slice(prefix.length).trim(split(/ +g/));
        const args = message.content.slice(prefix.length).trim().split(/ +/g);



        const commandName = args.shift().toLowerCase();
        if (!client.commands.has(commandName)) return;
        const command = client.commands.get(commandName);


        if (command.args && !args.length) {
            console.log(args);
            message.channel.send(command.usage);
            return;
        }


        command.execute(message, args);
    }
}